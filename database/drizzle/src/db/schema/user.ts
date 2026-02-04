import { pgTable, text} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

//we dont provide id just as primary key and leave it
//This is because when we provide it just as a primary key without defaultfn, we are expected to add id in the input, and if its not inserted there, it could fail. 
//So inorder to generate it automatically, we use defaultfn. And it expects a function and to return a value, so for that, here we use nanoid
//nanoid is generated in app runtime and not by database. so id is generated even before the data is inserted
export const userTable = pgTable("user", {
    id:text().primaryKey().notNull().$defaultFn(()=>nanoid()),
    name: text().notNull(),
    email:text().notNull().unique(),
    password:text().notNull(),
    contactNumber:text(),
    role:
    createdAt:
    updatedAt:
})
export const team = pgTable("team",{})

export const userTeam = pgTable("userTeam",{})