import { relations } from 'drizzle-orm';
import { users, sessions, accounts, organizations, members, invitations } from './auth';
import { projects, phases, tasks, subtasks, taskDependencies, labels, taskLabels } from './project';
import { comments, activityLogs, aiReports, usageLogs, subscriptions } from './activity';

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  members: many(members),
  assignedTasks: many(tasks, { relationName: 'taskAssignee' }),
  createdTasks: many(tasks, { relationName: 'taskCreator' }),
  comments: many(comments),
  activityLogs: many(activityLogs),
  aiReports: many(aiReports),
}));

export const organizationsRelations = relations(organizations, ({ many, one }) => ({
  members: many(members),
  invitations: many(invitations),
  projects: many(projects),
  usageLogs: many(usageLogs),
  aiReports: many(aiReports),
  subscription: one(subscriptions, {
    fields: [organizations.id],
    references: [subscriptions.organizationId],
  }),
}));

export const membersRelations = relations(members, ({ one }) => ({
  organization: one(organizations, {
    fields: [members.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  organization: one(organizations, {
    fields: [invitations.organizationId],
    references: [organizations.id],
  }),
  inviter: one(users, {
    fields: [invitations.inviterId],
    references: [users.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
  phases: many(phases),
  tasks: many(tasks),
  activityLogs: many(activityLogs),
  aiReports: many(aiReports),
}));

export const phasesRelations = relations(phases, ({ one, many }) => ({
  project: one(projects, {
    fields: [phases.projectId],
    references: [projects.id],
  }),
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  phase: one(phases, {
    fields: [tasks.phaseId],
    references: [phases.id],
  }),
  assignee: one(users, {
    fields: [tasks.assigneeId],
    references: [users.id],
    relationName: 'taskAssignee',
  }),
  creator: one(users, {
    fields: [tasks.creatorId],
    references: [users.id],
    relationName: 'taskCreator',
  }),
  subtasks: many(subtasks),
  comments: many(comments),
  activityLogs: many(activityLogs),
  taskLabels: many(taskLabels),
  blockingDependencies: many(taskDependencies, { relationName: 'blockingTask' }),
  blockedByDependencies: many(taskDependencies, { relationName: 'blockedTask' }),
}));

export const subtasksRelations = relations(subtasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subtasks.taskId],
    references: [tasks.id],
  }),
}));

export const taskDependenciesRelations = relations(taskDependencies, ({ one }) => ({
  sourceTask: one(tasks, {
    fields: [taskDependencies.sourceTaskId],
    references: [tasks.id],
    relationName: 'blockingTask',
  }),
  targetTask: one(tasks, {
    fields: [taskDependencies.targetTaskId],
    references: [tasks.id],
    relationName: 'blockedTask',
  }),
}));

export const taskLabelsRelations = relations(taskLabels, ({ one }) => ({
  task: one(tasks, {
    fields: [taskLabels.taskId],
    references: [tasks.id],
  }),
  label: one(labels, {
    fields: [taskLabels.labelId],
    references: [labels.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  task: one(tasks, {
    fields: [comments.taskId],
    references: [tasks.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  parentComment: one(comments, {
    fields: [comments.parentCommentId],
    references: [comments.id],
    relationName: 'commentReplies',
  }),
  replies: many(comments, { relationName: 'commentReplies' }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  organization: one(organizations, {
    fields: [activityLogs.organizationId],
    references: [organizations.id],
  }),
  project: one(projects, {
    fields: [activityLogs.projectId],
    references: [projects.id],
  }),
  task: one(tasks, {
    fields: [activityLogs.taskId],
    references: [tasks.id],
  }),
  actor: one(users, {
    fields: [activityLogs.actorId],
    references: [users.id],
  }),
}));

export const aiReportsRelations = relations(aiReports, ({ one }) => ({
  organization: one(organizations, {
    fields: [aiReports.organizationId],
    references: [organizations.id],
  }),
  project: one(projects, {
    fields: [aiReports.projectId],
    references: [projects.id],
  }),
  author: one(users, {
    fields: [aiReports.authorId],
    references: [users.id],
  }),
}));
