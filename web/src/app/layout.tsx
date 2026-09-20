import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RUHS MO 2026 — 60-Day Study Tracker',
  description: 'Interactive day-by-day study planner for RUHS Medical Officer 2026 exam (Dec 13, 2026). Target: 85+ marks.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
