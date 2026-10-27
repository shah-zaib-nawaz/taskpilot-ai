import * as React from 'react';
import Link from 'next/link';
import { Plus, FolderKanban, Sparkles, ArrowRight } from 'lucide-react';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects</h1>
          <p className="text-sm text-foreground-muted mt-1">
            Manage your organization&apos;s product and engineering roadmaps.
          </p>
        </div>

        <Link
          href={`/${orgSlug}/projects/new`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Project (AI Planner)</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Project 1 */}
        <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center">
              TP
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
              Active
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground">TaskPilot Core SaaS Launch</h3>
            <p className="text-xs text-foreground-muted mt-1">
              Multi-tenant architecture, fractional Kanban, and AI executive reports.
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="flex justify-between text-xs text-foreground-muted">
              <span>Progress</span>
              <span className="font-mono font-bold text-foreground">69% (18/26 tasks)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-canvas-subtle overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '69%' }} />
            </div>
          </div>

          <Link
            href={`/${orgSlug}/projects/TP/kanban`}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-canvas-subtle hover:bg-primary-subtle hover:text-primary text-xs font-semibold transition-colors"
          >
            <span>Open Kanban Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project 2 */}
        <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">
              MOB
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
              Active
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground">Mobile Companion App</h3>
            <p className="text-xs text-foreground-muted mt-1">
              React Native offline-first sync engine and push notification dispatcher.
            </p>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border">
            <div className="flex justify-between text-xs text-foreground-muted">
              <span>Progress</span>
              <span className="font-mono font-bold text-foreground">32% (8/25 tasks)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-canvas-subtle overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '32%' }} />
            </div>
          </div>

          <Link
            href={`/${orgSlug}/projects/TP/kanban`}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-canvas-subtle hover:bg-primary-subtle hover:text-primary text-xs font-semibold transition-colors"
          >
            <span>Open Kanban Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
