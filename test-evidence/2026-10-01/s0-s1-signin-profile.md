# S0–S1 sign-in and profile continuation — 1 October 2026 (Pacific/Auckland)

Source: current workspace chat, human request "continue implement S0-S1 sign in and profile changes". Product implementation is authorised; canonical document edits and deployment are not.

## Implemented locally

- Entering welcome, login or registration clears the application's identity and private session state. Pending Cognito login/profile/activity results are invalidated, so leaving sign-in cannot later reopen the previous account.
- After authenticated profile retrieval, missing first name or neighborhood opens the profile page and editor with empty authoritative values. The prompt is dismissible and does not add an eligibility policy or infer profile details from an unverified claim.
- Signed-in profile editing uses first name and last name separately, preserving multiword names. The display name includes an existing middle name without altering it. The form matches API limits: 200 characters for first name, last name and city, 2000 for bio. Editable payloads contain only those four allowlisted fields.
- Whitespace-only required first name/neighborhood and overlong values are rejected before PATCH. Optional last name and bio can be cleared. Failed saves leave form values visible and show an error inside the modal. Saving disables its fields and has a loading state independent of background activity reads.
- Empty real profiles display neutral prompts instead of fabricated names, neighborhoods or biography. Preview edits remain in session memory. Registration's minimum password hint now matches the declared 12-character Terraform policy; Cognito remains authoritative for the actual policy.
- No production backend endpoint/schema changed. The existing allowlisted PATCH and subject-owned retrieval were retained; backend regression coverage was expanded.

## Verification

- Frontend: 44 tests passed, 0 failed; ESLint passed; Vite production build passed.
- Server-rendered component checks verify empty-profile presentation, separate prefilled name fields, disabled save fields and inline errors. These are not a live browser test.
- Profile model checks cover multiword names, allowlisted payloads, required whitespace validation, contract lengths, clearing optional fields, empty authoritative data and setup prompting.
- Backend: 28 tests passed, 0 failed. New coverage retrieves exact saved profile values through a fresh HTTP client, verifies edits by member B leave A unchanged, confirms subject IDs remain absent from the self-profile projection, and checks every oversized profile field returns 400 without mutating saved data.
- The initial sandbox backend run failed from Windows Event Log/data-protection permission errors. The same compiled suite passed outside the sandbox after approval. Existing nullable-property compiler warnings remain.
- Frontend/Terraform identity-flow contract: 1 test passed. Both repository diff whitespace checks passed.

Backend integration tests use EF InMemory and signed test JWTs. They do not prove SQL Server durability, real Cognito sessions or two-account browser isolation. Live registration/confirmation/login/refresh, leaving sign-in during a delayed login, failed profile-save retry, fresh browser/device retrieval, actual SQL Server validation/concurrency, deployed HTTPS and migration recovery remain acceptance gates. No AWS apply, live database migration, canonical Word edit, commit, push or deployment was performed.

## Manual acceptance additions

1. Begin real sign-in and leave for welcome or registration while the request is delayed; completing the old request must not sign the member in.
2. Log in to a new member account. Verify blank profile fields and a dismissible setup prompt. Save a multiword first/last name, neighborhood and bio; verify the saved values after a fresh browser login.
3. Simulate a transient PATCH failure: retain input values, display the error inside the dialog and permit retry. Confirm the form is editable while an independent activity read is pending.
4. While an A profile save is pending, log out or enter B's sign-in flow. A's late result/error must not populate B's profile or dialog. Verify B edits cannot change A, using a real SQL Server environment.

Canonical impact is recorded as an S0–S1 extension of pending DCR-2026-10-01-011. Neither this evidence nor the implementation supplies document or release approval.
