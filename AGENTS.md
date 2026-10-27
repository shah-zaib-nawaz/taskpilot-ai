# AGENTS.md — TaskPilot AI Multi-Agent Architecture Guidelines

## Overview
TaskPilot AI is developed using **Google Antigravity 2.0** multi-agent orchestration. All agents operate on isolated worktrees and synchronize via verification artifacts.

## Architectural Mandates
1. **Next.js 16.4 & React 19.3 Standards:**
   - App Router with strict ESM (`"type": "module"`).
   - Dynamic IO: use `"use cache"` on cached read helpers with `cacheLife` and `cacheTag`.
   - Invalidate granular tags in Server Actions using `revalidateTag()`.
   - React 19 `useOptimistic` for instant UI feedback (e.g. Kanban drag-and-drop).
2. **Styling & UI Standards:**
   - Tailwind CSS v4 using CSS-first tokens in `src/app/globals.css` with `@theme`.
   - Brand Colors: Electric Indigo (`#4F46E5`), Alabaster (`#F8FAFC`), crisp dark mode (`#090D16` / `#111827`).
   - Font Pairing: `Geist Sans` for clean UI, `Geist Mono` with `tabular-nums` for task IDs (`TP-101`), dates, metrics, and story points.
3. **Data Access Layer (DAL):**
   - Import `requireWorkspaceAccess(orgSlug, minimumRole)` from `@/dal/rbac`.
   - Never query tenant tables without filtering by `organizationId`.
4. **Vercel AI SDK 7:**
   - Use `instructions` and `Output.object({ schema })`.
   - Use Gemini 3.1 Pro for executive digests and Gemini 3.6 Flash for project roadmaps.
5. **Quality & Verification Gates:**
   - No mock buttons: every UI trigger must be wired to real server mutations or active state.
   - Built-in Chrome Browser testing is mandatory after each phase to verify zero hydration errors and persistent state.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
