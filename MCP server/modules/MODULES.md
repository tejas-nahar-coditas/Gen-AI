# Modules Overview

Source: `../requirement.md`. Stack: Node.js + Express, SQLite, TypeScript, MCP streamable HTTP. Tests and docs are out of scope (user decision).

## Developers
1 developer (generalist). Owns all modules.

## Module table

| # | Module | Responsibility | Owner | Depends on | Size |
|---|---|---|---|---|---|
| 01 | `01-backend-foundation` | Project setup, SQLite connection, products table, config | Dev 1 | none | S |
| 02 | `02-admin-auth` | Static API key middleware for admin-only routes | Dev 1 | 01 | S |
| 03 | `03-product-api` | REST CRUD + search/filter endpoints | Dev 1 | 01, 02 | M |
| 04 | `04-mcp-server` | Streamable HTTP MCP server calling the REST API | Dev 1 | 03 (contract) | M |

## Build order
01 -> 02 -> 03 -> 04. Module 04 can start early against the REST contract below.

## Requirement traceability
| Requirement | Module |
|---|---|
| FR-1, FR-2 | 01 |
| FR-7, FR-6 (auth rule) | 02 |
| FR-3, FR-4, FR-5, FR-6 (delete route) | 03 |
| FR-8, FR-9, FR-10, FR-11 | 04 |
| OQ-1 (search criteria) | 03, 04 |
| OQ-2 (validation) | 03 |
| OQ-3 (acceptance criteria) | Not in scope (user) |

## Shared contracts

### Product JSON
```json
{
  "id": 1,
  "name": "string (required)",
  "sku": "string (required, unique)",
  "price": 0,
  "stock": 0,
  "category": "string | null",
  "brand": "string | null",
  "sport_type": "string | null",
  "description": "string | null"
}
```
`id` is server-generated.

### REST routes
| Method | Path | Auth | Success | Errors |
|---|---|---|---|---|
| POST | `/products` | none | 201 + product | 400 validation, 409 duplicate SKU |
| GET | `/products` | none | 200 + array | 400 invalid filter |
| GET | `/products/:id` | none | 200 + product | 404 |
| PUT | `/products/:id` | none | 200 + product | 400, 404, 409 |
| DELETE | `/products/:id` | admin | 204 | 401 missing/invalid key, 404 |

Filters on `GET /products` (query params, combined with AND): `sport_type`, `brand`, `category` (exact match), `min_price`, `max_price` (inclusive).

Error body: `{ "error": "message" }`.

### Admin auth
Header `x-api-key: <key>`. Backend reads the expected key from env `ADMIN_API_KEY`. MCP server reads the same key from its own env `ADMIN_API_KEY` and sends it only on delete.

### MCP -> backend
MCP server reads backend base URL from env `BACKEND_URL`.
