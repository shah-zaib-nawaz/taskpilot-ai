'use client';

import * as React from 'react';
import { Search, ArrowUpDown, CheckCircle2, Clock, GitBranch } from 'lucide-react';

interface ListTask {
  id: string;
  key: string;
  title: string;
  status: string;
  priority: string;
  storyPoints: number;
  assignee: string;
  dueDate: string;
}

const TASKS: ListTask[] = [
  { id: '1', key: 'TP-101', title: 'Configure Better Auth 1.7+ Organization Plugin with 4-tier RBAC', status: 'To Do', priority: 'High', storyPoints: 5, assignee: 'Alex Rivera', dueDate: 'Nov 04' },
  { id: '2', key: 'TP-102', title: 'Implement Drizzle Relations API v2 and zero-trust DAL queries', status: 'To Do', priority: 'Medium', storyPoints: 8, assignee: 'Sarah Chen', dueDate: 'Nov 07' },
  { id: '3', key: 'TP-103', title: 'Build Fractional Indexing (LexoRank) O(1) single-row column mutation', status: 'In Progress', priority: 'Urgent', storyPoints: 5, assignee: 'Marcus Vance', dueDate: 'Nov 03' },
  { id: '4', key: 'TP-104', title: 'Integrate Vercel AI SDK 7 with Gemini 3.1 Pro & Output.object', status: 'In Progress', priority: 'High', storyPoints: 13, assignee: 'Alex Rivera', dueDate: 'Nov 06' },
  { id: '5', key: 'TP-098', title: 'Setup PostgreSQL schema and Neon serverless migration runner', status: 'Completed', priority: 'High', storyPoints: 3, assignee: 'Sarah Chen', dueDate: 'Oct 28' },
  { id: '6', key: 'TP-099', title: 'Setup Tailwind CSS v4 @theme inline tokens and Dark Mode', status: 'Completed', priority: 'Medium', storyPoints: 2, assignee: 'Marcus Vance', dueDate: 'Oct 29' },
];

export default function ListViewPage() {
  const [search, setSearch] = React.useState('');

  const filtered = TASKS.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) || t.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-3 bg-surface p-3 rounded-2xl border border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-foreground-muted absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <span className="text-xs font-mono text-foreground-muted">{filtered.length} tasks</span>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border bg-canvas-subtle text-foreground-muted uppercase font-mono">
            <tr>
              <th className="py-3 px-4">Key</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Points</th>
              <th className="py-3 px-4">Assignee</th>
              <th className="py-3 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {filtered.map((task) => (
              <tr key={task.id} className="hover:bg-canvas-subtle transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-foreground-muted">{task.key}</td>
                <td className="py-3 px-4 font-semibold text-foreground">{task.title}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-canvas-subtle border border-border">
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      task.priority === 'Urgent'
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        : task.priority === 'High'
                        ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        : 'bg-canvas-subtle text-foreground-muted border border-border'
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-bold">{task.storyPoints} pts</td>
                <td className="py-3 px-4 text-foreground-muted">{task.assignee}</td>
                <td className="py-3 px-4 font-mono text-foreground-muted">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
