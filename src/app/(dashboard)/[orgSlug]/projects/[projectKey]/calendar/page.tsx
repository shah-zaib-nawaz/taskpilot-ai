'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function CalendarViewPage() {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-border shadow-xs">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <h2 className="text-base font-bold text-foreground">November 2026</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button className="p-1.5 rounded-lg border border-border bg-surface hover:bg-canvas-subtle text-foreground-muted hover:text-foreground">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-canvas-subtle text-foreground">
            Today
          </button>
          <button className="p-1.5 rounded-lg border border-border bg-surface hover:bg-canvas-subtle text-foreground-muted hover:text-foreground">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-xs">
        <div className="grid grid-cols-7 border-b border-border bg-canvas-subtle text-center text-xs font-mono font-bold text-foreground-muted py-2">
          {DAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-border min-h-[460px]">
          {Array.from({ length: 35 }).map((_, i) => {
            const dayNum = ((i + 2) % 31) + 1;
            const hasTask1 = dayNum === 3;
            const hasTask2 = dayNum === 4;
            const hasTask3 = dayNum === 6;

            return (
              <div key={i} className="p-2 min-h-[90px] space-y-1 bg-surface hover:bg-canvas-subtle/40 transition-colors">
                <span className="text-xs font-mono font-semibold text-foreground-muted">{dayNum}</span>
                {hasTask1 && (
                  <div className="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-semibold truncate">
                    TP-103: LexoRank O(1)
                  </div>
                )}
                {hasTask2 && (
                  <div className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold truncate">
                    TP-101: Better Auth RBAC
                  </div>
                )}
                {hasTask3 && (
                  <div className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold truncate">
                    TP-104: Vercel AI SDK 7
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
