# S10 local media implementation and verification

Date: 9 October 2026 (Pacific/Auckland). Source: this chat, user request to implement and complete S10 optional photos, private quarantine, validation, metadata removal, parent-authorised serving, withdrawal and failure acceptance.

The existing .NET host now stores MediaAsset state in SQL Server and image objects in a configured private S3 bucket. A participant receives a five-minute signed POST to an exact quarantine key and content type, limited by S3 policy to 5 MB. Finalisation reads the quarantined object, detects JPEG/PNG/WebP from its actual bytes, rejects malformed, oversize, multi-frame or over-12-megapixel input, and writes an orientation-corrected, at-most-1600-pixel JPEG display variant without source EXIF or other source metadata. Review attachments are bound to the uploader's accepted Engagement and review; case evidence is bound to a disputed Engagement. Review images remain hidden until the parent review publishes. Case images are visible only to their submitter and configured safety staff, whose reads are audited. Author withdrawal and operator removal deny serving before asynchronous object deletion. Published review photos can be reported. Rejected image upload leaves text review submission available.

Local verification:

- `AddMediaAssets` and `AddMediaAccessAudit` applied with all prior migrations to disposable LocalDB database `ConnectoS10Acceptance_20261009`.
- Full SQL-enabled backend suite: 53 passed, none failed or skipped. The new S10 SQL test used eight concurrent upload grants and observed three allowed and five conflicts, then verified attachment, hidden access, fresh-host publication and withdrawal denial.
- In-memory HTTP acceptance covered outsider denial, invalid MIME, missing/pending image denial, malformed, format-swapped and oversized rejections, EXIF orientation and metadata-free serving, forged attachment denial, hidden review access, reporting, private case access, staff audit and withdrawal.
- Frontend: 54 tests passed, lint clean, production build passed. The new transport test covers signed POST form fields, no bearer token to S3, finalisation only after upload success, and a failed upload without review submission.
- Terraform media file formatted and configuration validation succeeded. It declares a private bucket, encryption, exact-origin POST CORS, quarantine expiry and scoped task role. No Terraform apply or AWS deployment occurred.

Limits: tests use synthetic Cognito tokens and fake object storage. The real S3 signed POST, bucket policy/CORS, IAM attachment to the externally managed API task, two-account browser flow, accessibility, staging migration/recovery, malware/content moderation and release retention policy remain unverified or require a separate operating decision. These local checks do not establish deployed or release-ready S10.
