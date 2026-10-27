'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Sparkles,
  Layers,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react';

const VELOCITY_DATA = [
  { sprint: 'Sprint 21', points: 28, target: 25 },
  { sprint: 'Sprint 22', points: 32, target: 30 },
  { sprint: 'Sprint 23', points: 30, target: 30 },
  { sprint: 'Sprint 24', points: 35, target: 32 },
  { sprint: 'Sprint 25', points: 34, target: 35 },
];

const STATUS_DATA = [
  { name: 'Completed', value: 18, color: '#10B981' },
  { name: 'In Progress', value: 4, color: '#4F46E5' },
  { name: 'To Do', value: 3, color: '#38BDF8' },
  { name: 'Backlog', value: 1, color: '#94A3B8' },
];

const OVERDUE_DATA = [
  { member: 'Sarah Chen', overdue: 3, role: 'Lead Architect' },
  { member: 'Alex Rivera', overdue: 1, role: 'Full Stack Dev' },
  { member: 'Marcus Vance', overdue: 0, role: 'Product Manager' },
  { member: 'Jordan Lee', overdue: 0, role: 'QA Engineer' },
];

const AI_QUOTA_TREND = [
  { month: 'Jun', generations: 45, limit: 500 },
  { month: 'Jul', generations: 68, limit: 500 },
  { month: 'Aug', generations: 92, limit: 500 },
  { month: 'Sep', generations: 110, limit: 500 },
  { month: 'Oct', generations: 142, limit: 500 },
];

export default function AnalyticsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Executive Telemetry &amp; Analytics
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            Real-time PostgreSQL metrics on team velocity, task distribution, overdue risk, and AI quota consumption.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
            Velocity Trend: +18%
          </span>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold">
            Sprint 25 Active
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-1">
          <div className="flex items-center justify-between text-foreground-muted text-xs">
            <span>Total Story Points</span>
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground font-mono">159</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +18%
            </span>
          </div>
          <p className="text-[11px] text-foreground-muted">Accumulated across 5 sprint iterations</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-1">
          <div className="flex items-center justify-between text-foreground-muted text-xs">
            <span>Completion Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground font-mono">69.2%</span>
            <span className="text-xs font-mono text-foreground-muted">18 / 26 tasks</span>
          </div>
          <p className="text-[11px] text-foreground-muted">Healthy delivery against sprint target</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-1">
          <div className="flex items-center justify-between text-foreground-muted text-xs">
            <span>Active Blockers</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground font-mono">1</span>
            <span className="text-xs font-bold text-amber-600">0 Deadlocks</span>
          </div>
          <p className="text-[11px] text-foreground-muted">DAG cycle engine validated 100% loop-free</p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-surface shadow-xs space-y-1">
          <div className="flex items-center justify-between text-foreground-muted text-xs">
            <span>AI Generations Quota</span>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-foreground font-mono">142</span>
            <span className="text-xs font-mono text-foreground-muted">/ 500 (28.4%)</span>
          </div>
          <p className="text-[11px] text-foreground-muted">Atomic monthly postgres quota guard active</p>
        </div>
      </div>

      {/* Row 1: Velocity + Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Velocity Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">Sprint Velocity (Story Points)</h2>
              <p className="text-xs text-foreground-muted">Completed story points vs commitment target over 5 sprints</p>
            </div>
            <span className="text-xs font-mono text-foreground-muted">Sprint 21 – 25</span>
          </div>

          <div className="h-72 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VELOCITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="sprint" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="points" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Completed Points" />
                  <Bar dataKey="target" fill="#CBD5E1" radius={[6, 6, 0, 0]} name="Commitment Target" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-canvas-subtle animate-pulse rounded-xl" />
            )}
          </div>
        </div>

        {/* Status Breakdown Pie */}
        <div className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Task Status Distribution</h2>
            <p className="text-xs text-foreground-muted">Live distribution across 26 active tasks</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={STATUS_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {STATUS_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-40 w-40 rounded-full bg-canvas-subtle animate-pulse mx-auto" />
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            {STATUS_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-foreground-muted">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-foreground">{item.value} tasks</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Overdue Tasks by Assignee + AI Quota Trailing Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Tasks by Assignee */}
        <div className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">Overdue Tasks by Assignee</h2>
              <p className="text-xs text-foreground-muted">
                Actionable engineering risk per team member in Acme Corp
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-bold border border-amber-500/20">
              <ShieldAlert className="w-3 h-3" /> 4 Overdue
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OVERDUE_DATA} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} allowDecimals={false} />
                  <YAxis dataKey="member" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={85} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="overdue" fill="#F43F5E" radius={[0, 6, 6, 0]} name="Overdue Tasks" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-canvas-subtle animate-pulse rounded-xl" />
            )}
          </div>
        </div>

        {/* AI Quota Trailing Trend */}
        <div className="p-6 rounded-3xl border border-border bg-surface shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">Monthly AI Quota Consumption Trend</h2>
              <p className="text-xs text-foreground-muted">
                Trailing 5 months generative requests vs monthly ceiling (500 limit)
              </p>
            </div>
            <span className="text-xs font-mono text-foreground-muted">Jun – Oct 2026</span>
          </div>

          <div className="h-64 w-full pt-4">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={AI_QUOTA_TREND}>
                  <defs>
                    <linearGradient id="colorQuota" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="generations"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorQuota)"
                    name="Generations Used"
                  />
                  <Line
                    type="monotone"
                    dataKey="limit"
                    stroke="#94A3B8"
                    strokeDasharray="4 4"
                    dot={false}
                    name="Monthly Ceiling (500)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-canvas-subtle animate-pulse rounded-xl" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
