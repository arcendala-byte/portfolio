"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      autoRaf: false,
      anchors: { offset: 96 },
      duration: 1.1,
      easing: (progress) => Math.min(1, 1.001 - 2 ** (-10 * progress)),
    });

    const animate = (time: number) => {
      lenis.raf(time * 1000);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) gsap.ticker.sleep();
      else gsap.ticker.wake();
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(animate);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(animate);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return children;
}
