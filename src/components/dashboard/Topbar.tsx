'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Sparkles,
  Plus,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Check,
} from 'lucide-react';
import { ThemeToggle } from '../shared/ThemeToggle';

interface Persona {
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  initials: string;
  color: string;
}

const PERSONAS: Persona[] = [
  { name: 'Alex Rivera', email: 'alex@acme.corp', role: 'owner', initials: 'AR', color: 'from-indigo-500 to-primary' },
  { name: 'Sarah Chen', email: 'sarah@acme.corp', role: 'admin', initials: 'SC', color: 'from-emerald-500 to-teal-700' },
  { name: 'Marcus Vance', email: 'marcus@acme.corp', role: 'member', initials: 'MV', color: 'from-sky-500 to-blue-700' },
  { name: 'Elena Rostova', email: 'elena@acme.corp', role: 'viewer', initials: 'ER', color: 'from-slate-500 to-slate-700' },
];

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';

  const [activePersona, setActivePersona] = React.useState<Persona>(PERSONAS[0]);
  const [profileOpen, setProfileOpen] = React.useState(false);

  // Format breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const isLast = idx === segments.length - 1;
    const label = seg === orgSlug ? (orgSlug === 'acme-corp' ? 'Acme Corp' : 'NextGen Labs') : seg.charAt(0).toUpperCase() + seg.slice(1);
    return { href, label, isLast };
  });

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Menu + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="lg:hidden p-2 rounded-lg border border-border bg-surface text-foreground-muted hover:text-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-foreground-muted">
          {breadcrumbItems.map((item, idx) => (
            <React.Fragment key={item.href}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-foreground-muted/60" />}
              {item.isLast ? (
                <span className="font-semibold text-foreground truncate max-w-[140px]">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors truncate max-w-[120px]"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Quick actions, ⌘K search, notifications, theme, profile */}
      <div className="flex items-center gap-2.5">
        {/* Command Palette Trigger */}
        <button
          onClick={() => {
            window.dispatchEvent(
              new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
            );
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-canvas-subtle hover:bg-surface text-foreground-muted hover:text-foreground text-xs transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Quick actions...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-surface border border-border text-foreground-muted">
            ⌘K
          </kbd>
        </button>

        {/* AI Planner Shortcut */}
        <Link
          href={`/${orgSlug}/projects/new`}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-xs font-semibold transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>AI Architect</span>
        </Link>

        {/* New Task Trigger */}
        <Link
          href={`/${orgSlug}/projects/TP/kanban`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Task</span>
        </Link>

        <div className="h-4 w-px bg-border mx-1" />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile & Zero-Trust RBAC Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1 p-1 rounded-xl hover:bg-canvas-subtle transition-colors cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full bg-gradient-to-tr ${activePersona.color} text-white font-semibold text-xs flex items-center justify-center border border-border shadow-xs`}
            >
              {activePersona.initials}
            </div>
            <div className="hidden xl:block text-left">
              <span className="block text-xs font-semibold text-foreground leading-none">
                {activePersona.name}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold leading-none">
                  {activePersona.role}
                </span>
              </div>
            </div>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-border bg-surface shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-xs font-bold text-foreground">{activePersona.name}</p>
                  <p className="text-[11px] font-mono text-foreground-muted">{activePersona.email}</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-mono uppercase font-bold text-primary">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Role: {activePersona.role}</span>
                  </div>
                </div>

                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-foreground-muted">
                  Switch RBAC Persona (Testing)
                </div>

                {PERSONAS.map((p) => {
                  const isSelected = p.role === activePersona.role;
                  return (
                    <button
                      key={p.role}
                      onClick={() => {
                        setActivePersona(p);
                        setProfileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-canvas-subtle transition-colors cursor-pointer ${
                        isSelected ? 'font-bold text-primary' : 'text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-tr ${p.color} text-white font-bold text-[10px] flex items-center justify-center`}
                        >
                          {p.initials}
                        </div>
                        <div>
                          <span>{p.name}</span>
                          <span className="block text-[10px] font-mono uppercase text-foreground-muted">
                            {p.role}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                    </button>
                  );
                })}

                <div className="my-1 border-t border-border" />

                <Link
                  href="/sign-in"
                  onClick={() => setProfileOpen(false)}
                  className="block px-4 py-1.5 text-xs text-rose-600 hover:bg-rose-500/10 transition-colors"
                >
                  Sign Out of Session
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
