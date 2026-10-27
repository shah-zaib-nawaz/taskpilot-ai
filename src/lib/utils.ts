import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTaskKey(prefix: string, num: number): string {
  return `${prefix}-${num.toString().padStart(3, '0')}`;
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return 'No date';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
