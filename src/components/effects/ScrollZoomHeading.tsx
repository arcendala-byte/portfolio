"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

function ScrollWord({
  children,
  index,
  progress,
}: {
  children: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const revealStart = Math.min(0.06 + index * 0.025, 0.2);
  const revealEnd = Math.min(revealStart + 0.16, 0.38);
  const opacity = useTransform(progress, [0, revealStart, revealEnd], [0.35, 0.7, 1]);
  const y = useTransform(progress, [revealStart, revealEnd], [8, 0]);

  return (
    <motion.span
      className="inline-block"
      style={{ opacity, y }}
    >
      {children}
    </motion.span>
  );
}

interface ScrollZoomHeadingProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

export function ScrollZoomHeading({
  children,
  className,
  label,
}: ScrollZoomHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 1.04]);
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.55, 1, 1, 0.65]);
  const words =
    !prefersReducedMotion && typeof children === "string"
      ? children.split(/(\s+)/)
      : null;

  return (
    <motion.h2
      ref={headingRef}
      aria-label={label}
      className={className}
      style={prefersReducedMotion ? undefined : { scale, opacity }}
    >
      {words
        ? words.map((word, index) =>
            /^\s+$/.test(word) ? (
              word
            ) : (
              <ScrollWord
                key={`${word}-${index}`}
                index={index}
                progress={scrollYProgress}
              >
                {word}
              </ScrollWord>
            ),
          )
        : children}
    </motion.h2>
  );
}
