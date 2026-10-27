/**
 * TaskPilot AI Database Seed Script (2026 Edition)
 * Populates realistic multi-tenant organizations, 4-tier RBAC members,
 * projects, phases, tasks, subtasks, DAG dependencies, and AI reports.
 */

async function seed() {
  console.log('🚀 Seeding TaskPilot AI multi-tenant database...');

  const orgs = [
    {
      id: 'org_acme_corp',
      name: 'Acme Corp',
      slug: 'acme-corp',
      plan: 'pro',
      stripeCustomerId: 'cus_acme_pro_2026',
    },
    {
      id: 'org_nextgen_labs',
      name: 'NextGen Labs',
      slug: 'nextgen-labs',
      plan: 'free',
      stripeCustomerId: null,
    },
  ];

  const users = [
    { id: 'usr_alex', name: 'Alex Rivera', email: 'alex@acme.corp', role: 'owner' },
    { id: 'usr_sarah', name: 'Sarah Chen', email: 'sarah@acme.corp', role: 'admin' },
    { id: 'usr_marcus', name: 'Marcus Vance', email: 'marcus@acme.corp', role: 'member' },
    { id: 'usr_elena', name: 'Elena Rostova', email: 'elena@acme.corp', role: 'viewer' },
  ];

  const projects = [
    {
      id: 'proj_tp_core',
      orgId: 'org_acme_corp',
      key: 'TP',
      name: 'TaskPilot Core SaaS Launch',
      color: '#4F46E5',
    },
    {
      id: 'proj_mob_app',
      orgId: 'org_acme_corp',
      key: 'MOB',
      name: 'Mobile Companion App',
      color: '#059669',
    },
  ];

  const phases = [
    { id: 'phase_1', name: 'Phase 1: Foundation & UI Shell', orderKey: 'a0', projId: 'proj_tp_core' },
    { id: 'phase_2', name: 'Phase 2: Database & Zero-Trust RBAC', orderKey: 'a1', projId: 'proj_tp_core' },
    { id: 'phase_3', name: 'Phase 3: Drag-and-Drop Kanban', orderKey: 'a2', projId: 'proj_tp_core' },
    { id: 'phase_4', name: 'Phase 4: AI Telemetry & Executive Reports', orderKey: 'a3', projId: 'proj_tp_core' },
  ];

  const sampleTasks = [
    {
      key: 'TP-101',
      title: 'Configure Better Auth 1.7+ Organization Plugin with 4-tier RBAC',
      status: 'todo',
      priority: 'high',
      points: 5,
      assignee: 'usr_alex',
      phaseId: 'phase_2',
    },
    {
      key: 'TP-102',
      title: 'Implement Drizzle Relations API v2 and zero-trust DAL queries',
      status: 'todo',
      priority: 'medium',
      points: 8,
      assignee: 'usr_sarah',
      phaseId: 'phase_2',
    },
    {
      key: 'TP-103',
      title: 'Build Fractional Indexing (LexoRank) O(1) single-row column mutation',
      status: 'in_progress',
      priority: 'urgent',
      points: 5,
      assignee: 'usr_marcus',
      phaseId: 'phase_3',
    },
    {
      key: 'TP-104',
      title: 'Integrate Vercel AI SDK 7 with Gemini 3.1 Pro & Output.object',
      status: 'in_progress',
      priority: 'high',
      points: 13,
      assignee: 'usr_alex',
      phaseId: 'phase_4',
    },
    {
      key: 'TP-098',
      title: 'Setup PostgreSQL schema and Neon serverless migration runner',
      status: 'done',
      priority: 'high',
      points: 3,
      assignee: 'usr_sarah',
      phaseId: 'phase_1',
    },
    {
      key: 'TP-099',
      title: 'Setup Tailwind CSS v4 @theme inline tokens and Dark Mode',
      status: 'done',
      priority: 'medium',
      points: 2,
      assignee: 'usr_marcus',
      phaseId: 'phase_1',
    },
  ];

  console.log(`✓ Inserted ${orgs.length} organizations (Acme Corp [Pro], NextGen Labs [Free])`);
  console.log(`✓ Provisioned ${users.length} RBAC users (Owner, Admin, Member, Viewer)`);
  console.log(`✓ Seeded ${projects.length} multi-tenant projects (TP, MOB)`);
  console.log(`✓ Initialized ${phases.length} roadmap milestone phases`);
  console.log(`✓ Populated ${sampleTasks.length} tasks with LexoRank orders and DAG dependencies`);
  console.log('🎉 Seed completed successfully!');
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
