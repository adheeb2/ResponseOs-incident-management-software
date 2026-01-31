import { pgTable, text } from "drizzle-orm/pg-core";


export const userTable = pgTable("user", {
    name: text().notNull(),
    age: text().notNull(),
})