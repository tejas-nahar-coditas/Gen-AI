import { app } from "./app.js";
import { db } from "./db.js";
import { config } from "./config.js";

export { app, db };

app.listen(config.port, () => {
  console.log(`Backend listening on http://localhost:${config.port}`);
  if (!config.adminApiKey) console.warn("Warning: ADMIN_API_KEY is not set");
});
