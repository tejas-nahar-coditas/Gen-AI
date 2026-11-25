import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { config } from "./config.js";

if (config.dbPath !== ":memory:") {
  fs.mkdirSync(path.dirname(path.resolve(config.dbPath)), { recursive: true });
}

export const db = new Database(config.dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    sku         TEXT NOT NULL UNIQUE,
    price       REAL NOT NULL,
    stock       INTEGER NOT NULL,
    category    TEXT,
    brand       TEXT,
    sport_type  TEXT,
    description TEXT
  )
`);
