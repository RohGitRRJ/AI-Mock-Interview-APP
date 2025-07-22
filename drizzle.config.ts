import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const URL = process.env.NEXT_PUBLIC_DRIZZLE_DATABASE_URL as string;

export default defineConfig({
  schema: "./config/database/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: URL,
  }
});