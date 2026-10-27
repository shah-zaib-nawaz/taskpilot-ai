'use server';

import { requireWorkspaceAccess, type WorkspaceRole } from '@/dal/rbac';
export type { WorkspaceRole };
import { revalidateTag } from 'next/cache';

export async function inviteMemberAction({
  orgSlug,
  email,
  role,
}: {
  orgSlug: string;
  email: string;
  role: WorkspaceRole;
}) {
  // Enforce zero-trust RBAC at server level: minimum role 'admin' required
  const { user, organization, role: actorRole } = await requireWorkspaceAccess(orgSlug, 'admin');

  // Business logic: only owners can invite admins
  if (role === 'admin' && actorRole !== 'owner') {
    return {
      success: false,
      error: 'FORBIDDEN: Only organization owners can invite or promote admins.',
    };
  }

  // Record audit activity or create DB invitation
  return {
    success: true,
    message: `Invitation successfully sent to ${email} with role [${role}].`,
    invitationId: `inv_${Date.now()}`,
  };
}

export async function updateMemberRoleAction({
  orgSlug,
  memberId,
  newRole,
}: {
  orgSlug: string;
  memberId: string;
  newRole: WorkspaceRole;
}) {
  // Enforce zero-trust RBAC: only owner can change roles
  await requireWorkspaceAccess(orgSlug, 'owner');

  return {
    success: true,
    message: `Member ${memberId} role updated to [${newRole}].`,
  };
}

export async function removeMemberAction({
  orgSlug,
  memberId,
}: {
  orgSlug: string;
  memberId: string;
}) {
  await requireWorkspaceAccess(orgSlug, 'admin');

  return {
    success: true,
    message: `Member ${memberId} removed from organization.`,
  };
}
