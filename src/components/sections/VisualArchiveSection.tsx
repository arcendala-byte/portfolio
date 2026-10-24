"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ImagePlus, X } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { SkeletonImage } from "@/components/effects/SkeletonImage";
import { visualArchive } from "@/data/archive";

const archiveLayout = [
  { size: "md:col-span-7 md:row-span-2", ratio: "aspect-[4/3] md:aspect-auto md:min-h-[32rem]" },
  { size: "md:col-span-5 md:col-start-8 md:row-start-1", ratio: "aspect-[4/3]" },
  { size: "md:col-span-5 md:col-start-8 md:row-start-2", ratio: "aspect-[4/3]" },
  { size: "md:col-span-4 md:col-start-1 md:row-start-3", ratio: "aspect-[4/3]" },
  { size: "md:col-span-4 md:col-start-5 md:row-start-3", ratio: "aspect-[4/3]" },
  { size: "md:col-span-4 md:col-start-9 md:row-start-3", ratio: "aspect-[4/3]" },
];

const entranceDirections = [
  { x: -32, y: 0 },
  { x: 0, y: 28 },
  { x: 32, y: 0 },
  { x: 0, y: -28 },
];

export function VisualArchiveSection() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const viewableImages = visualArchive.filter((slot) => Boolean(slot.src));

  const closeViewer = () => setActiveImageIndex(null);
  const showPrevious = () =>
    setActiveImageIndex((index) =>
      index === null
        ? null
        : (index - 1 + viewableImages.length) % viewableImages.length,
    );
  const showNext = () =>
    setActiveImageIndex((index) =>
      index === null ? null : (index + 1) % viewableImages.length,
    );

  const activeImage =
    activeImageIndex === null ? null : viewableImages[activeImageIndex];

  return (
    <section id="archive" className="container-editorial section-pad scroll-mt-24">
      <Reveal>
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Visual archive</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.04em] text-foreground sm:text-6xl">Notes from the process.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-foreground-secondary">
            Browse project details, works in progress, and moments behind the
            finished work. Select any image to view it up close.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-12">
        {visualArchive.map((slot, index) => {
          const layout = archiveLayout[index % archiveLayout.length];
          return (
            <Reveal key={slot.number} {...entranceDirections[index % entranceDirections.length]} delay={index * 0.08} amount={0.15} className={`${layout.size} ${layout.ratio} group relative flex flex-col justify-between overflow-hidden border border-dashed border-black/20 bg-background-secondary p-5 sm:p-7`}>
              {slot.src ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex(
                        viewableImages.findIndex(
                          (image) => image.number === slot.number,
                        ),
                      )
                    }
                    aria-label={`View ${slot.caption || slot.alt} larger`}
                    className="absolute inset-0 z-0 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                  >
                    <SkeletonImage src={slot.src} alt={slot.alt || slot.caption || "Visual archive photograph"} sizes="(max-width: 767px) 100vw, 58vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                  </button>
                  {(slot.caption || slot.alt) && <p className="absolute inset-x-0 bottom-0 z-10 bg-black/70 px-4 py-3 text-sm text-white">{slot.caption || slot.alt}</p>}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground-muted">ARCHIVE / {slot.number}</span>
                    <ImagePlus className="h-4 w-4 text-foreground-muted" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Your image goes here</p>
                    <p className="mt-1 text-xs text-foreground-muted">Add a picture in <code className="font-mono">public/archive/</code></p>
                  </div>
                </>
              )}
            </Reveal>
          );
        })}
      </div>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visual archive image viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeViewer();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeViewer();
            if (event.key === "ArrowLeft") showPrevious();
            if (event.key === "ArrowRight") showNext();
          }}
          tabIndex={-1}
        >
          <button
            type="button"
            onClick={closeViewer}
            aria-label="Close image viewer"
            autoFocus
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8 sm:top-8"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="View previous image"
            className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-8"
          >
            <ArrowLeft aria-hidden="true" className="h-5 w-5" />
          </button>

          <figure className="relative flex h-full max-h-[85vh] w-full max-w-6xl flex-col items-center justify-center gap-4">
            <div className="relative min-h-0 w-full flex-1">
              <Image
                src={activeImage.src}
                alt={activeImage.alt || activeImage.caption || "Visual archive photograph"}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="max-w-2xl text-center text-sm leading-relaxed text-white/80">
              <span className="block font-medium text-white">
                {activeImage.caption || activeImage.alt}
              </span>
              {activeImage.alt && activeImage.alt !== activeImage.caption && (
                <span className="mt-1 block">{activeImage.alt}</span>
              )}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={showNext}
            aria-label="View next image"
            className="absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8"
          >
            <ArrowRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
