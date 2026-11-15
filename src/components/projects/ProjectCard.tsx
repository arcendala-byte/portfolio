import type { Project } from "@/types/portfolio";
import { ArrowUpRight } from "lucide-react";
import { SkeletonImage } from "@/components/effects/SkeletonImage";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

interface ProjectCardProps {
  project: Project;
}

const previewSurfaces = ["bg-surface", "bg-background-secondary", "bg-surface-elevated"];

export function ProjectCard({ project }: ProjectCardProps) {
  const { translate } = useSitePreferences();
  const hasRealImage = Boolean(
    project.imageSrc &&
      (typeof project.imageSrc !== "string" || !project.imageSrc.includes("placeholder")),
  );
  const detailText = [project.caseStudy.overview, project.caseStudy.problem]
    .filter((value) => value && !/placeholder|replace this|update this|document the actual/i.test(value));
  const monogram = project.title.split(/\s+/).map((word) => word[0]).join("").slice(0, 3);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-background shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-md motion-reduce:transform-none">
      <div data-project-image className={`group relative aspect-[16/10] overflow-hidden ${previewSurfaces[project.title.length % previewSurfaces.length]}`}>
        {hasRealImage && project.imageSrc ? (
          <SkeletonImage
            src={project.imageSrc}
            alt={project.imageAlt ?? `${project.title} project preview`}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className={`${project.category === "Mobile" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.035]`}
          />
        ) : (
          <div className="flex h-full flex-col justify-between p-5 sm:p-6">
            <span className="self-end font-display text-6xl leading-none tracking-[-0.06em] text-foreground/80 sm:text-7xl" aria-hidden="true">{monogram}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="min-w-0 break-words text-lg font-semibold tracking-tight text-foreground">{translate(project.title)}</h3>
          <span className="text-xs text-foreground-muted">{translate(project.category)}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">{translate(project.description)}</p>

        {detailText.length > 0 && (
          <details className="group mt-5 border-t border-border pt-4">
            <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground [&::-webkit-details-marker]:hidden">
              {translate("More project details")}
              <span className="text-lg leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="space-y-3 pb-2 pt-3 text-sm leading-relaxed text-foreground-secondary">
              {detailText.map((detail, index) => <p key={index}>{translate(detail)}</p>)}
            </div>
          </details>
        )}

        {project.technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${translate(project.title)} technologies`}>
            {project.technologies.map((technology) => (
              <li key={technology} className="rounded-sm bg-foreground/5 px-2 py-1 text-xs text-foreground-secondary">{technology}</li>
            ))}
          </ul>
        )}

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm">
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">{translate("View project")} <ArrowUpRight className="h-3.5 w-3.5" /></a>}
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground">{translate("Source code")} <ArrowUpRight className="h-3.5 w-3.5" /></a>}
          </div>
        )}
      </div>
    </article>
  );
}
