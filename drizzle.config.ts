import type { Config } from "drizzle-kit";
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd());

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set');
}

export default {
  schema: "src/lib/database/schema/",
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  }
} as Config;