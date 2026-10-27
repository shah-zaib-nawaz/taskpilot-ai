'use client';

import * as React from 'react';
import {
  X,
  Clock,
  User,
  GitBranch,
  CheckSquare,
  MessageSquare,
  History,
  AlertTriangle,
  Plus,
  Trash2,
  Send,
  ShieldAlert,
} from 'lucide-react';
import { validateDagDependency } from '@/lib/dag';
import { addTaskDependencyAction, removeTaskDependencyAction } from '@/actions/dependencies';

export interface TaskData {
  id: string;
  key: string;
  title: string;
  description?: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  storyPoints: number;
  dueDate: string;
  orderKey: string;
  assignee: { name: string; initials: string; color: string };
  subtasks: { id: string; title: string; isCompleted: boolean }[];
  dependencies: {
    blocks: { id: string; key: string; title: string }[];
    blockedBy: { id: string; key: string; title: string }[];
  };
  comments: {
    id: string;
    author: string;
    initials: string;
    content: string;
    createdAt: string;
    replies?: { id: string; author: string; content: string; createdAt: string }[];
  }[];
  activityLogs: { id: string; actor: string; action: string; time: string }[];
}

interface TaskDetailDrawerProps {
  task: TaskData | null;
  onClose: () => void;
  onUpdateTask: (updated: TaskData) => void;
  allTasks: TaskData[];
  orgSlug: string;
}

export function TaskDetailDrawer({
  task,
  onClose,
  onUpdateTask,
  allTasks,
  orgSlug,
}: TaskDetailDrawerProps) {
  if (!task) return null;

  const [activeTab, setActiveTab] = React.useState<'overview' | 'subtasks' | 'dependencies' | 'comments' | 'activity'>('overview');
  const [newSubtask, setNewSubtask] = React.useState('');
  const [newComment, setNewComment] = React.useState('');
  const [depTargetId, setDepTargetId] = React.useState('');
  const [dagError, setDagError] = React.useState<string | null>(null);

  // Handle subtask toggle
  const toggleSubtask = (subId: string) => {
    const updated = {
      ...task,
      subtasks: task.subtasks.map((s) =>
        s.id === subId ? { ...s, isCompleted: !s.isCompleted } : s
      ),
    };
    onUpdateTask(updated);
  };

  // Add subtask
  const addSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtask.trim()) return;
    const updated = {
      ...task,
      subtasks: [
        ...task.subtasks,
        { id: `sub_${Date.now()}`, title: newSubtask.trim(), isCompleted: false },
      ],
    };
    onUpdateTask(updated);
    setNewSubtask('');
  };

  // Add comment
  const addComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const updated = {
      ...task,
      comments: [
        ...task.comments,
        {
          id: `comm_${Date.now()}`,
          author: 'Alex Rivera',
          initials: 'AR',
          content: newComment.trim(),
          createdAt: 'Just now',
        },
      ],
      activityLogs: [
        {
          id: `act_${Date.now()}`,
          actor: 'Alex Rivera',
          action: 'added a comment',
          time: 'Just now',
        },
        ...task.activityLogs,
      ],
    };
    onUpdateTask(updated);
    setNewComment('');
  };

  // Add dependency with DAG cycle check
  const handleAddDependency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depTargetId) return;

    // Build existing edges list
    const existingEdges = allTasks.flatMap((t) =>
      t.dependencies.blocks.map((b) => ({
        sourceTaskId: t.id,
        targetTaskId: b.id,
      }))
    );

    // Let current task block depTargetId
    const newEdge = { sourceTaskId: task.id, targetTaskId: depTargetId };
    const check = validateDagDependency(existingEdges, newEdge);

    if (check.hasCycle) {
      setDagError(check.error || 'Circular deadlock detected.');
      return;
    }

    setDagError(null);
    const targetTask = allTasks.find((t) => t.id === depTargetId);
    if (!targetTask) return;

    const updated = {
      ...task,
      dependencies: {
        ...task.dependencies,
        blocks: [...task.dependencies.blocks, { id: targetTask.id, key: targetTask.key, title: targetTask.title }],
      },
      activityLogs: [
        {
          id: `act_${Date.now()}`,
          actor: 'Alex Rivera',
          action: `linked blocking dependency to ${targetTask.key}`,
          time: 'Just now',
        },
        ...task.activityLogs,
      ],
    };
    onUpdateTask(updated);
    setDepTargetId('');
  };

  const completedSubtasks = task.subtasks.filter((s) => s.isCompleted).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-surface border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-6 border-b border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-bold text-foreground-muted bg-canvas-subtle px-2.5 py-1 rounded-lg border border-border">
                  {task.key}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                    task.priority === 'urgent'
                      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      : task.priority === 'high'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      : 'bg-canvas-subtle text-foreground-muted border border-border'
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-canvas-subtle transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-xl font-bold text-foreground leading-snug">
              {task.title}
            </h2>

            {/* Quick Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
              <div className="flex items-center gap-1.5">
                <div className={`w-5 h-5 rounded-full ${task.assignee.color} text-white font-bold text-[9px] flex items-center justify-center`}>
                  {task.assignee.initials}
                </div>
                <span>{task.assignee.name}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Due {task.dueDate}</span>
              </div>
              <span>·</span>
              <span className="font-mono font-bold text-foreground">{task.storyPoints} Story Points</span>
              <span>·</span>
              <span className="capitalize px-2 py-0.5 rounded bg-canvas-subtle border border-border font-medium text-foreground">
                {task.status.replace('_', ' ')}
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 border-t border-border pt-3">
              {[
                { id: 'overview', label: 'Overview', icon: CheckSquare },
                { id: 'subtasks', label: `Subtasks (${task.subtasks.length})`, icon: CheckSquare },
                { id: 'dependencies', label: `DAG Graph (${task.dependencies.blocks.length + task.dependencies.blockedBy.length})`, icon: GitBranch },
                { id: 'comments', label: `Comments (${task.comments.length})`, icon: MessageSquare },
                { id: 'activity', label: 'Audit Log', icon: History },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-primary-subtle text-primary font-bold shadow-xs'
                        : 'text-foreground-muted hover:text-foreground hover:bg-canvas-subtle'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Drawer Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase text-foreground-muted tracking-wider">
                    Task Description & Acceptance Criteria
                  </h3>
                  <div className="p-4 rounded-2xl border border-border bg-canvas text-sm text-foreground leading-relaxed">
                    {task.description ||
                      'Zero-trust server-side Data Access Layer enforcement. Queries must filter by organizationId and verify the active session role against minimum required hierarchy.'}
                  </div>
                </div>

                {/* Subtask Progress Summary */}
                <div className="p-4 rounded-2xl border border-border bg-canvas-subtle/50 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-foreground">Subtask Completion</span>
                    <span className="font-mono font-bold text-foreground">
                      {completedSubtasks} of {task.subtasks.length} ({task.subtasks.length > 0 ? Math.round((completedSubtasks / task.subtasks.length) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{
                        width: `${task.subtasks.length > 0 ? (completedSubtasks / task.subtasks.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SUBTASKS */}
            {activeTab === 'subtasks' && (
              <div className="space-y-4">
                <form onSubmit={addSubtask} className="flex gap-2">
                  <input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add a new checklist subtask..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-3.5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </form>

                <div className="space-y-2">
                  {task.subtasks.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => toggleSubtask(sub.id)}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-canvas hover:bg-surface transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={sub.isCompleted}
                        onChange={() => {}}
                        className="w-4 h-4 rounded text-primary border-border focus:ring-primary cursor-pointer"
                      />
                      <span
                        className={`text-xs font-medium flex-1 ${
                          sub.isCompleted ? 'line-through text-foreground-muted' : 'text-foreground'
                        }`}
                      >
                        {sub.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: DAG DEPENDENCIES */}
            {activeTab === 'dependencies' && (
              <div className="space-y-6">
                {/* DAG Banner */}
                <div className="p-4 rounded-2xl border border-primary/25 bg-primary/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      DAG Cycle Engine Active
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                    Acyclic Verified
                  </span>
                </div>

                {/* Add Dependency Form with Real-time Cycle Detection */}
                <form onSubmit={handleAddDependency} className="p-4 rounded-2xl border border-border bg-surface space-y-3">
                  <h4 className="text-xs font-bold text-foreground">
                    Add Downstream Dependency (This task blocks...)
                  </h4>

                  <div className="flex gap-2">
                    <select
                      value={depTargetId}
                      onChange={(e) => {
                        setDepTargetId(e.target.value);
                        setDagError(null);
                      }}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select a task to block...</option>
                      {allTasks
                        .filter((t) => t.id !== task.id)
                        .map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.key}: {t.title}
                          </option>
                        ))}
                    </select>

                    <button
                      type="submit"
                      disabled={!depTargetId}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Link Edge</span>
                    </button>
                  </div>

                  {dagError && (
                    <div className="p-3 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs flex items-start gap-2 animate-in fade-in">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{dagError}</span>
                    </div>
                  )}
                </form>

                {/* Existing Dependencies Lists */}
                <div className="space-y-4">
                  {/* Tasks Blocked By This Task */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold uppercase text-foreground-muted tracking-wider">
                      Tasks Blocked By {task.key} ({task.dependencies.blocks.length})
                    </h4>
                    {task.dependencies.blocks.length === 0 ? (
                      <p className="text-xs text-foreground-muted italic">No downstream blocked tasks.</p>
                    ) : (
                      task.dependencies.blocks.map((b) => (
                        <div key={b.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-canvas">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-primary">{b.key}</span>
                            <span className="text-xs text-foreground font-medium">{b.title}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-bold uppercase">
                            Blocked
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COMMENTS */}
            {activeTab === 'comments' && (
              <div className="space-y-6">
                <form onSubmit={addComment} className="space-y-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment or update (Markdown supported)..."
                    rows={3}
                    className="w-full p-3 text-xs rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </form>

                <div className="space-y-4">
                  {task.comments.map((comm) => (
                    <div key={comm.id} className="p-4 rounded-2xl border border-border bg-canvas space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] flex items-center justify-center">
                            {comm.initials}
                          </div>
                          <span className="text-xs font-bold text-foreground">{comm.author}</span>
                        </div>
                        <span className="text-[10px] font-mono text-foreground-muted">{comm.createdAt}</span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed pl-8">{comm.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ACTIVITY AUDIT LOG */}
            {activeTab === 'activity' && (
              <div className="space-y-3">
                {task.activityLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-canvas text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{log.actor}</span>
                      <span className="text-foreground-muted">{log.action}</span>
                    </div>
                    <span className="font-mono text-[10px] text-foreground-muted">{log.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
