"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollChoreography() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      const hero = document.querySelector<HTMLElement>("[data-story-hero]");
      const heroContent = hero?.querySelector<HTMLElement>(
        "[data-story-hero-content]",
      );
      const heroMedia = hero?.querySelector<HTMLElement>(
        "[data-story-hero-media]",
      );

      if (hero && heroContent) {
        gsap.to(heroContent, {
          yPercent: -10,
          scale: 0.97,
          opacity: 0.28,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }

      if (hero && heroMedia) {
        gsap.fromTo(
          heroMedia,
          { scale: 1 },
          {
            scale: 1.12,
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }

      gsap.utils
        .toArray<HTMLElement>("[data-about-paragraph]")
        .forEach((paragraph, index) => {
          gsap.fromTo(
            paragraph,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              delay: index * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: paragraph,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-project-image]")
        .forEach((image) => {
          gsap.fromTo(
            image,
            { clipPath: "inset(0 100% 0 0)", scale: 1.045 },
            {
              clipPath: "inset(0 0% 0 0)",
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-archive-image]")
        .forEach((image) => {
          gsap.fromTo(
            image,
            { clipPath: "inset(12% 0 12% 0)", scale: 1.035 },
            {
              clipPath: "inset(0% 0 0% 0)",
              scale: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: image,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-expertise-list]")
        .forEach((list) => {
          gsap.fromTo(
            list.children,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.055,
              ease: "power2.out",
              scrollTrigger: {
                trigger: list,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-experience-entry]")
        .forEach((entry, index) => {
          gsap.fromTo(
            entry,
            { x: index % 2 === 0 ? 20 : -20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

      const processRegion =
        document.querySelector<HTMLElement>(".process-zoom-region");
      const processHeading = processRegion?.querySelector<HTMLElement>(
        "[data-process-heading]",
      );
      const processSupport = processRegion?.querySelector<HTMLElement>(
        "[data-process-support]",
      );
      const processSteps =
        document.querySelector<HTMLElement>("[data-process-steps]");

      if (processRegion && processHeading && processSupport && processSteps) {
        const zoomScale = () =>
          window.innerWidth < 640 ? 8 : window.innerWidth < 1024 ? 13 : 20;
        const processStart = () =>
          processRegion.getBoundingClientRect().top + window.scrollY;
        const processEnd = () =>
          processStart() +
          Math.max(1, processRegion.offsetHeight - window.innerHeight);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: processRegion,
            start: processStart,
            end: processEnd,
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            processHeading,
            { scale: 1, opacity: 0.76, filter: "blur(0px)" },
            {
              scale: zoomScale,
              opacity: 1,
              filter: "blur(0px)",
              ease: "none",
              duration: 0.52,
            },
            0,
          )
          .to(
            processHeading,
            {
              scale: () => zoomScale() * 1.12,
              opacity: 0,
              filter: "blur(12px)",
              ease: "none",
              duration: 0.16,
            },
            0.52,
          )
          .to(
            processHeading,
            {
              scale: () => zoomScale() * 1.2,
              ease: "none",
              duration: 0.32,
            },
            0.68,
          )
          .fromTo(
            processSupport,
            { opacity: 0.72 },
            { opacity: 0, ease: "none", duration: 0.42 },
            0,
          )
          .fromTo(
            processSteps,
            { opacity: 0, y: 44 },
            { opacity: 1, y: 0, ease: "none", duration: 0.28 },
            0.68,
          );
      }

      gsap.utils
        .toArray<HTMLElement>("[data-contact-reveal]")
        .forEach((content) => {
          gsap.fromTo(
            content,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: content,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
    }, document.documentElement);

    let active = true;
    let refreshFrame = 0;
    let filterRefreshTimer: number | undefined;
    const refresh = () => {
      if (active) ScrollTrigger.refresh();
    };
    const scheduleRefresh = () => {
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(refresh);
    };
    const images = Array.from(document.images).filter((image) => !image.complete);
    const projectGrid = document.querySelector("[data-project-grid]");
    const projectObserver = projectGrid
      ? new MutationObserver(() => {
          window.clearTimeout(filterRefreshTimer);
          filterRefreshTimer = window.setTimeout(refresh, 400);
        })
      : null;
    const observedSections = Array.from(
      document.querySelectorAll("main section[id]"),
    );
    const layoutObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleRefresh);

    images.forEach((image) => {
      image.addEventListener("load", scheduleRefresh);
      image.addEventListener("error", scheduleRefresh);
    });
    observedSections.forEach((section) => layoutObserver?.observe(section));
    if (projectGrid) {
      projectObserver?.observe(projectGrid, { childList: true });
    }
    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", scheduleRefresh);
    document.fonts?.ready.then(refresh);
    refreshFrame = window.requestAnimationFrame(() => {
      refreshFrame = window.requestAnimationFrame(refresh);
    });

    return () => {
      active = false;
      window.cancelAnimationFrame(refreshFrame);
      window.clearTimeout(filterRefreshTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", scheduleRefresh);
      images.forEach((image) => {
        image.removeEventListener("load", scheduleRefresh);
        image.removeEventListener("error", scheduleRefresh);
      });
      layoutObserver?.disconnect();
      projectObserver?.disconnect();
      context.revert();
    };
  }, [prefersReducedMotion]);

  return null;
}
