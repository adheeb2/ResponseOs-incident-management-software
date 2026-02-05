
import { relations } from "drizzle-orm";
import { pgTable, pgEnum, text, timestamp, unique, index } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { services, serviceTeam } from "./services";

//we dont provide id just as primary key and leave it
//This is because when we provide it just as a primary key without defaultfn, we are expected to add id in the input, and if its not inserted there, it could fail. 
//So inorder to generate it automatically, we use defaultfn. And it expects a function and to return a value, so for that, here we use nanoid
//nanoid is generated in app runtime and not by database. so id is generated even before the data is inserted

export const roleEnum = pgEnum('role', ["admin", "staff"])

export const userTable = pgTable("auth_user", {
    id: text().primaryKey().notNull().$defaultFn(() => nanoid()),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    contactNumber: text(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).defaultNow().notNull().$onUpdateFn(() => new Date())
})
export const team = pgTable("auth_team", {
    id: text().primaryKey().notNull().$defaultFn(() => nanoid()),
    name: text().notNull(),
    description: text(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow().$onUpdateFn(() => new Date())
})
export const userTeam = pgTable("user_team", {
    id: text().primaryKey().notNull().$defaultFn(() => nanoid()),
    userId: text().notNull().references(() => userTable.id, { onDelete: "cascade" }),//foreign keys need to have ondelete
    teamId: text().notNull().references(() => team.id, { onDelete: "cascade" }),
    role: roleEnum().notNull().default('admin'),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow()
},
    (table) => [
        unique().on(table.userId, table.teamId),//this is a composite unique constraint
        index("idx_user_team_user_id").on(table.userId),
        index("idx_user_team_team_id").on(table.teamId),

    ]
)






export const userTeamRelations =  relations(userTeam,({many})=>({
    teams:many(team)
}))
export const teamServiceRelations = relations(serviceTeam,({many})=>({
    services:many(services)
}))


//Join tables always should have not null constraints in their foreign keys,inorder to ensure no orphan relationships exist
//To ensure data consistency and uniqueness, we must use composite unique constraint. Every join tables need to have this constraint
//To Retrieve data faster without having to scan the whole database, we use index. mostly every foreign keys have indexes
//Any many-to-many relationship must be expressed through the join table explicitly(when we are trying to add relations at the end of schemas)
//one to many relation often have a foreign key on any of the tables, so you could directly add that table (for relations)