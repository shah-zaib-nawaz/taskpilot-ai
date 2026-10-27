'use server';

import { requireWorkspaceAccess } from '@/dal/rbac';

export async function createSubtaskAction({
  orgSlug,
  taskId,
  title,
}: {
  orgSlug: string;
  taskId: string;
  title: string;
}) {
  await requireWorkspaceAccess(orgSlug, 'member');

  return {
    success: true,
    subtask: {
      id: `sub_${Date.now()}`,
      taskId,
      title,
      isCompleted: false,
      orderKey: 'a0',
      createdAt: new Date().toISOString(),
    },
  };
}

export async function toggleSubtaskAction({
  orgSlug,
  subtaskId,
  isCompleted,
}: {
  orgSlug: string;
  subtaskId: string;
  isCompleted: boolean;
}) {
  await requireWorkspaceAccess(orgSlug, 'member');

  return {
    success: true,
    subtaskId,
    isCompleted,
  };
}

export async function deleteSubtaskAction({
  orgSlug,
  subtaskId,
}: {
  orgSlug: string;
  subtaskId: string;
}) {
  await requireWorkspaceAccess(orgSlug, 'member');

  return {
    success: true,
    subtaskId,
  };
}
