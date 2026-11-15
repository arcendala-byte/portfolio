"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/effects/Reveal";
import { portfolio } from "@/data/portfolio";
import { LiquidLink } from "@/components/effects/LiquidLink";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

const offerings = [
  {
    number: "01",
    title: "Web experiences",
    category: "Web development",
    description:
      "Modern, responsive websites that communicate clearly, look polished across devices, and help visitors find information and take action.",
    tags: ["Web development", "Responsive design", "Accessibility"],
  },
  {
    number: "02",
    title: "Frontend engineering",
    category: "Interface development",
    description:
      "Interactive user interfaces built with reusable components, thoughtful state management, and maintainable frontend architecture.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    number: "03",
    title: "Full-stack applications",
    category: "End-to-end development",
    description:
      "Functional web applications that connect intuitive interfaces with server-side logic, data processing, authentication, and business rules.",
    tags: ["Frontend", "Backend", "Application logic"],
  },
  {
    number: "04",
    title: "UI/UX implementation",
    category: "Design and usability",
    description:
      "Clean, user-focused interfaces with consistent layouts, intuitive navigation, meaningful visual hierarchy, and carefully considered interactions.",
    tags: ["UI/UX", "Interaction design", "Usability"],
  },
  {
    number: "05",
    title: "API integrations",
    category: "Connected systems",
    description:
      "Reliable connections between applications and external services, enabling data exchange, automated workflows, and useful product features.",
    tags: ["REST APIs", "Data handling", "Integrations"],
  },
  {
    number: "06",
    title: "Payment experiences",
    category: "Digital transactions",
    description:
      "Donation and payment interfaces designed to make transactions straightforward, with attention to validation, transaction states, and secure server-side processing.",
    tags: ["PayPal", "Payment flows", "Validation"],
  },
  {
    number: "07",
    title: "Data-driven solutions",
    category: "Intelligent applications",
    description:
      "Practical software solutions that organize information, support decision-making, and explore machine learning or computer vision where appropriate.",
    tags: ["Python", "Data processing", "Machine learning"],
  },
  {
    number: "08",
    title: "Performance and refinement",
    category: "Quality improvement",
    description:
      "Improvements to responsiveness, loading behavior, accessibility, error handling, and overall reliability to make applications easier to use and maintain.",
    tags: ["Optimization", "Testing", "Accessibility"],
  },
];

const heading = "Digital work with a clear purpose.";

export function WhatICreateSection() {
  const { translate } = useSitePreferences();
  const translatedHeading = translate(heading);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isScrollDriven, setIsScrollDriven] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const horizontalProgress = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const horizontalOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollDistance],
  );
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.035]);
  const headingOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.88]);

  useEffect(() => {
    const headingElement = headingRef.current;

    if (!headingElement || hasRevealed) return;

    if (typeof IntersectionObserver === "undefined") {
      headingElement.classList.add("is-revealing");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(headingElement);

    return () => observer.disconnect();
  }, [hasRevealed]);

  useEffect(() => {
    const viewport = cardsViewportRef.current;
    const track = cardsTrackRef.current;
    if (!viewport || !track) return;

    const scrollDrivenQuery = window.matchMedia("(min-height: 640px)");
    let active = true;

    const measure = () => {
      if (!active) return;
      const nextDistance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setScrollDistance((current) =>
        current === nextDistance ? current : nextDistance,
      );
      setIsScrollDriven(scrollDrivenQuery.matches && !prefersReducedMotion);
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      horizontalProgress.set(
        maxScroll > 0
          ? Math.min(1, Math.max(0, viewport.scrollLeft / maxScroll))
          : 0,
      );
    };

    measure();
    window.addEventListener("resize", measure);
    scrollDrivenQuery.addEventListener("change", measure);
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);
    observer?.observe(viewport);
    observer?.observe(track);
    document.fonts?.ready.then(measure);

    return () => {
      active = false;
      window.removeEventListener("resize", measure);
      scrollDrivenQuery.removeEventListener("change", measure);
      observer?.disconnect();
    };
  }, [horizontalProgress, prefersReducedMotion]);

  const updateHorizontalProgress = useCallback(() => {
    const viewport = cardsViewportRef.current;
    if (!viewport) return;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    horizontalProgress.set(
      maxScroll > 0
        ? Math.min(1, Math.max(0, viewport.scrollLeft / maxScroll))
        : 0,
    );
    setCanScrollLeft(viewport.scrollLeft > 1);
    setCanScrollRight(
      maxScroll > 0 && viewport.scrollLeft < maxScroll - 1,
    );
  }, [horizontalProgress]);

  useEffect(() => {
    updateHorizontalProgress();
    window.addEventListener("resize", updateHorizontalProgress);
    return () => window.removeEventListener("resize", updateHorizontalProgress);
  }, [updateHorizontalProgress]);

  const handleCardsKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (isScrollDriven || !["ArrowLeft", "ArrowRight"].includes(event.key)) {
        return;
      }
      event.preventDefault();
      event.currentTarget.scrollBy({
        left:
          (event.key === "ArrowRight" ? 1 : -1) *
          event.currentTarget.clientWidth *
          0.8,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [isScrollDriven, prefersReducedMotion],
  );

  const scrollCardsByPage = useCallback(
    (direction: 1 | -1) => {
      const viewport = cardsViewportRef.current;
      if (!viewport) return;

      if (isScrollDriven) {
        const section = sectionRef.current;
        if (!section) return;
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        window.scrollBy({
          top: direction * scrollable * 0.2,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
      }

      viewport.scrollBy({
        left: direction * viewport.clientWidth * 0.8,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [isScrollDriven, prefersReducedMotion],
  );

  const sectionStyle: CSSProperties & {
    "--service-scroll-distance": string;
  } = {
    "--service-scroll-distance": `${scrollDistance}px`,
  };

  return (
    <section
      id="create"
      className="scroll-mt-24 bg-background-secondary pt-20 sm:pt-28"
    >
      <div
        ref={sectionRef}
        className="service-scroll-spacer container-editorial"
        data-pinned={isScrollDriven}
        data-reduced-motion={prefersReducedMotion}
        style={sectionStyle}
      >
        <div className="service-scroll-sticky">
          <Reveal>
            <div className="mb-7 flex flex-col justify-between gap-6 sm:mb-9 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">{translate("What we can build")}</p>

                <motion.h2
                  ref={headingRef}
                  aria-label={translatedHeading}
                  className={`thunder-heading relative mt-4 max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl ${
                    hasRevealed ? "is-revealing" : ""
                  }`}
                  style={prefersReducedMotion ? undefined : { scale: headingScale, opacity: headingOpacity }}
                >
                  <span className="thunder-lightning" aria-hidden="true" />

                  <span className="thunder-visual" aria-hidden="true">
                    {[...translatedHeading].map((letter, index) =>
                      letter === " " ? (
                        <span className="thunder-space" key={`space-${index}`}>
                          {" "}
                        </span>
                      ) : (
                        <span
                          key={`${letter}-${index}`}
                          className="thunder-letter"
                          style={{
                            "--letter-delay": `${0.72 + index * 0.035}s`,
                          } as CSSProperties}
                        >
                          {letter}
                        </span>
                      ),
                    )}
                  </span>
                </motion.h2>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground-secondary sm:text-base">
                  {translate("From thoughtful interfaces to functional applications, I bring design, engineering, and practical problem-solving together to build useful digital experiences.")}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">

                <LiquidLink
                  href={`mailto:${portfolio.profile.email}`}
                  className="liquid-link--subtle inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-foreground-secondary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
                >
                  {translate("Discuss a project")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </LiquidLink>
              </div>
            </div>
          </Reveal>

          <div className="mb-3 flex items-center justify-between gap-4 sm:mb-4">
            <div className="flex items-center gap-2 text-xs text-foreground-muted">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>{translate("Explore all services")}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-[10px] uppercase tracking-[0.14em] text-foreground-muted sm:inline">
                {translate(isScrollDriven ? "Scroll to explore" : "Swipe to explore")}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollCardsByPage(-1)}
                  disabled={isScrollDriven ? false : !canScrollLeft}
                  aria-label={translate("Show previous services")}
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollCardsByPage(1)}
                  disabled={isScrollDriven ? false : !canScrollRight}
                  aria-label={translate("Show next services")}
                  className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border disabled:hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div
                className="service-scroll-cue flex items-center text-foreground-muted"
                aria-hidden="true"
              >
                <ChevronRight className="service-scroll-arrow h-4 w-4" />
                <ChevronRight className="service-scroll-arrow -ml-2 h-4 w-4" />
                <ChevronRight className="service-scroll-arrow -ml-2 h-4 w-4" />
              </div>
            </div>
          </div>

          <div
            ref={cardsViewportRef}
            role="region"
            aria-label={translate("Services and capabilities")}
            aria-describedby="offerings-scroll-hint"
            tabIndex={0}
            className="service-cards-viewport scrollbar-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            onScroll={updateHorizontalProgress}
            onKeyDown={handleCardsKeyDown}
          >
            <motion.div
              ref={cardsTrackRef}
              className="service-cards-track flex snap-x snap-mandatory gap-4 pb-5"
              style={{
                x: isScrollDriven ? horizontalOffset : 0,
              }}
            >
              {offerings.map((item, index) => (
                <Reveal
                  key={item.number}
                  delay={index * 0.05}
                  y={0}
                  className="service-card group flex min-h-[19rem] shrink-0 snap-start flex-col border border-border bg-background p-6 transition-colors duration-300 hover:border-accent sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground-muted">
                      {item.number}
                    </span>

                    <span
                      className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-8 text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
                    {translate(item.category)}
                  </p>

                  <h3 className="mt-3 text-xl font-medium tracking-tight text-foreground">
                    {translate(item.title)}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                    {translate(item.description)}
                  </p>

                  <ul
                    className="mt-auto flex flex-wrap gap-2 pt-7"
                    aria-label={`${translate(item.title)} capabilities`}
                  >
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-border px-2.5 py-1 text-xs text-foreground-secondary transition-colors duration-300 group-hover:border-accent/40"
                      >
                        {translate(tag)}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </motion.div>
          </div>

          <div className="mt-2 h-0.5 w-full overflow-hidden bg-foreground/10" aria-hidden="true">
            <motion.div
              className="service-cards-progress h-full origin-left bg-accent"
              style={{
                scaleX: isScrollDriven ? scrollYProgress : horizontalProgress,
              }}
            />
          </div>

        </div>
      </div>

      <div className="container-editorial pb-20 sm:pb-28">
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col justify-between gap-5 border-t border-border pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-relaxed text-foreground-secondary">
              {translate("Have a specific idea in mind? Let's discuss the problem, explore the possibilities, and work toward a solution that fits your needs.")}
            </p>

            <LiquidLink
              href={`mailto:${portfolio.profile.email}?subject=${encodeURIComponent("Let's discuss a project")}`}
              className="inline-flex min-h-11 w-fit items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
            >
              {translate("Start a conversation")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </LiquidLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}