# S2 listing terms — 4 October 2026 (Pacific/Auckland)

Source: current Connecto chat. Human approved DCR-2026-10-03-013 exactly as written.

## Implemented locally

- New Need and Offering records require the approved managed category, `NZD` currency and a `fixed`, `hourly`, `free`, or `negotiable` pricing basis. Fixed and hourly records require a non-negative range; free and negotiable records reject numeric amounts. Hourly Needs require estimated hours.
- The additive migration `20261003104030_AddListingTermsAndLifecycle` adds nullable currency, pricing-basis, estimated-hours and revision fields. Existing rows retain null currency and `legacyUnknown` pricing basis. It explicitly maps old statuses to the new numeric lifecycle values without assigning historic money units.
- API creation replies and owned activity reads expose the new terms and revision. Invalid terms return 400 ProblemDetails. API-mode frontend forms use the managed taxonomy, NZD labels and pricing-basis selection; demo categories remain separate. Activity cards offer edit, pause and close controls for API listings with a revision. Edit forms are prefilled from owned activity and replace local state only from an accepted API response.
- Matching excludes persisted legacy-unknown rows. Explicit terms only receive a numeric price score where currencies and bases match.
- The server exposes owner-authorised pause and close commands for Needs and Offerings. Each command checks the supplied revision, permits only the approved lifecycle transitions, increments the revision on success and returns 409 for a stale revision or invalid state. Closed listings have no reopen command.

## Verification

- Backend: 33 passed, 0 failed and 1 opt-in SQL test skipped because its write-gate variables were not supplied. The added API test covers rejected unmanaged/USD terms and accepted hourly NZD Need fields. Controller tests cover a successful pause, stale-revision rejection, rejected non-owner close and the closed-state rule.
- Frontend: 46 tests, ESLint and production build passed outside the sandbox. Added client checks verify revision-checked pause, close and PATCH requests. The sandbox itself intermittently denied Vite realpath resolution; the approved outside-sandbox rerun passed.
- Dedicated F3 LocalDB: migration runner completed successfully. Read-only follow-up found `20261003104030_AddListingTermsAndLifecycle` as the latest migration and two pre-existing seeded Needs plus two Offerings retained as legacy unknown terms.
- Dedicated LocalDB lifecycle acceptance passed after replacing inferred EF concurrency state with conditional SQL updates. The test verified an owner edit, rejected stale and cross-account edits, pause, stale pause rejection, close and the closed-state rule. It creates unique temporary rows and cleans them up.

This evidence does not establish real-browser lifecycle acceptance, Cognito, discovery acceptance, staging HTTPS or migration recovery. The related S1, S3 and F4 gates remain open. No AWS resource, shared development database, Git branch, commit, push or deployment was changed.
