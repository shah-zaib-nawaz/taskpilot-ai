import { db } from '@/db';
import { usageLogs, organizations } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export interface QuotaCheckResult {
  allowed: boolean;
  currentUsage: number;
  maxQuota: number;
  plan: 'free' | 'pro';
  error?: string;
}

// In-memory atomic tracker for local demo persistence
const MEMORY_USAGE = new Map<string, number>();

export function getCurrentBillingPeriod(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  return `${year}-${month}`;
}

export async function checkAndIncrementAiQuota(
  orgId: string,
  plan: 'free' | 'pro' = 'pro'
): Promise<QuotaCheckResult> {
  const maxQuota = plan === 'pro' ? 500 : 10;
  const period = getCurrentBillingPeriod();
  const key = `${orgId}_${period}`;

  const currentCount = MEMORY_USAGE.get(key) ?? (plan === 'free' ? 9 : 142); // Seed realistic demo numbers

  if (currentCount >= maxQuota) {
    return {
      allowed: false,
      currentUsage: currentCount,
      maxQuota,
      plan,
      error: `QUOTA_EXHAUSTED: Monthly AI generation limit of ${maxQuota} reached for ${plan.toUpperCase()} plan. Upgrade required.`,
    };
  }

  // Increment usage atomically
  const nextCount = currentCount + 1;
  MEMORY_USAGE.set(key, nextCount);

  return {
    allowed: true,
    currentUsage: nextCount,
    maxQuota,
    plan,
  };
}

export async function forceExhaustQuota(orgId: string): Promise<void> {
  const period = getCurrentBillingPeriod();
  const key = `${orgId}_${period}`;
  MEMORY_USAGE.set(key, 10); // set to max free tier
}

export async function resetDemoQuota(orgId: string, plan: 'free' | 'pro' = 'free'): Promise<void> {
  const period = getCurrentBillingPeriod();
  const key = `${orgId}_${period}`;
  MEMORY_USAGE.set(key, 0);
}
