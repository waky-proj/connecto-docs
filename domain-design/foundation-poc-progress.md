# Foundation POC implementation progress

Version 0.3 | 1 October 2026 | F1 configuration and F2 unavailable-parsing implementation

The initial code slice replaces shared browser private collections with session memory and authenticated server profile/activity reads. All four canonical documents now record this status at version 2.0 under applied DCR-2026-10-01-008, which consolidated delivery proposal 005 and implementation-status proposal 007. This establishes the documented baseline; it does not complete S0–S3 acceptance, adopt unresolved policies or authorise production release.

The foundation runs in connecto-app and connecto-api using the existing React/JavaScript, ASP.NET Core and SQL Server stack. Sixteen local repositories exist; the additional BFF/domain/platform repositories are scaffolds, not working services. Initial domain modules stay in the current host. The documented future microservices target has separate extraction gates. Terraform remains in connecto-api until a reviewed state-preserving move.

## Slice status

| Slice | Current status | Remaining exit evidence |
|---|---|---|
| S0 Identity and release foundation | Session isolation and token-negative coverage exist; Terraform now admits frontend password/refresh flows; structured posting works without AI and parser returns 503 | Apply reviewed Cognito configuration and prove real login/refresh; browser account isolation; staging TLS; migration-failure and recovery evidence |
| S1 Profile and activity | Allowlisted profile PATCH, paginated own reads and UI wiring implemented locally | Real SQL Server persistence/validation/ownership checks; fresh browser/device retrieval; pagination/loading/error/retry journeys |
| S2 Listing terms and lifecycle | Listing creation exists; full terms/lifecycle remains planned | Approved taxonomy and money semantics; explicit legacy unknowns; edit/pause/close with revisions; invalid/cross-owner/stale writes denied |
| S3 Discovery and explainable matching | Basic owner-authorised deterministic matches exist; discovery remains a placeholder, parser explicitly unavailable; configurable weights not wired | Persisted search/details; exclusions and unknowns; configurable/versioned weights; related-wording evaluation; truthful UI without invented provider/reputation data |

## Implemented locally

- PATCH /api/users/me updates only firstName, lastName, city and bio. Omitted/null fields remain unchanged; supplied empty strings clear fields. Length limits match existing database fields. Identity, email, verification and reputation cannot be assigned through this request.
- GET /api/users/me/activity returns only the authenticated member's Needs and Offerings, with independent totals, deterministic ID ordering, page >= 1 and pageSize 1–100. No user navigation objects, emails or authentication subjects are returned. This uses the existing schema and requires no migration.
- Login loads profile and all activity pages. Profile editing calls PATCH; activity has a refresh action. A new browser session requires login and then rehydrates these records from the server.
- Profile/listing/message state is held in memory; legacy shared private storage keys are removed. Logout/account changes clear state, match results and selection. Session generations reject delayed responses/errors from earlier sessions.
- Cognito login and refresh are also generation-guarded so late responses cannot restore a logged-out token or erase a newer account. Tokens remain in memory.
- Demo preview uses separate session-only data; signed-in users cannot switch posting into demo mode through the profile toggle.
- F1 local configuration: Terraform permits ALLOW_USER_PASSWORD_AUTH and ALLOW_REFRESH_TOKEN_AUTH matching the frontend, preserving ALLOW_USER_SRP_AUTH compatibility and no client secret. A workspace contract test exercises real client login/refresh requests against the declared flows. No Terraform apply or actual Cognito login was performed.
- F2: the API no longer validates an AI key at startup, and default key/model values are empty. The unimplemented adapter throws a specific unavailable exception; authenticated need/offering parse endpoints return 503 ProblemDetails with manual-entry guidance. No fixed category is returned, even with a configured key. Manual listing/profile/activity workflows remain usable. Real extraction/semantic matching are still future work.

## Verification

Latest backend run: 23 tests passed, including no-key startup/structured workflows, safe unavailable parsing with/without configuration, retained parse-route authentication, profile allowlisting, activity paging and ownership. The API tests use EF InMemory and do not establish SQL Server transaction/concurrency or deployment correctness. The suite ran outside the sandbox because Windows Event Log access blocked its sandbox execution. The previous 21-test run remains earlier foundation evidence.

Latest frontend run: 22 Node tests passed. One additional workspace identity-contract test passed (`node --test docs/domain-design/identity-contract.test.mjs` from the Connecto root); it is separate so independent app checkouts do not require a sibling API repository. Terraform formatting check and validation passed outside the sandbox. Frontend lint/build passed in the earlier slice; no frontend application code changed in this F1/F2 slice. Browser UI and real Cognito/SQL Server/AWS staging were not exercised. Existing unrelated modifications were retained; no commit, push, infrastructure apply or migration was performed.

## Next gates

Continue with F3 real SQL Server/browser acceptance and F4 staging release-path verification. F1 configuration is aligned locally but still needs a reviewed Terraform plan/apply and real Cognito evidence; F2's manual-posting/no-key behaviour is locally verified. Then implement S2 explicit taxonomy/pricing and lifecycle and S3 real discovery, configured scoring and evaluated semantic interpretation. Current discovery and conversations are incomplete; own activity does not represent marketplace search. Review placeholder offering displays and demo labels before a real pilot.

### Ordered foundation backlog

These tasks expand the existing canonical gates into reviewable work. Each implementation change includes its relevant tests and UI/error handling; environment gates require recorded runtime evidence.

| Order | Task and dependency | Testing and security evidence |
|---|---|---|
| F1 | Local configuration implemented and contract-tested; Terraform apply/runtime evidence remains | Staging registration/confirmation/login/refresh; reject invalid token purpose/client/issuer/signature/lifetime; no browser client secret; unsupported challenges remain rejected |
| F2 | Implemented locally: no startup key dependency, no fake suggestions, safe authenticated 503 and manual workflow | Passing tests cover absent/present key, profile, listing POST and own activity; extraction/confirmation still needs future implementation before parsing is enabled |
| F3 | Complete SQL Server and browser acceptance for implemented S1; can proceed alongside F1/F2 | Real DB profile length/allowlist/persistence, account A/B ownership and paging tests; fresh browser/device login recovers data; logout/back/delayed login/refresh/reads expose no previous member data; errors and retries preserve the correct session |
| F4 | Verify staging deployment path against existing AWS state | Inspect browser→edge→host HTTPS and SQL certificate trust; scope runtime versus migration credentials; prove private routing/secret injection; failed exact-image migration blocks rollout; restore staging data and record compatible rollback and credential rotation evidence |
| F5 | Define S2 taxonomy, pricing basis/currency and legacy mapping before additive schema/UI work | Owner confirms contract/fixtures; no inferred historical units; decimals and ordering validated with SQL Server; invalid dates/ranges/taxonomy rejected; production forms do not invent a neighbourhood |
| F6 | Implement owner edit/pause/close and revisions after F5 | Owner succeeds; other member denied; stale revision conflicts; closed/paused listings excluded from new discovery; preserve records needed by future agreements |
| F7 | Implement persisted discovery and offering detail after F5/F6 | Bounded stable pagination, valid filters and actual public DTOs; exclude self/inactive/hard-incompatible candidates; private email/address/subject absent; separate own activity from marketplace search |
| F8 | Wire configurable weights, policy version and explicit unknown explanations after F7 | Validate configuration and representative ranking; preserve documented source defaults as requirements, not claims of active code; empty results and missing reputation truthful; no fabricated scores/profile data |
| F9 | Implement and evaluate related-wording interpretation; depends on F7/F8 | Owner-reviewed cases distinguish semantic matching from extraction; no hard-exclusion errors; report top-three relevance and failures; schema/time/cost limits and manual fallback for optional parsing |
| F10 | Assemble the foundation release evidence and owner review | All S0–S3 critical journeys pass for release candidate; actual SQL/browser/staging results retained; security findings triaged/retested; numeric thresholds separately adopted; safety category/age/support requirements resolved before real in-person pilot |

The inherited proposed semantic gate uses at least 30 owner-reviewed cases and at least 90% relevant top-three results among cases with an eligible relevant candidate, with zero hard-exclusion failures. The proposed performance gate uses 10,000 offerings and 20 concurrent members for 15 minutes, p95 ordinary API latency at most one second and unexpected 5xx below 1%. These are canonical proposed engineering thresholds, not measured performance, adopted business targets or evidence that the foundation is ready.

Requests/acceptance, chat, completion, reciprocal reviews, photos and operational measurement belong to S4–S11 after the foundation. Their concurrency/event/media gates stay in the wider delivery plan; absence of those features does not turn them into foundation acceptance results. Safety requirements remain applicable before a real-member pilot, even where operational features are delivered later.

## Document control and evidence limits

Canonical baseline: the four documents version 2.0 under DCR-008. The F1/F2 code in this record is newer than that baseline; exact proposed status/contract updates are pending in DCR-2026-10-01-009. Latest test counts above were executed during this implementation turn. Architecture could not be re-opened during the version recheck because it was locked; the other three read as 2.0. Recheck all versions and reconcile concurrent changes before any approved canonical application.

Implementation-status proposal 007 was applied through consolidated DCR-008; its former duplicate source ID 006 remains historical only. Canonical documents were not modified by this code slice. Version history: initial S0/S1 progress; 0.2 canonical reconciliation and F1–F10 backlog; 0.3 F1 local config and F2 implementation/test evidence, with staging gates still open.
