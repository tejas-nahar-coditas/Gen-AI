import "dotenv/config";

const BASE = (process.env.BACKEND_URL ?? "http://localhost:3000").replace(/\/$/, "");
const ADMIN_KEY = process.env.ADMIN_API_KEY ?? "";

export async function api(method: string, path: string, opts: { body?: unknown; admin?: boolean } = {}) {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers["content-type"] = "application/json";
  if (opts.admin) headers["x-api-key"] = ADMIN_KEY;
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${res.status}: ${data?.error ?? res.statusText}`);
  return data;
}
