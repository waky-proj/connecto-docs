# S9 local feedback and reputation acceptance

8 October 2026, Pacific/Auckland. Source: this chat, user request to implement all S9 areas and follow-up answers choosing independent reviewer deadlines of 1–30 days. This records local implementation and tests, not deployment or release acceptance.

## Implemented behavior

Only participants in an Engagement with both-confirmed completion can submit one review each, within 30 days of confirmation. The requester rates provider reliability, communication and meeting the agreement; the provider rates requester communication, clarity and honouring commitments. Ratings are 1–5, at least one is required, and unanswered dimensions do not enter averages. Identity, role and reviewee are derived from the agreement. A unique SQL index prevents duplicate participant submissions.

Each reviewer chooses a 1–30 day publication delay measured from both-confirmed completion. Submitted content is visible to its author and hidden from the other participant and reputation reads until both active reviews have been submitted or that review's chosen deadline passes. The other participant's missing review is never converted to a rating. The reviewer can withdraw their review, including after publication; a configured safety operator can exclude a review with a private reason. Withdrawn and excluded reviews cannot be resubmitted and never contribute to reputation. A later disputed state also removes that engagement's reviews from public reputation and reciprocal visibility. Reputation is recomputed from currently eligible published rows on every read, separated by provider/requester role, with per-dimension answer counts and averages, review counts, insufficient-history state and recent public history. Public history omits participant identities and agreement IDs.

The React inbox shows review eligibility, role-specific rating fields, the individual's deadline choice, own submission/withdrawal, reciprocal publication and role-specific reputation. The new additive `AddEngagementReviews` migration follows S8's migrations. This is a local implementation of the user's chosen delay behavior; release policy adoption, editing rules, retention and moderation operations still need product and operational review.

## Verification

- Full backend suite with SQL acceptance enabled against dedicated disposable LocalDB database `ConnectoS9Acceptance_20261008`: 51 passed, zero failed/skipped. All migrations, including `AddEngagementReviews`, applied. Eight concurrent same-review submissions produced one durable row; the seven others conflicted. A fresh API host saw reciprocal publication. Withdrawal removed the review from reputation. The in-memory API acceptance covered role validation, outsider denial, hidden content, individual deadline expiry, submission-window cutoff, reciprocal publication, operator-only exclusion, withdrawal before and after publication, no resubmission, and reputation recalculation.
- Frontend: 53 tests passed, lint clean, production build passed. The authenticated API route test covers review eligibility, submission with a chosen delay, withdrawal and reputation reads. A component composition test passed. Interactive browser and accessibility behavior remain unverified.
- The disposable SQL database was dropped after testing; `DB_ID('ConnectoS9Acceptance_20261008')` returned `NULL`.

## Open gates

Real Cognito multi-account and two-device browser journeys, accessibility, deployed migration/staging, moderation and retention operations, recovery and an approved release review policy remain open. S9 releaseAccepted remains false; no deployment or GitHub publication is claimed.
