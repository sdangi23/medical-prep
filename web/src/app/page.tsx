'use client';

import { useState, useRef } from 'react';
import { PLAN, DayPlan, TodoType, PhaseNum, PHASE_COLORS, TODO_TYPE_CONFIG } from '@/data/plan';
import { STUDENT_CONFIG } from '@/data/config';
import { ProgressProvider, useProgressContext } from '@/context/ProgressContext';

// ─── ProgressRing ─────────────────────────────────────────────────────────────
function ProgressRing({ pct, size = 40, stroke = 4 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={pct === 100 ? '#22c55e' : pct > 0 ? '#3b82f6' : '#e2e8f0'}
        strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
    </svg>
  );
}

// ─── TodoItem ─────────────────────────────────────────────────────────────────
function TodoItem({ todo, done, onToggle }: {
  todo: DayPlan['todos'][0];
  done: boolean;
  onToggle: () => void;
}) {
  const cfg = TODO_TYPE_CONFIG[todo.type];
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-all duration-200
        ${done ? 'opacity-60 bg-slate-50 border-slate-200' : `${cfg.color} border hover:shadow-sm`}`}
    >
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
        ${done ? 'bg-green-500 border-green-500' : 'border-slate-300 bg-white'}`}>
        {done && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-base leading-none">{cfg.icon}</span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{cfg.label}</span>
          <span className="ml-auto text-xs text-slate-400 flex-shrink-0">⏱ {todo.duration}</span>
        </div>
        <p className={`text-sm leading-snug ${done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
          {todo.text}
        </p>
      </div>
    </button>
  );
}

// ─── DayView ──────────────────────────────────────────────────────────────────
function DayView({ day, isToday }: { day: DayPlan; isToday: boolean }) {
  const { isDone, toggleTodo, dayProgress, getDisplayDate } = useProgressContext();
  const { done, total, pct } = dayProgress(day.day);
  const phaseColor = PHASE_COLORS[day.phase];
  const displayDate = getDisplayDate(day.day);

  const typeGroups = (['warmup', 'theory', 'mcq', 'review', 'snapshot', 'flashcard', 'mock'] as TodoType[])
    .map(type => ({ type, todos: day.todos.filter(t => t.type === type) }))
    .filter(g => g.todos.length > 0);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      {/* Header card */}
      <div className={`rounded-2xl p-5 mb-5 ${phaseColor.bg} border ${phaseColor.border}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-bold uppercase tracking-widest ${phaseColor.text}`}>
                Day {day.day}
              </span>
              {isToday && (
                <span className="px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-bold animate-pulse">
                  TODAY
                </span>
              )}
              {day.isSnapshotDay && (
                <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-bold">
                  🔁 REVIEW DAY
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">{day.title}</h1>
            <p className="text-sm text-slate-600 mt-0.5">{day.subtitle}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${phaseColor.bg} ${phaseColor.text} border ${phaseColor.border}`}>
                {day.phaseLabel}
              </span>
              <span className="text-xs text-slate-500">📅 {displayDate}</span>
              <span className="text-xs text-slate-500">⏱ ~{(day.totalMinutes / 60).toFixed(1)}h</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <ProgressRing pct={pct} size={56} stroke={5} />
            <span className="text-xs font-bold text-slate-600">{done}/{total}</span>
          </div>
        </div>

        {day.snapshotReview && day.snapshotReview.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 mb-1.5">📌 Topics under review today:</p>
            <div className="flex flex-wrap gap-1">
              {day.snapshotReview.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-white text-slate-700 text-xs border border-slate-300">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Day progress</span>
          <span className={pct === 100 ? 'text-green-600 font-bold' : ''}>{pct}% complete</span>
        </div>
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${pct === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Todos */}
      <div className="space-y-2">
        {day.todos.map(todo => (
          <div key={todo.id}>
            {typeGroups.length > 1 && typeGroups.find(g => g.todos[0]?.id === todo.id) && (
              <div className="flex items-center gap-2 mt-3 mb-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {TODO_TYPE_CONFIG[todo.type].icon} {TODO_TYPE_CONFIG[todo.type].label}
                </span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
            )}
            <TodoItem todo={todo} done={isDone(todo.id)} onToggle={() => toggleTodo(todo.id)} />
          </div>
        ))}
      </div>

      {pct === 100 && (
        <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 text-center">
          <div className="text-2xl mb-1">🎉</div>
          <p className="text-green-700 font-bold">Day {day.day} Complete!</p>
          <p className="text-green-600 text-sm mt-0.5">Outstanding, {STUDENT_CONFIG.shortName}. Keep the streak going.</p>
        </div>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ selectedDay, onSelect, todayNum }: {
  selectedDay: number;
  onSelect: (n: number) => void;
  todayNum: number;
}) {
  const { dayProgress, isDayComplete } = useProgressContext();
  const selectedRef = useRef<HTMLButtonElement>(null);

  const phases: PhaseNum[] = [1, 2, 3, 4, 5];
  const phaseNames: Record<PhaseNum, string> = {
    1: 'Phase 1 · Guaranteed Topics',
    2: 'Phase 2 · Big Five Deep Dive',
    3: 'Phase 3 · Tier 2 + Shorts',
    4: 'Phase 4 · Revision',
    5: 'Phase 5 · Mock Tests',
  };

  return (
    <div className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto py-1">
        {phases.map(phase => {
          const days = PLAN.filter(d => d.phase === phase);
          const phColor = PHASE_COLORS[phase];
          return (
            <div key={phase}>
              <div className={`sticky top-0 z-10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${phColor.text} ${phColor.bg} border-b ${phColor.border}`}>
                {phaseNames[phase]}
              </div>
              {days.map(d => {
                const { done, total, pct } = dayProgress(d.day);
                const isSelected = d.day === selectedDay;
                const isToday = d.day === todayNum;
                const isComplete = isDayComplete(d.day);
                return (
                  <button
                    key={d.day}
                    ref={isSelected ? selectedRef : undefined}
                    onClick={() => onSelect(d.day)}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 transition-all border-b border-slate-100
                      ${isSelected ? 'bg-blue-50 border-l-2 border-l-blue-500' : 'hover:bg-slate-50 border-l-2 border-l-transparent'}`}
                  >
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0
                      ${isComplete ? 'bg-green-500 text-white' : isToday ? 'bg-green-100 text-green-700 ring-2 ring-green-400' : isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isComplete ? '✓' : d.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className={`text-xs font-semibold truncate ${isSelected ? 'text-blue-700' : 'text-slate-700'}`}>
                          {d.isSnapshotDay ? '🔁 ' : ''}{d.title}
                        </p>
                        {isToday && <span className="text-green-500 text-xs flex-shrink-0 font-bold">●</span>}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${isComplete ? 'bg-green-500' : 'bg-blue-400'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 flex-shrink-0 tabular-nums">{done}/{total}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings Panel ───────────────────────────────────────────────────────────
function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { settings, updateStartDate, addSkipDate, removeSkipDate } = useProgressContext();
  const [skipInput, setSkipInput] = useState('');

  function handleAddSkip() {
    if (/^\d{4}-\d{2}-\d{2}$/.test(skipInput)) {
      addSkipDate(skipInput);
      setSkipInput('');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">⚙️ Plan Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
        </div>

        {/* Start date */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Plan Start Date</label>
          <p className="text-xs text-slate-500 mb-2">Changing this shifts all day dates. Does not affect completed tasks.</p>
          <input
            type="date"
            value={settings.startDate}
            onChange={e => updateStartDate(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Skip dates */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Skip Dates</label>
          <p className="text-xs text-slate-500 mb-2">Add dates when study was not possible (illness, travel). Days after these dates shift forward by 1.</p>
          <div className="flex gap-2 mb-2">
            <input
              type="date"
              value={skipInput}
              onChange={e => setSkipInput(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddSkip}
              className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 font-semibold"
            >
              Add
            </button>
          </div>
          {settings.skippedDates.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No skip dates added.</p>
          ) : (
            <div className="space-y-1 max-h-36 overflow-y-auto">
              {settings.skippedDates.map(d => (
                <div key={d} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-1.5 text-sm">
                  <span className="text-slate-700">{d}</span>
                  <button onClick={() => removeSkipDate(d)} className="text-red-400 hover:text-red-600 text-xs font-bold ml-2">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-semibold text-sm hover:bg-slate-700"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ todayNum, onSettings }: { todayNum: number; onSettings: () => void }) {
  const { overallProgress, streakCount, daysUntilExam, exportProgress, importProgress } = useProgressContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { pct, daysComplete } = overallProgress();
  const streak = streakCount();
  const examDays = daysUntilExam();

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const ok = importProgress(ev.target?.result as string);
      alert(ok ? '✅ Progress restored!' : '❌ Invalid file.');
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-3 overflow-x-auto flex-shrink-0">
      {/* Brand / student identity */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xl">🩺</span>
        <div>
          <p className="text-sm font-black text-slate-800 leading-tight">{STUDENT_CONFIG.name}</p>
          <p className="text-xs text-slate-500 leading-none">{STUDENT_CONFIG.exam} · Target {STUDENT_CONFIG.targetScore}+</p>
        </div>
      </div>

      <div className="h-8 w-px bg-slate-200 flex-shrink-0" />

      {/* Stats chips */}
      {[
        { label: 'Progress', value: `${pct}%`, sub: `${daysComplete}/60 days`, color: 'text-blue-600' },
        { label: 'Streak',   value: `${streak}d`, sub: 'consecutive', color: 'text-orange-500' },
        { label: 'Exam in',  value: `${examDays}d`, sub: 'Dec 13, 2026', color: examDays <= 21 ? 'text-red-600' : 'text-slate-700' },
      ].map(s => (
        <div key={s.label} className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 flex-shrink-0">
          <p className={`text-base font-black leading-none ${s.color}`}>{s.value}</p>
          <p className="text-xs text-slate-400 leading-none mt-0.5">{s.sub}</p>
        </div>
      ))}

      {/* Progress bar */}
      <div className="flex-1 min-w-20">
        <div className="flex justify-between text-xs text-slate-400 mb-0.5">
          <span>60-day plan</span><span>{pct}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button onClick={onSettings} className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 transition-colors">
          ⚙️ Settings
        </button>
        <button onClick={exportProgress} className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 transition-colors">
          ↓ Backup
        </button>
        <button onClick={() => fileInputRef.current?.click()} className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 transition-colors">
          ↑ Restore
        </button>
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
      </div>
    </div>
  );
}

// ─── Inner App (uses context) ─────────────────────────────────────────────────
function AppInner() {
  const { hydrated, todayDayNum } = useProgressContext();
  const todayNum = todayDayNum();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // After hydration, default to today's day
  const effectiveDay = selectedDay ?? todayNum;
  const day = PLAN.find(d => d.day === effectiveDay) ?? PLAN[0];

  if (!hydrated) {
    return (
      <div className="flex flex-col h-screen">
        <div className="h-14 bg-white border-b border-slate-200 flex items-center px-6 gap-3">
          <span className="text-xl">🩺</span>
          <div>
            <p className="text-sm font-black text-slate-800">{STUDENT_CONFIG.name}</p>
            <p className="text-xs text-slate-400 animate-pulse">Loading progress...</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-3">📚</div>
            <p className="text-slate-500 font-medium">Setting up your study tracker...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <StatsBar todayNum={todayNum} onSettings={() => setShowSettings(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedDay={effectiveDay}
          onSelect={setSelectedDay}
          todayNum={todayNum}
        />
        <DayView day={day} isToday={effectiveDay === todayNum} />
      </div>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}

// ─── Root (provides context) ──────────────────────────────────────────────────
export default function App() {
  return (
    <ProgressProvider>
      <AppInner />
    </ProgressProvider>
  );
}
