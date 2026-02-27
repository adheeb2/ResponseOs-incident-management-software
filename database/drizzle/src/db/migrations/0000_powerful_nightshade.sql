CREATE TYPE "public"."role" AS ENUM('admin', 'staff');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "auth_team" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"contactNumber" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "auth_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "user_team" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"teamId" text NOT NULL,
	"role" "role" DEFAULT 'admin' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_team_userId_teamId_unique" UNIQUE("userId","teamId")
);
--> statement-breakpoint
CREATE TABLE "alert_definitions" (
	"id" text PRIMARY KEY NOT NULL,
	"serviceId" text,
	"name" text NOT NULL,
	"condition" text,
	"severity" "severity" DEFAULT 'low' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "incident_alert" (
	"id" text PRIMARY KEY NOT NULL,
	"incidentId" text NOT NULL,
	"alertDefinitionId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "incident_alert_incidentId_alertDefinitionId_unique" UNIQUE("incidentId","alertDefinitionId")
);
--> statement-breakpoint
CREATE TABLE "incident_team" (
	"id" text PRIMARY KEY NOT NULL,
	"incidentId" text NOT NULL,
	"teamId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "incident_team_incidentId_teamId_unique" UNIQUE("incidentId","teamId")
);
--> statement-breakpoint
CREATE TABLE "incidents" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"currentState" text,
	"severity" "severity" DEFAULT 'low' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "runbooks" (
	"id" text PRIMARY KEY NOT NULL,
	"serviceId" text,
	"name" text NOT NULL,
	"description" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_team" (
	"id" text PRIMARY KEY NOT NULL,
	"serviceId" text NOT NULL,
	"teamId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "service_team_serviceId_teamId_unique" UNIQUE("serviceId","teamId")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"criticality" text,
	"environment" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_userId_auth_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_team" ADD CONSTRAINT "user_team_teamId_auth_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."auth_team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alert_definitions" ADD CONSTRAINT "alert_definitions_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_alert" ADD CONSTRAINT "incident_alert_incidentId_incidents_id_fk" FOREIGN KEY ("incidentId") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_alert" ADD CONSTRAINT "incident_alert_alertDefinitionId_alert_definitions_id_fk" FOREIGN KEY ("alertDefinitionId") REFERENCES "public"."alert_definitions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_team" ADD CONSTRAINT "incident_team_incidentId_incidents_id_fk" FOREIGN KEY ("incidentId") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_team" ADD CONSTRAINT "incident_team_teamId_auth_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."auth_team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "runbooks" ADD CONSTRAINT "runbooks_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_team" ADD CONSTRAINT "service_team_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_team" ADD CONSTRAINT "service_team_teamId_auth_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."auth_team"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_user_team_user_id" ON "user_team" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "idx_user_team_team_id" ON "user_team" USING btree ("teamId");--> statement-breakpoint
CREATE INDEX "idx_alert_definitions_service_id" ON "alert_definitions" USING btree ("serviceId");--> statement-breakpoint
CREATE INDEX "idx_incident_alert_incident_id" ON "incident_alert" USING btree ("incidentId");--> statement-breakpoint
CREATE INDEX "idx_incident_alert_alert_id" ON "incident_alert" USING btree ("alertDefinitionId");--> statement-breakpoint
CREATE INDEX "idx_incident_team_incident_id" ON "incident_team" USING btree ("incidentId");--> statement-breakpoint
CREATE INDEX "idx_incident_team_team_id" ON "incident_team" USING btree ("teamId");--> statement-breakpoint
CREATE INDEX "idx_incidents_current_state" ON "incidents" USING btree ("currentState");--> statement-breakpoint
CREATE INDEX "idx_incidents_severity" ON "incidents" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "idx_incidents_created_at" ON "incidents" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "idx_runbooks_service_id" ON "runbooks" USING btree ("serviceId");--> statement-breakpoint
CREATE INDEX "idx_service_team_service_id" ON "service_team" USING btree ("serviceId");--> statement-breakpoint
CREATE INDEX "idx_service_team_team_id" ON "service_team" USING btree ("teamId");