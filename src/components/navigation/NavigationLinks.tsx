"use client";

import Link from "next/link";
import type { NavItem } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface NavigationLinksProps {
  items: NavItem[];
  activeId: string | null;
  /** Compact mode — smaller labels, tighter spacing */
  className?: string;
  onNavigate?: () => void;
}

export function NavigationLinks({
  items,
  activeId,
  className,
  onNavigate,
}: NavigationLinksProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-end gap-x-1 gap-y-0.5 xl:gap-x-2",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.sectionId === activeId;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative inline-flex min-h-10 items-center whitespace-nowrap rounded-sm px-1.5 py-1.5 xl:px-2",
                "text-foreground-secondary hover:text-foreground",
                "focus-visible:text-foreground",
              )}
            >
              {isActive && <span className="absolute inset-x-2 bottom-0 h-px bg-foreground" aria-hidden="true" />}
              <span
                className={cn(
                  "relative z-10",
                  "text-xs sm:text-[13px]",
                  isActive && "text-foreground font-medium",
                )}
              >
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
