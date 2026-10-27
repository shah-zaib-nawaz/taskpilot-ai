import * as React from 'react';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';

export default async function KanbanPage({
  params,
}: {
  params: Promise<{ orgSlug: string; projectKey: string }>;
}) {
  const { orgSlug } = await params;

  return <KanbanBoard orgSlug={orgSlug} />;
}
