"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const title = "Thoughtful software, made with care.";
  const words = title.split(" ");

  return (
    <section id="about" className="container-editorial section-pad scroll-mt-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">About</p>
          <h2 aria-label={title} className="mt-7 max-w-sm font-display text-4xl leading-[1.04] tracking-[-0.03em] text-foreground sm:text-5xl">
            <span aria-hidden="true" className="inline">
              {words.map((word, wordIndex) => (
                <Fragment key={word}>
                  {wordIndex > 0 && " "}
                  <span className="inline-block whitespace-nowrap">
                    {Array.from(word).map((letter, letterIndex) => {
                      const index = words.slice(0, wordIndex).join("").length + wordIndex + letterIndex;
                      const drop = 28 + ((index * 17) % 5) * 9;
                      const rotation = ((index * 7) % 11) - 5;

                      return (
                        <motion.span
                          key={`${wordIndex}-${letterIndex}`}
                          className="inline-block"
                          initial={prefersReducedMotion ? false : { opacity: 0, y: -drop, rotate: rotation }}
                          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
                          viewport={{ once: true, amount: 0.7 }}
                          transition={{
                            type: "spring",
                            stiffness: 240,
                            damping: 13,
                            mass: 0.7,
                            bounce: 0.28,
                            delay: prefersReducedMotion ? 0 : index * 0.065,
                          }}
                        >
                          {letter}
                        </motion.span>
                      );
                    })}
                  </span>
                </Fragment>
              ))}
            </span>
          </h2>
        </Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal delay={0.08}>
            <div className="space-y-5 text-base leading-relaxed text-foreground-secondary sm:text-lg">
              {portfolio.profile.longBio.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-12 text-sm leading-relaxed text-foreground-secondary">Areas of interest</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground">
              {portfolio.profile.specialties.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
