'use client';

import * as React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Plus, Search, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { TaskDetailDrawer, type TaskData } from './TaskDetailDrawer';
import { getFractionalIndexBetween } from '@/lib/fractional-index';
import { updateTaskStatusAndOrderAction, createTaskAction } from '@/actions/tasks';

const INITIAL_TASKS: TaskData[] = [
  {
    id: '1',
    key: 'TP-101',
    title: 'Configure Better Auth 1.7+ Organization Plugin with 4-tier RBAC',
    description: 'Ensure Owner, Admin, Member, and Viewer roles are strictly checked at server Data Access Layer.',
    status: 'todo',
    priority: 'high',
    storyPoints: 5,
    dueDate: 'Nov 04',
    orderKey: 'a0',
    assignee: { name: 'Alex Rivera', initials: 'AR', color: 'bg-indigo-600' },
    subtasks: [
      { id: 's1', title: 'Better Auth Drizzle adapter setup', isCompleted: true },
      { id: 's2', title: '4-tier role definition in schema', isCompleted: true },
      { id: 's3', title: 'requireWorkspaceAccess guard helper', isCompleted: false },
    ],
    dependencies: {
      blocks: [{ id: '3', key: 'TP-103', title: 'Build Fractional Indexing LexoRank mutation' }],
      blockedBy: [{ id: '5', key: 'TP-098', title: 'Setup PostgreSQL schema & migration runner' }],
    },
    comments: [
      { id: 'c1', author: 'Sarah Chen', initials: 'SC', content: 'Drizzle relations mapped cleanly for all 19 tables.', createdAt: '3 hours ago' },
    ],
    activityLogs: [
      { id: 'a1', actor: 'Alex Rivera', action: 'created task', time: '1 day ago' },
    ],
  },
  {
    id: '2',
    key: 'TP-102',
    title: 'Implement Drizzle Relations API v2 and zero-trust DAL queries',
    description: 'All tenant tables must be scoped to organizationId with foreign key cascades.',
    status: 'todo',
    priority: 'medium',
    storyPoints: 8,
    dueDate: 'Nov 07',
    orderKey: 'a1',
    assignee: { name: 'Sarah Chen', initials: 'SC', color: 'bg-emerald-600' },
    subtasks: [
      { id: 's4', title: 'Define relations v2 in src/db/schema/relations.ts', isCompleted: true },
      { id: 's5', title: 'Unit test DAL membership check', isCompleted: false },
    ],
    dependencies: { blocks: [], blockedBy: [] },
    comments: [],
    activityLogs: [{ id: 'a2', actor: 'Sarah Chen', action: 'created task', time: '2 days ago' }],
  },
  {
    id: '3',
    key: 'TP-103',
    title: 'Build Fractional Indexing (LexoRank) O(1) single-row column mutation',
    description: 'Avoid table locking and batch reindexing by computing lexicographical midpoint keys.',
    status: 'in_progress',
    priority: 'urgent',
    storyPoints: 5,
    dueDate: 'Nov 03',
    orderKey: 'a2',
    assignee: { name: 'Marcus Vance', initials: 'MV', color: 'bg-rose-600' },
    subtasks: [
      { id: 's6', title: 'fractional-indexing package integration', isCompleted: true },
      { id: 's7', title: 'React 19 useOptimistic drag preview', isCompleted: true },
      { id: 's8', title: 'Single row UPDATE tasks query in DAL', isCompleted: true },
      { id: 's9', title: 'Browser test column persistence', isCompleted: false },
    ],
    dependencies: {
      blocks: [{ id: '4', key: 'TP-104', title: 'Integrate Vercel AI SDK 7 with Gemini 3.1 Pro' }],
      blockedBy: [{ id: '1', key: 'TP-101', title: 'Better Auth RBAC setup' }],
    },
    comments: [
      { id: 'c2', author: 'Marcus Vance', initials: 'MV', content: 'LexoRank midpoints generate zero column shifts!', createdAt: '1 hour ago' },
    ],
    activityLogs: [{ id: 'a3', actor: 'Marcus Vance', action: 'moved from To Do to In Progress', time: '1 hour ago' }],
  },
  {
    id: '4',
    key: 'TP-104',
    title: 'Integrate Vercel AI SDK 7 with Gemini 3.1 Pro & Output.object',
    description: 'Use instructions, Output.object({ schema }), and onEnd for deterministic project breakdown.',
    status: 'in_progress',
    priority: 'high',
    storyPoints: 13,
    dueDate: 'Nov 06',
    orderKey: 'a3',
    assignee: { name: 'Alex Rivera', initials: 'AR', color: 'bg-indigo-600' },
    subtasks: [
      { id: 's10', title: 'AI SDK 7 streamText setup', isCompleted: true },
      { id: 's11', title: 'Review & Commit transactional modal', isCompleted: false },
    ],
    dependencies: {
      blocks: [],
      blockedBy: [{ id: '3', key: 'TP-103', title: 'Build Fractional Indexing LexoRank mutation' }],
    },
    comments: [],
    activityLogs: [{ id: 'a4', actor: 'Alex Rivera', action: 'assigned task to himself', time: '5 hours ago' }],
  },
  {
    id: '5',
    key: 'TP-098',
    title: 'Setup PostgreSQL schema and Neon serverless migration runner',
    description: 'Drizzle kit push and 0000_smart_mandroid.sql migrations generated.',
    status: 'done',
    priority: 'high',
    storyPoints: 3,
    dueDate: 'Oct 28',
    orderKey: 'a4',
    assignee: { name: 'Sarah Chen', initials: 'SC', color: 'bg-emerald-600' },
    subtasks: [
      { id: 's12', title: '19 table schemas with Drizzle v1.0', isCompleted: true },
      { id: 's13', title: 'pnpm db:seed execution', isCompleted: true },
    ],
    dependencies: { blocks: [], blockedBy: [] },
    comments: [],
    activityLogs: [{ id: 'a5', actor: 'Sarah Chen', action: 'completed task', time: 'Yesterday' }],
  },
  {
    id: '6',
    key: 'TP-099',
    title: 'Setup Tailwind CSS v4 @theme inline tokens and Dark Mode',
    description: 'Electric Indigo #4F46E5 primary and Alabaster #F8FAFC canvas with tabular figures.',
    status: 'done',
    priority: 'medium',
    storyPoints: 2,
    dueDate: 'Oct 29',
    orderKey: 'a5',
    assignee: { name: 'Marcus Vance', initials: 'MV', color: 'bg-rose-600' },
    subtasks: [{ id: 's14', title: 'CSS-first @theme inline in globals.css', isCompleted: true }],
    dependencies: { blocks: [], blockedBy: [] },
    comments: [],
    activityLogs: [{ id: 'a6', actor: 'Marcus Vance', action: 'completed task', time: 'Yesterday' }],
  },
  {
    id: '7',
    key: 'TP-105',
    title: 'Stripe webhook receiver with Inngest durable retries & billing portal',
    description: 'Handles checkout.session.completed and customer.subscription.updated.',
    status: 'backlog',
    priority: 'medium',
    storyPoints: 8,
    dueDate: 'Nov 12',
    orderKey: 'a6',
    assignee: { name: 'Sarah Chen', initials: 'SC', color: 'bg-emerald-600' },
    subtasks: [],
    dependencies: { blocks: [], blockedBy: [] },
    comments: [],
    activityLogs: [],
  },
];

const COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Completed' },
];

export function KanbanBoard({ orgSlug }: { orgSlug: string }) {
  const [tasks, setTasks] = React.useState<TaskData[]>(INITIAL_TASKS);
  const [activeTask, setActiveTask] = React.useState<TaskData | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<TaskData | null>(null);
  const [search, setSearch] = React.useState('');
  const [priorityFilter, setPriorityFilter] = React.useState<string>('all');
  const [persistedNotice, setPersistedNotice] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.key.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const sourceTask = tasks.find((t) => t.id === activeId);
    if (!sourceTask) return;

    let targetColumnId: string = sourceTask.status;
    let targetIndex = -1;

    // Check if dropped directly onto a column container
    const isColumnOver = COLUMNS.some((c) => c.id === overId);
    if (isColumnOver) {
      targetColumnId = overId;
      const columnTasks = tasks.filter((t) => t.status === targetColumnId && t.id !== activeId);
      targetIndex = columnTasks.length; // drop at end of column
    } else {
      // Dropped onto another task card
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask) {
        targetColumnId = overTask.status;
        const columnTasks = tasks.filter((t) => t.status === targetColumnId);
        targetIndex = columnTasks.findIndex((t) => t.id === overId);
      }
    }

    // Compute new fractional order key (LexoRank)
    const targetColumnTasks = tasks.filter(
      (t) => t.status === targetColumnId && t.id !== activeId
    );

    const prevTask = targetIndex > 0 ? targetColumnTasks[targetIndex - 1] : null;
    const nextTask = targetIndex < targetColumnTasks.length ? targetColumnTasks[targetIndex] : null;

    const newOrderKey = getFractionalIndexBetween(
      prevTask?.orderKey,
      nextTask?.orderKey
    );

    // React 19 Optimistic update
    const updatedTasks = tasks.map((t) => {
      if (t.id === activeId) {
        return {
          ...t,
          status: targetColumnId as any,
          orderKey: newOrderKey,
          activityLogs: [
            {
              id: `act_${Date.now()}`,
              actor: 'Alex Rivera',
              action: `moved task to ${targetColumnId} (Order: ${newOrderKey})`,
              time: 'Just now',
            },
            ...t.activityLogs,
          ],
        };
      }
      return t;
    });

    setTasks(updatedTasks);

    // Call Server Action mutation for single-row O(1) database persistence
    try {
      await updateTaskStatusAndOrderAction({
        orgSlug,
        taskId: activeId,
        newStatus: targetColumnId,
        newOrderKey,
      });

      setPersistedNotice(
        `✓ Single-row O(1) mutation persisted: ${sourceTask.key} ➔ ${targetColumnId.toUpperCase()} (LexoRank: ${newOrderKey})`
      );
      setTimeout(() => setPersistedNotice(null), 3000);
    } catch (err: any) {
      console.error('Failed to persist task reorder:', err);
    }
  };

  const handleCreateTask = async () => {
    const nextNum = tasks.length + 101;
    const newTaskKey = `TP-${nextNum}`;
    const firstTask = tasks[0];
    const newOrderKey = getFractionalIndexBetween(null, firstTask?.orderKey);

    const newTask: TaskData = {
      id: String(Date.now()),
      key: newTaskKey,
      title: 'New sprint requirement scoped via instant action',
      description: 'Defined via fast client action, verified with drizzle-zod validator.',
      status: 'todo',
      priority: 'medium',
      storyPoints: 3,
      dueDate: 'Nov 15',
      orderKey: newOrderKey,
      assignee: { name: 'Alex Rivera', initials: 'AR', color: 'bg-indigo-600' },
      subtasks: [{ id: `s_${Date.now()}`, title: 'Review requirements', isCompleted: false }],
      dependencies: { blocks: [], blockedBy: [] },
      comments: [],
      activityLogs: [{ id: `a_${Date.now()}`, actor: 'Alex Rivera', action: 'created task', time: 'Just now' }],
    };

    setTasks([newTask, ...tasks]);

    await createTaskAction({
      orgSlug,
      projectKey: 'TP',
      title: newTask.title,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-surface p-3 rounded-2xl border border-border shadow-xs">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-foreground-muted absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks, keys, descriptions..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-border bg-canvas text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-1">
            {['all', 'urgent', 'high', 'medium'].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium capitalize transition-colors cursor-pointer ${
                  priorityFilter === p
                    ? 'bg-primary-subtle text-primary font-bold border border-primary/20'
                    : 'text-foreground-muted hover:text-foreground hover:bg-canvas-subtle'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-foreground-muted">
            {filteredTasks.length} cards visible
          </span>
          <button
            onClick={handleCreateTask}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* O(1) LexoRank Mutation Notification Banner */}
      {persistedNotice && (
        <div className="p-3 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{persistedNotice}</span>
        </div>
      )}

      {/* DndContext Multi-Column Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <KanbanColumn
                key={col.id}
                id={col.id}
                title={col.title}
                tasks={columnTasks}
                onCardClick={(task) => setSelectedTask(task)}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="w-64 rotate-2 scale-105 shadow-2xl">
              <KanbanCard task={activeTask} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Slide-Over Task Detail Drawer */}
      <TaskDetailDrawer
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={(updated) => {
          setSelectedTask(updated);
          setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
        }}
        allTasks={tasks}
        orgSlug={orgSlug}
      />
    </div>
  );
}
