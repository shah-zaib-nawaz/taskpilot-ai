import * as React from 'react';

export default function KanbanLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Kanban header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 w-36 bg-canvas-subtle rounded-xl" />
          <div className="h-4 w-64 bg-canvas-subtle/70 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-28 bg-canvas-subtle rounded-xl" />
          <div className="h-9 w-32 bg-canvas-subtle rounded-xl" />
        </div>
      </div>

      {/* 4 Column Kanban Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {['Backlog', 'To Do', 'In Progress', 'Done'].map((col) => (
          <div key={col} className="p-3.5 rounded-2xl bg-surface border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-canvas-subtle rounded-md" />
              <div className="h-4 w-6 bg-canvas-subtle rounded-md" />
            </div>

            {[1, 2, 3].map((card) => (
              <div key={card} className="p-4 rounded-xl border border-border bg-canvas-subtle/40 space-y-2">
                <div className="h-3 w-16 bg-canvas-subtle rounded" />
                <div className="h-4 w-full bg-canvas-subtle rounded" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-3 w-12 bg-canvas-subtle rounded" />
                  <div className="w-5 h-5 rounded-full bg-canvas-subtle" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
