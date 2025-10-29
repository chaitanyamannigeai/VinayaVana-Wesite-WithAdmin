// server/db.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Render tip:
// - Internal DB URL (has ".internal") → no SSL
// - External/public URL → SSL on
const isInternal = /\.internal\b/.test(connectionString);

export const pool = new Pool({
  connectionString,
  ssl: isInternal ? false : { rejectUnauthorized: false },
  // nice-to-haves:
  max: 10,
  idleTimeoutMillis: 30_000,
  keepAlive: true,
});

export const db = drizzle(pool);

// optional: quick health check you can call on boot
export async function dbHealthcheck() {
  await pool.query("select 1");
}

// graceful shutdown (Render will SIGTERM/SIGINT on redeploy)
process.on("SIGINT", async () => {
  await pool.end();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});
