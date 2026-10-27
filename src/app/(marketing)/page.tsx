import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Kanban,
  ShieldCheck,
  Zap,
  GitBranch,
  BarChart3,
  Bot,
  Lock,
  Layers,
  CheckCircle2,
  Database,
  Cpu,
  CreditCard,
  Palette,
  Terminal,
} from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        {/* Release Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>Google Antigravity 2.0 Multi-Agent Edition · Late 2026 Standards</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.08]">
          The AI-Native Project Management SaaS for Modern Engineering Teams.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed font-normal">
          Convert high-level goals into structured roadmaps, manage task workflows via real-time Kanban boards with <span className="font-mono text-primary font-bold">O(1)</span> fractional indexing, enforce zero-trust role security, and synthesize executive progress digests grounded in live PostgreSQL telemetry.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/acme-corp"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md hover:shadow-indigo-500/25 transition-all"
          >
            <span>Launch Live Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground text-sm font-semibold transition-all shadow-xs"
          >
            <span>Compare Plans ($29/mo)</span>
          </Link>
        </div>

        {/* Product Visual Container */}
        <div className="pt-10 max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border bg-surface/80 backdrop-blur-sm shadow-2xl p-2 sm:p-4 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-indigo-500/10 pointer-events-none rounded-2xl" />
            <Image
              src="/assets/hero-dashboard.svg"
              alt="TaskPilot AI Dashboard Preview"
              width={1200}
              height={720}
              className="w-full h-auto rounded-xl shadow-inner transition-transform duration-500 group-hover:scale-[1.005]"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
            Engineering Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Engineered for high velocity, zero deadlocks, and verifiable telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">AI Project Architect</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Transforms natural language briefs into structured epics, subtasks, relative deadlines, and story points using Vercel AI SDK 7 structured outputs with Gemini 3.6 Flash.
            </p>
            <div className="pt-2 text-xs font-mono text-primary font-semibold">
              Output.object({'{ schema }'}) · Atomic commit
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Kanban className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">O(1) Fractional Indexing</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Powered by @dnd-kit and LexoRank midpoint calculations. Moving or reordering cards mutates strictly 1 row in PostgreSQL, paired with React 19 useOptimistic instant UI updates.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Zero column shifts · Instant updates
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">DAG Dependency Engine</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Maps blocking and blocked-by dependencies with Depth-First Search cycle detection. Circular deadlocks are mathematically blocked before database transactions commit.
            </p>
            <div className="pt-2 text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold">
              Topological sort · Zero deadlock risk
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Zero-Trust Server RBAC</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              4-tier permissions (Owner, Admin, Member, Viewer) validated on every Server Action via the Data Access Layer (requireWorkspaceAccess). Never trusts hidden client controls.
            </p>
            <div className="pt-2 text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
              Better Auth 1.7+ · Centralized DAL
            </div>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">AI Executive Digests</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Passes live completed, overdue, and blocked task telemetry from PostgreSQL into Gemini 3.1 Pro to generate risk scores (0–100), critical bottlenecks, and strategic next steps.
            </p>
            <div className="pt-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
              Gemini 3.1 Pro · Live SQL grounding
            </div>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-xs space-y-4 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Synchronized Multi-Views</h3>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Seamlessly switch between Kanban board, List &amp; Backlog, Month/Week Calendar, and Phase Roadmap Gantt views with URL-synchronized filtering powered by nuqs.
            </p>
            <div className="pt-2 text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
              nuqs search params · Shareable URLs
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Production Specifications Section */}
      <section id="architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-surface via-surface to-canvas-subtle p-8 sm:p-12 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold tracking-wide">
                <Terminal className="w-3.5 h-3.5" />
                <span>Google Antigravity 2.0 Multi-Agent Edition · Late 2026 Standards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Built strictly to 2026 production specifications.
              </h2>
            </div>
            <p className="text-xs text-foreground-muted font-mono">
              Zero legacy patterns · Strict ESM · Dynamic IO
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-left">
            {/* Framework */}
            <div className="p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all space-y-2 group shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider font-semibold">
                Framework
              </span>
              <p className="text-base font-bold text-foreground">Next.js 16.4</p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                React 19.3 &amp; Turbopack
              </p>
            </div>

            {/* Styling */}
            <div className="p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all space-y-2 group shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider font-semibold">
                Styling
              </span>
              <p className="text-base font-bold text-foreground">Tailwind CSS v4</p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                CSS-first @theme
              </p>
            </div>

            {/* Database */}
            <div className="p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all space-y-2 group shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider font-semibold">
                Database
              </span>
              <p className="text-base font-bold text-foreground">Drizzle ORM v1.0</p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Neon Serverless SQL
              </p>
            </div>

            {/* Authentication */}
            <div className="p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all space-y-2 group shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider font-semibold">
                Authentication
              </span>
              <p className="text-base font-bold text-foreground">Better Auth 1.7+</p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Multi-tenant Org Plugin
              </p>
            </div>

            {/* AI Engine */}
            <div className="p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all space-y-2 group shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider font-semibold">
                AI Engine
              </span>
              <p className="text-base font-bold text-foreground">Vercel AI SDK 7</p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Gemini 3.1 Pro / 3.6 Flash
              </p>
            </div>

            {/* Billing */}
            <div className="p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all space-y-2 group shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider font-semibold">
                Billing
              </span>
              <p className="text-base font-bold text-foreground">Stripe &amp; Inngest</p>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Durable Webhooks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Launch Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Ready to experience the next evolution of project management?
        </h2>
        <p className="text-foreground-muted text-base max-w-xl mx-auto">
          Explore the live interactive demo workspace or upgrade to Pro to unlock unlimited projects and 500 AI generations/month.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/acme-corp"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-md transition-colors"
          >
            <span>Open Acme Corp Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="px-6 py-3.5 rounded-xl border border-border bg-surface hover:bg-surface-hover text-foreground text-sm font-semibold transition-colors"
          >
            View Pricing Plans
          </Link>
        </div>
      </section>
    </div>
  );
}
