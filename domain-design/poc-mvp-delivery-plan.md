# Connecto POC and MVP delivery recommendation

Version 0.3 | 1 October 2026 | F1 configuration and F2 implementation progress

The next step is to finish verification and remaining implementation for the persistent marketplace foundation, then extend it into one complete member journey. Deliver each slice through database, authorised API, UI and acceptance evidence. The canonical version 2.0 baseline, applied under DCR-2026-10-01-008, retains React, the existing ASP.NET Core host and SQL Server for initial delivery with domain ownership inside that host. A stable App API and staged microservices are the documented longer-term target; extraction requires its own contracts, permissions and recovery gates.

Profile PATCH, own activity reads and session isolation are already implemented locally. Their reported local regression evidence does not close S0/S1 browser, SQL Server or AWS staging gates. See [foundation status and next backlog](foundation-poc-progress.md).

## Outcomes and scope

The foundation POC proves that two real test accounts can publish, retrieve across sessions, discover and assess relevant listings with useful explanations. It must include configurable scoring and demonstrated related-wording interpretation to meet the recovered original requirements; listing extraction alone does not prove semantic matching. Any deferral requires an explicit recorded scope decision.

The proposed domain MVP extends this to request, accept explicit terms, coordinate, independently report completion, submit reciprocal feedback and optionally attach outcome photos. It includes basic reporting/blocking, operator handling and business measurement. All user-visible workflows in this scope must use durable server state. Empty, pending, denied, retry and failure states are part of completion. Demo data must be visibly separate and excluded from pilot metrics.

Payments, escrow, delivery logistics, subscriptions, complex bidding, professional certification and a composite trust score remain outside this recommendation. Domain disagreements are recorded and routed to a defined human process; automated adjudication is not proposed. Full service extraction is a later engineering milestone.

The version 2.0 documents distinguish the foundation POC from the expanded domain MVP and preserve historical POC exclusions for traceability. Documentation adoption does not approve release commitments or unresolved capacity, retention, review or cancellation policies.

## Evidence and gaps

Local source inspection confirms Cognito integration, self-profile retrieval and allowlisted PATCH, paginated own activity, listing POSTs and owner-authorised Need matches. Login reads server profile/activity, private collections and tokens stay in memory, legacy shared storage keys are removed, and logout/account changes invalidate prior API and Cognito results. Shared browser private collections are a historical corrected issue. DiscoverController remains a placeholder. MatchingEngine does not consume configured MatchingWeights. F1 aligns declared Cognito password/refresh flows locally, retaining SRP; F2 removes the startup key requirement and fixed category result, returning authenticated 503/manual-entry guidance instead. Real extraction remains unavailable, even with a key. Staging identity remains unverified.

Connections, engagement reports, server chat, reciprocal reviews, media processing and operational metrics remain future work. Latest F1/F2 verification reports 23 backend tests, 22 frontend tests, one workspace auth contract test and Terraform format/validation passing. API tests use EF InMemory. Earlier frontend lint/build checks remain evidence for unchanged frontend code. No real browser, SQL Server or AWS staging verification is established. No canonical Word files, AWS resources or database were modified by this local implementation slice.

## Decisions before dependent work

Record each decision with owner, date and acceptance consequence. Begin foundation work while later policies are resolved.

| Decision | Proposed starting point | Required before |
|---|---|---|
| Delivery topology | Version 2.0 documents initial domain modules in current host and later staged extraction; settle service cutover details at extraction gates | New lifecycle implementation / later extraction |
| Taxonomy and price contract | Managed taxonomy; explicit currency and hourly/fixed/free/negotiable basis; legacy unknowns retained | Listing schema and ranking |
| Eligibility and semantics | Separate hard exclusions from soft preferences; approved related-wording evaluation set | Discovery acceptance |
| Need capacity | One active engagement per Need; no global restriction on provider engagements | Connection acceptance |
| Cancellation and disagreements | Explicit permitted transitions, independent reports and human case process; safety reporting available at any stage | Engagement release |
| Feedback | Both-confirmed eligibility; role dimensions; hidden reciprocal submission; approved publication window, editing and withdrawal rules | Review release |
| Media and retention | Explicit public/private visibility and parent permissions; approved limits and retention for each data class | Chat/media pilot |
| Safety operations | Eligible categories/ages, named reviewer, staff permissions, support coverage and escalation/appeal route | Real-member interaction pilot |
| Pilot objectives | Cohort, observation periods and success targets approved before collecting outcome evidence | Pilot evaluation |

## Vertical slices and acceptance evidence

The table is a delivery order, not a calendar commitment. Split any row that cannot be reviewed as one focused change into the listed sub-slices. Each sub-slice includes its API, persistence, UI and tests; dependent capabilities remain disabled until their complete gate passes. Avoid a broad folder rewrite before delivering behaviour.

| Slice | Member outcome and focused sub-slices | Exit evidence |
|---|---|---|
| S0 Release and identity foundation | Reconcile Cognito app flow with provisioning; isolate member/demo state and clean logout; make structured posting independent of AI; verify staging HTTPS and migration pipeline | A signs out and B sees none of A's private cache; negative tokens denied; failed migration prevents release; staging smoke passes |
| S1 Persistent profile and activity | Profile PATCH with allowlisted DTO; own Needs/Offerings reads and pagination; replace local profile/activity sources | Edit and publish as A, restart browser or use second device, retrieve exact saved state; B cannot modify or read A's private activity |
| S2 Valid listings | Price/taxonomy migration and validation; owner edit; pause/close lifecycle with revision checks | Invalid ranges/currency/dates rejected; legacy units stay unknown; stale edits conflict; closed listing excluded from new discovery |
| S3 Useful discovery | Persisted search/detail DTOs; eligibility filtering; configurable factor weights and explanations; semantic interpretation evaluation; optional parsing as confirmed suggestions | Self/inactive/prohibited and hard-incompatible candidates excluded; related wording finds relevant offerings; missing values remain unknown; scoring policy version and actual offering details shown |
| S4 Safety and durable effects | Persist blocks/reports and operator case access; atomic outbox; retrying dispatcher with consumer receipts; journey-event capture | Block affects new protected actions; reporter can report without completion; unrelated/staff-without-role access denied; crash/replay loses no committed event and duplicates no effect |
| S5 Request a connection | Request with explicit proposed terms/revision; participant inbox; decline/withdraw transitions | Sender and recipient derived server-side; self/duplicate requests rejected; outsider denied; reload preserves requests and decisions |
| S6 Accept and create agreement | Atomic capacity check and acceptance; immutable agreement snapshot; idempotency and version handling; participant agreement view | Concurrent accepts for one Need produce one valid active engagement; same-key retry returns same outcome; changed payload under same key conflicts; later listing edits leave agreed terms intact |
| S7 Coordinate persistently | Conversation creation after acceptance; message POST/history with retry key and cursor; polling and read semantics | Two devices retain ordered history; retry stores one message; third account cannot read/send; chat does not alter terms or completion |
| S8 Record outcomes | Own completion report; dual confirmation UI/history; approved cancellation; disagreement case and operator workflow | One report never becomes both-confirmed after timeout; disagreement preserves both reports; replay and concurrent reports converge; nonparticipants cannot report |
| S9 Reciprocal feedback | Eligibility and unique role reviews; hidden submission; publication worker; averages/counts and exclusion recomputation | Hidden content never reaches other participant via DTO/cache; both/window publication behaves as approved; missing reviews do not become zero ratings; exclusion/withdrawal recomputes correctly |
| S10 Optional outcome photos | Quarantined private uploads; actual-format/size validation and metadata removal; parent-bound attachment; authorised serving and withdrawal cleanup | Forged/oversized files rejected; unready files never served; hidden/private media inaccessible; failed upload leaves text feedback usable; withdrawal promptly denies serving |
| S11 Evaluate and release pilot | Cohort reporting; operator views; recovery/rotation runbooks; full journey and accessibility check | Fixture counts reproduce exactly; demo/replay cannot inflate outcomes; backup restores and migration/release drill succeed; authorised pilot owner reviews evidence |

S0–S3 form the foundation POC. S4–S11 complete the proposed domain MVP. Optional means a participant can skip photos or parsing; it does not mean that an advertised photo capability may remain a mock. If photos or semantic matching are deferred from the release, document and approve that narrower release explicitly.

## First implementable backlog

Continue S0 and S1 from the implemented profile/activity/session slice. Complete the real-browser A → logout → B journey, including delayed requests and browser-back; prove persisted edits and listings after login in a fresh browser/device. Reconcile the frontend USER_PASSWORD_AUTH flow with declared SRP/refresh Cognito configuration, remove the unconditional AI key dependency from structured posting, and verify staging HTTPS and migration recovery. Retain tokens in memory and no silent demo fallback. The ordered foundation backlog and evidence are in foundation-poc-progress.md.

Sixteen local repositories and their guides already exist, as recorded in [repository inventory](../repository-inventory.md). The app/API contain implementations; the domain, BFF and platform directories are scaffolds. Continue foundation code in connecto-app and connecto-api. Existing Terraform remains in connecto-api; scaffold existence does not trigger service extraction or an infrastructure move.

Prepare contract examples, permission matrix, migration/backfill behaviour and acceptance fixtures before coding each subsequent slice. Use additive schema changes; retain legacy records with explicit unknown values. Keep one writer per aggregate. In the shared database, acceptance and capacity use one transaction with database-enforced constraints; add a transactional outbox for derived effects. A future split must separately prove the proposed distributed acceptance protocol before cutover.

Every backlog item should state its user outcome, domain invariant, API/schema change, actor permissions, failure/retry behaviour, test evidence and dependencies. Estimate after inspecting that item. No unsupported delivery dates or staffing assumptions are made here.

## Testing measures and proposed engineering gates

These numeric thresholds are proposed engineering gates, not approved business targets or measured current performance. Save evidence against the release commit, migration version, configuration and fixture seed. Require 100% pass for the enumerated critical scenarios; line coverage is supporting information rather than the release decision.

| Measure | Proposed test and gate |
|---|---|
| Functional journey | All declared paths pass across requester A/provider B in separate browser contexts: publish → discover → request → accept → message → independent reports → reviews → optional photo; third account C exercises denied paths |
| Domain correctness | Transition tables cover allowed/forbidden transitions, unknown inputs, term revisions, role eligibility and reputation recomputation; every critical invariant has a passing test |
| Database correctness | Real SQL Server integration tests for uniqueness, decimals, transactions, row versions, migrations and outbox; do not substitute EF in-memory tests for database semantics |
| Concurrency | 20 simultaneous accept attempts on one Need produce exactly one valid engagement; test different requests plus same-key retries; stale versions and reused keys with changed payload fail deterministically |
| Recovery | Kill worker after commit and before receipt/acknowledgement; restart and replay each event 10 times; exactly one consumer effect, no missing committed state; test duplicate and out-of-order events |
| API access | Actor matrix covers anonymous, owner, other member, both participants, restricted member, authorised staff and staff lacking permission on each new route/property; zero successful forbidden reads/writes |
| Identity | Reject expired, malformed, wrong signature/issuer/client, ID-as-access and missing-subject tokens; verify refresh expiry and logout behaviour without claiming offline JWT verification guarantees instant revocation |
| Semantic usefulness | Freeze at least 30 owner-reviewed Need/Offering cases, including equivalent wording, hard incompatibilities and unknowns; no hard-exclusion errors; proposed relevant top-three result in at least 90% of cases with an eligible relevant candidate; report failures and human suitability separately |
| API responsiveness | Proposed staging workload: 10,000 published offerings and 20 concurrent members for 15 minutes; p95 ordinary read/command latency ≤1 second and unexpected 5xx <1%; measure AI/upload jobs separately; record environment and achieved throughput |
| Security findings | No unresolved critical/high finding in the release scope; record findings, evidence and retest status; approved exceptions cannot cover known cross-member/private-media leakage |
| Operations | Failed migration gates rollout; restore a staging backup and verify sample records plus integrity; rotate credentials and prove new tasks connect while superseded access is removed; set and measure restore objectives before pilot |

Run unit, SQL integration, API contract/access and frontend checks per applicable change. Run the complete browser journey and staging security/recovery gates for the release candidate. CI should retain reports, request correlations and redacted logs. Historical test counts alone do not demonstrate MVP readiness.

## Security implementation measures

Derive actor identity from verified Cognito tokens, and check resource permissions on every read and command. Allowlist editable fields; clients cannot set owner, reputation, participant, completion-of-other-member or staff flags. Use separate public/private DTOs; suppress email, precise address, auth subject, private messages and unpublished reviews from public search and event payloads. Add property-level assertions as well as status-code checks.

Verify HTTPS in the actual browser-to-edge and edge-to-host paths. Restrict CORS to intended origins. Use least-privilege runtime SQL credentials distinct from migration credentials and scoped AWS task roles; keep secrets out of browser bundles and logs. Establish input/body/page limits, per-actor rate limits, message/upload quotas and parsing cost budgets. Test bounded failure behaviour and safe content rendering.

Treat AI input/output as untrusted: schema validation, member confirmation, no authority to publish/accept, bounded requests/timeouts and manual structured-entry fallback. Photos use private quarantine, format validation, processing and authorised delivery; test signed-link lifetimes/cache behaviour against withdrawal and hidden visibility. Sensitive served metadata must be removed.

In-process modules use explicit contracts and actor context; network workload identity is required when services are extracted. That later gate includes machine scopes/caller purpose, independent member authority where applicable, downstream TLS, isolated credentials and fault-injected distributed acceptance. Domain permissions cannot be replaced by network reachability or IAM task identity.

Controls reflect [OWASP API Security Top 10](https://api-security.owasp.org/editions/2023/en/0x11-t10/) and [AWS Cognito JWT verification](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html). Their effectiveness must be tested in Connecto; this recommendation is not a security certification.

## Business measurement

Capture timestamps and deduplicated milestones from S2 onward. Report discovery coverage, requester-marked suitability, accepted-connection conversion, both-confirmed completion, disagreement rate, eligible review participation, bilateral satisfaction, time to connect and repeat use with defined cohorts/windows. Show pending, one-confirmed, cancelled and disputed outcomes separately. Publish each numerator/denominator and review coverage. Set pilot business targets with the owner before evaluation; the semantic fixture target above is an engineering assessment, not marketplace success.

## Source and document control

Sources: all four canonical Connecto Word documents version 2.0, applied DCR-2026-10-01-008; repository-inventory.md; domain-design/business-boundaries.md, historical architecture.md v0.1, implementation.md v0.2; microservices.md v0.2; microservices-validation-security-repositories.md v0.1; off-platform-risk-assessment.md; continuation.md; current useConnecto.js, cognito.js, MatchingEngine.cs, OpenAIListingParser.cs, DiscoverController.cs and UserController.cs. This reconciliation follows the current request to update the implementation plan and foundation POC using the latest documents. The register contains the resolved source references and consolidation approval.

DCRs 002–007 were consolidated and applied through DCR-008. Version 0.2 synchronised this plan with that baseline. Version 0.3 records subsequent F1 configuration/F2 parser changes; canonical impact is pending proposal DCR-009. Canonical files remain unchanged and their recorded rendering limitation remains. Numeric engineering thresholds remain proposed until adopted and executed. Documentation adoption does not close implementation/staging gates.
