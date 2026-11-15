"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/effects/Reveal";
import { HeroVideoBackground } from "@/components/sections/HeroVideoBackground";
import { LiquidLink } from "@/components/effects/LiquidLink";
import { useSitePreferences } from "@/components/providers/SitePreferencesProvider";

const HERO_TEXT = "Building digital things with intent.";

const DESCRIPTIONS = [
  "I build modern web experiences that combine thoughtful design with practical functionality.",
  "From frontend interfaces to backend logic, I turn ideas into useful digital products.",
  "I care about clean code, intuitive interactions, and technology that solves real problems.",
];

export function HeroSection() {
  const { translate } = useSitePreferences();
  const heroText = translate(HERO_TEXT);
  const descriptions = useMemo(() => DESCRIPTIONS.map(translate), [translate]);
  const [typedText, setTypedText] = useState("");
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [descriptionText, setDescriptionText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);

  // Animate the main headline.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      timeoutId = setTimeout(() => {
        setTypedText(heroText);
        setTypingComplete(true);
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    let index = 0;

    const typeNextCharacter = () => {
      index += 1;
      setTypedText(heroText.slice(0, index));

      if (index < heroText.length) {
        timeoutId = setTimeout(typeNextCharacter, 75);
      } else {
        setTypingComplete(true);
      }
    };

    timeoutId = setTimeout(typeNextCharacter, 500);

    return () => clearTimeout(timeoutId);
  }, [heroText]);

  // Animate the rotating description.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      timeoutId = setTimeout(() => {
        setDescriptionText(descriptions[0]);
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    let characterIndex = 0;
    let deleting = false;
    const currentDescription = descriptions[descriptionIndex];

    const animateDescription = () => {
      if (!deleting) {
        characterIndex += 1;

        setDescriptionText(
          currentDescription.slice(0, characterIndex)
        );

        if (characterIndex >= currentDescription.length) {
          timeoutId = setTimeout(() => {
            deleting = true;
            animateDescription();
          }, 2400);

          return;
        }

        timeoutId = setTimeout(animateDescription, 28);
      } else {
        characterIndex -= 1;

        setDescriptionText(
          currentDescription.slice(0, characterIndex)
        );

        if (characterIndex <= 0) {
          setDescriptionIndex(
            (previous) => (previous + 1) % descriptions.length
          );

          return;
        }

        timeoutId = setTimeout(animateDescription, 14);
      }
    };

    // Clear the previous description asynchronously before
    // starting the next typing cycle.
    timeoutId = setTimeout(() => {
      setDescriptionText("");

      timeoutId = setTimeout(animateDescription, 900);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [descriptionIndex, descriptions]);

  return (
    <section
      id="home"
      data-story-hero
      className="relative isolate flex min-h-[100svh] scroll-mt-20 flex-col justify-center overflow-hidden bg-[#111111] py-24 text-white sm:py-32"
    >
      <HeroVideoBackground />

      <div
        className="absolute inset-0 z-0 bg-black/55"
        aria-hidden="true"
      />

      <div
        data-story-hero-content
        className="container-editorial relative z-10"
      >
        <Reveal>
          <p className="eyebrow text-white/75">
            {translate(portfolio.profile.title)}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            aria-label={heroText}
            className="mt-8 max-w-6xl font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.87] tracking-[-0.055em] text-balance text-white"
          >
            <span aria-hidden="true">
              {typedText}
              {!typingComplete && (
                <span className="typing-cursor">|</span>
              )}
            </span>
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-12 sm:items-end">
          <Reveal
            delay={0.16}
            className="sm:col-span-5 sm:col-start-7"
          >
            <p
              className="min-h-[5.5rem] max-w-lg text-base leading-relaxed text-white/80 sm:min-h-[4.5rem] sm:text-lg"
              aria-live="polite"
            >
              {descriptionText}
              <span className="typing-cursor" aria-hidden="true">
                |
              </span>
            </p>
          </Reveal>

          <Reveal
            delay={0.22}
            className="sm:col-span-5 sm:col-start-7"
          >
            <LiquidLink
              href="#work"
              className="inline-flex items-center gap-3 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            >
              {translate("Explore selected work")}
              <ArrowDown
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </LiquidLink>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        .typing-cursor {
          display: inline-block;
          margin-left: 0.06em;
          font-weight: 300;
          animation: cursor-blink 0.8s steps(2, start) infinite;
        }

        @keyframes cursor-blink {
          to {
            visibility: hidden;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .typing-cursor {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}