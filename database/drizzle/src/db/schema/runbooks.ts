import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { services } from "./services";

export const runbooks = pgTable("runbooks", {
    id: text().notNull().primaryKey().$defaultFn(() => (nanoid())),
    serviceId: text().references(() => services.id, { onDelete: "cascade" }),
    name: text().notNull(),
    description: text(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow().$onUpdateFn(() => new Date())
},
(table)=>[
     index("idx_runbooks_service_id").on(table.serviceId)
]
)