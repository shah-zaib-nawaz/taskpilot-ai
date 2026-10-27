import { pgTable, text, timestamp, boolean, pgEnum, index, uniqueIndex, integer } from 'drizzle-orm/pg-core';
import { organizations, users } from './auth';

export const taskStatusEnum = pgEnum('task_status', ['backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);
export const dependencyTypeEnum = pgEnum('dependency_type', ['blocks', 'blocked_by']);

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  key: text('key').notNull(), // Short identifier e.g., 'TP', 'ENG'
  description: text('description'),
  color: text('color').default('#4F46E5').notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  targetDate: timestamp('target_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('projects_org_key_idx').on(t.organizationId, t.key),
  index('projects_org_idx').on(t.organizationId),
]);

export const phases = pgTable('phases', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  orderKey: text('order_key').notNull(), // Fractional index / LexoRank string (e.g. "a0", "a1")
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  index('phases_project_order_idx').on(t.projectId, t.orderKey),
]);

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  phaseId: text('phase_id').references(() => phases.id, { onDelete: 'set null' }),
  taskNumber: integer('task_number').notNull(), // Monotonic integer scoped to project: TP-1, TP-2
  title: text('title').notNull(),
  description: text('description'), // Rich Markdown content
  status: taskStatusEnum('status').default('backlog').notNull(),
  priority: taskPriorityEnum('priority').default('medium').notNull(),
  storyPoints: integer('story_points'),
  orderKey: text('order_key').notNull(), // Fractional index for O(1) Kanban column & list sorting
  startDate: timestamp('start_date'),
  dueDate: timestamp('due_date'),
  assigneeId: text('assignee_id').references(() => users.id, { onDelete: 'set null' }),
  creatorId: text('creator_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('tasks_project_number_idx').on(t.projectId, t.taskNumber),
  index('tasks_project_status_order_idx').on(t.projectId, t.status, t.orderKey),
  index('tasks_org_assignee_idx').on(t.organizationId, t.assigneeId),
  index('tasks_due_date_idx').on(t.dueDate),
]);

export const subtasks = pgTable('subtasks', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  taskId: text('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  orderKey: text('order_key').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  index('subtasks_task_order_idx').on(t.taskId, t.orderKey),
]);

export const taskDependencies = pgTable('task_dependencies', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  sourceTaskId: text('source_task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }), // The blocking task
  targetTaskId: text('target_task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }), // The blocked task
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('task_dep_source_target_idx').on(t.sourceTaskId, t.targetTaskId),
  index('task_dep_target_idx').on(t.targetTaskId),
]);

export const labels = pgTable('labels', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  color: text('color').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('labels_org_name_idx').on(t.organizationId, t.name),
]);

export const taskLabels = pgTable('task_labels', {
  organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  taskId: text('task_id').notNull().references(() => tasks.id, { onDelete: 'cascade' }),
  labelId: text('label_id').notNull().references(() => labels.id, { onDelete: 'cascade' }),
}, (t) => [
  uniqueIndex('task_labels_pk').on(t.taskId, t.labelId),
  index('task_labels_org_idx').on(t.organizationId),
]);
