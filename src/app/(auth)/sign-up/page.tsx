'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building2, Lock, Mail, User } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = React.useState('Alex Rivera');
  const [email, setEmail] = React.useState('alex@acme.corp');
  const [orgName, setOrgName] = React.useState('Acme Corp');
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
          Create your TaskPilot workspace
        </h1>
        <p className="text-xs text-foreground-muted">
          14-day Pro trial included. No credit card required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 text-foreground-muted absolute left-3 top-3" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

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
          <label className="text-xs font-semibold text-foreground">Organization Name</label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-foreground-muted absolute left-3 top-3" />
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
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
            <span>Creating organization...</span>
          ) : (
            <>
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-border text-center text-xs text-foreground-muted">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
