
"use client";

import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";

export function ExperienceSection() {
  const experience = (portfolio.experience ?? []).filter((entry) => {
    const details = `${entry.organization} ${entry.role} ${entry.description}`;

    return !/PLACEHOLDER|Organization \/ Company|Role Title/i.test(details);
  });

  const education = (portfolio.education ?? []).filter((entry) => {
    const details = `${entry.institution} ${entry.qualification} ${
      entry.description ?? ""
    } ${entry.period}`;

    return !/PLACEHOLDER|Institution Name|Degree \/ Qualification|Year\s*[—–-]\s*Year/i.test(
      details
    );
  });

  const hasHistory = experience.length > 0 || education.length > 0;

  return (
    <section
      id="experience"
      className="container-editorial section-pad scroll-mt-24"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">Experience</p>

          <h2 className="mt-7 font-display text-4xl leading-tight tracking-[-0.03em] text-foreground sm:text-5xl">
            A record of the journey.
          </h2>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          {hasHistory ? (
            <div className="space-y-8">
              {experience.map((entry, i) => (
                <Reveal key={`${entry.organization}-${i}`}>
                  <article className="grid gap-2 border-b border-black/10 pb-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <p className="font-mono text-xs text-foreground-muted">
                      {entry.period}
                    </p>

                    <div>
                      <h3 className="text-base text-foreground">
                        {entry.role}
                      </h3>

                      <p className="mt-1 text-sm text-foreground-secondary">
                        {entry.organization}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                        {entry.description}
                      </p>

                      {entry.achievements &&
                        entry.achievements.length > 0 && (
                          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground-secondary">
                            {entry.achievements.map((achievement, index) => (
                              <li key={`${entry.organization}-achievement-${index}`}>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </article>
                </Reveal>
              ))}

              {education.map((entry, i) => (
                <Reveal key={`${entry.institution}-${i}`}>
                  <article className="grid gap-2 border-b border-black/10 pb-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <p className="font-mono text-xs text-foreground-muted">
                      {entry.period}
                    </p>

                    <div>
                      <h3 className="text-base text-foreground">
                        {entry.qualification}
                      </h3>

                      <p className="mt-1 text-sm text-foreground-secondary">
                        {entry.institution}
                      </p>

                      {entry.description && (
                        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                          {entry.description}
                        </p>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="max-w-md text-base leading-relaxed text-foreground-secondary">
                Professional experience and education details will be added
                here.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
