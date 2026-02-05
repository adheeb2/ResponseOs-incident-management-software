import { index, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import { team } from "./auth"
import { relations } from "drizzle-orm"
import { runbooks } from "./runbooks"
import { alertDefinitions } from "./alerts"

export const services = pgTable("services", {
    id: text().notNull().primaryKey().$defaultFn(() => (nanoid())),
    name: text().notNull(),
    description: text(),
    criticality: text(),
    environment: text(),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow().$onUpdateFn(() => new Date())
})
export const serviceTeam = pgTable("service_team", {
    id: text().primaryKey().notNull().$defaultFn(() => nanoid()),
    serviceId: text().notNull().references(() => services.id, { onDelete: "cascade" }),
    teamId: text().notNull().references(() => team.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow()
},
    (table) => [
        unique().on(table.serviceId, table.teamId),
        index("idx_service_team_service_id").on(table.serviceId),
        index("idx_service_team_team_id").on(table.teamId),

    ]
)

export const serviceRunbookRelations = relations(services, ({ many }) => ({
    runbooks: many(runbooks)
}))
export const serviceAlertRelations = relations(services, ({ many }) => ({
    alertdefinitions: many(alertDefinitions)
}))