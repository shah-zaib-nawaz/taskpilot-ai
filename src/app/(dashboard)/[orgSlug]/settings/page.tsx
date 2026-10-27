import * as React from 'react';
import Link from 'next/link';
import { Users, CreditCard, Shield, ArrowRight, Building, Sparkles } from 'lucide-react';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Organization Settings
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Configure organization workspace parameters, zero-trust RBAC roles, and subscription tier.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold font-mono">
          <Building className="w-3.5 h-3.5" />
          <span>Slug: /{orgSlug}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Members & RBAC Card */}
        <Link
          href={`/${orgSlug}/settings/members`}
          className="p-6 rounded-3xl border border-border bg-surface hover:border-primary/40 transition-all space-y-4 group shadow-xs cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Team Members &amp; RBAC</h2>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-colors" />
            </div>
            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
              Invite teammates, configure 4-tier roles (Owner, Admin, Member, Viewer), and inspect zero-trust server guards.
            </p>
          </div>
          <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
            <span>4 Active Members</span>
            <span className="text-primary font-semibold">Manage Roles →</span>
          </div>
        </Link>

        {/* Billing & Quotas Card */}
        <Link
          href={`/${orgSlug}/settings/billing`}
          className="p-6 rounded-3xl border border-border bg-surface hover:border-primary/40 transition-all space-y-4 group shadow-xs cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Subscription &amp; Stripe Billing</h2>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-emerald-600 transition-colors" />
            </div>
            <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
              Manage Stripe customer portal, inspect Inngest durable webhooks, and track Gemini AI generation rate ceilings.
            </p>
          </div>
          <div className="pt-2 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
            <span>Pro Tier ($29/mo)</span>
            <span className="text-emerald-600 font-semibold">142/500 Used →</span>
          </div>
        </Link>
      </div>

      {/* Organization Meta Details */}
      <div className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
        <h3 className="text-base font-bold text-foreground">Organization Metadata</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl border border-border bg-canvas-subtle space-y-1">
            <span className="text-foreground-muted uppercase text-[10px]">Organization Name</span>
            <p className="text-foreground font-bold text-sm">Acme Corp</p>
          </div>
          <div className="p-3.5 rounded-xl border border-border bg-canvas-subtle space-y-1">
            <span className="text-foreground-muted uppercase text-[10px]">URL Identifier</span>
            <p className="text-foreground font-bold text-sm">acme-corp</p>
          </div>
          <div className="p-3.5 rounded-xl border border-border bg-canvas-subtle space-y-1">
            <span className="text-foreground-muted uppercase text-[10px]">Security Engine</span>
            <p className="text-emerald-600 font-bold text-sm">Zero-Trust DAL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
