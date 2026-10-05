# Connecto domain design

Version 0.2 | 1 October 2026 | Canonical version 2.0 reconciliation

Connecto helps people publish a need, discover relevant offerings, agree to connect, complete the agreed help, and assess the experience. These documents define business ownership, the proposed architecture, and an incremental implementation plan.

- [Business boundaries](business-boundaries.md): responsibilities, vocabulary, rules, and success measures.
- [Architecture and integration](architecture.md): modules, data, interfaces, events, and connected workflows.
- [Implementation plan](implementation.md): current capability, domain increments and their mapping to the detailed delivery slices.
- [POC and MVP delivery plan](poc-mvp-delivery-plan.md): S0–S11 scope, dependencies, testing/security measures and proposed engineering thresholds.
- [Foundation POC progress](foundation-poc-progress.md): locally implemented S0/S1, remaining S0–S3 gates and ordered F1–F10 backlog.
- [Microservices and app integration design](microservices.md): target service ownership, app contracts, distributed acceptance and staged migration. Canonical version 2.0 documents this future target while retaining initial delivery in the current host; the design file's original pending-status wording is historical.
- [Proposal validation, security and repository names](microservices-validation-security-repositories.md): current security findings, app/service and inter-service trust boundaries, release gates, and the proposed repository catalogue.

The agreed direction includes milestone-based business measurement, feedback from both participants, independent completion confirmation, and optional photos of the product or service outcome. Detailed policies and implementation choices below are proposals unless explicitly identified as agreed. This documentation does not implement the proposed features or establish release commitments.

All four canonical documents are version 2.0 under applied DCR-2026-10-01-008, consolidating source proposals 002–007. They distinguish foundation POC from expanded domain MVP and current single-host delivery from later service extraction. Version 1.0 exclusions remain historical traceability. Payments, escrow, subscriptions and delivery logistics remain outside scope; capacity, cancellation, review, retention, visibility, category/age and staffing values remain release decisions. Numeric engineering gates remain proposed. Local implementation is not staging or pilot acceptance.

The initial profile/activity/session slice is locally implemented. Additional repositories exist as guides/scaffolds; they do not establish deployed services. Older design files are source history and may retain pending-approval language; use canonical version 2.0 and the reconciled delivery/progress files for current status.

## Source baseline

Current-state statements were checked against the four canonical version 2.0 documents, document-change-register.md, repository-inventory.md and local API/profile/activity/session/parser/scoring source. Local code establishes implementation status; diagrams describe future structure. The earlier domain architecture version 0.1 describes initial modular delivery and must be read with the canonical staged-target/extraction sections.

## Decisions to resolve

| Decision | Proposed starting position | Needed before |
|---|---|---|
| Currency and price units | Explicit currency plus hourly, fixed total, free, or negotiable terms; never infer units | Listing contract extension |
| Categories and skills | Managed vocabulary owned by Listings | Persistent discovery |
| Need capacity | One active engagement per Need initially; provider may have multiple engagements | Acceptance workflow |
| Completion disagreement | Preserve both reports; open a dispute rather than overwrite either participant | Engagement workflow |
| Feedback eligibility | Both-confirmed completion opens standard feedback; disputed and cancelled outcomes follow a separate policy | Feedback release |
| Review publication | Publish after both submit or a configurable window expires | Feedback release |
| Image visibility | Public review photo or private dispute evidence; explicit choice before submission | Media release |
| Reputation formula | Separate role-based dimension averages and review counts; overall trust score deferred | Reputation release |
| Retention and deletion | Define periods for messages, images, disputes, and activity; support withdrawal from public display | Production messaging/media |
| Safety operations | Define who reviews reports and how quickly | Production interaction features |

Keep unresolved durations, thresholds, retention periods, and score weights configurable once approved. No numeric business targets are assumed.
