'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Search,
  Kanban,
  ListTodo,
  Calendar,
  Layers,
  BarChart3,
  Bot,
  Settings,
  Users,
  CreditCard,
  PlusCircle,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../shared/ThemeProvider';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const router = useRouter();
  const params = useParams();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const items = [
    {
      label: 'Kanban Board',
      icon: Kanban,
      group: 'Views',
      action: () => router.push(`/${orgSlug}/projects/TP/kanban`),
    },
    {
      label: 'Task List & Backlog',
      icon: ListTodo,
      group: 'Views',
      action: () => router.push(`/${orgSlug}/projects/TP/list`),
    },
    {
      label: 'Calendar View',
      icon: Calendar,
      group: 'Views',
      action: () => router.push(`/${orgSlug}/projects/TP/calendar`),
    },
    {
      label: 'Roadmap & Gantt Timeline',
      icon: Layers,
      group: 'Views',
      action: () => router.push(`/${orgSlug}/projects/TP/roadmap`),
    },
    {
      label: 'AI Project Architect Planner',
      icon: Bot,
      group: 'AI & Automations',
      action: () => router.push(`/${orgSlug}/projects/new`),
    },
    {
      label: 'AI Executive Reports',
      icon: BarChart3,
      group: 'AI & Automations',
      action: () => router.push(`/${orgSlug}/reports`),
    },
    {
      label: 'Sprint Telemetry Analytics',
      icon: BarChart3,
      group: 'Analytics',
      action: () => router.push(`/${orgSlug}/analytics`),
    },
    {
      label: 'Team Members & RBAC Roles',
      icon: Users,
      group: 'Settings',
      action: () => router.push(`/${orgSlug}/settings/members`),
    },
    {
      label: 'Subscription & AI Quota Billing',
      icon: CreditCard,
      group: 'Settings',
      action: () => router.push(`/${orgSlug}/settings/billing`),
    },
    {
      label: `Toggle Theme (Current: ${resolvedTheme})`,
      icon: resolvedTheme === 'dark' ? Sun : Moon,
      group: 'Preferences',
      action: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="w-5 h-5 text-foreground-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, view, or action..."
            autoFocus
            className="flex-1 bg-transparent text-foreground placeholder:text-foreground-muted text-sm outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-canvas-subtle border border-border text-foreground-muted">
            ESC
          </kbd>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-canvas-subtle text-foreground-muted hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-foreground-muted">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm hover:bg-primary-subtle hover:text-primary transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="text-[11px] text-foreground-muted uppercase tracking-wider font-mono">
                    {item.group}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 bg-canvas-subtle text-[11px] text-foreground-muted">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1 py-0.5 rounded bg-surface border border-border">↑</kbd>
            <kbd className="px-1 py-0.5 rounded bg-surface border border-border">↓</kbd>
            <span>Select:</span>
            <kbd className="px-1 py-0.5 rounded bg-surface border border-border">↵</kbd>
          </div>
          <span>TaskPilot Command Center</span>
        </div>
      </div>
    </div>
  );
}
