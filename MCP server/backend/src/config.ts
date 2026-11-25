import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 3000),
  dbPath: process.env.DB_PATH ?? "./data/products.db",
  adminApiKey: process.env.ADMIN_API_KEY ?? "",
};
