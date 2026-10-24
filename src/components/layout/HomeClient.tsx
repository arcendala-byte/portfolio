"use client";

import type { ReactNode } from "react";
import { FloatingNavigation } from "@/components/navigation/FloatingNavigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { HowIWorkSection } from "@/components/sections/HowIWorkSection";
import { WhatICreateSection } from "@/components/sections/WhatICreateSection";
import { VisualArchiveSection } from "@/components/sections/VisualArchiveSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { useSiteShell } from "@/components/layout/SiteShell";

interface HomeClientProps {
  copyrightSlot?: ReactNode;
}

export function HomeClient({ copyrightSlot }: HomeClientProps) {
  const {
    activeId,
  } = useSiteShell();

  return (
    <>
      <FloatingNavigation activeId={activeId} />

      <main className="relative">
        <div className="relative">
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <WhatICreateSection />
            <HowIWorkSection />
            <VisualArchiveSection />
            <ExpertiseSection />
            <ExperienceSection />
            <ContactSection />
          </div>
        </div>
        <Footer copyrightSlot={copyrightSlot} />
      </main>
    </>
  );
}
