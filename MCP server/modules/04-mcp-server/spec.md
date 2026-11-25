# MCP Server

## Purpose
An MCP server, using streamable HTTP transport, that lets Claude manage sports products by calling the backend REST API.

## Owner
Dev 1

## Scope
### In scope
- MCP server with streamable HTTP transport
- Tools: create, get, list, update, delete product, and search/filter
- REST client to the backend
- Admin key from environment

### Out of scope
- Direct DB access (forbidden by FR-9)
- Tests, docs (user decision)

## Requirements covered
- FR-8: "The MCP server uses streamable HTTP transport."
- FR-9: "The MCP server calls the backend's REST API (it does not access the DB directly)."
- FR-10: "The admin API key for delete is supplied to the MCP server via its environment configuration."
- FR-11: "MCP tools exposed: create, get, list, update, delete product, plus search/filter."

## Functional specification
Tools (names indicative; final naming at implementation):
- `create_product` -> `POST /products`
- `get_product` (id) -> `GET /products/:id`
- `list_products` -> `GET /products`
- `update_product` (id + any fields) -> `PUT /products/:id`
- `delete_product` (id) -> `DELETE /products/:id`, sends `x-api-key` from env `ADMIN_API_KEY`
- `search_products` -> `GET /products` with `sport_type`, `brand`, `category`, `min_price`, `max_price`
- Backend errors (400, 401, 404, 409) are returned to Claude as tool errors containing the backend's `error` message.
- Backend URL comes from env `BACKEND_URL`.

## Interfaces
### Exposes
- MCP streamable HTTP endpoint and the tools above.
### Consumes
- Backend REST API per `MODULES.md`.

## Data
None owned.

## Non-functional requirements
None specified.

## Dependencies
- 03 (REST contract; the running backend is needed for end-to-end use).

## Acceptance criteria
Not in scope (user decision).

## Decisions
- Search criteria: sport type, brand, price range, category (user).
- Env var names `BACKEND_URL` and `ADMIN_API_KEY`, and the tool names: delegated to Claude by user.

## Open questions
None. Port and MCP endpoint path are "None specified"; set at implementation time.
