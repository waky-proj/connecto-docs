# S11 owner release review packet — decision pending

Prepared 11 October 2026 (Pacific/Auckland) for the request to finish S11. The user identified **local on this machine** as the environment for the current drills. No pilot owner identity, approved targets, or release decision was supplied. This packet records evidence for review; it is not an acceptance signature.

## Scope and local results

| Area | Evidence available | Review status |
|---|---|---|
| Cohort definitions and operator/pilot views | Durable search/suitability signals and request-created cohort report, with numerators and denominators; local group authorization tests | Local implementation verified; population and targets undecided |
| SQL correctness | New migration applied to disposable LocalDB; 57 backend tests passed with SQL enabled and none skipped | Local verified |
| Frontend | 55 tests, lint and build passed | Local automated verification; real accessibility journey absent |
| API journey | Separate synthetic requester/provider identities covered publish, discover, suitability, request, accept, message, independent completion reports, reviews and metric read in one in-process test | Local API verified; real browser/account journey absent |
| Restore | Copy-only checksummed backup verified and restored to a separate disposable catalog; integrity check and selected migration/member/listing counts matched | Local rehearsal verified; measured staging recovery and data-loss objectives absent |
| Credential rotation | Temporary least-privilege local SQL login: old password worked before change, failed after; new password worked; user/login cleanup verified | Local SQL drill verified; runtime secret, storage and task replacement absent |

Detailed commands and limits are in [the local measurement record](s11-local-measurement.md). The prior [S11 checklist](../2026-10-09/s11-local-pilot.md) lists the full staging and browser evidence needed for release.

## Decisions and evidence still required for release

1. **Owner and pilot policy:** name the authorized release reviewer; approve pilot population, observation window, targets, denominator and coverage-bias interpretation. Decide the unresolved capacity, cancellation, disagreement, review, moderation, retention and support operating rules through the DCR process.
2. **Real account journey:** capture requester, provider, outsider and configured operator results across separate browser contexts and reloads, including denial, retry, images/private evidence, keyboard/screen-reader and mobile checks. Record fixture IDs, timestamps, screenshots and redacted traces.
3. **Environment operations:** identify an approved nonproduction stack if the planned staging gate remains. Verify the exact release image and migration-failure hold, isolated backup restore against representative rows, measured RTO/RPO, runtime database and storage secret rotation with fresh API tasks, revocation and recovery.
4. **Owner review:** examine the metric definitions and data, accessibility/security and operational findings, support coverage, outstanding defects and release scope. Record a dated accept/conditional/reject decision and conditions. `releaseAccepted` stays false until this occurs.

The local machine answer authorizes the local rehearsals recorded here. It does not by itself approve a local-only release gate, change the documented staging requirement, identify the pilot owner, or establish business success targets. Any proposed narrower release scope requires an approved business change.
