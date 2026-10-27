'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Check, ChevronsUpDown, Building2, Plus, Sparkles } from 'lucide-react';

interface OrgOption {
  name: string;
  slug: string;
  plan: 'free' | 'pro';
  role: string;
}

const DEMO_ORGS: OrgOption[] = [
  { name: 'Acme Corp', slug: 'acme-corp', plan: 'pro', role: 'Owner' },
  { name: 'NextGen Labs', slug: 'nextgen-labs', plan: 'free', role: 'Member' },
  { name: 'Personal Studio', slug: 'personal-studio', plan: 'free', role: 'Owner' },
];

export function WorkspaceSwitcher() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const params = useParams();
  const currentSlug = (params?.orgSlug as string) || 'acme-corp';

  const currentOrg = DEMO_ORGS.find((o) => o.slug === currentSlug) || DEMO_ORGS[0];

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/${slug}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-2 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-colors text-left group"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
            {currentOrg.name.charAt(0)}
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-foreground truncate">
                {currentOrg.name}
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold ${
                  currentOrg.plan === 'pro'
                    ? 'bg-primary-subtle text-primary border border-primary/20'
                    : 'bg-canvas-subtle text-foreground-muted border border-border'
                }`}
              >
                {currentOrg.plan}
              </span>
            </div>
            <p className="text-xs text-foreground-muted truncate capitalize">
              {currentOrg.role}
            </p>
          </div>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-foreground-muted group-hover:text-foreground shrink-0 transition-colors" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1.5 w-full z-40 rounded-xl border border-border bg-surface shadow-xl py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-foreground-muted tracking-wider">
              Workspaces
            </div>

            {DEMO_ORGS.map((org) => {
              const isSelected = org.slug === currentOrg.slug;
              return (
                <button
                  key={org.slug}
                  onClick={() => handleSelect(org.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-canvas-subtle transition-colors cursor-pointer ${
                    isSelected ? 'font-semibold text-primary' : 'text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-foreground-muted" />
                    <span>{org.name}</span>
                    <span className="text-[10px] font-mono uppercase px-1 rounded bg-canvas-subtle border border-border text-foreground-muted">
                      {org.plan}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-primary" />}
                </button>
              );
            })}

            <div className="my-1 border-t border-border" />

            <button
              onClick={() => {
                setOpen(false);
                router.push(`/${currentSlug}/settings/members`);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-foreground-muted hover:text-foreground hover:bg-canvas-subtle transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Workspace</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
