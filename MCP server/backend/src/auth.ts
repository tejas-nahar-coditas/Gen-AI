import type { NextFunction, Request, Response } from "express";
import { config } from "./config.js";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");
  if (!config.adminApiKey || !key || key !== config.adminApiKey) {
    res.status(401).json({ error: "Missing or invalid admin API key" });
    return;
  }
  next();
}
