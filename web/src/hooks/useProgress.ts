'use client';

import { useEffect, useState, useCallback } from 'react';
import { PLAN } from '@/data/plan';
import { STUDENT_CONFIG } from '@/data/config';

const PROGRESS_KEY = 'ruhs-mo-progress-v1';
const SETTINGS_KEY = 'ruhs-mo-settings-v1';

interface ProgressStore {
  completed: Record<string, boolean>;
  lastUpdated: string;
}

interface Settings {
  startDate: string;        // ISO date, e.g. '2026-09-21'
  skippedDates: string[];   // ISO dates to skip, e.g. ['2026-10-05']
}

function defaultSettings(): Settings {
  return { startDate: STUDENT_CONFIG.defaultStartDate, skippedDates: [] };
}

function loadProgress(): ProgressStore {
  if (typeof window === 'undefined') return { completed: {}, lastUpdated: '' };
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completed: {}, lastUpdated: '' };
}

function loadSettings(): Settings {
  if (typeof window === 'undefined') return defaultSettings();
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...defaultSettings(), ...JSON.parse(raw) };
  } catch {}
  return defaultSettings();
}

function saveProgress(store: ProgressStore) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(store));
}

function saveSettings(s: Settings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

/** Returns the calendar date string (YYYY-MM-DD) for a given 1-based day number,
 *  accounting for skipped dates. */
function localIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function computeDateForDay(dayNum: number, startDate: string, skippedDates: string[]): string {
  const skipped = new Set(skippedDates);
  let counted = 0;
  const cur = new Date(startDate + 'T00:00:00');
  while (true) {
    const iso = localIso(cur);
    if (!skipped.has(iso)) {
      counted++;
      if (counted === dayNum) return iso;
    }
    cur.setDate(cur.getDate() + 1);
    if (counted > 200) break; // safety
  }
  return '';
}

/** Returns today's 1-based day number in the plan (1–60). Returns 0 if before plan start. */
function computeTodayDayNum(startDate: string, skippedDates: string[]): number {
  const skipped = new Set(skippedDates);
  const todayIso = localIso(new Date());
  let dayNum = 0;
  const cur = new Date(startDate + 'T00:00:00');
  while (true) {
    const iso = localIso(cur);
    if (!skipped.has(iso)) dayNum++;
    if (iso === todayIso) return Math.max(1, Math.min(60, dayNum));
    if (iso > todayIso) return Math.max(1, dayNum - 1);
    cur.setDate(cur.getDate() + 1);
    if (dayNum > 200) break;
  }
  return 60;
}

function daysUntilExam(): number {
  const today = new Date();
  const exam = new Date(STUDENT_CONFIG.examDate + 'T00:00:00');
  return Math.max(0, Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
}

export function useProgress() {
  const [store, setStore] = useState<ProgressStore>({ completed: {}, lastUpdated: '' });
  const [settings, setSettings] = useState<Settings>(defaultSettings());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStore(loadProgress());
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  const toggleTodo = useCallback((todoId: string) => {
    setStore(prev => {
      const next: ProgressStore = {
        completed: { ...prev.completed, [todoId]: !prev.completed[todoId] },
        lastUpdated: new Date().toISOString(),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const updateStartDate = useCallback((date: string) => {
    setSettings(prev => {
      const next = { ...prev, startDate: date };
      saveSettings(next);
      return next;
    });
  }, []);

  const addSkipDate = useCallback((date: string) => {
    setSettings(prev => {
      if (prev.skippedDates.includes(date)) return prev;
      const next = { ...prev, skippedDates: [...prev.skippedDates, date].sort() };
      saveSettings(next);
      return next;
    });
  }, []);

  const removeSkipDate = useCallback((date: string) => {
    setSettings(prev => {
      const next = { ...prev, skippedDates: prev.skippedDates.filter(d => d !== date) };
      saveSettings(next);
      return next;
    });
  }, []);

  function isDone(todoId: string): boolean {
    return !!store.completed[todoId];
  }

  function dayProgress(dayNum: number): { done: number; total: number; pct: number } {
    const day = PLAN.find(d => d.day === dayNum);
    if (!day) return { done: 0, total: 0, pct: 0 };
    const total = day.todos.length;
    const done = day.todos.filter(t => store.completed[t.id]).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  }

  function isDayComplete(dayNum: number): boolean {
    return dayProgress(dayNum).pct === 100;
  }

  function overallProgress(): { done: number; total: number; pct: number; daysComplete: number } {
    let total = 0, done = 0, daysComplete = 0;
    for (const day of PLAN) {
      total += day.todos.length;
      const d = day.todos.filter(t => store.completed[t.id]).length;
      done += d;
      if (d === day.todos.length) daysComplete++;
    }
    return { done, total, pct: Math.round((done / total) * 100), daysComplete };
  }

  function streakCount(): number {
    let streak = 0;
    for (let i = PLAN.length - 1; i >= 0; i--) {
      if (isDayComplete(PLAN[i].day)) streak++;
      else break;
    }
    return streak;
  }

  function getDisplayDate(dayNum: number): string {
    return computeDateForDay(dayNum, settings.startDate, settings.skippedDates);
  }

  function todayDayNum(): number {
    return computeTodayDayNum(settings.startDate, settings.skippedDates);
  }

  function exportProgress(): void {
    const data = JSON.stringify({ progress: store, settings }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ruhs-mo-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importProgress(jsonText: string): boolean {
    try {
      const parsed = JSON.parse(jsonText);
      // support both old format (flat) and new format (with settings)
      const prog: ProgressStore = parsed.progress ?? parsed;
      const sett: Settings = parsed.settings ?? defaultSettings();
      if (typeof prog.completed !== 'object') return false;
      saveProgress(prog);
      saveSettings(sett);
      setStore(prog);
      setSettings(sett);
      return true;
    } catch {
      return false;
    }
  }

  return {
    hydrated,
    isDone, toggleTodo,
    dayProgress, isDayComplete,
    overallProgress, streakCount,
    getDisplayDate, todayDayNum, daysUntilExam,
    settings, updateStartDate, addSkipDate, removeSkipDate,
    exportProgress, importProgress,
  };
}
