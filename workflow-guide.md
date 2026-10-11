# Repeatable project workflows

Use the live [Connecto project guide](project-tracker/connecto-project-guide.html) from the workspace root:

```powershell
node docs/project-tracker/serve-project-dashboard.cjs
```

Open <http://127.0.0.1:5188/> and choose **Workflows**. The buttons run fixed local commands without using a Codex session or model tokens. They use the installed Node, npm, .NET and Terraform tools and the current checkout. The browser-only HTML snapshot cannot execute them. Results are shown in the guide and logged under `.workflow-runs/` in the workspace. Review the full log, including skips; a green command result is not release acceptance.

## One-click task catalog

| Task | Repeatable check |
|---|---|
| Frontend tests | `npm test` in `connecto-app`; includes old and new Node regressions present in the current suite. |
| Backend tests | `dotnet test Connecto.Tests.Unit/Connecto.Tests.Unit.csproj --verbosity minimal` in `connecto-api`; inspect skipped acceptance tests. |
| Identity contract | `node --test docs/domain-design/identity-contract.test.mjs` from the workspace root. |
| Frontend lint | `npm run lint`. |
| Frontend format check | `npm run format:check`; read only. |
| Frontend production build | `npm run build`. |
| Backend Release build | `dotnet build Connecto.Api/Connecto.Api.csproj --configuration Release`. |
| Local API Docker image | `docker build --file Dockerfile --tag connecto-api:local .` in `connecto-api`; builds a local image only. Docker must be running and may download base layers. |
| Terraform format and validate | `terraform fmt -check -recursive`, then `terraform validate -no-color` in `connecto-api/terraform`; initialization/provider availability is a prerequisite. No plan or apply. |
| Verify project guide | Rebuild the offline HTML, then run dashboard and monitor verification scripts. |
| All routine local checks | Frontend tests/lint/build, backend tests/build, identity contract and dashboard checks in sequence. Stops on the first failure. |
| Local demo | Start/stop the Vite development server and open its local page. Follow the demo steps in `connecto-app/README.md`; the operator still selects demo mode and checks the UI. |
| Stage documentation draft | Choose S0–S11 to create a dated `.workflow-runs/<date>-sN-evidence-draft.md` checklist. It does not overwrite an existing draft or change canonical Word files. |

Install app dependencies in `connecto-app` and restore backend packages in `connecto-api` before using the buttons if they are not present. Dependency installation may use the network and is intentionally a separate setup step. The demo needs port 5173 free. A running guide server needs port 5188 free. The guide runs one verification workflow at a time; the demo is a separate local process.

## Stage closeout sequence

1. Run the existing test suites and add focused tests for the new stage behavior. Rerun **All routine local checks** after the new tests land.
2. Run environment-specific acceptance checks where the stage gate requires them. Record pass, fail and skip counts, versions, configuration without secrets, and exact environment. For S1/S3 SQL and fresh-browser checks, follow [F3_ACCEPTANCE.md](../connecto-api/F3_ACCEPTANCE.md). A skipped SQL test is not acceptance.
3. Start the local demo, perform the stage walkthrough, and capture screenshots or observations. Label session-only sample data separately from persisted API behavior.
4. Create the stage draft in the guide. Fill the evidence and open-gate sections from actual results. Move the reviewed report to `docs/test-evidence/<date>/` when ready; the generator itself does not mark any checkpoint done.
5. Assess document impact under [AGENTS.md](../AGENTS.md) and the [change register](document-change-register.md). Update supporting README/guide descriptions when verified behavior changes. Apply canonical Word implementation-status changes only under the standing approval and its archive/version/verification workflow; scope, target architecture, operating policy and release commitments need their own explicit proposal approval. GitHub publication needs separate approval.

Database migrations, SQL acceptance with its explicit write gate, real Cognito browser checks with disposable accounts, Terraform plan/apply, Docker image publication, deployment, and Git branch/commit/push are kept as reviewed manual workflows. They depend on the chosen environment or carry persistent external effects; the guide does not silently run them.
