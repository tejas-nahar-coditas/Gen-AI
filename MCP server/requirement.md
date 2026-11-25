# Sports Products CRUD Backend with MCP Server

## Overview
A backend that provides CRUD operations for sports products, plus an MCP server built around that backend so it can connect to Claude. This is for practice purposes.

## Goals
- Build a backend for CRUD of sports products.
- Build an MCP server around the backend that connects to Claude.

## Non-Goals / Out of Scope
- Not stated.

## Users / Stakeholders
- Regular users: may create, read, and update products.
- Admin: the only role that may delete products.

## Functional Requirements
- FR-1: Backend is built with Node.js + Express and stores data in SQLite.
- FR-2: A product has these fields: name, category, price, stock, brand, sport type, description, SKU.
- FR-3: Create product: allowed for all users.
- FR-4: Read product(s): allowed for all users.
- FR-5: Update product: allowed for all users.
- FR-6: Delete product: allowed only for the admin.
- FR-7: Admin is identified by a static API key/token; other operations need no key.
- FR-8: The MCP server uses streamable HTTP transport.
- FR-9: The MCP server calls the backend's REST API (it does not access the DB directly).
- FR-10: The admin API key for delete is supplied to the MCP server via its environment configuration.
- FR-11: MCP tools exposed: create, get, list, update, delete product, plus search/filter (criteria not specified yet).

## Non-Functional Requirements
- Not stated.

## Constraints & Dependencies
- Node.js + Express, SQLite, streamable HTTP MCP transport.
- Practice project (no stated production requirements).

## Acceptance Criteria
- Not stated.

## Open Questions
- OQ-1: Search/filter criteria for the MCP search tool (e.g. sport type, brand, price range) were not specified.
- OQ-2: Validation rules for product fields (required fields, types, SKU uniqueness) were not discussed.
- OQ-3: Acceptance criteria and success measures were not discussed.
