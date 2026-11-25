import { Router } from "express";
import { db } from "./db.js";
import { requireAdmin } from "./auth.js";

export const router = Router();

const STR_FIELDS = ["category", "brand", "sport_type", "description"] as const;

class ValidationError extends Error {}

function validate(body: any, partial: boolean): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const b = body && typeof body === "object" ? body : {};
  const req = (k: string) => !partial && b[k] === undefined && bad(`${k} is required`);
  const bad = (m: string): never => { throw new ValidationError(m); };

  for (const k of ["name", "sku"]) {
    req(k);
    if (b[k] !== undefined) {
      if (typeof b[k] !== "string" || !b[k].trim()) bad(`${k} must be a non-empty string`);
      out[k] = b[k].trim();
    }
  }
  req("price");
  if (b.price !== undefined) {
    if (typeof b.price !== "number" || !Number.isFinite(b.price) || b.price < 0) bad("price must be a number >= 0");
    out.price = b.price;
  }
  if (b.stock !== undefined) {
    if (!Number.isInteger(b.stock) || b.stock < 0) bad("stock must be an integer >= 0");
    out.stock = b.stock;
  } else if (!partial) out.stock = 0;
  for (const k of STR_FIELDS) {
    if (b[k] !== undefined && b[k] !== null) {
      if (typeof b[k] !== "string") bad(`${k} must be a string`);
      out[k] = b[k];
    } else if (b[k] === null) out[k] = null;
  }
  return out;
}

const isDup = (e: any) => e?.code === "SQLITE_CONSTRAINT_UNIQUE";
const parseId = (s: string) => (/^\d+$/.test(s) ? Number(s) : NaN);
const getById = (id: number) => db.prepare("SELECT * FROM products WHERE id = ?").get(id);

router.post("/", (req, res) => {
  try {
    const d = validate(req.body, false);
    const cols = Object.keys(d);
    const r = db
      .prepare(`INSERT INTO products (${cols.join(",")}) VALUES (${cols.map(() => "?").join(",")})`)
      .run(...(Object.values(d) as any[]));
    res.status(201).json(getById(Number(r.lastInsertRowid)));
  } catch (e: any) {
    if (e instanceof ValidationError) return void res.status(400).json({ error: e.message });
    if (isDup(e)) return void res.status(409).json({ error: "SKU already exists" });
    throw e;
  }
});

router.get("/", (req, res) => {
  const where: string[] = [];
  const params: unknown[] = [];
  for (const k of ["sport_type", "brand", "category"]) {
    const v = req.query[k];
    if (typeof v === "string") { where.push(`${k} = ?`); params.push(v); }
  }
  for (const [k, op] of [["min_price", ">="], ["max_price", "<="]] as const) {
    const v = req.query[k];
    if (v !== undefined) {
      const n = typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
      if (!Number.isFinite(n)) return void res.status(400).json({ error: `${k} must be a number` });
      where.push(`price ${op} ?`); params.push(n);
    }
  }
  const sql = `SELECT * FROM products${where.length ? " WHERE " + where.join(" AND ") : ""} ORDER BY id`;
  res.json(db.prepare(sql).all(...(params as any[])));
});

router.get("/:id", (req, res) => {
  const p = getById(parseId(String(req.params.id)));
  if (!p) return void res.status(404).json({ error: "Product not found" });
  res.json(p);
});

router.put("/:id", (req, res) => {
  const id = parseId(String(req.params.id));
  try {
    const d = validate(req.body, true);
    if (!getById(id)) return void res.status(404).json({ error: "Product not found" });
    const cols = Object.keys(d);
    if (cols.length) {
      db.prepare(`UPDATE products SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`).run(
        ...(Object.values(d) as any[]), id,
      );
    }
    res.json(getById(id));
  } catch (e: any) {
    if (e instanceof ValidationError) return void res.status(400).json({ error: e.message });
    if (isDup(e)) return void res.status(409).json({ error: "SKU already exists" });
    throw e;
  }
});

router.delete("/:id", requireAdmin, (req, res) => {
  const r = db.prepare("DELETE FROM products WHERE id = ?").run(parseId(String(req.params.id)));
  if (!r.changes) return void res.status(404).json({ error: "Product not found" });
  res.status(204).end();
});
