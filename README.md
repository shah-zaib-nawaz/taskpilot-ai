# TaskPilot AI ⚡

> **The AI-Native Project Management SaaS for Modern Engineering Teams**  
> Built with **Google Antigravity 2.0 Multi-Agent Orchestration** · Late 2026 Production Standards

[![Next.js 16.4](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19.3](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Drizzle ORM v1.0](https://img.shields.io/badge/Drizzle_ORM-v1.0-green?style=flat&logo=drizzle)](https://orm.drizzle.team/)
[![Better Auth 1.7+](https://img.shields.io/badge/Better_Auth-1.7+-indigo?style=flat)](https://better-auth.com/)
[![Vercel AI SDK 7](https://img.shields.io/badge/Vercel_AI_SDK-v7-black)](https://sdk.vercel.ai/)
[![Stripe & Inngest](https://img.shields.io/badge/Stripe_%26_Inngest-Durable_Webhooks-6366f1)](https://inngest.com/)
[![Live Deployment](https://img.shields.io/badge/Live_Demo-ai--taskpilot--szn.vercel.app-000000?style=flat&logo=vercel)](https://ai-taskpilot-szn.vercel.app)

---

## 🌐 Live Production URL
* **Production Deployment:** [https://ai-taskpilot-szn.vercel.app](https://ai-taskpilot-szn.vercel.app)
* **Demo Workspace:** [https://ai-taskpilot-szn.vercel.app/acme-corp](https://ai-taskpilot-szn.vercel.app/acme-corp)
* **Kanban Board:** [https://ai-taskpilot-szn.vercel.app/acme-corp/projects/TP/kanban](https://ai-taskpilot-szn.vercel.app/acme-corp/projects/TP/kanban)
* **Executive Telemetry:** [https://ai-taskpilot-szn.vercel.app/acme-corp/analytics](https://ai-taskpilot-szn.vercel.app/acme-corp/analytics)

---

## 1. Overview

**TaskPilot AI** is a production-grade multi-tenant project management SaaS engineered strictly to late-2026 full-stack standards. It bridges natural language project scoping with live relational PostgreSQL telemetry.

Engineering teams convert high-level briefs into structured phase roadmaps, manage real-time workflows via drag-and-drop Kanban boards with **$O(1)$ single-row LexoRank fractional indexing**, enforce zero-trust role-based access control (RBAC), and generate automated executive risk digests grounded in actual task telemetry.

---

## 2. Core Capabilities

### 🧠 1. AI Project Architect (Planner Engine)
* **Structured Scope Generation:** Uses **Vercel AI SDK 7** (`Output.object({ schema })`) with **Gemini 3.6 Flash** to convert natural language project briefs and team topologies into structured epics, subtasks, story points, and relative deadlines.
* **DAG Cycle Engine:** Computes task dependencies (`blocking` / `blocked-by`) using a topological Depth-First Search (DFS) algorithm that mathematically prevents circular deadlocks before committing to PostgreSQL.
* **Review, Edit & Commit:** Interactive modal allows human-in-the-loop inspection and adjustments, bulk-inserting approved hierarchies within a single atomic database transaction.

### 📋 2. Multi-View Task & Project Management
* **Fractional Indexing Kanban:** Powered by `@dnd-kit` and LexoRank midpoint calculations (`fractional-indexing`). Moving a card between columns or reordering within a column mutates strictly **1 single row** in PostgreSQL, paired with React 19 `useOptimistic` for instant zero-latency UI updates.
* **Synchronized Multi-Views:** Seamlessly switch between **Kanban Board**, **List & Backlog**, **Calendar**, and **Roadmap (Gantt)** views with URL-synchronized state powered by `nuqs`.
* **Slide-Over Task Drawer:** Real-time checklists with animated progress meters, threaded markdown comments, and immutable audit logs.

### 🔐 3. Multi-Tenant Workspaces & Zero-Trust RBAC
* **4-Tier RBAC:** `owner`, `admin`, `member`, and `viewer` roles powered by **Better Auth 1.7+ Organization Plugin**.
* **Zero-Trust Server DAL:** Permissions are verified in a centralized Data Access Layer (`requireWorkspaceAccess(orgSlug, minimumRole)`) on every Server Action and Route Handler—never trusting client-provided identifiers.

### 📊 4. AI Executive Reports & Telemetry Analytics
* **Live Telemetry:** Queries actual completed, overdue, and blocked task chains from PostgreSQL.
* **Executive Synthesis:** **Gemini 3.1 Pro** generates synthesized executive summaries, quantified risk scores ($0\text{--}100$), critical bottleneck warnings, and mitigation steps.
* **Interactive Visual Analytics:** 4 Recharts dashboards: Sprint Velocity, Task Status Distribution, Overdue Tasks by Assignee, and trailing Monthly AI Quota trends.

### 💳 5. SaaS Billing, Quotas & Inngest Workflows
* **Stripe Checkout & Customer Portal:** Self-service subscription management, plan changes, and payment method updates.
* **Durable Inngest Webhooks:** Signature-verified Stripe webhook handler (`/api/webhooks/stripe`) dispatching idempotent events to an Inngest background queue with automated retries.
* **Atomic Quota Guards:** Server-enforced rate ceilings (Free Tier: 10 generations/mo; Pro Tier: 500 generations/mo) with automated quota exhaustion modals.

---

## 3. Production Tech Stack

| Layer | Technology | Architectural Nuances |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.4.3 (App Router) | Strict ESM (`"type": "module"`), Dynamic IO, Turbopack |
| **Runtime** | Node.js 22+ LTS / React 19.3 | `useOptimistic`, Server Actions, Action State |
| **Styling** | Tailwind CSS v4.3.3 | CSS-first `@theme` in `globals.css`, Geist Sans & Geist Mono |
| **Database** | PostgreSQL / Neon Serverless | Drizzle ORM v1.0 (`0.45.4`), Relations API v2, `drizzle-zod` |
| **Authentication** | Better Auth 1.7.14 | Organization plugin, 4-tier RBAC, zero-trust DAL |
| **AI Layer** | Vercel AI SDK 7 (`ai@7.0.154`) | `@ai-sdk/google`, Gemini 3.1 Pro & 3.6 Flash, `Output.object` |
| **Kanban Engine** | `@dnd-kit` + `fractional-indexing` | $O(1)$ single-row LexoRank orderKey mutations |
| **Background Jobs** | Inngest v3.54 | Durable Stripe webhook event queue & retry workflows |
| **Payments** | Stripe SDK | Checkout Sessions, Customer Billing Portal, HMAC webhooks |

---

## 4. Repository Structure

```
├── public/
│   └── assets/                     # Nano Banana SVG visuals (hero, empty states, logo)
├── src/
│   ├── actions/                    # Next.js Server Actions (AI, tasks, billing, members)
│   ├── app/
│   │   ├── (auth)/                 # Sign-in and sign-up pages
│   │   ├── (dashboard)/            # Multi-tenant App Router (/[orgSlug]/...)
│   │   │   ├── [orgSlug]/
│   │   │   │   ├── analytics/      # Recharts executive telemetry
│   │   │   │   ├── projects/       # Kanban, List, Calendar, Roadmap, AI Planner
│   │   │   │   ├── reports/        # Gemini 3.1 Pro executive reports
│   │   │   │   ├── settings/       # Members RBAC & Stripe Billing
│   │   │   │   ├── loading.tsx     # Geometry skeleton loader
│   │   │   │   └── error.tsx       # Route error boundary
│   │   ├── (marketing)/            # Landing page and pricing comparison table
│   │   └── api/                    # Auth, Inngest, and Stripe Route Handlers
│   ├── components/                 # UI components (Kanban, AI modals, Dashboard shell)
│   ├── dal/                        # Zero-Trust Data Access Layer (RBAC & Quotas)
│   ├── db/                         # Drizzle schema (19 tables) and seed script
│   ├── inngest/                    # Inngest client and subscription workflow
│   └── lib/                        # Auth client, Stripe helper, DAG cycle engine
├── AGENTS.md                       # Antigravity 2.0 multi-agent instructions
└── package.json                    # Strict ESM dependencies
```

---

## 5. Quickstart Guide

### Prerequisites
* Node.js 22+ LTS
* pnpm v11+
* PostgreSQL instance (local, Docker, or Neon Serverless)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shah-zaib-nawaz/taskpilot-ai.git
   cd taskpilot-ai
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   pnpm approve-builds --all
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   *(Update `DATABASE_URL` with your PostgreSQL connection string).*

4. **Seed Database:**
   ```bash
   pnpm db:seed
   ```

5. **Start Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

6. **Production Build Verification:**
   ```bash
   pnpm exec tsc --noEmit
   pnpm build
   ```

---

## 6. License & Author

* **Author:** Shah Zaib Nawaz ([@shah-zaib-nawaz](https://github.com/shah-zaib-nawaz))
* **Email:** [shahzaibnawazoffical@gmail.com](mailto:shahzaibnawazoffical@gmail.com)
* **License:** MIT
