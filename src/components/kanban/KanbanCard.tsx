'use client';

import * as React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, GitBranch } from 'lucide-react';
import type { TaskData } from './TaskDetailDrawer';

interface KanbanCardProps {
  task: TaskData;
  onClick: (task: TaskData) => void;
}

export function KanbanCard({ task, onClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const completedSubtasks = task.subtasks.filter((s) => s.isCompleted).length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
      className="p-3.5 rounded-xl border border-border bg-surface shadow-xs hover:border-primary/40 hover:shadow-sm transition-all space-y-3 cursor-grab active:cursor-grabbing group select-none"
    >
      {/* Task Key & Priority Badge */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold text-foreground-muted">
          {task.key}
        </span>
        <span
          className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
            task.priority === 'urgent'
              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
              : task.priority === 'high'
              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
              : 'bg-canvas-subtle text-foreground-muted border border-border'
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Title */}
      <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
        {task.title}
      </p>

      {/* Subtask Progress */}
      {task.subtasks.length > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-foreground-muted font-mono">
            <span>Subtasks</span>
            <span>
              {completedSubtasks}/{task.subtasks.length}
            </span>
          </div>
          <div className="w-full h-1 rounded-full bg-canvas-subtle overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{
                width: `${(completedSubtasks / task.subtasks.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Footer: Points, Date, Assignee */}
      <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[11px] text-foreground-muted">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-foreground">
            {task.storyPoints} pts
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-foreground-muted" />
            <span>{task.dueDate}</span>
          </span>
          {(task.dependencies.blocks.length > 0 || task.dependencies.blockedBy.length > 0) && (
            <span title="DAG dependencies linked">
              <GitBranch className="w-3 h-3 text-primary" />
            </span>
          )}
        </div>

        <div
          className={`w-6 h-6 rounded-full ${task.assignee.color} text-white font-bold text-[10px] flex items-center justify-center`}
          title={task.assignee.name}
        >
          {task.assignee.initials}
        </div>
      </div>
    </div>
  );
}
