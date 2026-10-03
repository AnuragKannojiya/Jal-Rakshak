# Jal Rakshak

Jal Rakshak is a TypeScript monorepo for a water-resource management and monitoring platform. The project combines a React frontend, an Express API, database tooling, and generated client/spec packages into a clean workspace-based architecture.

## Overview

This repository is organized as a pnpm monorepo with separate packages for:

- a web application for the Jal Rakshak experience
- a backend API server
- database schema and persistence layers
- OpenAPI-driven API contract and generated client code
- supporting scripts and shared utilities

The codebase is designed to support a modern full-stack workflow with typed APIs, schema validation, and reusable internal packages.

## Architecture

The repo is split into a few main areas:

- `artifacts/jalrakshak` - primary frontend application built with React, Vite, and Tailwind-like UI tooling
- `artifacts/api-server` - backend API service built with Express 5
- `lib/db` - PostgreSQL schema and Drizzle ORM integration
- `lib/api-spec` - API specification and OpenAPI-based code generation
- `lib/api-zod` - generated Zod validation schemas for API data
- `lib/api-client-react` - React client hooks and API bindings
- `scripts` - workspace utilities and helpers

## Tech Stack

- TypeScript 5.9
- pnpm workspaces
- React + Vite
- Express 5
- PostgreSQL + Drizzle ORM
- Zod validation
- OpenAPI + Orval code generation
- esbuild for backend builds

## Key capabilities

- UI-driven water management or civic monitoring workflows
- API-first integration between frontend and backend
- Strong typing across shared schema contracts
- Generated clients and validators from the API definition
- Monorepo-based package management and reuse

## Repository structure

```text
Jal-Rakshak/
├── artifacts/
│   ├── api-server/
│   ├── jalrakshak/
│   ├── jalrakshak-doc/
│   ├── jalrakshak-submission-video/
│   ├── mockup-sandbox/
│   └── ...
├── lib/
│   ├── api-client-react/
│   ├── api-spec/
│   ├── api-zod/
│   └── db/
├── scripts/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
├── replit.md
├── .gitignore
└── README.md
```

## Getting started

Prerequisites:

- Node.js 24+
- pnpm
- PostgreSQL (for database-backed local development)

Install dependencies:

```bash
pnpm install
```

Run the frontend app:

```bash
pnpm --filter @workspace/jalrakshak run dev
```

Run the API server:

```bash
pnpm --filter @workspace/api-server run dev
```

Run the full typecheck:

```bash
pnpm run typecheck
```

Build the entire workspace:

```bash
pnpm run build
```

## Notes

This repository follows a workspace structure intended for scalable, multi-package product development. It emphasizes generated API contracts, typed backend/frontend integration, and a clean separation between app, service, and shared libraries.

## License

This project is configured for a private/internal workspace setup and does not declare a public license in the root package configuration.
