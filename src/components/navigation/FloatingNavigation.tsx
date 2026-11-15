"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { NavigationLinks } from "./NavigationLinks";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

interface FloatingNavigationProps {
  activeId: string | null;
}

export function FloatingNavigation({ activeId }: FloatingNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, locale, setTheme, setLocale, translate } =
    useSitePreferences();
  const navigationItems = useMemo(
    () =>
      portfolio.navigation.map((item) => ({
        ...item,
        href: pathname === "/" ? item.href : `/${item.href}`,
        label: translate(item.label),
      })),
    [pathname, translate],
  );
  const currentActiveId = pathname === "/" ? activeId : null;

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="navbar-shell fixed inset-x-0 top-0 z-50 border-b text-foreground"
    >
      <div className="container-editorial flex min-h-16 items-center justify-between gap-2 sm:gap-5">
        <Link
          href={pathname === "/" ? "#home" : "/#home"}
          className="inline-flex min-w-0 max-w-[calc(100%_-_8rem)] flex-1 items-center gap-1.5 text-[13px] font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:gap-3 sm:text-base xl:max-w-none xl:flex-none xl:gap-3 xl:text-base"
          aria-label={`${portfolio.profile.displayName}, home`}
        >
          <Image
            src="/logo-mark.png"
            width={410}
            height={305}
            alt=""
            loading="eager"
            unoptimized
            className="theme-aware-logo h-auto w-9 shrink-0 object-contain sm:w-11"
          />
          <span className="truncate">{portfolio.profile.displayName}</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <nav
            aria-label={translate("Main navigation")}
            className="hidden min-w-0 xl:block"
          >
            <NavigationLinks
              items={navigationItems}
              activeId={currentActiveId}
            />
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className="preference-control"
              aria-label={translate(
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
              )}
              title={translate(
                theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
              )}
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {theme === "dark" ? (
                <Sun aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Moon aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              className="preference-control min-w-11 px-2 font-medium"
              aria-label={translate(
                locale === "fr"
                  ? "Change language to English"
                  : "Change language to French",
              )}
              title={locale === "fr" ? "English" : "Français"}
              onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>
          </div>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground xl:hidden"
          aria-label={translate(
            mobileMenuOpen ? "Close navigation menu" : "Open navigation menu",
          )}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label={translate("Main navigation")}
          className="container-editorial max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain border-t border-border py-3 xl:hidden"
        >
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={item.sectionId === currentActiveId ? "location" : undefined}
                  className={`flex min-h-11 items-center rounded-sm px-3 text-sm hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-foreground ${item.sectionId === currentActiveId ? "font-medium text-foreground" : "text-foreground-secondary"}`}
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
