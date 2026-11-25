# Product API

## Purpose
Implements the REST endpoints for sports product CRUD and search/filter, backed by SQLite.

## Owner
Dev 1

## Scope
### In scope
- Create, get, list, update, delete endpoints
- Filtering on list
- Input validation
- Error responses

### Out of scope
- Auth logic (module 02, used here)
- Pagination, sorting (not requested)
- Tests, docs (user decision)

## Requirements covered
- FR-3: "Create product: allowed for all users."
- FR-4: "Read product(s): allowed for all users."
- FR-5: "Update product: allowed for all users."
- FR-6: "Delete product: allowed only for the admin." (route; uses `requireAdmin`)
- OQ-1 (filter criteria) and OQ-2 (validation), as answered by the user.

## Functional specification
Routes and status codes are defined in `MODULES.md` and must match it.

### Validation (minimal, delegated to Claude by user)
- `name`: required, non-empty string.
- `sku`: required, non-empty string, unique. Duplicate gives 409.
- `price`: required, number >= 0.
- `stock`: optional integer >= 0. Defaults to 0 if omitted on create.
- `category`, `brand`, `sport_type`, `description`: optional strings.
- Unknown fields are ignored.
- Update (`PUT`) accepts any subset of the fields. Provided fields are validated with the same rules, and a SKU change must stay unique.
- Invalid input gives 400 with `{ "error": "..." }`.

### Filtering (user decision)
`GET /products` query params: `sport_type`, `brand`, `category` (exact match), `min_price`, `max_price` (inclusive). Filters combine with AND. No filters returns all products. A non-numeric `min_price`/`max_price` gives 400.

### Other behaviour
- Get/update/delete of a missing id gives 404.
- Delete is protected by `requireAdmin` and returns 204.

## Interfaces
### Exposes
- REST API as in `MODULES.md`.
### Consumes
- DB handle (01), `requireAdmin` (02).

## Data
Uses the `products` table from module 01.

## Non-functional requirements
None specified.

## Dependencies
- 01, 02.

## Acceptance criteria
Not in scope (user decision).

## Decisions
- Filter criteria: sport type, brand, price range, category (user).
- Validation rules, default stock, partial PUT, exact-match filters, status codes: delegated to Claude by user.

## Open questions
None.
