import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env" }); // or .env.local

const sql = neon("postgresql://neondb_owner:npg_OpIETq9M6wlS@ep-dry-dew-a5jckyk8-pooler.us-east-2.aws.neon.tech/TrackSpend?sslmode=require");
export const db = drizzle({ client: sql });