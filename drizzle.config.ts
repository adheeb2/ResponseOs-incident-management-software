import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './database/drizzle/src/db/migrations',//This is where migration gen is stored
    schema: './database/drizzle/src/db/schema/index.ts',//this is where we get schema for migrations
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
