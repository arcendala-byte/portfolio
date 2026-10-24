"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "@/components/effects/Reveal";
import type { Project } from "@/types/portfolio";

interface ProjectCaseStudyProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

export function ProjectCaseStudy({
  project,
  prev,
  next,
}: ProjectCaseStudyProps) {
  const { caseStudy } = project;

  if (caseStudy.isPlaceholder) {
    return (
      <article className="container-editorial min-h-screen py-16 sm:py-24">
        <Link href="/" className="text-sm text-foreground-secondary underline-offset-4 hover:text-foreground hover:underline">← Back to portfolio</Link>
        <header className="mt-20 max-w-4xl">
          <p className="eyebrow">{project.category}</p>
          <h1 className="mt-6 break-words font-display text-[clamp(2.25rem,9vw,4.5rem)] leading-[0.95] tracking-[-0.045em] text-foreground">{project.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground-secondary">{project.description.split("PLACEHOLDER")[0].trim()}</p>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-foreground-muted">A full case study will be added when verified project details are available.</p>
        </header>
      </article>
    );
  }

  return (
    <article className="relative">
      <div className="relative z-10 container-editorial">
        {/* Back link + top meta */}
        <Reveal>
          <div className="flex items-center justify-between pb-6 pt-10 hairline-b">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-foreground-secondary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
            >
              <ArrowLeft
                className="h-4 w-4"
                strokeWidth={1.8}
              />
              Back to portfolio
            </Link>
            <span className="micro hidden sm:inline">Case study</span>
          </div>
        </Reveal>

        {/* Hero header */}
        <header className="py-16 sm:py-24">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="micro">{project.category}</span>
              {project.year && (
                <>
                  <span className="h-[3px] w-[3px] rounded-full bg-foreground-muted" aria-hidden="true" />
                  <span className="micro">{project.year}</span>
                </>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mb-8 max-w-5xl break-words font-display text-[clamp(2.25rem,10vw,9rem)] leading-[0.92] tracking-[-0.045em] text-balance text-foreground sm:tracking-[-0.055em]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-2xl text-lg leading-relaxed text-foreground-secondary sm:text-xl">
              {project.description}
            </p>
          </Reveal>

          {/* Link buttons */}
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
                >
                  Visit live site
                  <ArrowUpRight
                    className="h-3.5 w-3.5"
                    strokeWidth={2}
                  />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-sm border border-black/15 px-5 py-3 text-sm text-foreground-secondary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
                >
                  <GithubIcon className="h-4 w-4" />
                  Repository
                </a>
              )}
              {!project.liveUrl && !project.repoUrl && (
                <span className="micro">
                  Links will appear when provided
                </span>
              )}
            </div>
          </Reveal>
        </header>

        {/* Hero image */}
        {project.imageSrc && (
          <Reveal delay={0.1}>
            <div className="relative mb-20 aspect-[16/9] w-full overflow-hidden border border-black/10 bg-surface">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt ?? project.title}
                fill
                priority
                sizes="100vw"
                className={project.category === "Mobile" ? "object-contain" : "object-cover"}
              />
            </div>
          </Reveal>
        )}

        {/* Metadata strip */}
        <Reveal>
          <div className="mb-20 grid grid-cols-2 gap-x-8 gap-y-6 hairline-t hairline-b py-8 sm:grid-cols-4">
            <div>
              <p className="micro mb-2">Role</p>
              <p className="text-sm text-foreground">
                {caseStudy.role.replace("PLACEHOLDER — ", "")}
              </p>
            </div>
            <div>
              <p className="micro mb-2">Category</p>
              <p className="text-sm text-foreground">{project.category}</p>
            </div>
            <div className="col-span-2">
              <p className="micro mb-2">Technologies</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center bg-black/[0.04] px-2 py-1 text-[10px] text-foreground-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Body sections */}
        <div className="space-y-20 pb-20">
          <Reveal>
            <CaseStudySection title="Overview">
              <p>{caseStudy.overview}</p>
            </CaseStudySection>
          </Reveal>

          <Reveal>
            <CaseStudySection title="The problem">
              <p>{caseStudy.problem}</p>
            </CaseStudySection>
          </Reveal>

          <Reveal>
            <CaseStudySection title="Approach">
              <p>{caseStudy.approach}</p>
            </CaseStudySection>
          </Reveal>

          <Reveal>
            <CaseStudySection title="Key decisions">
              <ul className="space-y-3">
                {caseStudy.decisions.map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground-muted"
                      aria-hidden="true"
                    />
                    <span>{d.replace("PLACEHOLDER — ", "")}</span>
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          </Reveal>

          {caseStudy.results && caseStudy.results.length > 0 && (
            <Reveal>
              <CaseStudySection title="Results">
                <ul className="space-y-3">
                  {caseStudy.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground-muted"
                        aria-hidden="true"
                      />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </CaseStudySection>
            </Reveal>
          )}
        </div>

        {/* Placeholder note */}
        {caseStudy.isPlaceholder && (
          <Reveal>
            <div className="mb-20 border border-black/10 bg-background-secondary p-6">
              <p className="micro mb-2">Note</p>
              <p className="text-sm leading-relaxed text-foreground-secondary">
                This case study uses placeholder content. Replace the fields in{" "}
                <code className="bg-black/[0.05] px-1.5 py-0.5 font-mono text-xs">
                  src/data/portfolio.ts
                </code>{" "}
                with real project details to make it yours.
              </p>
            </div>
          </Reveal>
        )}

        {/* Prev / Next navigation */}
        <Reveal>
          <nav
            aria-label="Project navigation"
            className="hairline-t py-10"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group flex items-center gap-3 p-3 hover:bg-black/[0.03] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
                >
                  <ArrowLeft
                    className="h-5 w-5 shrink-0 text-foreground-muted"
                    strokeWidth={1.6}
                  />
                  <div className="min-w-0">
                    <p className="micro mb-1">Previous</p>
                    <p className="truncate text-sm text-foreground-secondary group-hover:text-foreground">
                      {prev.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group flex items-center justify-end gap-3 p-3 text-right hover:bg-black/[0.03] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground sm:text-right"
                >
                  <div className="min-w-0">
                    <p className="micro mb-1">Next</p>
                    <p className="truncate text-sm text-foreground-secondary group-hover:text-foreground">
                      {next.title}
                    </p>
                  </div>
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-foreground-muted"
                    strokeWidth={1.6}
                  />
                </Link>
              ) : (
                <div aria-hidden="true" />
              )}
            </div>
          </nav>
        </Reveal>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

interface CaseStudySectionProps {
  title: string;
  children: React.ReactNode;
}

function CaseStudySection({ title, children }: CaseStudySectionProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <h2 className="eyebrow sticky top-24">{title}</h2>
      </div>
      <div className="md:col-span-9 text-base leading-relaxed text-foreground-secondary sm:text-lg">
        {children}
      </div>
    </div>
  );
}
