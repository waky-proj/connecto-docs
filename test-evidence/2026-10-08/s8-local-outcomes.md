# S8 local outcomes and dispute acceptance

8 October 2026, Pacific/Auckland. Source: this chat, user request to implement S8 independent completion reports, confirmation state/history, cancellation/dispute workflow, and concurrency/permission acceptance. This is local implementation evidence, not deployment or release acceptance.

## Implemented contract

Accepted Engagements now hold an outcome state and concurrency revision. The requester and provider each submit one independent `completed` or `incomplete` report. The first report leaves the engagement `one_reported`; two completed reports produce `both_confirmed`; an incomplete report or explicit dispute produces `disputed`. A timeout never supplies the other participant's report. Participants can record cancellation before both-confirmed completion. A configured safety operator can list disputed engagements and record a private review note; review does not adjudicate liability or rewrite participant reports. The React inbox exposes reporting, cancellation, dispute, review status and ordered history. The profile operator section exposes the restricted dispute queue and private acknowledgement form.

`EngagementOutcomeEvent` keeps an append-only actor/action/reason/history record with a unique engagement/actor/retry-key index. Outcome writes require the current revision and retry key. On SQL Server a serializable transaction locks the Engagement row before state and event reads. Outsiders receive 404 on participant outcome routes; nonoperators receive 403 on operator routes. `AddEngagementOutcomes` and `AddOutcomeDisputeReview` are additive migrations. The first migration initializes existing agreements to revision 1 and awaiting confirmation. No automatic completion, dispute resolution or financial consequence is implemented.

## Verification

- Full backend suite: 49 passed, zero failed/skipped, with opt-in LocalDB tests enabled against dedicated disposable `ConnectoS8Acceptance_20261008` database. Both S8 migrations applied. Twelve concurrent same-key reports produced one durable report; a provider report and requester cancellation racing at the same revision produced one success and one conflict. Stale revision and outsider actions were rejected. A second agreement with conflicting participant reports became disputed. A fresh API host read persisted state and history. A focused in-memory API test covered both-confirmed completion, retries, explicit dispute, operator queue/review and permissions.
- The same full LocalDB suite also ran the opt-in S7 conversation concurrency/restart test successfully. This updates its earlier skipped-test result, but does not establish S7 real browser or release acceptance.
- Frontend: 52 tests passed; lint clean; production build passed. An API route test covers authenticated agreement-scoped outcome actions. These tests do not establish interactive browser or accessibility acceptance.
- The test database was removed after the run; `DB_ID('ConnectoS8Acceptance_20261008')` returned `NULL`.

## Open gates

Real Cognito multi-account browser and two-device reload journeys, accessibility, staging deployment/migration and recovery remain unverified. The release cancellation rules, dispute adjudication and staffing/response policy require explicit business approval. This code records cancellation and operator acknowledgement without deciding those policies. S8 releaseAccepted remains false; no deployment is claimed.
