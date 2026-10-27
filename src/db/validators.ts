import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import {
  users,
  organizations,
  members,
  invitations,
  projects,
  phases,
  tasks,
  subtasks,
  taskDependencies,
  labels,
  comments,
  activityLogs,
  aiReports,
  usageLogs,
} from './schema';

// Users
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

// Organizations
export const insertOrgSchema = createInsertSchema(organizations);
export const selectOrgSchema = createSelectSchema(organizations);

// Members
export const insertMemberSchema = createInsertSchema(members);
export const selectMemberSchema = createSelectSchema(members);

// Invitations
export const insertInvitationSchema = createInsertSchema(invitations);
export const selectInvitationSchema = createSelectSchema(invitations);

// Projects
export const insertProjectSchema = createInsertSchema(projects);
export const selectProjectSchema = createSelectSchema(projects);

// Tasks
export const insertTaskSchema = createInsertSchema(tasks);
export const selectTaskSchema = createSelectSchema(tasks);

// Subtasks
export const insertSubtaskSchema = createInsertSchema(subtasks);
export const selectSubtaskSchema = createSelectSchema(subtasks);

// Dependencies
export const insertTaskDependencySchema = createInsertSchema(taskDependencies);
export const selectTaskDependencySchema = createSelectSchema(taskDependencies);

// Comments
export const insertCommentSchema = createInsertSchema(comments);
export const selectCommentSchema = createSelectSchema(comments);

// AI Reports
export const insertAiReportSchema = createInsertSchema(aiReports);
export const selectAiReportSchema = createSelectSchema(aiReports);
