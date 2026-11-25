import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { api } from "./client.js";

const fields = {
  name: z.string().describe("Product name"),
  sku: z.string().describe("Unique SKU"),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  category: z.string().nullable(),
  brand: z.string().nullable(),
  sport_type: z.string().nullable(),
  description: z.string().nullable(),
};
const id = z.number().int().describe("Product id");

const run = async (fn: () => Promise<unknown>) => {
  try {
    const data = await fn();
    return { content: [{ type: "text" as const, text: JSON.stringify(data ?? { ok: true }, null, 2) }] };
  } catch (e: any) {
    return { isError: true, content: [{ type: "text" as const, text: `Error ${e.message}` }] };
  }
};

const qs = (o: Record<string, unknown>) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(o)) if (v !== undefined) p.set(k, String(v));
  const s = p.toString();
  return s ? `?${s}` : "";
};

const filters = {
  sport_type: z.string().optional(),
  brand: z.string().optional(),
  category: z.string().optional(),
  min_price: z.number().optional().describe("Inclusive"),
  max_price: z.number().optional().describe("Inclusive"),
};

export function createServer() {
  const s = new McpServer({ name: "sports-products", version: "1.0.0" });

  s.registerTool(
    "create_product",
    {
      description: "Create a sports product",
      inputSchema: {
        name: fields.name, sku: fields.sku, price: fields.price,
        stock: fields.stock.optional(),
        category: fields.category.optional(), brand: fields.brand.optional(),
        sport_type: fields.sport_type.optional(), description: fields.description.optional(),
      },
    },
    (args) => run(() => api("POST", "/products", { body: args })),
  );

  s.registerTool("get_product", { description: "Get a product by id", inputSchema: { id } }, ({ id }) =>
    run(() => api("GET", `/products/${id}`)),
  );

  s.registerTool("list_products", { description: "List all products" }, () => run(() => api("GET", "/products")));

  s.registerTool(
    "update_product",
    {
      description: "Update any subset of a product's fields",
      inputSchema: {
        id,
        name: fields.name.optional(), sku: fields.sku.optional(), price: fields.price.optional(),
        stock: fields.stock.optional(), category: fields.category.optional(), brand: fields.brand.optional(),
        sport_type: fields.sport_type.optional(), description: fields.description.optional(),
      },
    },
    ({ id, ...body }) => run(() => api("PUT", `/products/${id}`, { body })),
  );

  s.registerTool(
    "delete_product",
    { description: "Delete a product (admin; uses configured admin key)", inputSchema: { id } },
    ({ id }) => run(async () => (await api("DELETE", `/products/${id}`, { admin: true })) ?? { deleted: id }),
  );

  s.registerTool(
    "search_products",
    { description: "Search products by sport type, brand, category and/or price range (AND)", inputSchema: filters },
    (args) => run(() => api("GET", `/products${qs(args)}`)),
  );

  return s;
}
