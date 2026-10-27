'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('alex@acme.corp');
  const [password, setPassword] = React.useState('••••••••••••');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/acme-corp');
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Welcome back to TaskPilot AI
        </h1>
        <p className="text-xs text-foreground-muted">
          Sign in to access your organization workspaces and projects.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Work Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-foreground-muted absolute left-3 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-foreground">Password</label>
            <span className="text-[11px] text-primary cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-foreground-muted absolute left-3 top-3" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Acme Corp</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-border text-center text-xs text-foreground-muted">
        Don&apos;t have an organization workspace yet?{' '}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline">
          Create an organization
        </Link>
      </div>
    </div>
  );
}
