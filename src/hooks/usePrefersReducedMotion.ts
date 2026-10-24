"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` when the user has requested reduced motion.
 *
 * The initial value is computed lazily (state initializer runs during the
 * first render) so we don't call setState inside an effect — this satisfies
 * React 19's `react-hooks/set-state-in-effect` rule while remaining SSR-safe
 * (returns `false` when `window` is unavailable).
 *
 * The subsequent `useEffect` only SUBSCRIBES to media-query changes; it does
 * not synchronously call setState, so the rule is satisfied.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}