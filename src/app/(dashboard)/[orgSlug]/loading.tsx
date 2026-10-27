import * as React from 'react';

export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-canvas-subtle rounded-xl" />
          <div className="h-4 w-72 bg-canvas-subtle/70 rounded-lg" />
        </div>
        <div className="h-9 w-32 bg-canvas-subtle rounded-xl" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 bg-canvas-subtle rounded-md" />
              <div className="w-4 h-4 rounded-full bg-canvas-subtle" />
            </div>
            <div className="h-8 w-16 bg-canvas-subtle rounded-lg" />
            <div className="h-3 w-32 bg-canvas-subtle/60 rounded-md" />
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl border border-border bg-surface h-80" />
        <div className="p-6 rounded-3xl border border-border bg-surface h-80" />
      </div>
    </div>
  );
}
