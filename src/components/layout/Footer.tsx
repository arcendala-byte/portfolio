
"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Code,
  BriefcaseBusiness,
  Mail,
  Globe,
} from "lucide-react";
import { portfolio } from "@/data/portfolio";

interface FooterProps {
  copyrightSlot?: ReactNode;
}

const socialIcons = {
  github: Code,
  linkedin: BriefcaseBusiness,
  mail: Mail,
  twitter: Globe,
  instagram: Globe,
  external: ArrowUpRight,
} as const;

export function Footer({ copyrightSlot }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#111111] text-white">
      <div className="container-editorial py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/50">
              Have a project in mind?
            </p>

            <h2 className="mt-5 max-w-4xl font-display text-4xl leading-[0.98] tracking-[-0.05em] sm:text-6xl sm:leading-[0.95] sm:tracking-[-0.055em] lg:text-8xl">
              Let&apos;s build something meaningful.
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
              Have an idea, need a developer, or want to collaborate?
              Let&apos;s talk about what we can create together.
            </p>

            <a
              href={`mailto:${portfolio.profile.email}`}
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Start a conversation
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>

            <p className="mt-3 text-xs text-white/45">
              {portfolio.profile.email}
            </p>

            <a
              href="https://wa.me/254780003817"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="Contact ARC Ndala on WhatsApp at +254780003817"
            >
              <span>WhatsApp:</span>
              <span>+254 780 003 817</span>
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>

          <nav
            aria-label="Footer navigation"
            className="lg:col-span-3 lg:col-start-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/50">
              Explore
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-1">
              {portfolio.navigation
                .filter((item) => item.sectionId !== "contact")
                .map((item) => (
                  <li key={item.sectionId ?? item.href}>
                    <Link
                      href={item.href}
                      className="link-underline inline-flex items-center text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>

        {portfolio.social.length > 0 && (
          <div className="mt-14 border-t border-white/15 pt-7 sm:mt-16">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/50">
                  Find me online
                </p>
                <p className="mt-2 text-sm text-white/65">
                  Connect, follow my work, or get in touch.
                </p>
              </div>

              <ul className="flex flex-wrap items-center gap-3">
                {portfolio.social.map((social) => {
                  const Icon =
                    socialIcons[
                      social.icon as keyof typeof socialIcons
                    ] ?? ArrowUpRight;
                  const isEmail = social.icon === "mail";

                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        title={social.label}
                        target={isEmail ? undefined : "_blank"}
                        rel={isEmail ? undefined : "noopener noreferrer"}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all hover:border-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      >
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <Link
              href="#home"
              aria-label={`${portfolio.profile.displayName}, back to top`}
              className="inline-flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src="/logo-mark.png"
                width={410}
                height={305}
                alt=""
                className="h-8 w-10 object-contain brightness-0 invert"
              />
            </Link>

            <span className="text-xs text-white/40" aria-hidden="true">
              /
            </span>

            <span className="text-xs text-white/60">
              © 2026 {portfolio.profile.displayName}
            </span>

            {portfolio.profile.location && (
              <>
                <span className="text-xs text-white/40" aria-hidden="true">
                  /
                </span>
                <span className="text-xs text-white/50">
                  {portfolio.profile.location}
                </span>
              </>
            )}
          </div>

          {copyrightSlot && (
            <div className="text-xs text-white/50">{copyrightSlot}</div>
          )}

          <Link
            href="#home"
            className="link-underline self-start text-xs text-white/60 transition-colors hover:text-white sm:self-auto"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
