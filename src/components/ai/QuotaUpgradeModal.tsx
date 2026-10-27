'use client';

import * as React from 'react';
import Link from 'next/link';
import { X, Sparkles, Zap, Check, ArrowRight, ShieldAlert } from 'lucide-react';

interface QuotaUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgSlug: string;
  currentUsage: number;
  maxQuota: number;
}

export function QuotaUpgradeModal({
  isOpen,
  onClose,
  orgSlug,
  currentUsage,
  maxQuota,
}: QuotaUpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-3xl border border-primary/40 bg-surface shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 fill-amber-500" />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-canvas-subtle transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Monthly AI Generation Quota Reached
          </h2>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Your organization has consumed <strong className="text-foreground">{currentUsage} of {maxQuota}</strong> free Gemini generations for the current billing period.
          </p>
        </div>

        {/* Quota Progress Bar */}
        <div className="p-4 rounded-2xl border border-border bg-canvas-subtle/60 space-y-2">
          <div className="flex justify-between text-xs font-mono font-bold">
            <span className="text-foreground-muted">Monthly Limit</span>
            <span className="text-amber-600 dark:text-amber-400">100% EXHAUSTED</span>
          </div>
          <div className="w-full h-2 rounded-full bg-border overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full w-full" />
          </div>
        </div>

        {/* Pro Plan Highlights */}
        <div className="space-y-3 pt-2 border-t border-border">
          <h3 className="text-xs font-mono font-bold uppercase text-foreground-muted tracking-wider">
            Upgrade to Pro ($29/mo) and Unlock:
          </h3>
          <ul className="space-y-2 text-xs text-foreground">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span><strong>500 Gemini 3.1 Pro &amp; Flash</strong> generations/month</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span><strong>Unlimited</strong> active projects &amp; workspace members</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span>Weekly automated executive progress &amp; risk telemetry digests</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-border bg-surface hover:bg-canvas-subtle text-foreground text-xs font-semibold transition-colors cursor-pointer"
          >
            Stay on Free
          </button>
          <Link
            href={`/${orgSlug}/settings/billing`}
            onClick={onClose}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span>Upgrade to Pro ($29/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
