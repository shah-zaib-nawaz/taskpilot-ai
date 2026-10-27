import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { ArrowRight, Bot } from 'lucide-react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-primary/30 flex items-center justify-center">
              <Image src="/assets/logo.svg" alt="TaskPilot Logo" width={32} height={32} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-base tracking-tight text-foreground group-hover:text-primary transition-colors">
                TaskPilot<span className="text-primary font-mono text-sm ml-0.5">AI</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-primary-subtle text-primary border border-primary/20">
                2026 Edition
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-muted">
            <Link href="/#features" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/#architecture" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link
              href="/acme-corp"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>Live Workspace Demo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/sign-in"
              className="text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors px-2 py-1"
            >
              Sign In
            </Link>

            <Link
              href="/acme-corp"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/assets/logo.svg" alt="TaskPilot Logo" width={28} height={28} />
            <span className="font-bold text-sm text-foreground">
              TaskPilot AI — Built with Google Antigravity 2.0
            </span>
          </div>

          <p className="text-xs text-foreground-muted text-center md:text-right">
            2026 Production Standards: Next.js 16.4, Tailwind CSS v4, Better Auth 1.7+, Drizzle ORM v1.0 & Vercel AI SDK 7.
          </p>
        </div>
      </footer>
    </div>
  );
}
