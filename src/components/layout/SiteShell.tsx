"use client";

import { useMemo, type ReactNode } from "react";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { FloatingNavigation } from "@/components/navigation/FloatingNavigation";

export function SiteShell({ children }: { children: ReactNode }) {
  const sectionIds = useMemo(
    () => portfolio.navigation.map((item) => item.sectionId ?? "").filter(Boolean),
    [],
  );
  const activeId = useActiveSection(sectionIds);

  return (
    <>
      <FloatingNavigation activeId={activeId} />
      {children}
    </>
  );
}
