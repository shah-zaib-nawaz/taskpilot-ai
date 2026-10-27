# Zero-Trust Multi-Tenant RBAC Standards (2026 Edition)

## Core Authorization Rules
1. **Centralized Data Access Layer (DAL):**
   - Every Server Action, Route Handler, and Page Component touching workspace data MUST invoke `requireWorkspaceAccess(orgSlug, minimumRole)`.
   - Never trust client-supplied `organizationId` or `userId` in form data, mutation arguments, or request headers.
2. **Role Hierarchy:**
   - 4-Tier Roles: `owner` (4) > `admin` (3) > `member` (2) > `viewer` (1).
   - `owner`: Workspace deletion, billing/Stripe management, role assignments.
   - `admin`: Member invitations, project creation/archival, team settings.
   - `member`: Project viewing, task creation/editing, comment posting, AI planner commit, AI executive report generation.
   - `viewer`: Read-only access to projects, tasks, Kanban boards, calendar, and telemetry reports. Strictly blocked from mutations.
3. **No Client-Side Only Protection:**
   - Hiding buttons or UI controls is UX convenience only. The DAL must reject unauthorized actions with standard error codes (`UNAUTHORIZED` or `FORBIDDEN`).
4. **Quota Guards:**
   - Free Tier: Max 2 active projects, 5 members, 10 AI generations/month.
   - Pro Tier: Unlimited projects/members, 500 AI generations/month.
   - Quotas must be checked and atomically incremented in PostgreSQL before LLM dispatch.
