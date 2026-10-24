
import type { StaticImageData } from "next/image";

export type ProjectCategory =
  | "Web"
  | "Mobile"
  | "AI / ML"
  | "Design System"
  | "Platform"
  | "Experiment";

export type SkillCategory =
  | "Programming Languages"
  | "Frontend"
  | "Mobile Development"
  | "Backend"
  | "Databases"
  | "Backend Services"
  | "DevOps & Deployment"
  | "UI/UX & Interaction"
  | "Development Tools"
  // Retained for compatibility with existing skill groups.
  | "Tools"
  | "Deployment";

export interface SocialLink {
  label: string;
  href: string;
  /** Lucide icon name resolved in the component */
  icon:
    | "github"
    | "linkedin"
    | "mail"
    | "twitter"
    | "instagram"
    | "external";
}

export interface NavItem {
  label: string;
  href: string;
  /** Section ID used for active state detection */
  sectionId?: string;
}

export interface Profile {
  fullName: string;
  displayName: string;
  monogram: string;
  title: string;
  shortBio: string;
  longBio: string[];
  location: string;
  email: string;
  availability: string;
  portraitSrc?: string;
  specialties: string[];
}

export interface SkillGroup {
  category: SkillCategory;
  items: string[];
}

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  role: string;
  approach: string;
  decisions: string[];
  results?: string[];
  /** true means hide from public until real content is provided */
  isPlaceholder: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  year?: string;
  technologies: string[];
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  caseStudy: ProjectCaseStudy;
}

export interface ExperienceEntry {
  period: string;
  organization: string;
  role: string;
  description: string;
  achievements?: string[];
}

export interface EducationEntry {
  period: string;
  institution: string;
  qualification: string;
  description?: string;
}

export interface PortfolioData {
  profile: Profile;
  social: SocialLink[];
  navigation: NavItem[];
  skills: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  accentColor: string;
}
