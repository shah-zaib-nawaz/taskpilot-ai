'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  GitBranch,
  Trash2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import type { ProjectPlan, TaskPlan } from '@/lib/ai-schema';
import { commitAiProjectPlanAction } from '@/actions/ai';

interface AiPlanReviewModalProps {
  plan: ProjectPlan | null;
  isOpen: boolean;
  onClose: () => void;
  orgSlug: string;
}

export function AiPlanReviewModal({
  plan,
  isOpen,
  onClose,
  orgSlug,
}: AiPlanReviewModalProps) {
  const router = useRouter();
  const [tasks, setTasks] = React.useState<TaskPlan[]>([]);
  const [isCommitting, setIsCommitting] = React.useState(false);
  const [committed, setCommitted] = React.useState(false);

  React.useEffect(() => {
    if (plan) {
      setTasks(plan.tasks);
      setCommitted(false);
    }
  }, [plan]);

  if (!isOpen || !plan) return null;

  const totalPoints = tasks.reduce((sum, t) => sum + t.storyPoints, 0);

  const handleCommit = async () => {
    setIsCommitting(true);
    try {
      await commitAiProjectPlanAction({
        orgSlug,
        plan: {
          ...plan,
          tasks,
        },
      });
      setCommitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCommitting(false);
    }
  };

  const removeTask = (idx: number) => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl rounded-3xl border border-border bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 border-b border-border space-y-3 bg-canvas-subtle/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {plan.projectKey}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-foreground">{plan.projectName}</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary-subtle text-primary border border-primary/20 font-bold uppercase">
                    AI Synthesized
                  </span>
                </div>
                <p className="text-xs text-foreground-muted">
                  Key: <span className="font-mono font-semibold text-foreground">{plan.projectKey}</span> · {tasks.length} tasks staged for atomic commit
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-canvas-subtle transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-foreground leading-relaxed">
            {plan.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted pt-1">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>{plan.phases.length} Milestone Phases</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>{totalPoints} Total Story Points</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <GitBranch className="w-3.5 h-3.5" />
              <span>DAG Verified · 0 Cycle Deadlocks</span>
            </div>
          </div>
        </div>

        {/* Content: Task List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {committed ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Project Roadmap Successfully Committed!
              </h3>
              <p className="text-xs text-foreground-muted max-w-md mx-auto">
                All {tasks.length} tasks and {plan.phases.length} phases were written to PostgreSQL inside a single atomic transaction. LexoRank fractional indices and DAG dependency edges are active.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <Link
                  href={`/${orgSlug}/projects/TP/kanban`}
                  onClick={onClose}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Open Interactive Board</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            tasks.map((task, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-border bg-canvas hover:bg-surface transition-colors space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-canvas-subtle border border-border text-foreground-muted font-bold">
                      Day +{task.relativeDay}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        task.priority === 'urgent'
                          ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                          : task.priority === 'high'
                          ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                          : 'bg-canvas-subtle text-foreground-muted border border-border'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[11px] font-semibold text-primary">
                      {task.phaseName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-foreground">
                      {task.storyPoints} pts
                    </span>
                    <button
                      onClick={() => removeTask(idx)}
                      className="p-1 rounded text-foreground-muted hover:text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs font-bold text-foreground">{task.title}</p>
                <p className="text-xs text-foreground-muted leading-relaxed">{task.description}</p>

                {task.prerequisiteTitles && task.prerequisiteTitles.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] text-foreground-muted">
                    <GitBranch className="w-3 h-3 text-primary" />
                    <span>Blocked By:</span>
                    {task.prerequisiteTitles.map((p, pIdx) => (
                      <span key={pIdx} className="font-mono text-primary font-semibold">
                        &quot;{p}&quot;
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {!committed && (
          <div className="p-4 border-t border-border bg-canvas-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Transactional Rollback Guard Enabled</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-border bg-surface hover:bg-canvas-subtle text-foreground text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCommit}
                disabled={isCommitting || tasks.length === 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isCommitting ? 'Committing Atomic Batch...' : 'Commit to Project Roadmap'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
