'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Kanban, ListTodo, Calendar, Layers, Sparkles, Filter } from 'lucide-react';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';
  const projectKey = (params?.projectKey as string) || 'TP';

  const views = [
    { label: 'Kanban', href: `/${orgSlug}/projects/${projectKey}/kanban`, icon: Kanban },
    { label: 'List', href: `/${orgSlug}/projects/${projectKey}/list`, icon: ListTodo },
    { label: 'Calendar', href: `/${orgSlug}/projects/${projectKey}/calendar`, icon: Calendar },
    { label: 'Roadmap & Gantt', href: `/${orgSlug}/projects/${projectKey}/roadmap`, icon: Layers },
  ];

  return (
    <div className="space-y-6">
      {/* Project Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center shadow-xs">
            {projectKey}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                TaskPilot Core SaaS Launch
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                Active Sprint
              </span>
            </div>
            <p className="text-xs text-foreground-muted">
              Project Key: <span className="font-mono font-semibold text-foreground">{projectKey}</span> · 26 tasks total
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-canvas-subtle self-start sm:self-auto">
          {views.map((v) => {
            const Icon = v.icon;
            const isActive = pathname.startsWith(v.href);
            return (
              <Link
                key={v.href}
                href={v.href}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-surface text-primary shadow-xs'
                    : 'text-foreground-muted hover:text-foreground hover:bg-surface/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-foreground-muted'}`} />
                <span>{v.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* View Content */}
      <div>{children}</div>
    </div>
  );
}
