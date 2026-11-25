# Backend Foundation

## Purpose
Sets up the Node.js + Express + TypeScript backend skeleton, the SQLite database connection, and the products table. Other backend modules build on it.

## Owner
Dev 1

## Scope
### In scope
- TypeScript project setup for the backend
- Express app bootstrap
- SQLite connection and `products` table creation
- Config loading from environment

### Out of scope
- Routes and business logic (module 03)
- Auth (module 02)
- Tests, docs (user decision)

## Requirements covered
- FR-1: "Backend is built with Node.js + Express and stores data in SQLite."
- FR-2: "A product has these fields: name, category, price, stock, brand, sport type, description, SKU."

## Functional specification
- App starts an Express server with JSON body parsing.
- On startup, the `products` table is created if it does not exist.
- Exposes a DB access object and the Express app for use by modules 02 and 03.
- Reads `ADMIN_API_KEY` from env (consumed by module 02).

## Interfaces
### Exposes
- Express app instance, DB handle.
### Consumes
- Environment variables.

## Data
Table `products`:
- `id` INTEGER primary key, auto-generated
- `name` TEXT NOT NULL
- `sku` TEXT NOT NULL UNIQUE
- `price` REAL NOT NULL
- `stock` INTEGER NOT NULL
- `category`, `brand`, `sport_type`, `description` TEXT, nullable

## Non-functional requirements
None specified.

## Dependencies
None.

## Acceptance criteria
Not in scope (user decision). Working criteria: the server starts and the `products` table exists with the columns above.

## Decisions
- Language: TypeScript (user).
- Column types and the UNIQUE constraint on `sku`: delegated to Claude by user (validation was delegated).

## Open questions
None. Port number and DB file path are "None specified"; choose via env at implementation time.
