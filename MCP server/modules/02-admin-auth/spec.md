# Admin Auth

## Purpose
Provides a middleware that identifies the admin through a static API key, so only the admin can delete products.

## Owner
Dev 1

## Scope
### In scope
- Express middleware `requireAdmin`
- Comparing the `x-api-key` header with `ADMIN_API_KEY`

### Out of scope
- User accounts, login, roles beyond admin
- Any auth on create/read/update

## Requirements covered
- FR-7: "Admin is identified by a static API key/token; other operations need no key."
- FR-6: "Delete product: allowed only for the admin." (auth rule; the route is in module 03)

## Functional specification
- Reads header `x-api-key`.
- If it equals env `ADMIN_API_KEY`, call next.
- Otherwise respond 401 with `{ "error": "..." }`.
- If `ADMIN_API_KEY` is not set, all protected requests are rejected (401).

## Interfaces
### Exposes
- `requireAdmin` middleware.
### Consumes
- Env `ADMIN_API_KEY` (from module 01 config).

## Data
None.

## Non-functional requirements
None specified.

## Dependencies
- 01 (config/app).

## Acceptance criteria
Not in scope (user decision). Working criteria: protected route returns 401 without or with a wrong key, and passes with the correct key.

## Decisions
- Header name `x-api-key`, status 401, and rejecting when the key is unset: delegated to Claude by user.

## Open questions
None.
