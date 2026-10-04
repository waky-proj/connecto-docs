# F3 local SQL Server acceptance — 3 October 2026 (Pacific/Auckland)

Source: Connecto implementation continuation, user request “yes, sound good, let's start”, followed by “continue”. This record covers local validation of the existing S1 profile and activity implementation. It is not browser, Cognito, staging or deployment acceptance.

## Environment and execution

- Windows SQL Server LocalDB instance `(localdb)\MSSQLLocalDB`; dedicated database `ConnectoF3Acceptance_20261003` created for this run. Existing `ConnectoDB` was not used or modified by these commands.
- Applied the current three EF migrations with the existing `Connecto.Database` runner. The initial interrupted migration attempt left an empty schema; the subsequent run exited successfully.
- Ran `dotnet test Connecto.Tests.Unit/Connecto.Tests.Unit.csproj --configuration F3Acceptance --filter 'Category=SqlServerAcceptance' --verbosity minimal` with the dedicated integrated-security connection and the test's explicit write gate. Result: **1 passed, 0 failed, 0 skipped**. Earlier, without the F3 environment variables, the same test compiled and reported 1 skipped; that skip is not acceptance evidence.
- Read-only post-run SQL check found **0** users with the test's `f3-a-` or `f3-b-` subject prefixes and **3** entries in `__EFMigrationsHistory`. The dedicated database remains available for repeat testing.

The SQL test covers persistence across a new API host, the profile field limits and allowlist, separate A/B subjects, own activity pagination and totals, B isolation, denied cross-owner match routes, and anonymous self-profile denial. It uses locally signed test access tokens and an in-process API host, not Cognito or a browser. Migration output warned that Offering.ReputationScore has no explicit SQL precision; this run did not change that schema.

## Other checks and open gates

- Frontend `node --test`: **44 passed, 0 failed**. Direct Vite production build passed. The repository's npm launcher points to a missing `npm-cli.js`, so direct Node entrypoints were used.
- The F3 browser script passed `node --check`. Initial lint found that the ESLint globals rule omitted `.mjs`; extending it to `.mjs` made the full lint pass. The browser script was tightened to wait for a successful activity refresh before checking B isolation.
- No F3 browser environment variables or confirmed test-account credentials were available in this task. Playwright was not installed in the frontend checkout. The browser journey was **not run**. Real Cognito sign-in/refresh, fresh-context A/B retrieval, delayed-session races, retry journeys, staging HTTPS and migration recovery remain open.

## Documentation impact

This is local acceptance evidence within the approved S1 scope. It supports the `S1-3` checkpoint for real SQL Server persistence and ownership. It does not close S0/S1 release acceptance or change business scope, architecture, policy or release commitments. Canonical-document implementation status should distinguish this local SQL result from the remaining real-browser and staging gates; no GitHub publication is authorised by this evidence.
