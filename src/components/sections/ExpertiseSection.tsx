
"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { ScrollZoomHeading } from "@/components/effects/ScrollZoomHeading";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

const particles = [
  "dust",
  "orb",
  "spark",
  "dust",
  "orb",
  "spark",
  "dust",
  "dust",
  "orb",
  "spark",
  "dust",
  "spark",
  "orb",
  "dust",
  "spark",
  "dust",
  "spark",
  "dust",
] as const;

export function ExpertiseSection() {
  const { translate } = useSitePreferences();
  const groups = portfolio.skills
    .filter((group) => group.items.length > 0)
    .slice(0, 3);

  return (
    <section
      id="expertise"
      className="expertise-particle-section container-editorial section-pad scroll-mt-24"
    >
      {/* Decorative amber dust, sparks, and softly glowing orbs */}
      <div className="expertise-particle-field" aria-hidden="true">
        {particles.map((kind, index) => (
          <span
            key={index}
            className={[
              "expertise-light-particle",
              `expertise-light-particle-${index + 1}`,
              `expertise-light-particle--${kind}`,
            ].join(" ")}
          />
        ))}
      </div>

      <div className="expertise-particle-content grid gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">{translate("Expertise")}</p>

          <ScrollZoomHeading className="mt-7 font-display text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
            {translate("The practice behind the work.")}
          </ScrollZoomHeading>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {groups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.06}>
              <h3 className="text-sm font-medium text-foreground">
                {translate(group.category)}
              </h3>

              <ul data-expertise-list className="mt-4 space-y-2 text-sm leading-relaxed text-foreground-secondary">
                {group.items.slice(0, 6).map((item) => (
                  <li key={item}>{translate(item)}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
