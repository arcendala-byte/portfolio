
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { portfolio } from "@/data/portfolio";

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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

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

  return (
    <section
      id="create"
      className="scroll-mt-24 bg-background-secondary py-20 sm:py-28"
    >
      <div className="container-editorial">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">What we can build</p>

              <h2
                ref={headingRef}
                aria-label={heading}
                className={`thunder-heading relative mt-4 max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl ${
                  hasRevealed ? "is-revealing" : ""
                }`}
              >
                <span className="thunder-lightning" aria-hidden="true" />

                <span className="thunder-visual" aria-hidden="true">
                  {[...heading].map((letter, index) =>
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
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground-secondary sm:text-base">
                From thoughtful interfaces to functional applications, I bring
                design, engineering, and practical problem-solving together to
                build useful digital experiences.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="inline-flex shrink-0 items-center gap-2 text-xs text-foreground-muted">
                Explore the services
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>

              <a
                href={`mailto:${portfolio.profile.email}`}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors hover:text-foreground-secondary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
              >
                Discuss a project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Horizontal scroll indicator */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>

            <span>Explore all services</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[10px] uppercase tracking-[0.14em] text-foreground-muted sm:inline">
              Scroll to explore
            </span>

            <div
              className="flex items-center text-foreground-muted"
              aria-hidden="true"
            >
              <ChevronRight className="h-4 w-4 animate-[scroll-nudge_1.4s_ease-in-out_infinite]" />
              <ChevronRight className="-ml-2 h-4 w-4 animate-[scroll-nudge_1.4s_ease-in-out_infinite] [animation-delay:150ms]" />
              <ChevronRight className="-ml-2 h-4 w-4 animate-[scroll-nudge_1.4s_ease-in-out_infinite] [animation-delay:300ms]" />
            </div>
          </div>
        </div>

        {/* Scrollable service cards */}
        <div
          role="region"
          aria-label="Services and capabilities"
          aria-describedby="offerings-scroll-hint"
          tabIndex={0}
          className="-mx-[var(--spacing-gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[var(--spacing-gutter)] pb-5 scrollbar-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          {offerings.map((item, index) => (
            <Reveal
              key={item.number}
              delay={index * 0.05}
              className="group flex min-h-[19rem] w-[min(84vw,25rem)] shrink-0 snap-start flex-col border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-accent sm:w-[min(42vw,25rem)] sm:p-7 lg:w-[min(30vw,25rem)]"
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
                {item.category}
              </p>

              <h3 className="mt-3 text-xl font-medium tracking-tight text-foreground">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {item.description}
              </p>

              <ul
                className="mt-auto flex flex-wrap gap-2 pt-7"
                aria-label={`${item.title} capabilities`}
              >
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-black/10 px-2.5 py-1 text-xs text-foreground-secondary transition-colors duration-300 group-hover:border-accent/40"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <p
          id="offerings-scroll-hint"
          className="mt-3 text-xs text-foreground-muted"
        >
          Swipe, scroll horizontally, or use the arrow keys to explore all
          services.
        </p>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col justify-between gap-5 border-t border-black/10 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-relaxed text-foreground-secondary">
              Have a specific idea in mind? Let&apos;s discuss the problem,
              explore the possibilities, and work toward a solution that fits
              your needs.
            </p>

            <a
              href={`mailto:${portfolio.profile.email}?subject=${encodeURIComponent("Let's discuss a project")}`}
              className="inline-flex min-h-11 w-fit items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
