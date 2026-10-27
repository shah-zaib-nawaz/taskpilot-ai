import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-canvas">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <Image src="/assets/logo.svg" alt="TaskPilot Logo" width={36} height={36} />
            <span className="font-extrabold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
              TaskPilot<span className="text-primary font-mono text-sm ml-0.5">AI</span>
            </span>
          </Link>
        </div>

        <div className="p-8 rounded-3xl border border-border bg-surface shadow-xl space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
