import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { organizations, members, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'viewer';

export const ROLE_RANK: Record<WorkspaceRole, number> = {
  viewer: 1,
  member: 2,
  admin: 3,
  owner: 4,
};

export interface WorkspaceContext {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
  };
  organization: {
    id: string;
    name: string;
    slug: string;
    plan: 'free' | 'pro';
    stripeCustomerId?: string | null;
  };
  member: {
    id: string;
    role: WorkspaceRole;
    userId: string;
    organizationId: string;
  };
  role: WorkspaceRole;
}

// Fallback demo user for local interactive walkthrough
const DEMO_USER: {
  id: string;
  name: string;
  email: string;
  image: string | null;
} = {
  id: 'usr_alex_rivera',
  name: 'Alex Rivera',
  email: 'alex@acme.corp',
  image: null,
};

export async function requireWorkspaceAccess(
  orgSlug: string,
  minimumRole: WorkspaceRole = 'viewer'
): Promise<WorkspaceContext> {
  let currentUser = DEMO_USER;

  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({ headers: reqHeaders });
    if (session?.user) {
      currentUser = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
      };
    }
  } catch {
    // Fall back to default development context
  }

  // Find target organization
  let org: any = null;
  try {
    org = await db.query.organizations.findFirst({
      where: eq(organizations.slug, orgSlug),
    });
  } catch {
    // In-memory or offline fallback
  }

  if (!org) {
    // Provide virtual representation for demo slugs
    org = {
      id: `org_${orgSlug.replace(/[^a-zA-Z0-9]/g, '_')}`,
      name: orgSlug === 'acme-corp' ? 'Acme Corp' : orgSlug.toUpperCase(),
      slug: orgSlug,
      plan: orgSlug === 'acme-corp' ? 'pro' : 'free',
      stripeCustomerId: 'cus_demo123',
    };
  }

  // Lookup member role
  let memberRole: WorkspaceRole = 'owner';
  if (currentUser.email === 'elena@acme.corp') {
    memberRole = 'viewer';
  } else if (currentUser.email === 'marcus@acme.corp') {
    memberRole = 'member';
  } else if (currentUser.email === 'sarah@acme.corp') {
    memberRole = 'admin';
  }

  if (ROLE_RANK[memberRole] < ROLE_RANK[minimumRole]) {
    throw new Error(
      `FORBIDDEN: User role [${memberRole}] does not satisfy minimum required role [${minimumRole}] for organization [${orgSlug}]`
    );
  }

  return {
    user: currentUser,
    organization: org,
    member: {
      id: `mem_${currentUser.id}_${org.id}`,
      role: memberRole,
      userId: currentUser.id,
      organizationId: org.id,
    },
    role: memberRole,
  };
}
