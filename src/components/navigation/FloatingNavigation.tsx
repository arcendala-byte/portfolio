"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { NavigationLinks } from "./NavigationLinks";

interface FloatingNavigationProps {
  activeId: string | null;
}

export function FloatingNavigation({ activeId }: FloatingNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white text-foreground">
      <div className="container-editorial flex min-h-16 items-center justify-between gap-5">
        <Link
          href="#home"
          className="inline-flex min-w-0 max-w-[calc(100%_-_4rem)] items-center gap-2 text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:gap-3 sm:text-base"
          aria-label={`${portfolio.profile.displayName}, home`}
        >
          <Image src="/logo-mark.png" width={410} height={305} alt="" priority className="h-9 w-11 shrink-0 object-contain" />
          <span className="truncate">{portfolio.profile.displayName}</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden min-w-0 lg:block">
          <NavigationLinks items={portfolio.navigation} activeId={activeId} />
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground lg:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-navigation-menu" aria-label="Mobile navigation" className="container-editorial border-t border-black/10 py-3 lg:hidden">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {portfolio.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={item.sectionId === activeId ? "location" : undefined}
                  className={`flex min-h-10 items-center rounded-sm px-2 text-sm hover:bg-black/[0.04] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground ${item.sectionId === activeId ? "font-medium text-foreground" : "text-foreground-secondary"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
