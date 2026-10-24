import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { SiteShell } from "@/components/layout/SiteShell";
import { Copyright } from "@/components/layout/Copyright";
import { Footer } from "@/components/layout/Footer";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${portfolio.profile.displayName}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = portfolio.projects.findIndex((p) => p.slug === slug);
  const project = portfolio.projects[index];
  if (!project) notFound();

  const prev = index > 0 ? portfolio.projects[index - 1] : null;
  const next =
    index < portfolio.projects.length - 1
      ? portfolio.projects[index + 1]
      : null;

  return (
    <SiteShell>
      <ProjectCaseStudy project={project} prev={prev} next={next} />
      <Footer copyrightSlot={<Copyright />} />
    </SiteShell>
  );
}