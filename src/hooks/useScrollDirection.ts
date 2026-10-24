"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "idle";

interface ScrollState {
  scrollY: number;
  direction: Direction;
}

/**
 * Tracks window.scrollY and scroll direction.
 * Updates only when direction changes (not on every pixel).
 * rAF-throttled so we don't fire on every scroll event.
 */
export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    direction: "idle",
  });
  const lastY = useRef(0);
  const lastDir = useRef<Direction>("idle");
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      let dir: Direction = lastDir.current;
      if (Math.abs(delta) > 2) {
        dir = delta > 0 ? "down" : "up";
      }

      if (dir !== lastDir.current || y !== state.scrollY) {
        lastDir.current = dir;
        setState({ scrollY: y, direction: dir });
      }
      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}