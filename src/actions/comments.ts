'use server';

import { requireWorkspaceAccess } from '@/dal/rbac';

export async function createCommentAction({
  orgSlug,
  taskId,
  content,
  parentCommentId,
}: {
  orgSlug: string;
  taskId: string;
  content: string;
  parentCommentId?: string;
}) {
  const { user } = await requireWorkspaceAccess(orgSlug, 'member');

  return {
    success: true,
    comment: {
      id: `comm_${Date.now()}`,
      taskId,
      authorId: user.id,
      authorName: user.name,
      content,
      parentCommentId: parentCommentId || null,
      createdAt: new Date().toISOString(),
    },
  };
}

export async function deleteCommentAction({
  orgSlug,
  commentId,
}: {
  orgSlug: string;
  commentId: string;
}) {
  await requireWorkspaceAccess(orgSlug, 'member');

  return {
    success: true,
    commentId,
  };
}
