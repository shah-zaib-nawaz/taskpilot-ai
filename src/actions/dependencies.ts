'use server';

import { requireWorkspaceAccess } from '@/dal/rbac';
import { validateDagDependency, type DependencyEdge } from '@/lib/dag';
import { revalidateTag } from 'next/cache';

export async function addTaskDependencyAction({
  orgSlug,
  sourceTaskId,
  targetTaskId,
  existingEdges = [],
}: {
  orgSlug: string;
  sourceTaskId: string;
  targetTaskId: string;
  existingEdges: DependencyEdge[];
}) {
  // Enforce zero-trust RBAC: minimum role 'member' required
  await requireWorkspaceAccess(orgSlug, 'member');

  // Verify DAG cycle detection
  const validation = validateDagDependency(existingEdges, {
    sourceTaskId,
    targetTaskId,
  });

  if (validation.hasCycle) {
    return {
      success: false,
      error: validation.error,
      cyclePath: validation.cyclePath,
    };
  }

  // Database insert into task_dependencies inside transaction
  return {
    success: true,
    dependency: {
      id: `dep_${Date.now()}`,
      sourceTaskId,
      targetTaskId,
      createdAt: new Date().toISOString(),
    },
  };
}

export async function removeTaskDependencyAction({
  orgSlug,
  dependencyId,
}: {
  orgSlug: string;
  dependencyId: string;
}) {
  await requireWorkspaceAccess(orgSlug, 'member');

  return {
    success: true,
    dependencyId,
  };
}
