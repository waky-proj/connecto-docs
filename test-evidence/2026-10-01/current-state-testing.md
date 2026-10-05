# Connecto current state testing and demo

Verified on 1 October 2026, Pacific/Auckland, against the local working trees. App HEAD: b2eee93; API HEAD: 315e999. Both repositories contain uncommitted implementation changes, so these HEADs alone do not reproduce the tested working trees or identify a released build.

## Results from this verification

| Check | Result | What it establishes |
|---|---|---|
| Frontend Node tests | 30 passed, zero failed | Transport/error mappings, Cognito/session regressions, demo matching, activity loading, enforced dependency boundaries and component rendering |
| Backend xUnit tests | 23 passed, zero failed | In-process API/token/ownership/profile/activity/parser checks, matching calculators and SQL connection configuration |
| Workspace identity contract | 1 passed | Actual frontend password/refresh request flows agree with the sibling Terraform public-client declaration |
| ESLint | Passed | Current source respects dependency/UI rules and React hook lint checks |
| Vite production build | Passed | Production bundle generated successfully |
| Interactive preview walkthrough | Passed for the steps below | Real browser interaction with session-only demo data |
| Browser error log | No error entries returned at final inspection | No captured console errors for this walkthrough; not proof of every runtime path |

The backend sandbox attempt failed because Windows Event Log writes were denied. The same suite passed outside the sandbox; no production logging/security setting was weakened. Vite dependency resolution also required the existing escalated local test/server path. Commands use local Node entry points because this machine's npm launcher references a missing npm-cli.js. No dependency installation, AWS apply, database migration, deployment, commit or push was performed by this verification.

## Automated coverage

Frontend tests cover:

- Profile PATCH and bounded own-activity queries; Need/Offering request mapping and bearer-token use.
- Missing authentication; HTTP validation/ProblemDetails, connectivity, invalid JSON, empty responses and timeout handling. Timeout messages warn that unsafe posts may already have been saved.
- Cognito registration/confirmation and in-memory token refresh with mocked service responses; unsupported challenges and missing configuration are rejected.
- Delayed login after logout, old refresh failure after a new login, obsolete activity responses and legacy private-cache removal without deleting unrelated preferences.
- Demo ranking and reasons for category, budget, tools, distance and availability, including empty results.
- Independent activity totals/pagination, view mapping, stopping requests after session invalidation and error propagation.
- Rejected feature-to-infrastructure/shared-to-feature/private cross-feature imports, re-exports and literal dynamic imports; allowed public interfaces and shared components; rejected direct UI transport/persistence.
- Server rendering of all 13 screen selections, plus the profile dialog and loading/error/notice states, using the real Vite configuration and injected operations.

Backend tests cover:

- Anonymous protected requests fail while health remains public. Synthetic signed access tokens provision one internal member across repeated requests.
- ID tokens, wrong app client, wrong issuer, expired tokens and wrong signing key fail.
- Owner policies for Needs/Offerings; spoofed X-User-Id does not assign ownership; another member cannot read protected matches.
- Allowlisted profile edits, identity/reputation assignment rejection, own-only activity and pagination.
- Both absent and configured-but-unimplemented AI settings: structured profile/listing/activity workflows remain usable, authenticated parsing returns safe unavailable responses, and parsing still requires authentication.
- Exact/partial/no-match calculator cases, wrong category, incompatible budget, remote location and offering dates beyond the deadline.
- Encrypted SQL connection construction, escaping secret delimiters, local connection-string preservation and safe missing-configuration errors.

Backend API tests use EF InMemory and an in-process test host. Tokens and Cognito responses are fixtures/mocks. SQL connection construction does not establish a successful encrypted SQL handshake. The identity-contract test checks local declarations, not deployed AWS configuration.

## Interactive demo performed

Demo URL on this machine: http://127.0.0.1:5173/. The app browser is left on My Activity; the local Vite process remains running for the user to explore.

1. Open Create Your Profile; enter the fictitious name Connecto Demo and Demo neighbourhood; choose Create local preview profile without email/password. The app reports preview readiness and shows seeded sample helpers.
2. Request help; post Demo raised-bed garden setup, Garden category, default $150 total budget, three hours, This Weekend, three-mile radius and tools required. Posting displays three ranked demo matches.
3. Marcus appears first at 100%; Jonathan also scores 100% and Clara scores 85%. These are demo rule scores, not calibrated probabilities or a guarantee. Marcus's detail explains the estimated $75 cost, timeframe, distance and tools preference.
4. Open Discuss & Coordinate; send Preview demo message: can we discuss gardening tools? The text appears in the local conversation. It is not transmitted to a real provider or a persistent chat service.
5. Return to Discover; publish Demo garden tidy-up with the default $30/hour rate and tools preference. My Activity displays the new Offering and the previously posted Need.
6. Capture the ranked-match and activity screens; inspect the browser error log, which returns no error entries.

Evidence: [ranked matches](demo-matches.png) and [activity](demo-activity.png).

Preview profile/listings/messages exist only in session memory. Reloading or creating another preview session clears them. Some UI copy says “saved on this device”; this does not mean durable browser persistence. Sample map counts, identities, distances and reviews are illustrative. This walkthrough did not log in, create a Cognito account, call a real backend, establish acceptance/completion, or verify another device.

## What is implemented versus incomplete

Locally implemented API capabilities include Cognito access-token validation, authenticated listing creation, allowlisted self-profile PATCH, paginated own activity, owner-authorised deterministic matching and safe unavailable parsing. Frontend login/profile/activity/posting wiring exists; component boundaries and session-generation guards are enforced locally. The checked-in frontend CI workflow has not been configured as a remote required check by this task.

Persisted marketplace discovery and complete offering-detail DTOs, explicit currency/pricing basis and listing lifecycle/revisions, configurable/versioned weights, demonstrated semantic interpretation and a real parser remain incomplete. Real connection acceptance/agreements, persistent messaging, independent completion, reciprocal feedback, media and operational safety/measurement remain later MVP work. The other repository scaffolds do not establish working services.

## Remaining acceptance evidence

- Real SQL Server: profile/listing persistence after restart, actual paging, validation/decimal constraints, identity uniqueness races and migrations. Do not substitute InMemory results for database evidence.
- Real Cognito and authenticated browsers: registration/confirmation/login/refresh, fresh-device hydration, account A/B isolation, logout/back/reload/delayed-response paths and error/retry behaviour. The preview walkthrough covers only demo flows.
- Staging: reviewed Terraform plan against preserved state, actual public/downstream HTTPS and SQL trust, runtime versus migration privileges, secret injection/private routing, failed-migration rollout gating, backup restore and credential rotation.
- S2/S3: approved taxonomy/money semantics, owner lifecycle/revision cases, real discovery permissions/DTOs, configured scoring and owner-reviewed semantic fixtures.
- Release evidence: negative resource/token cases against the deployed candidate, accessible UI/browser journeys and security review. Proposed performance/semantic thresholds in the delivery plan have not been measured or newly adopted here.

## Reproduction commands

From connecto-app:

```powershell
node --test
node node_modules/eslint/bin/eslint.js .
node node_modules/vite/bin/vite.js build --configLoader native
node node_modules/vite/bin/vite.js --configLoader native --host 127.0.0.1 --port 5173 --strictPort
```

From connecto-api:

```powershell
dotnet test Connecto.Tests.Unit/Connecto.Tests.Unit.csproj --no-restore --verbosity minimal
```

From the Connecto workspace root:

```powershell
node --test docs/domain-design/identity-contract.test.mjs
```

With a functioning npm installation, npm test, npm run lint, npm run build and npm run dev invoke the corresponding frontend checks/server. The backend test command assumes dependencies are already restored. Port 5173 is currently occupied by this demo; use the running instance or stop it before starting another strict-port instance.

## Documentation impact

This report supplements already-approved DCR-010 implementation evidence. It adds a limited preview-browser walkthrough while full authenticated browser/SQL/staging acceptance remains incomplete; it does not change scope, policies, contracts, technology or release gates. No new canonical update/proposal is required for this verification. Canonical versions remain Business Requirements 2.0 and the three technical documents 2.2. This report/screenshots are separate from the identified canonical publication batch and are not published by this task.
