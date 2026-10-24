"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section id is currently most visible in the viewport.
 * Uses IntersectionObserver — cheap, no scroll listener.
 */
export function useActiveSection(
  ids: string[],
  options?: { rootMargin?: string },
): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActive(bestId);
      },
      {
        rootMargin: options?.rootMargin ?? "-40% 0px -40% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 0.85, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids, options?.rootMargin]);

  return active;
}