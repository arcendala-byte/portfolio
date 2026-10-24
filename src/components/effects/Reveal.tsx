"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  amount?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
  once?: boolean;
}

export function Reveal({ children, className, delay = 0, y = 18, x = 0, amount = 0.2, as = "div", once = true }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const classes = cn(className);
  const Component = ({
    div: motion.div,
    section: motion.section,
    article: motion.article,
    li: motion.li,
    header: motion.header,
    footer: motion.footer,
  })[as];
  return (
    <Component
      className={classes}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
