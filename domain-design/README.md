# Connecto domain design

Version 0.1 | 1 October 2026 | Initial design baseline

Connecto helps people publish a need, discover relevant offerings, agree to connect, complete the agreed help, and assess the experience. These documents define business ownership, the proposed architecture, and an incremental implementation plan.

- [Business boundaries](business-boundaries.md): responsibilities, vocabulary, rules, and success measures.
- [Architecture and integration](architecture.md): modules, data, interfaces, events, and connected workflows.
- [Implementation plan](implementation.md): current capability, implementation approach for each module, delivery sequence, and acceptance evidence.

The agreed direction includes milestone-based business measurement, feedback from both participants, independent completion confirmation, and optional photos of the product or service outcome. Detailed policies and implementation choices below are proposals unless explicitly identified as agreed. This documentation does not implement the proposed features or establish release commitments.

The existing business requirements version 1.0 excludes service fulfilment, verification, and moderation from its baseline. This design expands the intended future scope to include engagements, feedback, media, and safety. The earlier baseline remains historical; this plan should inform its next revision. Payments, escrow, subscriptions, and delivery logistics remain outside the proposed initial scope.

## Source baseline

Current-state statements were checked against `connecto-api/Connecto.Domain/Entities`, application services and calculators, API controllers and startup, `Connecto.Infrastructure/Services/Data/ConnectoDbContext.cs`, the frontend README, `docs/continuation.md`, and the existing business requirements and architectural specification documents. Local code establishes implementation status; diagrams describe the proposed target.

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
