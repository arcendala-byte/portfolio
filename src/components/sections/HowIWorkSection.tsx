
"use client";

import { useState } from "react";
import { Reveal } from "@/components/effects/Reveal";

const steps = [
  {
    number: "01",
    title: "Understand the need",
    description:
      "Clarify who the work is for, what it needs to accomplish, and which constraints matter before choosing a direction.",
    tag: "Discovery",
  },
  {
    number: "02",
    title: "Research and explore",
    description:
      "Review relevant ideas, existing solutions, user expectations, and technical possibilities to identify an effective approach.",
    tag: "Research",
  },
  {
    number: "03",
    title: "Plan the structure",
    description:
      "Break the project into manageable tasks, organize the content, and establish a clear structure for the application.",
    tag: "Strategy",
  },
  {
    number: "04",
    title: "Shape the experience",
    description:
      "Design user flows, organize information, and develop interface concepts that make the product intuitive and accessible.",
    tag: "Experience",
  },
  {
    number: "05",
    title: "Build with care",
    description:
      "Implement responsive interfaces and application functionality using maintainable components and technologies suited to the project.",
    tag: "Development",
  },
  {
    number: "06",
    title: "Test and troubleshoot",
    description:
      "Check functionality, identify bugs, validate important interactions, and address problems before considering the work complete.",
    tag: "Quality",
  },
  {
    number: "07",
    title: "Refine the details",
    description:
      "Review the experience across screen sizes, improve accessibility, optimize performance where needed, and polish the small details.",
    tag: "Refinement",
  },
  {
    number: "08",
    title: "Launch and improve",
    description:
      "Prepare the finished work for release, verify the deployment, and use feedback to identify opportunities for future improvements.",
    tag: "Delivery",
  },
];

export function HowIWorkSection() {
  const [openSteps, setOpenSteps] = useState<string[]>([]);

  function toggleStep(number: string) {
    setOpenSteps((current) =>
      current.includes(number)
        ? current.filter((item) => item !== number)
        : [...current, number]
    );
  }

  return (
    <section
      id="process"
      className="container-editorial section-pad scroll-mt-24"
    >
      <Reveal>
        <div className="mb-10 grid gap-5 sm:mb-14 sm:grid-cols-12 sm:items-end">
          <div className="sm:col-span-7">
            <p className="eyebrow">How I work</p>

            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl">
              From the first idea to the final detail.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-foreground-secondary sm:col-span-4 sm:col-start-9">
            A thoughtful, practical approach to building digital products,
            combining clear planning, purposeful design, careful development,
            and continuous improvement.
          </p>
        </div>
      </Reveal>

      <ol className="grid gap-x-8 md:grid-cols-2">
        {steps.map((step, index) => {
          const isOpen = openSteps.includes(step.number);
          const descriptionId = `process-description-${step.number}`;

          return (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 0.06}
              className="group border-t border-black/15 py-6 transition-colors duration-300 hover:border-accent sm:py-8"
            >
              <div className="grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[3.5rem_1fr]">
                <span className="pt-2 font-mono text-xs text-foreground-muted transition-colors duration-300 group-hover:text-accent">
                  {step.number}
                </span>

                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleStep(step.number)}
                      aria-expanded={isOpen}
                      aria-controls={descriptionId}
                      className="group/title inline-flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <h3 className="text-xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover/title:text-accent sm:text-2xl">
                        {step.title}
                      </h3>

                      <span
                        aria-hidden="true"
                        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-300 ease-out ${
                          isOpen
                            ? "border-accent text-accent"
                            : "process-button-breathe border-accent text-foreground-muted"
                        }`}
                      >
                        <span
                          className={`process-button-icon inline-block transition-transform duration-500 ease-out ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                        >
                          +
                        </span>
                      </span>
                    </button>

                    <span className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground-muted">
                      {step.tag}
                    </span>
                  </div>

                  <div
                    id={descriptionId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-in-out ${
                      isOpen
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`max-w-lg text-sm leading-relaxed text-foreground-secondary sm:text-base ${
                          isOpen ? "process-paragraph-reveal" : ""
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
