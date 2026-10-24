"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useState } from "react";

export function ProjectsSection() {
  const projects = portfolio.projects;
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
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
          <p className="eyebrow">Selected work</p>
          <h2 className="max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl">Projects and experiments.</h2>
        </div>
      </Reveal>
      <div className="mb-7 flex flex-wrap gap-2" aria-label="Filter projects by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`min-h-10 rounded-sm border px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${activeCategory === category ? "border-foreground bg-foreground text-white" : "border-black/15 text-foreground-secondary hover:border-black/40 hover:text-foreground"}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.slug} {...cardDirections[index % cardDirections.length]} delay={index * 0.07}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
