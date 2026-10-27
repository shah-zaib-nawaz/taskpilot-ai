'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Sparkles, Bot, ArrowRight, Wand2, ShieldAlert, Zap, RotateCcw } from 'lucide-react';
import { generateAiProjectPlanAction, testQuotaExhaustionAction, testResetQuotaAction } from '@/actions/ai';
import { AiPlanReviewModal } from '@/components/ai/AiPlanReviewModal';
import { QuotaUpgradeModal } from '@/components/ai/QuotaUpgradeModal';
import type { ProjectPlan } from '@/lib/ai-schema';

export default function NewProjectPage() {
  const params = useParams();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';

  const [prompt, setPrompt] = React.useState(
    'Build a real-time collaborative document editor with WebSocket synchronization, offline draft storage, and end-to-end encryption in 6 weeks with 4 engineers.'
  );
  const [teamSize, setTeamSize] = React.useState('4');
  const [durationWeeks, setDurationWeeks] = React.useState('6');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [plan, setPlan] = React.useState<ProjectPlan | null>(null);
  const [reviewOpen, setReviewOpen] = React.useState(false);
  const [upgradeOpen, setUpgradeOpen] = React.useState(false);
  const [quotaInfo, setQuotaInfo] = React.useState<{ currentUsage: number; maxQuota: number }>({
    currentUsage: 7,
    maxQuota: 10,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const res = await generateAiProjectPlanAction({
        orgSlug,
        prompt,
        teamSize,
        durationWeeks,
      });

      if (!res.success) {
        if (res.upgradeRequired) {
          setQuotaInfo({
            currentUsage: res.currentUsage || 10,
            maxQuota: res.maxQuota || 10,
          });
          setUpgradeOpen(true);
        } else {
          alert(res.error || 'Failed to generate plan');
        }
        return;
      }

      if (res.plan) {
        setPlan(res.plan);
        if (res.currentUsage && res.maxQuota) {
          setQuotaInfo({ currentUsage: res.currentUsage, maxQuota: res.maxQuota });
        }
        setReviewOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSimulateExhaustion = async () => {
    await testQuotaExhaustionAction({ orgSlug });
    setQuotaInfo({ currentUsage: 10, maxQuota: 10 });
    setUpgradeOpen(true);
  };

  const handleResetQuota = async () => {
    await testResetQuotaAction({ orgSlug });
    setQuotaInfo({ currentUsage: 0, maxQuota: 10 });
    alert('AI quota reset to 0 / 10 used.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-subtle text-primary border border-primary/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vercel AI SDK 7 + Gemini 3.6 Flash / 3.1 Pro</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          AI Project Architect Planner
        </h1>
        <p className="text-sm text-foreground-muted">
          Provide your product brief or goal. Gemini decomposes it into sequential phases, tasks, story point estimates, and DAG dependency chains.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="p-6 sm:p-8 rounded-3xl border border-border bg-surface shadow-xs space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">
            Project Brief / Product Requirements (PRD)
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full p-4 rounded-2xl border border-border bg-canvas text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary leading-relaxed"
            placeholder="Describe what you want to build, target deadlines, constraints, and architecture..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Team Size (Engineers)</label>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-foreground text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Target Duration (Weeks)</label>
            <input
              type="number"
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-border bg-canvas text-foreground text-sm"
            />
          </div>
        </div>

        {/* Quota & Guard Notice Bar */}
        <div className="p-4 rounded-xl border border-border bg-canvas-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-foreground-muted">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>
              Monthly AI Quota: <strong className="text-foreground">{quotaInfo.currentUsage} / {quotaInfo.maxQuota} used</strong> on Free Plan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSimulateExhaustion}
              className="px-2.5 py-1 text-[11px] rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold hover:bg-amber-500/20 transition-colors cursor-pointer"
            >
              Test Quota Exhaustion
            </button>
            <button
              type="button"
              onClick={handleResetQuota}
              className="p-1 rounded-lg text-foreground-muted hover:text-foreground hover:bg-canvas-subtle transition-colors cursor-pointer"
              title="Reset quota counter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Decomposing Tasks with Gemini 3.6 Flash...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Synthesize Roadmap &amp; Tasks</span>
            </>
          )}
        </button>
      </form>

      <div className="p-6 rounded-2xl border border-border bg-surface text-center space-y-3">
        <div className="w-full h-36 relative flex items-center justify-center">
          <Image
            src="/assets/ai-planner-idle.svg"
            alt="AI Planner Idle State"
            width={200}
            height={130}
            className="object-contain"
          />
        </div>
        <p className="text-xs text-foreground-muted max-w-md mx-auto">
          Generated roadmaps are staged in an interactive <strong>&quot;Review, Edit &amp; Commit&quot;</strong> transactional modal so you can inspect story points and DAG edges before committing to PostgreSQL.
        </p>
      </div>

      {/* Review, Edit & Commit Modal */}
      <AiPlanReviewModal
        plan={plan}
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        orgSlug={orgSlug}
      />

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
