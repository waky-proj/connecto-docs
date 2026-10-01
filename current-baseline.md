# Connecto current delivery baseline

Established 1 October 2026 by the user's instruction in Add project documents to docs to summarise the latest change as the baseline until business requirements are revised or changed.

Publication of this baseline summary was explicitly approved in the same chat on 1 October 2026: "approve and commit changes of the docs into github". It supplements the published version 2.0 snapshot without changing canonical Word versions or authorising a merge into main.

## Authority and duration

The four canonical Word documents at version 2.0, consolidated under DCR-2026-10-01-008, form the current requirements, architecture, delivery and technology baseline. Published snapshot: commit 83f0f12719821ff3b125d55db7cb8eac7bba2f05 on docs/consolidated-dcr-008-v2 in https://github.com/waky-proj/connecto-docs. This branch has not been merged into main.

Use this baseline when assessing subsequent product, code, testing, architecture and documentation changes. An approved business-requirements revision replaces or amends it; until then, new discussions and designs do not silently expand scope or override the documented requirements. Record future changes against the baseline and use the existing DCR approval process. Implementation progress can update delivered status without redefining business scope. This summary does not approve unresolved policies or infrastructure deployment.

## Product scope

The foundation POC covers authenticated profiles, durable listings and activity, valid listing terms, real discovery and explainable multidimensional matching. Configurable factor weights and demonstrated interpretation of related wording are acceptance requirements; parsing alone does not prove semantic matching.

The expanded domain MVP continues through connection requests, acceptance of explicit terms, persistent coordination, independent completion reports, reciprocal feedback and optional outcome photos. Safety operations and cohort-based business measurement accompany that journey. Completed and satisfied outcomes are distinct; requester and provider reputation remain distinguishable.

Payments, escrow, logistics, subscriptions, complex bidding, professional certification and a composite trust score remain outside scope. Capacity, cancellation, review windows, retention, eligible categories and ages, image visibility and support staffing need explicit decisions before dependent release.

## Architecture and repositories

Retain React/JavaScript, the ASP.NET Core host and SQL Server for initial delivery, with explicit domain ownership. Connections and Engagements remain together initially so acceptance and capacity can use a constrained transaction. Staged microservices behind a stable App API/BFF are the longer-term target, with extraction gated on operational benefit, contracts, permissions and recovery.

Ten domains: Members, Listings, Discovery, Connections, Engagements, Conversations, Feedback and Reputation, Media, Trust and Safety, and Business Measurement. Notifications and optional AI parsing are supporting capabilities. Each extracted service owns its writes, credentials and migrations; workload authority and member authority are separate. Distributed acceptance requires durable coordination, finalisation acknowledgement, idempotency and recovery.

Sixteen local Git repositories and README guides exist. The app/API contain implementation; the remaining repository scaffolds do not establish working or deployed services. Existing infrastructure ownership and Terraform state must be preserved during migration.

## Delivered status and remaining work

Implemented locally: Cognito token validation and owned listing creation, need matching, allowlisted persistent profile PATCH, paginated member-only activity reads, UI profile/activity integration, session-memory private state and stale-response guards for account switching and logout.

Recorded implementation verification: 21 backend tests and 22 frontend tests, lint and production build passed. Backend API tests use EF InMemory; browser, actual SQL Server and AWS staging acceptance remain outstanding. These counts are historical evidence, not a permanent guarantee of release readiness.

Still incomplete: Cognito frontend/IaC flow alignment, real staging HTTPS and migration recovery checks, optional AI startup, listing terms/lifecycle improvements, real discovery and offering detail, configured scoring, semantic matching, and later connections, agreements, messaging, reviews, media and safety operations. The parser currently returns a fixed design-category placeholder without calling a model.

## Delivery and release controls

S0 to S3 deliver the foundation: identity/release safety, persistent profile/activity, listing validation/lifecycle, and discovery/configurable semantic matching. S4 to S11 extend safety/durable effects, requests, acceptance, coordination, independent outcomes, feedback, optional photos and pilot evaluation. Initial S0/S1 code does not close their staging gates.

Each slice includes persistence, authorised API, UI states and acceptance evidence. Gates cover negative tokens, cross-member access, actual SQL concurrency, duplicate events, hidden feedback/media, semantic fixtures, performance, failed migrations, backup restoration and credential rotation. Documented numerical engineering gates are criteria requiring execution; they are not claimed results or marketplace success targets.

Before real interactions, approve category/age boundaries, bilateral conduct, payment boundaries, location/evidence privacy, safety ownership, support coverage, serious-incident handling and appeals. Reporting remains available for cancelled, incomplete and disputed engagements. Ratings and identity checks do not guarantee safety, competence or payment protection.

## Change and publication control

Future canonical-document edits require a concrete DCR and explicit human approval, archival of affected originals, version increments and preserved history. Resolve conflicts against the latest verified implementation and adopted design while retaining historical context. A scope change must be identified explicitly rather than inferred from code or a brainstorm.

After updates, summarise the batch in Add project documents to docs. Follow the user's approval instructions for branch creation and require explicit approval before commit/push. Existing published baseline does not authorise subsequent publications. Word XML, history and replacement hashes passed for version 2.0; visual page verification remains unavailable because the renderer could not locate soffice.exe.
