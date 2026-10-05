# S0 login, refresh and account isolation — 1 October 2026 (Pacific/Auckland)

Source: current workspace chat, human request: "Finish implementing Real Cognito login/refresh and account isolation changes in S0". This authorises product implementation, not canonical document updates or AWS deployment.

## Local implementation

The existing Cognito password login and memory-only shared refresh flow are retained. Permanent refresh rejection or missing refresh token invalidates the session and notifies the application to clear profile, needs, offerings, messages, selected detail, matches, filters and dialogs, then return to login. Transient refresh failures block requests and permit retry. API requests capture the authentication generation before awaiting a token, reject dispatch after an account change, and discard stale responses. A current-token 401 invalidates the local session; an old token or old account's 401 cannot clear a refreshed or newer session. A 403 does not sign out. Writes are never automatically replayed.

The ignored frontend .env.local now uses the existing Vite /api proxy to localhost:5247; its former Cognito issuer URL was incorrectly used as the Connecto API base URL. This local configuration correction adds no product scope. Backend issuer/client configuration is separate.

## Verification

- Full frontend suite: 40 passed, 0 failed. Transport tests use mocked Cognito/API responses and exercise concurrency, stale login/refresh, failed account switch, session expiry notification, malformed token results, request dispatch and late-response isolation, current versus stale 401, and no write replay.
- ESLint: passed.
- Production Vite build: passed after implementation edits. Subsequent changes were tests and supporting documentation only.
- Workspace identity-flow contract: 1 passed; declared Terraform public client permits password and refresh flows and has no client secret.
- Earlier read-only live checks in this chat: configured pool's public OIDC discovery issuer matched and JWKS contained two signing keys; one nonexistent-address login diagnostic returned NotAuthorizedException/incorrect credentials rather than a disabled-flow error. These do not verify a real member session.

AWS credentials were unavailable for describe-user-pool-client. No real account credentials were supplied to this task. Real registration/confirmation/login/refresh, two-account browser isolation, SQL Server persistence/concurrency, deployed API HTTPS and migration recovery remain outstanding acceptance gates. Mocked tests and a successful build do not close S0 staging acceptance. No AWS resources, canonical Word documents, Git commits or remote branches changed by this task.

## Live acceptance procedure

1. Verify the actual public client belongs to the expected pool, permits password and refresh flows, has no client secret, and has refresh rotation disabled. Confirm backend issuer/client and database migrations separately.
2. Restart Vite after the local environment correction. Register and confirm two test accounts using the application's real Cognito flow. Log in as A and create identifiable test data through the API.
3. Verify near-expiry API calls refresh successfully; simultaneous calls should produce one refresh request. Test transient network failure and recovery without replaying writes.
4. Delay A's profile/activity/match response, log out and log in as B, then release the old response. A's private records must never appear under B. A late 401 must not sign B out. Repeat switching to local preview and reloading.
5. Reject the current refresh token or current access token in a controlled test. The application must clear private data and return to login. A forbidden resource (403) must preserve the session. A previously dispatched write may still complete under A and must not be blindly repeated.

Canonical impact is an addendum to pending DCR-2026-10-01-011, not a duplicate proposal. Approval and publication remain separate.
