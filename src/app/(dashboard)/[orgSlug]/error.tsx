'use client';

import * as React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to console / Sentry telemetry
    console.error('TaskPilot Dashboard Route Error:', error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6 animate-in fade-in duration-200">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Workspace Error Occurred
        </h1>
        <p className="text-sm text-foreground-muted max-w-md mx-auto">
          {error.message || 'An unexpected error occurred while loading workspace telemetry.'}
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-foreground-muted/60">
            Digest: {error.digest}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface hover:bg-canvas-subtle text-foreground text-xs font-semibold shadow-xs transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-foreground-muted" />
          <span>Back to Landing</span>
        </Link>
      </div>
    </div>
  );
}
