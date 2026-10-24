
"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";

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
          <p className="eyebrow">Expertise</p>

          <h2 className="mt-7 font-display text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
            The practice behind the work.
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:col-start-6">
          {groups.map((group, index) => (
            <Reveal key={group.category} delay={index * 0.06}>
              <h3 className="text-sm font-medium text-foreground">
                {group.category}
              </h3>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground-secondary">
                {group.items.slice(0, 6).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
