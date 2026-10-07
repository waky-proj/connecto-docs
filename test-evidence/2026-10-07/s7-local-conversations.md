# S7 local conversation implementation evidence

7 October 2026, Pacific/Auckland. This records local implementation and tests, not release acceptance.

## Implemented

- The accepted Engagement is the conversation boundary. API history, send and receipt operations query the signed-in member against its requester/provider IDs. An unrelated account receives 404.
- SQL identity message IDs provide cursor ordering. History supports latest, before and after pages. The unique engagement/sender/client-key index protects duplicate sends; same-key/same-text retries return one saved message and a changed body conflicts.
- Participant receipt rows hold monotonic delivered/read cursors. The API checks cursor membership in the conversation. Current member blocks prevent new sends. Messaging does not mutate agreement terms or completion state.
- The signed-in inbox opens a saved agreement conversation. Chat loads and polls server history, loads older messages, acknowledges visible messages and keeps a retry key after an uncertain send. Demo conversation state remains session-only and separate.

## Local verification

- `dotnet test Connecto.Tests.Unit/Connecto.Tests.Unit.csproj --no-build -m:1 -v:q`: 44 passed, 2 skipped. The S7 API test covers outsider denial, fresh-client history, ordered before/after cursors, one-row retry, changed-body conflict, monotonic receipts and unchanged terms. These tests use EF InMemory and synthetic JWTs.
- `npm test`: 51 passed. The new API client test checks authenticated agreement-scoped routes, cursors, retry key and receipt payloads. Existing composition/render tests passed.
- `npm run lint` passed with no errors; `npm run build` passed. Vite/test rendering initially hit sandbox `EPERM` on OneDrive files and passed when rerun outside the sandbox. The backend test host initially timed out in the sandbox and passed outside it.
- AddConversations EF migration generated. It has **not** been applied to SQL Server. No SQL connection or opt-in write gate was available in this session.

## Open release checks

Apply and verify migration on a disposable SQL Server; test concurrent same-key sends, receipt races and history from a restarted host. Run authenticated requester/provider/outsider journeys on two real browsers or devices, including forbidden access and session switch. Check accessibility, staging transport and deployment. No S7 release acceptance, production capability or deployment is claimed.
