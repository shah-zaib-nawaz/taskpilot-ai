'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import {
  CreditCard,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  RefreshCw,
  ExternalLink,
  Layers,
  AlertCircle,
  Clock,
} from 'lucide-react';
import {
  createCheckoutSessionAction,
  createPortalSessionAction,
  simulateStripeWebhookAction,
} from '@/actions/billing';

export default function BillingSettingsPage() {
  const params = useParams();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';

  const [portalLoading, setPortalLoading] = React.useState(false);
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);
  const [webhookLoading, setWebhookLoading] = React.useState(false);
  const [selectedEventType, setSelectedEventType] = React.useState('checkout.session.completed');
  const [inngestStatus, setInngestStatus] = React.useState<{
    success: boolean;
    message: string;
    timestamp: string;
  } | null>(null);

  const handlePortal = async () => {
    try {
      setPortalLoading(true);
      const res = await createPortalSessionAction({
        orgSlug,
        returnUrl: window.location.href,
      });
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err: any) {
      alert(`Portal redirection notice: ${err.message || 'Opening simulated customer portal.'}`);
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true);
      const res = await createCheckoutSessionAction({
        orgSlug,
        returnUrl: window.location.href,
      });
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err: any) {
      alert(`Checkout session notice: ${err.message || 'Simulating Stripe Checkout session.'}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleSimulateWebhook = async (eventType: string) => {
    try {
      setWebhookLoading(true);
      setSelectedEventType(eventType);
      const res = await simulateStripeWebhookAction({
        orgSlug,
        eventType,
      });
      setInngestStatus({
        success: res.success,
        message: res.message,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err: any) {
      setInngestStatus({
        success: false,
        message: err.message || 'Webhook simulation error',
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setWebhookLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Subscription, Stripe &amp; AI Quotas
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Manage your Stripe billing, monitor Inngest durable webhooks, and adjust organization tier.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Stripe Test Mode + Inngest Connected</span>
        </div>
      </div>

      {/* Current Plan Overview Card */}
      <div className="p-8 rounded-3xl border border-primary/40 bg-gradient-to-br from-surface to-primary-subtle/20 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
              Current Active Plan
            </span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-foreground">Pro Tier ($29/mo)</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold uppercase">
                Active
              </span>
            </div>
            <p className="text-xs text-foreground-muted">
              Next billing cycle on December 1, 2026. Billed via Stripe customer <code className="font-mono text-[11px] bg-canvas-subtle px-1 py-0.5 rounded">cus_test_acme2026</code>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePortal}
              disabled={portalLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface hover:bg-canvas-subtle text-foreground text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <CreditCard className="w-3.5 h-3.5 text-foreground-muted" />
              <span>{portalLoading ? 'Redirecting...' : 'Manage in Stripe Portal'}</span>
              <ExternalLink className="w-3 h-3 text-foreground-muted ml-0.5" />
            </button>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{checkoutLoading ? 'Preparing...' : 'Change Tier / Checkout'}</span>
            </button>
          </div>
        </div>

        {/* AI Quota Meter */}
        <div className="space-y-2 pt-4 border-t border-border/80">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Gemini AI Generation Meter</span>
            </div>
            <span className="font-mono tabular-nums text-foreground-muted font-bold">
              142 / 500 generations used (28.4%)
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-canvas-subtle overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-primary rounded-full transition-all"
              style={{ width: '28.4%' }}
            />
          </div>

          <p className="text-[11px] text-foreground-muted">
            Atomic PostgreSQL quota guards enforce rate limits across Gemini 3.1 Pro and 3.6 Flash endpoints.
          </p>
        </div>
      </div>

      {/* Inngest & Stripe Webhook Simulation Hub */}
      <div className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Inngest Durable Webhook Simulator &amp; Event Queue
              </h3>
              <p className="text-xs text-foreground-muted">
                Test signature-verified Stripe webhooks and durable Inngest retries with zero production risk.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
            Handler: syncStripeSubscriptionWorkflow
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => handleSimulateWebhook('checkout.session.completed')}
            disabled={webhookLoading}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer disabled:opacity-50 ${
              selectedEventType === 'checkout.session.completed'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface hover:bg-canvas-subtle text-foreground border-border'
            }`}
          >
            checkout.session.completed
          </button>
          <button
            onClick={() => handleSimulateWebhook('customer.subscription.updated')}
            disabled={webhookLoading}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer disabled:opacity-50 ${
              selectedEventType === 'customer.subscription.updated'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface hover:bg-canvas-subtle text-foreground border-border'
            }`}
          >
            customer.subscription.updated
          </button>
          <button
            onClick={() => handleSimulateWebhook('customer.subscription.deleted')}
            disabled={webhookLoading}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer disabled:opacity-50 ${
              selectedEventType === 'customer.subscription.deleted'
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-surface hover:bg-canvas-subtle text-foreground border-border'
            }`}
          >
            customer.subscription.deleted
          </button>
        </div>

        {inngestStatus && (
          <div
            className={`p-4 rounded-2xl border transition-all ${
              inngestStatus.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Inngest Queue Acknowledged</span>
                  <span className="font-mono text-[10px] opacity-75">{inngestStatus.timestamp}</span>
                </div>
                <p className="font-mono text-[11px] leading-relaxed">{inngestStatus.message}</p>
                <p className="text-[10px] opacity-75">
                  Idempotency key recorded: Organization state updated and cache invalidated via <code className="font-mono font-bold">revalidateTag(&quot;organization:{orgSlug}&quot;)</code>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Plan Limits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-2">
          <span className="text-xs font-mono uppercase text-foreground-muted">Active Projects</span>
          <p className="text-2xl font-bold text-foreground">2 / Unlimited</p>
          <p className="text-[11px] text-foreground-muted">Pro tier unlocks unlimited project roadmaps.</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-2">
          <span className="text-xs font-mono uppercase text-foreground-muted">Team Seats</span>
          <p className="text-2xl font-bold text-foreground">4 / Unlimited</p>
          <p className="text-[11px] text-foreground-muted">Invite developers, product managers, and viewers.</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-2">
          <span className="text-xs font-mono uppercase text-foreground-muted">AI Rate Ceiling</span>
          <p className="text-2xl font-bold text-foreground">500 / month</p>
          <p className="text-[11px] text-foreground-muted">Resets automatically each calendar month.</p>
        </div>
      </div>
    </div>
  );
}
