'use client';

import * as React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [annual, setAnnual] = React.useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Transparent SaaS Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Scale your engineering roadmaps without friction.
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted">
          Start on the Free tier with your team, or upgrade to Pro for unlimited projects, high-volume Gemini AI generations, and advanced telemetry digests.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!annual ? 'text-foreground' : 'text-foreground-muted'}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            aria-label="Toggle annual billing"
            className="w-12 h-6 rounded-full bg-border p-1 relative transition-colors cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full bg-primary transition-transform ${
                annual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold ${annual ? 'text-foreground' : 'text-foreground-muted'}`}>
              Annual
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan Card */}
        <div className="p-8 rounded-3xl border border-border bg-surface shadow-xs space-y-8 flex flex-col justify-between hover:border-slate-400 transition-colors">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Free Tier</h2>
              <p className="text-xs text-foreground-muted">
                Ideal for individuals and small teams exploring AI-assisted roadmapping.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground tabular-nums">$0</span>
              <span className="text-xs text-foreground-muted font-medium">/ month forever</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-border text-sm text-foreground">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Up to <strong>2 active projects</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Up to <strong>5 team members</strong> per workspace</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>10 AI generations / month</strong> (Gemini 3.6 Flash)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Drag-and-Drop Kanban with LexoRank ordering</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>DAG cycle detection for task dependencies</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>List, Calendar & Roadmap views</span>
              </li>
            </ul>
          </div>

          <Link
            href="/acme-corp"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-canvas-subtle hover:bg-surface text-foreground text-sm font-semibold transition-colors"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pro Plan Card */}
        <div className="p-8 rounded-3xl border-2 border-primary bg-surface shadow-xl space-y-8 flex flex-col justify-between relative overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-bl-xl">
            Recommended
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">Pro Tier</h2>
                <Zap className="w-4 h-4 text-primary fill-primary" />
              </div>
              <p className="text-xs text-foreground-muted">
                For scaling product and engineering orgs requiring deep telemetry & unlimited power.
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground tabular-nums">
                ${annual ? '24' : '29'}
              </span>
              <span className="text-xs text-foreground-muted font-medium">
                / user / month {annual && '(billed annually)'}
              </span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-border text-sm text-foreground">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span><strong>Unlimited active projects</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span><strong>Unlimited workspace members</strong></span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span><strong>500 AI generations / month</strong> (Gemini 3.1 Pro + 3.6 Flash)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Automated weekly AI executive risk reports</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Zero-Trust 4-Tier RBAC (Owner, Admin, Member, Viewer)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Stripe Customer Billing Portal & signature-verified webhooks</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span>Dedicated 24/7 priority support & SLA guarantee</span>
              </li>
            </ul>
          </div>

          <Link
            href="/acme-corp/settings/billing"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md transition-colors"
          >
            <span>Upgrade to Pro ($29/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="max-w-5xl mx-auto space-y-6 pt-12 border-t border-border">
        <h3 className="text-2xl font-bold text-foreground tracking-tight text-center">
          Detailed Feature Comparison
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-canvas-subtle text-xs text-foreground-muted uppercase font-mono">
              <tr>
                <th className="py-3 px-6">Capability</th>
                <th className="py-3 px-6">Free Tier</th>
                <th className="py-3 px-6">Pro Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-foreground">
              <tr>
                <td className="py-3.5 px-6 font-medium">Active Projects</td>
                <td className="py-3.5 px-6 text-foreground-muted">2 projects</td>
                <td className="py-3.5 px-6 font-semibold text-primary">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">Workspace Seats</td>
                <td className="py-3.5 px-6 text-foreground-muted">5 members</td>
                <td className="py-3.5 px-6 font-semibold text-primary">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">AI Generation Quota</td>
                <td className="py-3.5 px-6 text-foreground-muted">10 / month</td>
                <td className="py-3.5 px-6 font-semibold text-primary">500 / month</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">AI Planner Model</td>
                <td className="py-3.5 px-6 text-foreground-muted">Gemini 3.6 Flash</td>
                <td className="py-3.5 px-6 font-semibold text-primary">Gemini 3.1 Pro & Flash</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">Fractional Indexing Kanban</td>
                <td className="py-3.5 px-6 text-emerald-600 font-semibold">✓ Included</td>
                <td className="py-3.5 px-6 text-emerald-600 font-semibold">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">DAG Cycle Detection</td>
                <td className="py-3.5 px-6 text-emerald-600 font-semibold">✓ Included</td>
                <td className="py-3.5 px-6 text-emerald-600 font-semibold">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">AI Executive Progress Reports</td>
                <td className="py-3.5 px-6 text-foreground-muted">Basic summary</td>
                <td className="py-3.5 px-6 font-semibold text-primary">Full live telemetry & risk scores</td>
              </tr>
              <tr>
                <td className="py-3.5 px-6 font-medium">Zero-Trust Server RBAC</td>
                <td className="py-3.5 px-6 text-foreground-muted">Member / Viewer</td>
                <td className="py-3.5 px-6 font-semibold text-primary">Owner, Admin, Member, Viewer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
