import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { services } from "./services";

export const severityEnum = pgEnum('severity', ["low", "medium", "high"])
export const alertDefinitions = pgTable("alert_definitions", {
    id: text().notNull().primaryKey().$defaultFn(() => (nanoid())),
    serviceId: text().references(() => services.id, { onDelete: "cascade" }),
    name: text().notNull(),
    condition: text(),
    severity: severityEnum().notNull().default("low"),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow().$onUpdateFn(() => new Date())
},
    (table) => [
        index("idx_alert_definitions_service_id").on(table.serviceId)
    ]
)