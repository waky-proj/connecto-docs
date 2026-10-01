# Connecto business boundaries

Version 0.1 | 1 October 2026

The core business outcome is a useful connection that results in agreed help. Connecto measures finding a suitable offering, mutual agreement, completion, and satisfaction as separate milestones. A member can act as requester and provider across different interactions.

## Vocabulary and product boundary

| Term | Meaning |
|---|---|
| Member | A person with a Connecto profile mapped to an authenticated identity |
| Need | A published description of help sought |
| Offering | A published description of help or capability available |
| Recommendation | A ranked candidate Offering for a Need; creates no commitment |
| Connection request | A request between a requester and provider to proceed |
| Engagement | A mutually agreed instance of help with recorded terms |
| Completion report | One participant's statement about the engagement outcome |
| Feedback | One participant's assessment of the other participant in that engagement |
| Reputation | Derived indicators based on eligible published feedback |
| Dispute | A recorded disagreement requiring resolution; distinct from a poor review |

Connecto owns publication, discovery, connection, recorded agreement, outcome confirmation, and feedback. The proposed initial scope does not collect payments, hold funds, guarantee service quality, operate delivery logistics, or certify professional qualifications. A stored price is an agreed term, not a payment transaction.

## Domain ownership

| Domain | Owns | Consumes | Does not own |
|---|---|---|---|
| Members and profiles | Profile, preferences, internal member identity mapping | Cognito subject; safety restrictions for permitted actions | Passwords, listing content, reputation calculation |
| Listings | Needs, Offerings, publication states, skills/categories, pricing basis, indicative availability | Member identity and action restrictions | Ranking, acceptance, time reservations, completion |
| Discovery and matching | Search, candidate eligibility, scoring, explanations | Published listings, reputation summaries, block/restriction decisions | Editing listings, agreeing work, awarding trust |
| Connections | Requests, invitations, acceptance, rejection, withdrawal | Listing eligibility, member permissions, proposed terms | Messages, work progress, reviews |
| Engagements | Participants, accepted terms, progress, cancellation, independent completion reports | Accepted connection, applicable restrictions | Rankings, payment, public review content, dispute adjudication |
| Conversations | Conversation membership, messages, delivery/read state | Accepted participants, restrictions | Agreement acceptance or completion through inferred message content |
| Feedback and reputation | Role-specific ratings, comments, review publication, attachment references, reputation projections | Engagement eligibility, media readiness, moderation decisions | Image bytes, identity verification, dispute resolution |
| Media | Asset metadata, upload processing, storage, authorised delivery, deletion | Parent-resource permission and visibility policies | Feedback score, completion status, moderation judgement |
| Trust and safety | Blocks, reports, moderation cases, restrictions, dispute decisions, verification evidence if added | Reported resource references and relevant private evidence | Authoring member reviews or silently editing agreed terms |
| Business measurement | Journey events, metric definitions, aggregated conversion/outcome reports | Events from operational domains | Changing operational states or member trust ratings |

AI listing parsing and notifications are supporting capabilities. Parsing returns a proposal for Listings to validate after user confirmation. Notifications communicate recorded changes without deciding those changes.

## Domain rules

### Members and profiles

Use one member identity for both roles. Authentication is supplied by Cognito; profile operations use the internal member ID derived from its verified subject. Public profile responses exclude email, street address, authentication subject, and private preferences. Verification evidence, when introduced, belongs to Trust and safety. Email confirmation does not establish verified service competence.

### Listings

Keep Need and Offering as separate aggregates within one Listings module initially. Only the owner changes listing content. Publishing validates supported taxonomy, monetary ranges and currency/basis, date ordering, and remote/location compatibility. Indicative availability does not reserve a slot. Draft, published, paused, and closed states are proposed; migrate existing statuses explicitly rather than reinterpret them silently.

The proposed one-engagement-per-Need rule is a capacity decision, not a restriction on receiving several requests. Closing an Offering prevents new connections but preserves existing engagements. Accepted terms are copied into the engagement so later listing edits cannot rewrite an agreement.

### Discovery and matching

Exclude ineligible candidates before ranking: inactive listings, self-matches, prohibited interactions, and unmet hard requirements under the chosen policy. Score soft preferences only among eligible candidates. Unknown values remain unknown rather than become a misleading zero or assumed fit. Missing reputation must not be presented as evidence of untrustworthiness.

Require compatible currency and pricing basis before numeric budget comparison; an hourly price requires an agreed estimation method or sufficient hours data. Return understandable reasons and the scoring policy version. Recheck eligibility on acceptance because a recommendation can become stale.

### Connections

A recommendation has no accepted/rejected lifecycle. A participant explicitly requests a connection and the recipient accepts or declines it. Derive sender identity from authentication and recipient identity from the Offering. Prevent self-requests and unintended duplicate active requests. Acceptance records the agreed terms and creates exactly one engagement for that accepted request. Subsequent acceptance retries return the same outcome.

### Engagements

Store requester and provider completion reports independently, including reporter, timestamp, and revision history. Completion confirmation is derived from both reports; a photo upload or message never substitutes for a report.

| Reports | Completion confirmation |
|---|---|
| Neither reports completion | Awaiting confirmation |
| One reports completion and the other has not responded | One confirmed |
| Both report completion | Both confirmed |
| A participant contests the reported outcome | Disputed |

Keep work progress (agreed/in progress/cancelled/closed) separate from this confirmation state and from satisfaction ratings. Preserve reports when a dispute opens or resolves. Cancellation is explicit, records who requested it and why, and follows an agreed mutual/unilateral policy. A unilateral confirmation does not become both-confirmed after a timeout.

### Conversations

Initially open one conversation per accepted connection, shared with its engagement. Only participants access messages; any moderator access is explicit, limited, and audited. Record sent/delivered/read separately and define what each means. Changing terms requires an explicit engagement command and approval, even if discussed in chat.

### Feedback and reputation

Allow one review per participant per engagement, with the participant's requester/provider role captured at the time. Both-confirmed completion opens standard review submission under the proposed initial policy. Preserve disputed and cancelled outcomes for safety reporting and measurement; their review eligibility needs a separate product decision.

Requester dimensions: provider reliability, communication, and meeting the agreement. Provider dimensions: requester communication, clarity of expectations, and honouring commitments. The initial scale is proposed as 1–5, with unanswered dimensions excluded from the average. Keep any overall satisfaction question separate from these dimensions.

Hide submitted review content from the other participant until both reviews are ready for publication or the review window expires. The window starts at eligibility; one missing review never becomes a negative rating. Clarify editing and withdrawal policy before release. Show dimension averages, review counts, and history by role; new members show insufficient history. Overall trust weights are deferred.

Only published, eligible, non-excluded reviews contribute to reputation. Moderation removal or withdrawal triggers recalculation. Participants cannot rate themselves or submit for another member. Reviews and identity verification remain separate evidence. Review-image counts do not contribute to trust.

### Media and safety

Photos are optional supporting evidence of the delivered product or service outcome, including before/after views. Attach them only to a review or case belonging to the uploader's engagement. Public review photos and private dispute evidence use distinct access policies; changing visibility requires an explicit operation and renewed checks.

Upload success does not imply completion, proof of authenticity, moderation approval, or increased trust. Do not describe images as verified evidence without an actual verification process. Keep sensitive location metadata out of served images. Reports can concern personal information, inappropriate content, misleading evidence, or abuse. Private evidence is limited to its submitter and authorised case staff; access by the other participant follows an explicit case policy.

## Business success measures

| Measure | Definition | Interpretation |
|---|---|---|
| Discovery coverage | Published Needs receiving at least one eligible recommendation / eligible published Needs in a defined cohort | Marketplace supply fit |
| Perceived suitability | Needs whose requester explicitly marks an offering suitable / Needs with viewed recommendations in that cohort | Ranking usefulness; requires a product action |
| Connection conversion | Needs reaching an accepted connection / published Needs in a defined cohort | Actionable connections |
| Completion rate | Both-confirmed engagements / accepted engagements with a defined observation period | Delivered outcomes |
| Confirmation disagreement | Engagements reaching dispute / accepted engagements in the cohort | Outcome uncertainty |
| Feedback participation | Reviews submitted / eligible participant review opportunities | Coverage of reputation evidence |
| Bilateral satisfaction | Both-reviewed engagements where each meets an agreed satisfaction criterion / both-reviewed engagements | Shared satisfaction; report review coverage alongside |
| Time to connect | Time from publication to first accepted connection, reporting unconverted Needs separately | Friction and marketplace responsiveness |
| Repeat use | Members returning to publish or accept within an agreed period / relevant member cohort | Continuing value |

Do not equate match retrieval with finding a suitable provider, acceptance with completion, or completion with satisfaction. Use event timestamps, defined cohorts, observation windows, and deduplication. Report pending, cancelled, one-confirmed, and disputed engagements separately to avoid hiding them. Track demo usage separately from real marketplace activity. Set targets after a representative pilot; these measures do not determine a member's reputation.
