import { pgTable,pgEnum ,text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { time } from "node:console";
import { date } from "zod";

//we dont provide id just as primary key and leave it
//This is because when we provide it just as a primary key without defaultfn, we are expected to add id in the input, and if its not inserted there, it could fail. 
//So inorder to generate it automatically, we use defaultfn. And it expects a function and to return a value, so for that, here we use nanoid
//nanoid is generated in app runtime and not by database. so id is generated even before the data is inserted

export const roleEnum = pgEnum('role',["admin","staff"])
export const userTable = pgTable("user", {
    id: text().primaryKey().notNull().$defaultFn(() => nanoid()),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    contactNumber: text(),
    role:roleEnum('role').notNull().default('admin'),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).defaultNow().notNull().$onUpdateFn(() => new Date())
})
export const team = pgTable("team", {
    id:text().primaryKey().notNull().$defaultFn(()=>nanoid()),
    userId:text().notNull().references(()=>userTable.id),
    name:text().notNull(),
    description:text(),
    createdAt:timestamp({withTimezone:true,mode:"date"}).notNull().defaultNow(),
    updatedAt:timestamp({withTimezone:true,mode:"date"}).notNull().defaultNow().$onUpdateFn(()=>new Date())
})

export const userTeam = pgTable("userTeam", {})