# F4 AWS release-path readiness assessment — 3 October 2026 (Pacific/Auckland)

Source: current Connecto implementation continuation, human request “continue to the next step of the implementation”. This is a read-only assessment of the configured AWS account in `ap-southeast-2` and the local deployment configuration. It is not staging acceptance or deployment approval.

## Checks performed

- `terraform fmt -check -recursive` passed. `terraform validate -no-color` passed outside the sandbox after the provider plugin failed to load inside it. No Terraform plan or apply was run.
- Both local AWS CLI profiles, `default` and `dev`, resolve to the same IAM principal/account. Read-only AWS queries found one ECS cluster (`connecto`) and one RDS instance (`connecto-db`) in the configured region. The local Terraform variables label this stack `production`.
- The active API ECS service has desired/running count 1/1 and a completed primary deployment. Its service description has **no load balancer attachment** and `assignPublicIp` is `ENABLED`. The live `connecto-api-alb` has one listener on port 80 using **HTTP** and no HTTPS listener or certificate. This ALB is therefore not evidence of an HTTPS browser-to-API path for that service.
- The RDS SQL Server Express instance is available and not publicly accessible; its configured backup retention is one day. This read-only status does not prove connectivity, migration recovery, restore or credential rotation.
- The `connecto-migration` ECS task definition exists at revision 24 and points to `/app/migration/Connecto.Database.dll`. This proves configuration presence, not successful execution or failure gating for the current image.
- Local Terraform state owns the ALB, HTTP listener, target group, RDS, Cognito and migration task definition. It does not list the active API ECS service, matching the documented external service ownership. Do not import or recreate that service without a reviewed plan.

## F4 result and next action

F4 remains open. The currently visible stack is production-labelled and lacks the required HTTPS listener and ALB-to-service attachment. No separate staging stack was found in the configured region/account. Do not treat an HTTP health response, active ECS service or available RDS instance as end-to-end staging acceptance.

Identify the intended staging account/stack, or approve preparation of a separate staging environment. Then review a Terraform plan against its actual state and ownership, establish an HTTPS browser-to-edge-to-API path, verify private migration routing and secret injection, and run the exact-image migration-failure, restore and rotation checks. The existing `project-progress.json` S0-4 checkpoint remains pending. No AWS resource was created, modified or deleted; no workflow was dispatched.

## Canonical impact

This assessment confirms already documented open release gates and external API-service ownership. It introduces no business scope, architecture target, operating policy or release commitment, and does not claim an implemented capability. No canonical Word version change is required for this read-only assessment. DCR-012's completed local SQL status update is separate; its GitHub publication remains pending explicit approval of the cumulative DCR-011/DCR-012 batch.
