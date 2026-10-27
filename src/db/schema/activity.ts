import { pgTable, text, timestamp, integer, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { organizations, users } from './auth';
import { projects, tasks } from './project';

export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  taskId: text('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  authorId: text('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  parentCommentId: text('parent_comment_id'), // Threaded comment replies
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  index('comments_task_created_idx').on(t.taskId, t.createdAt),
]);

export const activityLogs = pgTable('activity_logs', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }),
  taskId: text('task_id').references(() => tasks.id, { onDelete: 'cascade' }),
  actorId: text('actor_id').notNull().references(() => users.id),
  action: text('action').notNull(), // 'task_created', 'status_changed', 'priority_updated', etc.
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  metadata: jsonb('metadata'), // Pre/post delta snapshots
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  index('activity_task_idx').on(t.taskId, t.createdAt),
  index('activity_project_idx').on(t.projectId, t.createdAt),
]);

export const aiReports = pgTable('ai_reports', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  authorId: text('author_id').notNull().references(() => users.id),
  reportType: text('report_type').default('weekly_digest').notNull(),
  title: text('title').notNull(),
  executiveSummary: text('executive_summary').notNull(),
  riskScore: integer('risk_score').notNull(), // 0 - 100
  status: text('status').notNull(), // 'healthy' | 'at_risk' | 'critical'
  criticalBlockers: jsonb('critical_blockers').notNull(), // Array of blocked chains
  recommendedNextSteps: jsonb('recommended_next_steps').notNull(),
  telemetrySnapshot: jsonb('telemetry_snapshot').notNull(), // Task counts, velocity, overdue metrics
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  index('ai_reports_project_created_idx').on(t.projectId, t.createdAt),
]);

export const usageLogs = pgTable('usage_logs', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  billingPeriod: text('billing_period').notNull(), // 'YYYY-MM'
  aiGenerationsCount: integer('ai_generations_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('usage_org_period_idx').on(t.organizationId, t.billingPeriod),
]);

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripePriceId: text('stripe_price_id').notNull(),
  status: text('status').notNull(), // 'active', 'trialing', 'canceled', etc.
  currentPeriodStart: timestamp('current_period_start').notNull(),
  currentPeriodEnd: timestamp('current_period_end').notNull(),
  cancelAtPeriodEnd: integer('cancel_at_period_end').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('subscriptions_org_idx').on(t.organizationId),
  index('subscriptions_stripe_sub_idx').on(t.stripeSubscriptionId),
]);
