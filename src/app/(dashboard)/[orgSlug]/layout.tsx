import * as React from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>;
}) {
  const { orgSlug } = await params;

  return <DashboardShell>{children}</DashboardShell>;
}
