# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Site LAMFO is the website for LAMFO (Laboratório de Aprendizagem de Máquinas em Finanças e Organizações) at University of Brasília. Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS 4. All site content is in Portuguese (pt-BR).

## Commands

```bash
npm run dev      # Dev server with Turbopack (localhost:3000)
npm run build    # Production build
npm start        # Run production server
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

### Data Layer

Content (members and projects) is managed via TOML files in `data/`, not a database:
- `data/members.toml` — organized by category: coordinators, professors, current_students, alumni
- `data/projects.toml` — flat list of projects with research_areas

Server-side loaders in `src/lib/` parse TOML at build time using `@iarna/toml`:
- `members.ts` — `loadMembersData()`, `findMemberBySlug()`
- `projects.ts` — `loadProjectsData()`, `getProjectBySlug()`

TOML objects contain symbols from the parser, so the loaders explicitly map fields to create clean serializable objects. This is intentional — don't remove the mapping.

### Slug Generation (important caveat)

`src/lib/utils.ts` exports two different slug functions used by different parts of the app:
- `generateSlug()` — used by `members.ts` (does NOT strip accents, only removes non-word chars)
- `createSlug()` — used by `projects.ts` (strips accents via NFD normalization)

These are **not equivalent**. Be careful when working with slugs.

### Routing

Next.js App Router with dynamic segments:
- `/members/[slug]` — member detail pages, slug from `generateSlug(member.name)`
- `/projects/[slug]` — project detail pages, slug from `createSlug(project.name)`
- `/api/budget` — API route for budget calculations

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

## Content Management

- Add members: edit `data/members.toml`, add profile image to `public/members/`
- Add projects: edit `data/projects.toml`
- See `data/README.md` for field definitions and required fields

## Deployment

- Pushes to `main` auto-deploy to production via GitHub Actions (`.github/workflows/prod.yml`)
- Pipeline: Docker build -> Docker Hub (`dauid64/site-lamfo:latest`) -> SSH deploy to DigitalOcean
- `NEXT_PUBLIC_API_CHATBOT_URL` is passed as a Docker build arg — new env vars must be configured on the server before merging
- Next.js `output: "standalone"` is used for minimal Docker images
- Branch naming convention: `feat/yourname-description`

## Key Dependencies

- `@headlessui/react` — accessible UI primitives (dropdowns, dialogs)
- `lucide-react` — icon library
- `@iarna/toml` — TOML parser for data files
