'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreHorizontal } from 'lucide-react';
import { KanbanCard } from './KanbanCard';
import type { TaskData } from './TaskDetailDrawer';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: TaskData[];
  onCardClick: (task: TaskData) => void;
}

export function KanbanColumn({ id, title, tasks, onCardClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-canvas-subtle/50 rounded-2xl border transition-colors p-3 space-y-3 min-h-[520px] flex flex-col ${
        isOver ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-border'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
            {title}
          </h3>
          <span className="tabular-nums font-mono text-[11px] px-1.5 py-0.2 rounded-full bg-surface border border-border text-foreground-muted font-bold">
            {tasks.length}
          </span>
        </div>
        <button className="p-1 rounded text-foreground-muted hover:text-foreground">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Column Task Cards */}
      <div className="space-y-2.5 flex-1">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onClick={onCardClick} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="h-32 border-2 border-dashed border-border/80 rounded-xl flex items-center justify-center text-xs text-foreground-muted">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  );
}
