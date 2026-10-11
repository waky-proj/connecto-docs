# Connecto live project dashboard

Start from the Connecto workspace root:

```powershell
node docs/project-tracker/serve-project-dashboard.cjs
```

Open http://127.0.0.1:5188/. The monitor is bound to this computer's loopback interface. Keep the process running; Ctrl+C stops it. No dependency installation or external service is required.

The **Workflows** section runs fixed local test, build, quality, guide-verification and demo commands without a Codex session. It also creates stage evidence drafts. See [docs/workflow-guide.md](../workflow-guide.md) for the catalog, prerequisites and stage closeout sequence. Workflow logs are local under `.workflow-runs/`; inspect failures and skips before citing results. The direct-file HTML snapshot cannot run commands.

While the page is open, it checks every five seconds. Changes to tracked app/service source, documentation or project-progress.json regenerate the HTML and reload the page. Documentation previews are rebuilt from the current docs folder. The page shows the last successful check; a disconnected monitor leaves the dated snapshot visible. Source files, credentials and configuration secrets are not served by the dashboard. This monitor does not read other chats or GitHub.

## Completion records

project-progress.json is the structured progress source. It has twelve slices, each with four equally weighted checkpoints. Status values are pending, in-progress, blocked and done. A done checkpoint requires at least one existing project-relative evidence reference to receive credit. Keep test evidence current: reference existence alone does not verify its claims, rerun tests or prove that current source still passes.

Record implementation and acceptance as work is completed. The HTML automatically recalculates percentages and updates when the tracker changes; it does not infer successful implementation from new filenames or source edits. The current guide groups each S0–S11 stage's checkpoint status, reason for open acceptance and next steps in one card. S0–S10 have local implementation evidence; S11 has local cohort reporting, durable discovery and suitability signals, and a pilot view; staging drills and owner release review remain pending. These are coarse checkpoint counts, not effort estimates or audited readiness. A stage can show 100% checkpoints while its release exit gate remains open. The tracker can be revised if checkpoint granularity needs improvement, with scope changes still subject to the DCR workflow.

For each slice, releaseAccepted must remain false until all four checkpoints are complete and the slice's full exit gate is explicitly evidenced. Set releaseAccepted true and supply releaseEvidence only after recording that acceptance. The dashboard credits a closed slice only when all conditions hold. This flag does not approve deployment, canonical changes or publication.

The source/document revision detects local changes automatically but does not semantically re-evaluate feature correctness. Overview and flow descriptions remain authored summaries; update them when reviewed project decisions change. No unattended process starts at Windows login, and monitoring stops when the local server stops.

The S7 multi-device and forbidden-access checkpoint remains in progress. Its opt-in SQL concurrency/restart test passed in the 8 October 2026 full backend suite against disposable LocalDB, using synthetic JWTs. No real two-device Cognito browser journey has been recorded. The guide lists the browser, outsider, accessibility and staging checks needed to close it, with direct links to the evidence. The same per-stage closeout format covers S0–S6.

The S10 implementation checkpoints are complete locally. The 9 October 2026 SQL-enabled backend suite passed 53 tests, the frontend passed 54 tests, and lint, production build and Terraform validation passed. The object store and tokens in those tests were synthetic. Real S3/IAM/CORS, Cognito browser, accessibility, staging migration/recovery and release content/retention decisions remain open; S10 release acceptance is false. See [S10 local evidence](../test-evidence/2026-10-09/s10-local-media.md).

## Offline and verification

```powershell
node docs/project-tracker/build-project-dashboard.cjs
node docs/project-tracker/verify-project-dashboard.cjs
node docs/project-tracker/verify-project-monitor.cjs
```

Direct-file HTML includes an embedded snapshot and a link to live mode. Browser filesystem restrictions prevent it from freely watching project files by itself.

## Documentation impact assessment — 1 October 2026, Pacific/Auckland

Source: user request in this chat, “.html automatically track progress of the project”. This adds local project reporting tooling and a structured evidence tracker; it does not implement marketplace capabilities or change the approved product scope, architecture, operating policies or release gates. No canonical Word update/version increment is required. Existing DCR approvals/publications remain unchanged. No Git branch, commit, push, AWS action or deployment is performed.

## Workflow update assessment — 5 October 2026, Pacific/Auckland

Source: user request to identify repeatable workflows and trigger tests, builds, demos and stage documentation from the Connecto guide without Codex tokens. The local guide now launches an allowlisted task catalog and writes stage evidence drafts. This is workspace tooling and supporting documentation; it does not change the approved business scope, product architecture, deployed behavior, operating policy or release commitment. The four canonical Word documents require no version change for this tooling. A draft cannot claim acceptance, and canonical edits/publication keep their separate change controls. No database write, infrastructure apply, Git publication or deployment was performed by this update.

## Stage closeout guide assessment — 8 October 2026, Pacific/Auckland

Source: user request to document outstanding work for each started stage, explain S7's in-progress checkpoint, merge duplicate S0–S11 sections and reassess the guide. The guide now reflects existing recorded local evidence through the S7 follow-up, gives S0–S7 closeout steps, keeps S8–S11 as planned, and displays each stage once. This updates supporting project guidance only. It changes no product code, approved business scope, architecture target, operating policy, release commitment or canonical Word document. No canonical version increment or publication action is warranted by this guide edit.

## S10 guide reconciliation — 9 October 2026, Pacific/Auckland

Source: this chat, user report that S10 changes were absent from the project guide. The S10 implementation updated code, local evidence and canonical documents under DCR-022, but did not update the separate project-progress.json tracker or the guide's authored summaries. All four S10 local checkpoints now cite the S10 evidence record; S9/S10 summaries and closeout steps reflect local verification while release acceptance stays open. The guide is rebuilt from those sources. This repairs supporting project reporting and does not change product scope, architecture, policy or canonical Word content. No new canonical version or Git publication is authorised by this reconciliation.


