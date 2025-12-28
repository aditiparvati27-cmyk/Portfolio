# Aditi Parvati Portfolio

## Overview

This is a personal portfolio website for Aditi Parvati, a Product Manager. The application showcases her professional experience, case studies, and includes an AI-powered chatbot that responds as Aditi to answer questions about her background, experience, and interests. The site is built as a modern full-stack web application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with custom design tokens defined in `client/src/index.css`
- **UI Components**: shadcn/ui component library (New York style variant) with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and interactions
- **State Management**: TanStack React Query for server state management
- **Fonts**: Inter (sans-serif) and Playfair Display (serif) from Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api/*` prefix
- **AI Integration**: OpenAI API via Replit AI Integrations for the chatbot feature
- **Build System**: Vite for frontend, esbuild for server bundling

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` contains database models
- **Tables**: 
  - `users` - Basic user authentication (currently using in-memory storage)
  - `conversations` - Chat conversation history
  - `messages` - Individual chat messages linked to conversations
- **Migrations**: Managed via `drizzle-kit push` command

### Key Design Patterns
- **Monorepo Structure**: Client code in `client/`, server in `server/`, shared types in `shared/`
- **Path Aliases**: `@/*` maps to client source, `@shared/*` maps to shared code
- **Development Mode**: Vite dev server with HMR proxied through Express
- **Production Mode**: Static file serving from `dist/public` directory

### AI Chatbot Implementation
- The chatbot uses a detailed persona prompt (`ADITI_CONTEXT` in `server/routes.ts`) to respond as Aditi
- Supports streaming responses for real-time chat experience
- Frontend component in `client/src/components/chatbot.tsx` handles the chat UI

## External Dependencies

### Third-Party Services
- **OpenAI API**: Powers the AI chatbot through Replit AI Integrations
  - Environment variables: `AI_INTEGRATIONS_OPENAI_API_KEY`, `AI_INTEGRATIONS_OPENAI_BASE_URL`

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **connect-pg-simple**: Session storage for PostgreSQL (available but not currently active)

### Key NPM Packages
- **UI/UX**: Radix UI primitives, Framer Motion, Lucide React icons, class-variance-authority
- **Forms**: React Hook Form with Zod validation
- **Data**: TanStack React Query, Drizzle ORM with drizzle-zod
- **Server**: Express, OpenAI SDK
- **Build Tools**: Vite, esbuild, TSX for TypeScript execution

### Replit-Specific Integrations
- Custom Vite plugins for Replit environment (dev banner, cartographer, runtime error overlay)
- Meta images plugin for OpenGraph image handling in deployments