"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useState } from "react";
import { ScrollZoomHeading } from "@/components/effects/ScrollZoomHeading";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

export function ProjectsSection() {
  const { translate } = useSitePreferences();
  const projects = portfolio.projects;
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const prefersReducedMotion = useReducedMotion();
  const visibleProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);
  const cardDirections = [
    { x: -44, y: 0 },
    { x: 0, y: 38 },
    { x: 44, y: 0 },
    { x: 0, y: -32 },
  ];
  return (
    <section id="work" className="container-editorial section-pad scroll-mt-24">
      <Reveal>
        <div className="mb-10 flex flex-col gap-3 sm:mb-14">
          <p className="eyebrow">{translate("Selected work")}</p>
          <ScrollZoomHeading className="max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl">{translate("Projects and experiments.")}</ScrollZoomHeading>
        </div>
      </Reveal>
      <div className="mb-7 flex flex-wrap gap-2" aria-label={translate("Filter projects by category")}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`min-h-10 rounded-sm border px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${activeCategory === category ? "border-foreground bg-foreground text-background" : "border-border text-foreground-secondary hover:border-border-strong hover:text-foreground"}`}
          >
            {translate(category)}
          </button>
        ))}
      </div>
      <motion.div
        layout={!prefersReducedMotion}
        data-project-grid
        className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.32, delay: prefersReducedMotion ? 0 : index * 0.04 }}
            >
              <Reveal
                {...cardDirections[index % cardDirections.length]}
                delay={index * 0.07}
              >
                <ProjectCard project={project} />
              </Reveal>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
