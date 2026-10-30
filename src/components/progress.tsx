"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ProgressValue = {
  done: number;
  total: number;
  setProgress: (done: number, total: number) => void;
};

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ total, children }: { total: number; children: ReactNode }) {
  const [progress, setProgressState] = useState({ done: 0, total });
  const setProgress = useCallback((done: number, nextTotal: number) => {
    setProgressState((current) =>
      current.done === done && current.total === nextTotal ? current : { done, total: nextTotal },
    );
  }, []);
  const value = useMemo(
    () => ({ done: progress.done, total: progress.total, setProgress }),
    [progress.done, progress.total, setProgress],
  );
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  return useContext(ProgressContext);
}
