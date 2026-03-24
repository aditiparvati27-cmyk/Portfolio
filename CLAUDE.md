# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Full dev: updates context + starts Express (5001) + Vite (5000)
npm run dev:client   # Vite-only on port 5000 — frontend development without server
npm run check        # TypeScript type check (run after any TS changes)
```

### Build & Production
```bash
npm run build        # Updates context → esbuild server bundle → Vite client build
npm start            # Runs dist/index.cjs (requires a build first)
```

### Database
```bash
npm run db:push      # Push Drizzle ORM schema changes to PostgreSQL (requires DATABASE_URL)
```

### AI Chatbot Context
```bash
npm run update-context   # Recompile api/context.ts from references/master_context.md
```
Run this whenever `references/master_context.md` is edited — it regenerates the Gemini system prompt.

No test or lint scripts are configured.

## Commands to Run After Changes

| Type of change | Command to run |
|---|---|
| Any TypeScript change | `npm run check` |
| Schema change (`shared/schema.ts`) | `npm run db:push` |
| Chatbot persona/context (`references/master_context.md`) | `npm run update-context` |
| Deploy to production | `npm run build` then push to git (Vercel auto-deploys) |

## Project Structure

```
Portfolio-Roadmap/
├── client/                    # React 19 + Vite frontend (SPA)
│   ├── public/                # Static assets served at root
│   └── src/
│       ├── App.tsx            # Wouter routes + lazy-loaded pages
│       ├── main.tsx           # React root + Amplitude analytics init
│       ├── index.css          # Tailwind v4 @theme tokens (colors, fonts)
│       ├── components/
│       │   ├── chatbot.tsx    # AI chatbot UI (SSE streaming)
│       │   ├── case-study-card.tsx
│       │   ├── product-spec-card.tsx
│       │   ├── roadmap.tsx
│       │   ├── stat-card.tsx
│       │   ├── ticker.tsx
│       │   └── ui/            # shadcn/ui components (57 primitives)
│       ├── hooks/
│       │   ├── use-mobile.tsx
│       │   └── use-toast.ts
│       ├── lib/
│       │   ├── queryClient.ts # TanStack React Query + apiRequest() helper
│       │   └── utils.ts
│       └── pages/
│           ├── home.tsx           # Main portfolio landing page
│           ├── not-found.tsx
│           ├── ooma.tsx           # OOMA case study
│           ├── ooma-portfolio.tsx
│           ├── profound.tsx       # Profound case study
│           ├── profound-portfolio.tsx
│           └── typeface-portfolio.tsx
│
├── server/                    # Express.js backend (ESM)
│   ├── index.ts               # Entry point, port setup
│   ├── app.ts                 # Express app, middleware, error handling
│   ├── routes.ts              # API routes — /api/chat SSE endpoint
│   ├── storage.ts             # In-memory user storage interface
│   ├── vite.ts                # Vite dev middleware (dev only)
│   └── static.ts             # Static file serving (production only)
│
├── shared/                    # Shared between client and server
│   ├── schema.ts              # Drizzle ORM schema (users, conversations, messages)
│   └── models/
│       └── chat.ts            # Chat type definitions
│
├── api/                       # Vercel serverless + chatbot context
│   ├── index.ts               # Vercel /api/chat serverless handler
│   ├── context.ts             # ⚠️ Auto-generated — do not edit directly
│   └── chatContext.ts         # Chat context builder utilities
│
├── references/                # Source documents
│   ├── master_context.md      # ✏️ Edit this to update chatbot persona/knowledge
│   └── aditi_chatbot_context.md
│
├── script/
│   └── update-context.ts      # Compiles master_context.md → api/context.ts
│
├── attached_assets/           # Images referenced via @assets/ alias
│
├── dist/                      # Build output (gitignored)
│   ├── index.cjs              # Server bundle (esbuild)
│   └── public/                # Client bundle (Vite)
│
├── migrations/                # Drizzle migration files
├── vite.config.ts             # Vite + code splitting config
├── drizzle.config.ts          # Drizzle ORM config (needs DATABASE_URL)
├── tsconfig.json              # TS config with path aliases
├── components.json            # shadcn/ui config (New York variant)
└── vercel.json                # Vercel SPA + API rewrite rules
```

## Architecture

This is a **full-stack monorepo** — a personal portfolio for a Product Manager with an AI chatbot powered by Google Gemini.

### Routing (Wouter)

```
/                     → home.tsx (main portfolio landing)
/ooma/intro           → ooma.tsx
/intro/profound       → profound.tsx
/profound/intro       → profound.tsx
/projects/ooma        → ooma-portfolio.tsx
/projects/profound    → profound-portfolio.tsx
/projects/typeface    → typeface-portfolio.tsx
*                     → not-found.tsx
```

All case study pages are lazy-loaded with `React.lazy()` + `Suspense`.

### Frontend Patterns

- **UI components:** shadcn/ui (New York variant) + Radix UI. Add new components with `npx shadcn@latest add <component>`.
- **Styling:** Tailwind CSS v4. Theme tokens live in `client/src/index.css` under `@theme inline` — **not** in a `tailwind.config.ts`. Colors: Sage White background, Deep Forest foreground, Dartmouth Green primary, Rich Gold accent.
- **Fonts:** Inter (sans) and Playfair Display (serif).
- **Animations:** Framer Motion throughout.
- **Data fetching:** TanStack React Query. Use `apiRequest()` from `lib/queryClient.ts` — it handles credentials and error parsing.
- **Path aliases:** `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Backend Patterns

- **Single main API route:** `POST /api/chat` in `server/routes.ts` — streams response via SSE using Google Gemini 2.5-flash-lite.
- **Dual serve mode:** `server/vite.ts` proxies to Vite in dev; `server/static.ts` serves `dist/public/` in prod. The switch is `NODE_ENV`.
- **Build:** esbuild bundles the server to `dist/index.cjs`; Vite builds the client to `dist/public/`.

### AI Chatbot

The chatbot presents as Aditi. The source of truth is `references/master_context.md`. Edit that file, then run `npm run update-context` to regenerate `api/context.ts`. Never edit `api/context.ts` directly.

The Vercel deployment uses `api/index.ts` as a serverless function for `/api/chat`. The local dev server uses `server/routes.ts`.

### Database

PostgreSQL + Drizzle ORM. Schema: `shared/schema.ts` (tables: `users`, `conversations`, `messages`). Requires `DATABASE_URL` env var. After schema changes: `npm run db:push`.

### Environment Variables

```
GEMINI_API_KEY    # Google Gemini API key (required for chatbot)
DATABASE_URL      # PostgreSQL connection string (required for DB)
PORT              # Server port (defaults to 5001 in dev)
NODE_ENV          # development | production
START_SERVER      # Set to "true" to start Express (used in dev script)
```

### Analytics

Amplitude (initialized in `client/src/main.tsx`) tracks events under the name `"Portfolio Funnel"` with properties `step`, `action`, and `viewer_lens`. Session replay is at 100% sample rate. Vercel Analytics is also active.

### Deployment

Auto-deploys to Vercel on push to `main`. `vercel.json` rewrites `/api/*` to the serverless function and all other routes to `index.html` for SPA routing.

## Git Commit Rules

- Write commit messages in imperative mood: "Add feature" not "Added feature"
- Keep the subject line under 72 characters
- No "Co-authored-by" or AI attribution lines in commit messages
- Prefer specific, scoped messages: `feat: add Typeface case study page` over `update pages`
- Common prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`
