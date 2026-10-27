import { z } from 'zod';

export const TaskPlanSchema = z.object({
  title: z.string().describe('Clear, action-oriented task title'),
  description: z.string().describe('Detailed engineering implementation criteria'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).describe('Task priority level'),
  storyPoints: z.number().int().min(1).max(21).describe('Fibonacci effort estimation (1, 2, 3, 5, 8, 13)'),
  phaseName: z.string().describe('Name of the milestone phase this task belongs to'),
  relativeDay: z.number().int().min(1).describe('Target day of completion from sprint start'),
  prerequisiteTitles: z.array(z.string()).default([]).describe('Titles of other tasks that block this task'),
});

export const ProjectPlanSchema = z.object({
  projectName: z.string().describe('High-impact project title'),
  projectKey: z.string().max(5).describe('Short 2-4 uppercase letter project key (e.g. TP, ENG)'),
  summary: z.string().describe('Strategic executive summary of the architectural scope'),
  phases: z.array(
    z.object({
      name: z.string().describe('Phase milestone name'),
      durationWeeks: z.number().describe('Estimated duration in weeks'),
    })
  ),
  tasks: z.array(TaskPlanSchema),
});

export const ExecutiveReportSchema = z.object({
  title: z.string(),
  executiveSummary: z.string(),
  riskScore: z.number().min(0).max(100),
  status: z.enum(['healthy', 'at_risk', 'critical']),
  criticalBlockers: z.array(
    z.object({
      blocker: z.string(),
      impact: z.string(),
      mitigation: z.string(),
    })
  ),
  recommendedNextSteps: z.array(z.string()),
  velocityAnalysis: z.string(),
});

export type TaskPlan = z.infer<typeof TaskPlanSchema>;
export type ProjectPlan = z.infer<typeof ProjectPlanSchema>;
export type ExecutiveReport = z.infer<typeof ExecutiveReportSchema>;
