"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { portfolio } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";

interface SiteShellContextValue {
  activeId: string | null;
}

const SiteShellContext = createContext<SiteShellContextValue | null>(null);

export function useSiteShell(): SiteShellContextValue {
  const context = useContext(SiteShellContext);
  if (!context) throw new Error("useSiteShell must be used inside <SiteShell>");
  return context;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const sectionIds = useMemo(
    () => portfolio.navigation.map((item) => item.sectionId ?? "").filter(Boolean),
    [],
  );
  const activeId = useActiveSection(sectionIds);

  return (
    <SiteShellContext.Provider value={{ activeId }}>
      {children}
    </SiteShellContext.Provider>
  );
}
