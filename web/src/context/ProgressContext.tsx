'use client';

import React, { createContext, useContext } from 'react';
import { useProgress } from '@/hooks/useProgress';

type ProgressContextType = ReturnType<typeof useProgress>;

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const progress = useProgress();
  return (
    <ProgressContext.Provider value={progress}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext(): ProgressContextType {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgressContext must be used inside ProgressProvider');
  return ctx;
}
