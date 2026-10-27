'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { Users, Shield, Mail, Plus, ShieldCheck, ShieldAlert, Check, AlertCircle } from 'lucide-react';
import { inviteMemberAction } from '@/actions/members';
import type { WorkspaceRole } from '@/dal/rbac';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  avatar: string;
}

const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex@acme.corp', role: 'owner', avatar: 'AR' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@acme.corp', role: 'admin', avatar: 'SC' },
  { id: '3', name: 'Marcus Vance', email: 'marcus@acme.corp', role: 'member', avatar: 'MV' },
  { id: '4', name: 'Elena Rostova', email: 'elena@acme.corp', role: 'viewer', avatar: 'ER' },
];

export default function MembersSettingsPage() {
  const params = useParams();
  const orgSlug = (params?.orgSlug as string) || 'acme-corp';

  const [members, setMembers] = React.useState<Member[]>(INITIAL_MEMBERS);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<'admin' | 'member' | 'viewer'>('member');
  const [loading, setLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{ success: boolean; message: string } | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    try {
      setLoading(true);
      const res = await inviteMemberAction({
        orgSlug,
        email: inviteEmail,
        role: inviteRole as WorkspaceRole,
      });

      if (res.success) {
        setFeedback({ success: true, message: res.message || 'Invitation sent successfully.' });
        // Optimistically add to members list
        const initials = inviteEmail.substring(0, 2).toUpperCase();
        setMembers((prev) => [
          ...prev,
          {
            id: `mem_${Date.now()}`,
            name: inviteEmail.split('@')[0],
            email: inviteEmail,
            role: inviteRole,
            avatar: initials,
          },
        ]);
        setInviteEmail('');
      } else {
        setFeedback({ success: false, message: res.error || 'Failed to send invite.' });
      }
    } catch (err: any) {
      setFeedback({ success: false, message: err.message || 'Error sending invite.' });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Members &amp; Zero-Trust RBAC
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Manage organization members, invite new teammates, and assign role-based permissions.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-subtle text-primary border border-primary/20 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Server-Side DAL Guard Active</span>
        </div>
      </div>

      {/* Invite Member Form */}
      <div className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
        <h2 className="text-base font-bold text-foreground">Invite Teammate</h2>
        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-foreground-muted absolute left-3 top-3" />
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@acme.corp"
              required
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="viewer">Viewer (Read-Only)</option>
            <option value="member">Member (Can Edit Tasks)</option>
            <option value="admin">Admin (Manage Projects)</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{loading ? 'Sending...' : 'Send Invite'}</span>
          </button>
        </form>

        {feedback && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              feedback.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}
          >
            {feedback.success ? (
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* Members Directory Table */}
      <div className="rounded-3xl border border-border bg-surface shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border bg-canvas-subtle/50">
          <h2 className="text-sm font-bold text-foreground">
            Active Organization Members ({members.length} seats)
          </h2>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-canvas-subtle text-foreground-muted uppercase font-mono">
            <tr>
              <th className="py-3 px-6">Member</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Access Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-canvas-subtle transition-colors">
                <td className="py-3.5 px-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                    {member.avatar}
                  </div>
                  <span className="font-semibold text-foreground">{member.name}</span>
                </td>
                <td className="py-3.5 px-6 font-mono text-foreground-muted">{member.email}</td>
                <td className="py-3.5 px-6">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                      member.role === 'owner'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : member.role === 'admin'
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                        : member.role === 'member'
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20'
                        : 'bg-canvas-subtle text-foreground-muted border border-border'
                    }`}
                  >
                    {member.role}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-foreground-muted">
                  {member.role === 'owner' && 'Full Administrative Control'}
                  {member.role === 'admin' && 'Manage Projects & Team'}
                  {member.role === 'member' && 'Edit Tasks & Roadmaps'}
                  {member.role === 'viewer' && 'Read-Only Telemetry'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
