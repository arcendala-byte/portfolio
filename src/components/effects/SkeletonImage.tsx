"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type SkeletonImageProps = Pick<ImageProps, "src" | "alt" | "sizes" | "className">;

export function SkeletonImage({ src, alt, sizes, className = "" }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className="absolute inset-0 block overflow-hidden" aria-busy={!loaded}>
      {!loaded && <span className="skeleton-shimmer absolute inset-0" aria-hidden="true" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`skeleton-image ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </span>
  );
}
