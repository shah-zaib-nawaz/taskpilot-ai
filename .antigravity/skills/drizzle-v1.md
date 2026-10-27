# Drizzle ORM v1.0 & PostgreSQL Standards (2026 Edition)

## Core Database Rules
1. **Relations Definition:**
   - Use Drizzle Relations API v2 (`relations` / `defineRelations`) for type-safe relational queries.
   - Enforce zero-codegen TypeScript inference with `db.query.<table_name>.findMany(...)`.
2. **Schema & Tenant Isolation:**
   - Every tenant table (projects, phases, tasks, subtasks, task_dependencies, comments, activity_logs, ai_reports, usage_logs) MUST carry an `organizationId` foreign key with `{ onDelete: 'cascade' }`.
   - Always index `organizationId` or create composite indexes (e.g. `(organizationId, key)` or `(projectId, status, orderKey)`).
3. **Runtime Validation via `drizzle-zod`:**
   - Auto-derive validation schemas using `createInsertSchema` and `createSelectSchema` from `drizzle-zod`.
   - Never trust raw user inputs in Server Actions without validating against these schemas.
4. **Fractional Indexing ($O(1)$ Reordering):**
   - Use `orderKey` text column computed with `fractional-indexing` (LexoRank midpoints).
   - Moving or reordering a task requires strictly a single-row `UPDATE` query: `UPDATE tasks SET status = $1, order_key = $2 WHERE id = $3`.
   - Never perform bulk row updates on reorder.
5. **Transactions & Rollback:**
   - Bulk inserts (e.g. AI Roadmap Commit) and quota checks must run inside atomic transactions `await db.transaction(async (tx) => { ... })`.
