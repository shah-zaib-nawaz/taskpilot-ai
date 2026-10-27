'use client';

import * as React from 'react';
import { Layers, Sparkles, CheckCircle2, Clock, GitBranch } from 'lucide-react';

interface Phase {
  name: string;
  duration: string;
  progress: number;
  status: 'completed' | 'in_progress' | 'upcoming';
  tasks: { key: string; title: string; points: number }[];
}

const PHASES: Phase[] = [
  {
    name: 'Phase 1: Architecture, Foundation & UI Shell',
    duration: 'Oct 26 - Oct 30',
    progress: 100,
    status: 'completed',
    tasks: [
      { key: 'TP-098', title: 'PostgreSQL & Neon Schema Design', points: 3 },
      { key: 'TP-099', title: 'Tailwind CSS v4 & High-Craft Indigo Theme', points: 2 },
    ],
  },
  {
    name: 'Phase 2: Authentication, Multi-Tenancy & Zero-Trust RBAC',
    duration: 'Nov 01 - Nov 05',
    progress: 50,
    status: 'in_progress',
    tasks: [
      { key: 'TP-101', title: 'Better Auth 1.7+ Organization Plugin', points: 5 },
      { key: 'TP-102', title: 'Drizzle Relations v2 & DAL Security Guard', points: 8 },
    ],
  },
  {
    name: 'Phase 3: Drag-and-Drop Kanban & DAG Cycle Prevention',
    duration: 'Nov 06 - Nov 12',
    progress: 25,
    status: 'in_progress',
    tasks: [
      { key: 'TP-103', title: 'LexoRank O(1) single-row fractional mutation', points: 5 },
      { key: 'TP-106', title: 'DFS Topological DAG cycle detector', points: 5 },
    ],
  },
  {
    name: 'Phase 4: AI Project Planner & Gemini 3.1 Pro Telemetry Digest',
    duration: 'Nov 13 - Nov 18',
    progress: 0,
    status: 'upcoming',
    tasks: [
      { key: 'TP-104', title: 'Vercel AI SDK 7 with Output.object schema', points: 13 },
      { key: 'TP-107', title: 'PostgreSQL quota guards & telemetry synthesis', points: 8 },
    ],
  },
];

export default function RoadmapViewPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="p-4 rounded-2xl border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-foreground">Phase-Based Project Roadmap</h2>
          <p className="text-xs text-foreground-muted">
            Sequential milestone timeline with Directed Acyclic Graph (DAG) cycle verification.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <GitBranch className="w-3.5 h-3.5" />
          <span>DAG Cycle Detection Active · 0 Deadlocks</span>
        </div>
      </div>

      <div className="space-y-4">
        {PHASES.map((phase, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                    phase.status === 'completed'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : phase.status === 'in_progress'
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                      : 'bg-canvas-subtle text-foreground-muted border border-border'
                  }`}
                >
                  {phase.status.replace('_', ' ')}
                </span>
                <h3 className="text-sm font-bold text-foreground">{phase.name}</h3>
              </div>
              <span className="text-xs font-mono text-foreground-muted">{phase.duration}</span>
            </div>

            {/* Gantt Bar representation */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-foreground-muted">
                <span>Phase Progress</span>
                <span className="font-mono font-bold text-foreground">{phase.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-canvas-subtle overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    phase.status === 'completed' ? 'bg-emerald-500' : 'bg-primary'
                  }`}
                  style={{ width: `${phase.progress}%` }}
                />
              </div>
            </div>

            {/* Tasks in phase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border">
              {phase.tasks.map((t) => (
                <div
                  key={t.key}
                  className="flex items-center justify-between p-2 rounded-lg bg-canvas-subtle/60 text-xs"
                >
                  <span className="font-mono font-bold text-foreground-muted">{t.key}</span>
                  <span className="truncate px-2 font-medium text-foreground">{t.title}</span>
                  <span className="font-mono text-foreground-muted">{t.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
