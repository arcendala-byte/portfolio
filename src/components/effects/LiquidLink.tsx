"use client";

import { useCallback } from "react";
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

type LiquidLinkProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
};

export function LiquidLink({
  children,
  className,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: LiquidLinkProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.35 });

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLAnchorElement>) => {
      onPointerMove?.(event);
      if (prefersReducedMotion || event.pointerType !== "mouse") return;

      const bounds = event.currentTarget.getBoundingClientRect();
      x.set((event.clientX - bounds.left - bounds.width / 2) * 0.1);
      y.set((event.clientY - bounds.top - bounds.height / 2) * 0.1);
    },
    [onPointerMove, prefersReducedMotion, x, y],
  );

  const handlePointerLeave = useCallback(
    (event: ReactPointerEvent<HTMLAnchorElement>) => {
      onPointerLeave?.(event);
      x.set(0);
      y.set(0);
    },
    [onPointerLeave, x, y],
  );

  return (
    <motion.a
      {...props}
      className={cn("liquid-link", className)}
      style={{ ...style, x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span className="liquid-link__ink" aria-hidden="true" />
      <span className="liquid-link__content">{children}</span>
    </motion.a>
  );
}
