'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  Bot,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { generateAiExecutiveReportAction } from '@/actions/ai';
import { QuotaUpgradeModal } from '@/components/ai/QuotaUpgradeModal';
import type { ExecutiveReport } from '@/lib/ai-schema';

const DEFAULT_REPORT: ExecutiveReport = {
  title: 'Executive Telemetry & Launch Risk Digest (Sprint 25)',
  executiveSummary:
    'Grounded in 26 tracked tasks across PostgreSQL. Sprint velocity is positive (+18%), with 18 completed items. Zero circular deadlock deadlocks identified across DAG dependency trees.',
  riskScore: 12,
  status: 'healthy',
  criticalBlockers: [
    {
      blocker: 'Stripe Webhook Signature Verification Delay',
      impact: 'Task TP-105 requires Inngest replay queue configuration before public checkout.',
      mitigation: 'Inngest worker handler scheduled for deployment; estimated resolution 24 hours.',
    },
  ],
  recommendedNextSteps: [
    'Deploy fractional-indexing single-row LexoRank mutations to staging database.',
    'Enforce atomic rate-limiting quota check middleware across all generative API routes.',
    'Perform live multi-tenant cross-org permission verification prior to GA.',
  ],
  velocityAnalysis:
    'Completed 34 story points in current sprint against commitment target of 30. Velocity is trending +18% over trailing 5-sprint average.',
};

export default function ReportsPage() {
  const params = useParams();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';

  const [report, setReport] = React.useState<ExecutiveReport>(DEFAULT_REPORT);
  const [generating, setGenerating] = React.useState(false);
  const [upgradeOpen, setUpgradeOpen] = React.useState(false);
  const [quotaInfo, setQuotaInfo] = React.useState({ currentUsage: 7, maxQuota: 10 });
  const [generatedCount, setGeneratedCount] = React.useState(1);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await generateAiExecutiveReportAction({ orgSlug });
      if (!res.success) {
        if (res.upgradeRequired) {
          setQuotaInfo({
            currentUsage: res.currentUsage || 10,
            maxQuota: res.maxQuota || 10,
          });
          setUpgradeOpen(true);
        } else {
          alert(res.error || 'Failed to generate report');
        }
        return;
      }

      if (res.report) {
        setReport(res.report);
        setGeneratedCount((c) => c + 1);
        if (res.currentUsage && res.maxQuota) {
          setQuotaInfo({ currentUsage: res.currentUsage, maxQuota: res.maxQuota });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              AI Executive Reports
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary-subtle text-primary border border-primary/20 font-bold uppercase">
              Gemini 3.1 Pro Grounded
            </span>
          </div>
          <p className="text-sm text-foreground-muted mt-1">
            Synthesizes live completed tasks, overdue items, blockers, and assignee telemetry into actionable executive progress digests.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} />
          <span>{generating ? 'Querying PostgreSQL Telemetry...' : 'Generate Fresh Digest'}</span>
        </button>
      </div>

      {/* Primary Report Card */}
      <div className="p-8 rounded-3xl border border-primary/30 bg-gradient-to-br from-surface to-primary-subtle/20 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
                Weekly Synthesis · Iteration #{generatedCount}
              </span>
            </div>
            <h2 className="text-lg font-bold text-foreground mt-0.5">
              {report.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              HEALTHY · RISK: {report.riskScore} / 100
            </span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase text-foreground-muted tracking-wider">
            Executive Summary (Gemini 3.1 Pro)
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            {report.executiveSummary}
          </p>
        </div>

        {/* Velocity Analysis */}
        <div className="p-4 rounded-2xl border border-border bg-canvas/70 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sprint Velocity &amp; Completion Rate</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600">
              +18% Velocity Delta
            </span>
          </div>
          <p className="text-xs text-foreground-muted leading-relaxed">
            {report.velocityAnalysis}
          </p>
        </div>

        {/* Critical Blockers */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase text-foreground-muted tracking-wider">
            Identified Risks &amp; Critical Blockers
          </h3>
          {report.criticalBlockers.map((b, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 space-y-1 text-xs"
            >
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{b.blocker}</span>
              </div>
              <p className="text-foreground-muted pl-6">{b.impact}</p>
              <p className="text-emerald-700 dark:text-emerald-400 font-medium pl-6 pt-1">
                Mitigation: {b.mitigation}
              </p>
            </div>
          ))}
        </div>

        {/* Recommended Next Steps */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase text-foreground-muted tracking-wider">
            Recommended Next Steps
          </h3>
          <ul className="space-y-2 text-xs text-foreground">
            {report.recommendedNextSteps.map((step, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metadata Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-foreground-muted">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Generated just now via Gemini 3.1 Pro grounded telemetry</span>
          </div>
          <span className="font-mono text-[11px]">Snapshot ID: rep_01j7b82f</span>
        </div>
      </div>

      {/* Quota Upgrade Modal */}
      <QuotaUpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        orgSlug={orgSlug}
        currentUsage={quotaInfo.currentUsage}
        maxQuota={quotaInfo.maxQuota}
      />
    </div>
  );
}
