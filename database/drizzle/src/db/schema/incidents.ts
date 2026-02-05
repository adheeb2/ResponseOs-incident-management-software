import { index, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import {  team } from "./auth"
import { alertDefinitions, severityEnum } from "./alerts"
import { relations } from "drizzle-orm"


export const incidents = pgTable("incidents", {
    id: text().notNull().primaryKey().$defaultFn(() => (nanoid())),
    title: text().notNull(),
    description: text(),
    currentState: text(),
    severity: severityEnum().notNull().default("low"),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow().$onUpdateFn(() => new Date())
},
    (table) => [
        index("idx_incidents_current_state").on(table.currentState),
        index("idx_incidents_severity").on(table.severity),
        index("idx_incidents_created_at").on(table.createdAt)
    ]
)

export const incidentTeam = pgTable("incident_team", {
    id: text().primaryKey().notNull().$defaultFn(() => nanoid()),
    incidentId: text().notNull().references(() => incidents.id, { onDelete: "cascade" }),
    teamId: text().notNull().references(() => team.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow()
},
    (table) => [
        unique().on(table.incidentId, table.teamId),
        index("idx_incident_team_incident_id").on(table.incidentId),
        index("idx_incident_team_team_id").on(table.teamId),
    ]
)

export const incidentAlert = pgTable("incident_alert", {
    id: text().primaryKey().notNull().$defaultFn(() => nanoid()),
    incidentId: text().notNull().references(() => incidents.id, { onDelete: "cascade" }),
    alertDefinitionId: text().notNull().references(() => alertDefinitions.id),
    createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow()
},
    (table) => [
        unique().on(table.incidentId, table.alertDefinitionId),
        index("idx_incident_alert_incident_id").on(table.incidentId),
        index("idx_incident_alert_alert_id").on(table.alertDefinitionId),
    ]
)

export const incidentTeamRelations = relations(incidentTeam, ({ many }) => ({
    team: many(team)
}))
export const incidentAlertRelations = relations(incidentAlert, ({ many }) => ({
    alertdefinitions: many(alertDefinitions)
}))