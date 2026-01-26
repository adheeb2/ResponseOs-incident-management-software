# ResponseOs-incident-management-software
An incident management platform for real time tracking,identifying and resolving incidents

# AI Incident Response Platform

This project is a personal attempt to understand how real engineering teams handle production failures. It is not a demo app and not a tutorial exercise. The goal is to build a system that manages what happens **after** something breaks in production.

When an alert is triggered, this platform creates an incident, assigns the right people, shows the relevant runbook, allows live collaboration, stores logs and actions, and later generates a postmortem report. Over time, an AI assistant is added to help engineers reason over logs and runbooks during an active incident.

This repository exists to explore systems thinking: database design under concurrency, background workers, observability, realtime updates, cloud deployment, performance, and security.

## Project Philosophy

This project intentionally avoids unnecessary abstractions and tools. The purpose is to understand how systems behave when they are under stress, not to hide complexity behind frameworks.

You will see:

* Relational modeling for workflows and incidents
* Workers creating incidents from alerts
* Structured logging and metrics
* Realtime updates during incidents
* Manual infrastructure before managed services
* AI added only after the core system is stable

## Core Features

* Services and alerts definition
* Automatic incident creation from alerts
* Runbooks with structured steps
* Live incident dashboard for collaboration
* Background workers for alert processing
* Logs and timeline tracking
* Postmortem report generation
* AI assistant for log and runbook reasoning (later phase)

## Tech Stack

* Node.js
* Fastify
* PostgreSQL
* Drizzle ORM
* Redis
* React
* TanStack Query and Router
* Tailwind CSS
* Docker and Docker Compose

## Local Development Setup

### Prerequisites

* Node.js v20+
* pnpm
* Docker and Docker Compose

### Installation

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Copy environment variables:

   ```sh
   cp .env.example .env
   ```

3. Start the database and redis containers:

   ```sh
   pnpm docker:dev
   ```

4. Run database migrations:

   ```sh
   pnpm migrate:dev
   ```

5. Start the development server:

   ```sh
   pnpm dev
   ```

The application will now be available locally.

## Project Structure

```
apps/
  backend/
  web/

packages/
  database/
  jobs/
  server/
  ui/
```

* `backend` handles APIs, workers, and incident logic
* `web` provides the incident dashboard and management UI
* `database` contains schema and migrations
* `jobs` handles background alert and incident workers
* `server` contains shared server utilities
* `ui` contains shared frontend components

## How the System Works

1. A monitoring simulator generates alerts.
2. Alerts create incidents automatically.
3. Incidents assign responders and display runbooks.
4. Engineers update the incident in real time.
5. Logs and actions are stored.
6. After resolution, a postmortem is generated.

Later, real monitoring tools can send alerts via webhooks.

## Available Scripts

* `pnpm dev` – start backend and web in development
* `pnpm build` – build all apps
* `pnpm docker:dev` – start postgres and redis
* `pnpm migrate:dev` – apply migrations
* `pnpm worker:dev` – start background workers

## Contribution Strategy

This project follows a simple branch-based workflow:

1. Create a feature branch from `main`
2. Implement changes
3. Open a pull request
4. Merge after review

## Purpose of This Repository

This repository is meant to be a long-running system that evolves over months. Each phase adds new complexity: observability, cloud deployment, performance tuning, AI integration, and security hardening.

By the end, this should resemble a real internal tool that engineering teams could use during their worst production days.
