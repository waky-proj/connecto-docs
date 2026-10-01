# Connecto domain implementation plan

Version 0.1 | 1 October 2026

Implement the domain journey incrementally in the existing solution. Each increment includes persistence, authorised API behaviour, frontend states, and meaningful verification. Proposed routes and records are design contracts, not endpoints that currently exist.

## Current baseline

- Cognito authentication, internal user provisioning, and `GET /api/users/me` exist. Profile editing remains local.
- `POST /api/needs` and `POST /api/offerings` persist listings. Current validation does not yet express all proposed taxonomy, money, and date rules.
- `GET /api/needs/{needId}/matches` enforces ownership and calculates up to ten ranked results from active offerings. The current matching service does not enforce all proposed eligibility rules.
- `POST /api/discover/needs` is a placeholder. An internal discovery service exists but does not establish an implemented client-facing discovery workflow.
- `POST /api/ai/parse/need` and `/offering` return parsed listing data. Startup currently requires an OpenAI key.
- Frontend discovery, conversations, profile edits and activity retrieval contain local/demo behaviour. Demo scoring differs from backend scoring.
- The Domain Match entity has pending/accepted/rejected status and EF mapping, but there is no implemented connection/engagement workflow. User and Offering both contain reputation fields without the proposed reciprocal feedback source.
- Engagements, persisted reviews/photos, durable events, safety cases, and business metric projections are proposed capabilities.

## Module implementation briefs

| Module | Backend and data work | Frontend and interface work | Key verification |
|---|---|---|---|
| Members | Update profile use case, public/private DTOs, versioned preferences; retain subject mapping | Persist edits through proposed `PATCH /api/users/me`; safe public member view | Owner-only edits; private fields excluded; saved edits survive new session |
| Listings | Consolidate business interfaces; explicit taxonomy and PriceTerms; owner edit/pause/close; server-owned activity queries | Proposed GET/PATCH routes for Needs/Offerings; API activity replaces device cache | Money/date/skill validation; ownership; closing preserves engagement history |
| Discovery | Implement paginated database search and filters; eligibility before weighted scoring; reputation query contract | Proposed `GET /api/discover/offerings`; explain fits, unknowns and exclusions; suitability action | Excludes self/inactive/blocked candidates; handles missing history; stable pagination |
| Connections | New request aggregate, unique active-request constraint, transitions, term revision, idempotent acceptance | Proposed `/api/connections`, `/{id}/accept`, `/decline`, `/withdraw`; participant inbox | Nonparticipant forbidden; stale terms rejected; concurrent/retried acceptance creates one engagement |
| Engagements | Agreement snapshot, separate progress and confirmation state, two reports, concurrency version, history | Proposed `/api/engagements/{id}` and `/completion-reports`; show each confirmation explicitly | One confirmation never becomes both; conflict opens dispute; listing edits leave snapshot intact |
| Conversations | Persist conversations/messages/receipts; create after acceptance; participant policies; cursor history and retry keys | Proposed `/api/conversations/{id}/messages`; start with polling, explicit delivery state | Nonparticipant denied; message retries deduplicate; pagination does not lose messages |
| Feedback | Eligible review opportunities, role dimensions, publication scheduler, attachments, derived summaries | Proposed `/api/engagements/{id}/reviews` and member reputation reads; unpublished review view is author-only | Unique review; mutual/window release; unavailable reviews excluded; role-specific counts correct |
| Media | Private object-store gateway, quarantined uploads, processing worker, parent permission checks, deletion jobs | Proposed `/api/media/uploads`, `/{id}/finalise`, authorised retrieval; optional photos and explicit visibility | Forged assets rejected; private evidence inaccessible; invalid files quarantined; metadata removed |
| Safety | Blocks/reports/cases/restrictions and scoped staff commands; audit trail; cross-module policies | Proposed `/api/reports`, `/api/blocks`, authorised case tools; private reporting flow | Blocks enforced on commands; staff privileges limited; decisions trigger correct downstream changes |
| Measurement | Outbox consumers, deduplication, event taxonomy, cohort queries; include demo/source marker | Explicit suitable-offering action; internal aggregate dashboard | Retries do not double-count; denominators reproducible; one-confirmed differs from completed |

Resource IDs in these routes never establish permission by themselves. Use the authenticated actor throughout. State-changing POSTs that can be retried use idempotency keys and version checks as appropriate. Monetary fields include currency and basis; amounts use decimals. Store event/report times in UTC and display them in the user's timezone.

## Delivery increments

### Increment 1 Complete the persistent marketplace foundation

Complete profile updates, owned activity retrieval, listing validation and lifecycle, and paginated discovery. Align frontend/backend taxonomy and monetary units before changing ranking. Preserve existing listing data with explicit legacy/unknown pricing basis rather than guessing historical units. Add self-exclusion, supported hard constraints, and documented handling of missing reputation. Keep demo and API data clearly distinguishable.

Acceptance: an authenticated member can publish, retrieve after a new session, edit their own profile/listings, discover persisted offerings, and inspect real match explanations. Another member cannot access private activity or mutate their resources. Existing auth/posting behaviour remains supported.

### Increment 2 Establish durable integration and basic safety

Introduce application-owned repository contracts, an outbox, dispatcher, consumer deduplication, aggregate versions and correlation IDs. Add block/report persistence and minimal restricted-action enforcement. Define the staff review process before exposing production interaction features. Record listing/recommendation milestones without copying private content into analytics.

Acceptance: a committed state change survives dispatcher failure and is delivered after recovery; repeated delivery changes projections once. A block prevents prohibited new requests. Existing database/migration deployment checks continue to apply.

### Increment 3 Create connections and engagements

Implement request/decline/withdraw and acceptance with explicit terms and a version check. Introduce engagement snapshots, independent completion reports, history, and Safety case creation for disagreement. Implement the selected Need capacity rule atomically. Add participant activity views and in-app notifications.

Acceptance: two participants agree to a specific version of terms; retries and competing acceptances cannot create unintended duplicate engagements. Each can see and submit only their own completion report. Both confirmations and disputes remain distinguishable and audited.

### Increment 4 Persist coordination

Create an idempotent conversation after connection acceptance. Implement participant-authorised message history, client retry keys, delivery/read definitions, pagination and polling. Define retention and staff-access policy. Future live delivery can replace polling without changing conversation ownership.

Acceptance: participants can coordinate across sessions/devices; a third member cannot read or send messages; a retry produces one message. Chat does not silently change agreement or completion state.

### Increment 5 Introduce reciprocal feedback and reputation

Implement review eligibility from both-confirmed completion, role-specific dimension ratings, comments, hidden submission and timed publication. Add deterministic recomputation of dimension averages and counts from eligible published reviews. Define edits, withdrawal, moderation exclusion, dispute reversal and post-cancellation feedback before enabling those paths. Start without a composite trust score.

Acceptance: each eligible participant submits once; neither sees the other's hidden feedback. Publication after both submissions/window expiry updates the appropriate role summary. Missing feedback does not become a negative review. Withdrawal/exclusion recalculates the summary correctly.

### Increment 6 Add feedback photos and private evidence

Provision private object storage, processing jobs and least-privilege access. Implement optional before/after/outcome attachments, explicit visibility, quarantine, actual-format validation, metadata removal, display variants and authorised retrieval. Add image reporting and deletion/orphan cleanup. Build on the review rules from Increment 5; text feedback remains available when images fail.

Acceptance: a participant attaches ready images to their own review; another participant cannot attach or retrieve unauthorised assets. Hidden review images remain hidden. Private case evidence never appears in public reviews. Rejected uploads cannot be served or boost reputation. Withdrawal removes public access before deferred object cleanup.

### Increment 7 Assess the business case

Build internal reports for discovery coverage, marked suitability, acceptance conversion, completion, disagreements, reciprocal feedback, satisfaction, time to connect and repeat use. Validate cohort definitions, observation windows and coverage bias. Establish pilot targets with the project owner after measuring representative activity. Analytics capture begins in earlier increments; the reporting layer follows once real outcomes exist.

Acceptance: known pilot fixtures produce reproducible metric counts. Retries, demo records, cancellations, unilateral completion and missing feedback do not inflate successful outcomes. A dashboard can explain each numerator and denominator.

## Verification and rollout

Use domain tests for transition rules, eligibility and review publication. Use SQL Server integration tests for concurrency, uniqueness, decimal money fields, transactions and outbox behaviour. Use API tests for ownership/participant/staff access, including private media references. Add focused frontend journey tests for connection, separate confirmations, hidden reviews and image failures. These are future implementation checks; this documentation change does not execute them.

Apply additive migrations, backfill explicitly, and introduce each capability behind configuration until its API, UI, safety process and operational jobs are ready. Observe worker failures and outbox lag. Avoid assigning fabricated feedback to existing reputation fields; migrate them as legacy values excluded from new review-derived indicators until their provenance is defined. Separate or rename the existing Match acceptance concept without conflating historical score rows with member agreements.

## Design decision record

| Decision | Status | Reason |
|---|---|---|
| Business milestones cover suitability, acceptance, completion and feedback | Agreed direction | Success has several stages |
| Both participants provide feedback | Agreed direction | Assess experience in each role |
| Completion is independently reported by both participants | Agreed direction | Preserve unilateral and disputed outcomes |
| Feedback supports optional product/service photos | Agreed direction | Provide context for the delivered outcome |
| Modular monolith on existing stack | Proposed | Introduce business ownership without new deployment complexity |
| Accepted request creates agreement snapshot | Proposed | Later listing edits cannot alter accepted terms |
| Role-specific reputation, composite score deferred | Proposed | Make evidence understandable before choosing weights |
| Private media with explicit publication access | Proposed | Support hidden feedback and private case evidence |
| Durable outbox for downstream work | Proposed | Recover notifications, projections and jobs after failure |

Update this record when policy decisions are made. Revise the existing requirements/architecture/implementation documents when the corresponding release scope is adopted, preserving their version history.
