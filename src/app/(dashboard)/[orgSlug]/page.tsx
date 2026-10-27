import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ArrowUpRight,
  Sparkles,
  Plus,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export default async function WorkspaceOverviewPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Workspace Welcome & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Workspace Overview
            </h1>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-subtle text-primary border border-primary/20">
              Pro Plan
            </span>
          </div>
          <p className="text-sm text-foreground-muted mt-1">
            Real-time project telemetry, DAG dependencies, and AI sprint analytics for Acme Corp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/${orgSlug}/projects/new`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/25 hover:bg-primary/20 text-primary text-xs font-semibold transition-all shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI Project Planner</span>
          </Link>
          <Link
            href={`/${orgSlug}/projects/TP/kanban`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Open Kanban</span>
          </Link>
        </div>
      </div>

      {/* 4 Telemetry Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider font-mono">
              Active Projects
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-foreground tabular-nums">2</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +1 this month
            </span>
          </div>
          <p className="text-[11px] text-foreground-muted">2 of unlimited Pro projects active</p>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider font-mono">
              Sprint Velocity
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-foreground tabular-nums">34 pts</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +18%
            </span>
          </div>
          <p className="text-[11px] text-foreground-muted">Sprint cycle ending Friday, Nov 14</p>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider font-mono">
              Completed Tasks
            </span>
            <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-foreground tabular-nums">18 / 26</span>
            <span className="text-xs font-mono font-bold text-foreground-muted">69%</span>
          </div>
          <p className="text-[11px] text-foreground-muted">8 items pending review or QA</p>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider font-mono">
              Blockers / Overdue
            </span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">1</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
              Low Risk
            </span>
          </div>
          <p className="text-[11px] text-foreground-muted">DAG dependency resolving today</p>
        </div>
      </div>

      {/* Main Grid: Active Project Card + AI Digest Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Featured Project */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Featured Project
            </h2>
            <Link
              href={`/${orgSlug}/projects`}
              className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
            >
              <span>View all projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs hover:border-primary/40 transition-all space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  TP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-foreground">
                      TaskPilot Core SaaS Launch
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                      In Flight
                    </span>
                  </div>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    Key: <span className="font-mono font-semibold text-foreground">TP</span> · Target: Nov 28, 2026
                  </p>
                </div>
              </div>

              <Link
                href={`/${orgSlug}/projects/TP/kanban`}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-canvas-subtle hover:bg-border text-foreground text-xs font-semibold transition-colors"
              >
                <span>Enter Board</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-sm text-foreground-muted leading-relaxed">
              Multi-tenant architecture migration, fractional-indexing Kanban board, Gemini 3.1 Pro executive reports, and zero-trust RBAC authorization guards.
            </p>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-foreground-muted font-medium">Roadmap Completion</span>
                <span className="font-mono font-bold text-foreground">69% (18/26 tasks)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-canvas-subtle overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-primary rounded-full transition-all"
                  style={{ width: '69%' }}
                />
              </div>
            </div>

            {/* Quick View Links */}
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-border">
              <Link
                href={`/${orgSlug}/projects/TP/kanban`}
                className="px-3 py-1.5 rounded-lg bg-canvas-subtle hover:bg-primary-subtle hover:text-primary text-xs font-medium text-foreground-muted transition-colors"
              >
                Kanban (4 Columns)
              </Link>
              <Link
                href={`/${orgSlug}/projects/TP/list`}
                className="px-3 py-1.5 rounded-lg bg-canvas-subtle hover:bg-primary-subtle hover:text-primary text-xs font-medium text-foreground-muted transition-colors"
              >
                List View
              </Link>
              <Link
                href={`/${orgSlug}/projects/TP/calendar`}
                className="px-3 py-1.5 rounded-lg bg-canvas-subtle hover:bg-primary-subtle hover:text-primary text-xs font-medium text-foreground-muted transition-colors"
              >
                Calendar
              </Link>
              <Link
                href={`/${orgSlug}/projects/TP/roadmap`}
                className="px-3 py-1.5 rounded-lg bg-canvas-subtle hover:bg-primary-subtle hover:text-primary text-xs font-medium text-foreground-muted transition-colors"
              >
                Phase Gantt
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: AI Executive Digest Card */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>AI Executive Digest</span>
            </h2>
            <Link
              href={`/${orgSlug}/reports`}
              className="text-xs font-semibold text-primary hover:text-primary-hover"
            >
              Archive
            </Link>
          </div>

          <div className="p-5 rounded-2xl border border-primary/30 bg-gradient-to-br from-surface to-primary-subtle/30 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
                Weekly Synthesis
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                RISK: 12 / 100
              </span>
            </div>

            <p className="text-xs text-foreground font-medium leading-relaxed">
              &quot;Sprint velocity is up 18%. Zero DAG cycle deadlocks. Single blocker identified on Stripe Webhook signing keys, estimated resolution within 24 hours.&quot;
            </p>

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-foreground-muted">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Generated via Gemini 3.1 Pro</span>
              </div>
            </div>

            <Link
              href={`/${orgSlug}/reports`}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>View Full Executive Report</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick Nano Banana Illustration Card */}
          <div className="p-4 rounded-2xl border border-border bg-surface text-center space-y-2">
            <div className="w-full h-28 relative flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/empty-kanban.svg"
                alt="Kanban illustration"
                width={160}
                height={110}
                className="object-contain"
              />
            </div>
            <p className="text-xs font-semibold text-foreground">Need a new roadmap?</p>
            <p className="text-[11px] text-foreground-muted">
              Prompt the AI Architect with your PRD to generate epics, tasks, and DAG dependencies instantly.
            </p>
            <Link
              href={`/${orgSlug}/projects/new`}
              className="inline-block text-xs font-bold text-primary hover:underline"
            >
              Launch AI Architect →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
