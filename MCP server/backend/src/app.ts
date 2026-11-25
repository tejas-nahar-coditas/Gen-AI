import express from "express";
import { router as products } from "./products.js";

export const app = express();
app.use(express.json());
app.use("/products", products);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err?.type === "entity.parse.failed") return void res.status(400).json({ error: "Invalid JSON body" });
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});
