"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { portfolio } from "@/data/portfolio";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

const MINIMUM_LOADING_DURATION = 250;
const MAXIMUM_LOADING_DURATION = 1200;

export function LoadingScreen() {
  const { translate } = useSitePreferences();
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const startedAt = performance.now();
    let hideTimeout: number | undefined;
    const fallbackTimeout = window.setTimeout(
      () => setVisible(false),
      MAXIMUM_LOADING_DURATION,
    );
    const hideWhenReady = () => {
      window.clearTimeout(fallbackTimeout);
      const remaining = Math.max(
        0,
        MINIMUM_LOADING_DURATION - (performance.now() - startedAt),
      );
      hideTimeout = window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      hideWhenReady();
    } else {
      window.addEventListener("load", hideWhenReady, { once: true });
    }

    return () => {
      window.clearTimeout(fallbackTimeout);
      if (hideTimeout !== undefined) window.clearTimeout(hideTimeout);
      window.removeEventListener("load", hideWhenReady);
    };
  }, []);

  const instantTransition = {
    duration: 0,
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="portfolio-loader"
          role="status"
          aria-label={translate("Loading portfolio")}
          className="fixed inset-0 z-[100] flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-background px-6 text-foreground"
          initial={
            reduceMotion
              ? false
              : { opacity: 1, y: 0 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: -24,
                  transition: {
                    duration: 0.4,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }
          }
          transition={
            reduceMotion ? instantTransition : undefined
          }
        >
          {/* Subtle entrance for the logo */}
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.88,
                    y: 18,
                    filter: "blur(8px)",
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={
              reduceMotion
                ? instantTransition
                : {
                    duration: 0.9,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            <Image
              src="/logo-mark.png"
              width={410}
              height={305}
              alt=""
              loading="eager"
              unoptimized
              className="theme-aware-logo h-auto w-[min(68vw,20rem)]"
            />
          </motion.div>

          {/* Name enters shortly after the logo */}
          <motion.p
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 8 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion
                ? instantTransition
                : {
                    duration: 0.55,
                    delay: 0.4,
                    ease: "easeOut",
                  }
            }
            className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted"
          >
            {portfolio.profile.displayName}
          </motion.p>

          {/* Smooth progress indicator */}
          <div
            className="mt-6 h-px w-24 overflow-hidden bg-foreground/10"
            aria-hidden="true"
          >
            <motion.span
              className="block h-full w-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={
                reduceMotion
                  ? instantTransition
                  : {
                      duration: 1.4,
                      delay: 0.2,
                      ease: [0.65, 0, 0.35, 1],
                    }
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}