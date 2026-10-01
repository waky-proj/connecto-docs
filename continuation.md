# Connecto continuation — 1 October 2026

Reviewed local connecto-api and connecto-app, the Connecto app project's Identify Migration Workflow Issue conversation, and App Implementation history. Existing uncommitted backend workflow edits and frontend refactor were retained.

## Current state

Backend: .NET 10, EF Core SQL Server, Cognito JWT authentication and user provisioning. EF migrations include AddAuthSubjectId. Terraform creates migration task, RDS, ECR, IAM, security groups, ALB and Cognito; API ECS service/task currently comes from pre-existing AWS resources referenced by deployment.yml rather than Terraform. Frontend: React/Vite, Cognito sign-up/confirmation/login, bearer-token API posting and matches; discovery, messages and profile edits remain local/demo.

## Deployment fixes

Docker publishes the existing Connecto.Database runner at /app/migration. Migration task overrides the API entrypoint, injects username/password JSON keys from the RDS-managed secret, and supplies server/database separately. Both hosts use one SQL connection builder; local DefaultConnection is used when Database:Server is absent. Production deployment removes the old DefaultConnection mapping to avoid the JSON-as-connection-string error.

Workflow registers a migration revision with the exact build image, validates RunTask failures, waits, checks the migration container exit code and blocks API deployment on failure. Push to main runs migrations; manual runs default to migrations but allow an explicit skip. Deployment runs serialize and wait for ECS stability. ALB ingress now matches its listener port.

## Before running production deployment

1. Review Terraform plan against the existing state; do not recreate/import resources blindly. Apply the migration task/IAM changes before running the workflow. Confirm the intended database name: new default is Connecto.
2. Set production GitHub environment variables MIGRATION_SUBNET_IDS (comma-separated), MIGRATION_SECURITY_GROUP, DATABASE_SERVER (host,port), DATABASE_NAME and DATABASE_CREDENTIALS_SECRET_ARN from matching Terraform outputs. Existing AWS_DEPLOY_ROLE_ARN, COGNITO_ISSUER and COGNITO_APP_CLIENT_ID remain required. Optional ECS_CLUSTER and MIGRATION_TASK_DEFINITION override migration defaults.
3. Ensure private migration subnets have NAT or endpoints for ECR API, ECR Docker, S3 image layers, Secrets Manager and CloudWatch Logs. Terraform does not create this routing.
4. GitHub deploy role needs ecs:DescribeTaskDefinition, ecs:RegisterTaskDefinition, ecs:RunTask, ecs:DescribeTasks, ecs:StopTask and iam:PassRole for task execution/task roles, alongside existing ECR and service deployment permissions. The external API task execution role also needs GetSecretValue on the RDS secret (and kms:Decrypt if using a customer managed key).
5. Confirm API task family/service/container in deployment.yml refer to actual AWS resources. Retain its OpenAI secret configuration; the API currently requires that key at startup.
6. Rebuild/redeploy tasks after secret rotation to refresh injected credentials. EF migration uses the master account in this POC; separate runtime database permissions remain future work.

No AWS changes or database migrations were executed in this continuation. Live ECS/RDS, IAM permissions, network routing, SQL certificate trust and Docker image execution require verification in the target environment.

References: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html and https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-secrets-manager.html.


## Verification

Backend: 19 tests passed; migration runner Release build passed; three connection configuration tests cover secret delimiters, deployed settings overriding stale local settings, local fallback and missing configuration. Frontend: 17 tests passed, Vite build and ESLint passed using direct Node entrypoints because the installed npm launcher references a missing npm-cli.js. Terraform formatted and validated successfully. All five workflow YAML files parsed successfully; git diff whitespace check passed. Backend suite required access outside the sandbox for the Windows event log. Docker execution and live deployment have not been verified.
