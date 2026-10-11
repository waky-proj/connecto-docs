# S11 pilot measurement local evidence and open release gates

Date: 9 October 2026 (Pacific/Auckland). Source: request in this chat to implement S11.

## Verified local implementation

`GET /api/pilot/metrics?from=<UTC>&to=<UTC>` accepts a half-open request-created cohort of up to 366 days. Access is denied unless the authenticated Cognito access token names the configured safety operator group or optional `Pilot:ViewerGroup`. Both groups fail closed when unconfigured. The response publishes numerators and denominators for accepted requests, both-confirmed completion, disagreement, review participation, published rating dimensions, median hours from request to acceptance, and repeat participants. It separates one-reported, cancelled and disputed states. The React profile has a read-only pilot report alongside the existing operator queues. Browser demo records are session-only and cannot enter this API report. Deduplication uses request and agreement IDs, plus reviewer/engagement pairs, rather than outbox delivery counts.

Local verification: .NET build passed with one pre-existing nullable warning in ListingEditController. Focused API test passed for group denial, saved-aggregate counts and invalid window. Full backend suite passed 48, skipped 6 opt-in SQL tests. Frontend passed 54 tests, ESLint and production build. These tests use EF InMemory and synthetic JWTs for the new report. No real SQL query, configured Cognito pilot group, authenticated browser accessibility check, staging deployment or owner acceptance was performed.

## Measurement gaps

Discovery impressions and an explicit requester-marked suitability action are not persisted, so discovery coverage and marked suitability cannot be computed. Pilot targets, observation windows, population definition and coverage-bias review need owner decisions. The current report is a live snapshot of outcomes linked to requests created in the selected window; outcomes and reviews occurring after the window may change its counts. Published rating mean is an average of recorded role-specific dimension values, not an approved business satisfaction target. The repeat denominator covers participants in accepted agreements within the cohort, not all members. No report is labelled a successful pilot outcome.

## Restore and rotation drill record to complete in staging

Record staging account and stack ID, owner, database engine/version, migration image digest, backup ID/time, credential secret version, UTC start/end, redacted logs and reviewer. Capture a baseline of sample request, agreement, outcome and review IDs and row counts. Restore a staging backup into an isolated target; verify migration compatibility, sample rows, referential integrity, API read with a limited runtime credential, elapsed recovery time and measured data loss. Document rollback/failure behavior and compare measured RTO/RPO with owner-approved objectives. Do not restore into or rotate credentials for an unreviewed production resource.

Rotate the staging runtime database and storage credentials through the configured secret path. Start fresh API tasks, prove they can read/write with the new version, revoke the superseded version, prove old access fails, and inspect error rate, secret exposure and worker recovery. Run the exact-image failed-migration rollout gate separately. Capture each command, result and rollback. These drills have **not been executed** in this S11 task.

## Full journey and owner release review record to complete

Use two real pilot identities plus a configured operator, with separate browsers/devices. Verify sign-in/session changes, profile/listing persistence, discovery and suitability, request/accept retry and frozen terms, participant-only messages, independent outcomes and disagreement, reciprocal hidden/public reviews, optional images and private evidence, blocks/reports/operator handling, and pilot report counts. Include keyboard/screen-reader and mobile accessibility observations, negative cross-member reads/writes, duplicate requests/events, staging SQL and actual S3/Cognito behavior. Record fixture IDs, timestamps, pass/fail/skip, screenshots and redacted trace links.

The project owner must review the cohort definitions, coverage and bias, targets, operating policies, drill evidence, security findings, support staffing and release scope. Capture their dated decision and any conditions before setting `releaseAccepted` for S11. **No full staging journey or owner release review has occurred.**
