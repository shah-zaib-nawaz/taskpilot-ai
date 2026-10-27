'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Kanban,
  ListTodo,
  Calendar,
  Layers,
  BarChart3,
  Bot,
  Users,
  CreditCard,
  Sparkles,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import Image from 'next/image';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean; setMobileOpen?: (open: boolean) => void }) {
  const pathname = usePathname();
  const params = useParams();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';

  const navItems: { section: string; items: NavItem[] }[] = [
    {
      section: 'Workspaces',
      items: [
        { title: 'Overview', href: `/${orgSlug}`, icon: LayoutDashboard },
        { title: 'Projects', href: `/${orgSlug}/projects`, icon: FolderKanban },
      ],
    },
    {
      section: 'Project Views (TP-Core)',
      items: [
        { title: 'Kanban Board', href: `/${orgSlug}/projects/TP/kanban`, icon: Kanban },
        { title: 'List & Backlog', href: `/${orgSlug}/projects/TP/list`, icon: ListTodo },
        { title: 'Calendar', href: `/${orgSlug}/projects/TP/calendar`, icon: Calendar },
        { title: 'Roadmap & Gantt', href: `/${orgSlug}/projects/TP/roadmap`, icon: Layers },
      ],
    },
    {
      section: 'Intelligence & Telemetry',
      items: [
        { title: 'AI Architect Planner', href: `/${orgSlug}/projects/new`, icon: Bot, badge: 'Gemini' },
        { title: 'AI Executive Reports', href: `/${orgSlug}/reports`, icon: Sparkles, badge: 'Pro' },
        { title: 'Sprint Analytics', href: `/${orgSlug}/analytics`, icon: BarChart3 },
      ],
    },
    {
      section: 'Organization',
      items: [
        { title: 'Members & RBAC', href: `/${orgSlug}/settings/members`, icon: Users },
        { title: 'Billing & Quotas', href: `/${orgSlug}/settings/billing`, icon: CreditCard },
      ],
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-surface border-r border-border text-foreground">
      {/* Brand & Workspace Switcher */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-center justify-between">
          <Link href={`/${orgSlug}`} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-primary/30 flex items-center justify-center">
              <Image src="/assets/logo.svg" alt="TaskPilot Logo" width={32} height={32} />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
                TaskPilot<span className="text-primary font-mono text-xs ml-1">AI</span>
              </span>
              <span className="block text-[10px] text-foreground-muted uppercase tracking-widest font-mono">
                Antigravity 2.0
              </span>
            </div>
          </Link>
          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 rounded-md text-foreground-muted hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <WorkspaceSwitcher />
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navItems.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[11px] font-semibold text-foreground-muted uppercase tracking-wider font-mono">
              {section.section}
            </h3>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-subtle text-primary font-semibold shadow-xs'
                      : 'text-foreground-muted hover:text-foreground hover:bg-canvas-subtle'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-foreground-muted'}`} />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-canvas-subtle border border-border text-foreground-muted'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* AI Quota Meter in Footer */}
      <div className="p-3 border-t border-border bg-canvas-subtle/50">
        <div className="p-3 rounded-xl border border-border bg-surface space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AI Quota</span>
            </div>
            <span className="tabular-nums font-mono text-[11px] text-foreground-muted font-bold">
              7 / 10 used
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: '70%' }} />
          </div>

          <p className="text-[11px] text-foreground-muted leading-tight">
            Free tier resets on 1st of next month.
          </p>

          <Link
            href={`/${orgSlug}/settings/billing`}
            className="w-full flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Upgrade to Pro</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileOpen && setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 z-50 shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
