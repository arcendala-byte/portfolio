"use client";

import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";

export function ContactSection() {
  const socials = portfolio.social.filter((link) => link.icon !== "mail" && !/yourusername|example\.com/i.test(link.href));
  return <section id="contact" className="container-editorial section-pad scroll-mt-24">
    <div className="grid gap-10 md:grid-cols-12 md:gap-8">
      <Reveal className="md:col-span-4"><p className="eyebrow">Contact</p></Reveal>
      <div className="md:col-span-7 md:col-start-6">
        <Reveal delay={0.06}><h2 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.045em] text-foreground sm:text-7xl">Have a good problem to solve?</h2></Reveal>
        <Reveal delay={0.12}><p className="mt-7 max-w-lg text-base leading-relaxed text-foreground-secondary">For thoughtful collaborations, project inquiries, or a conversation about building useful software.</p></Reveal>
        <Reveal delay={0.18}>
          <a href={`mailto:${portfolio.profile.email}`} className="mt-9 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground">
            {portfolio.profile.email}<ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </Reveal>
        {socials.length > 0 && <Reveal delay={0.24}><ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3">{socials.map((link) => <li key={link.label}><a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-foreground-secondary transition-colors hover:text-foreground">{link.label}<ArrowUpRight className="h-3.5 w-3.5" /></a></li>)}</ul></Reveal>}
      </div>
    </div>
  </section>;
}
