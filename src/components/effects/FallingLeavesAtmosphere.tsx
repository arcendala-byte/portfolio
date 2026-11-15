"use client";

import { FallingLeaves } from "falling-leaves/react";

export function FallingLeavesAtmosphere() {
  return (
    <FallingLeaves
      fullScreen
      count={14}
      size={[18, 32]}
      speed={[0.55, 1.1]}
      wind={[-0.45, 0.8]}
      sway={[0.45, 1.1]}
      rotationSpeed={[-1.2, 1.2]}
      colors={["#B45309", "#C46A31", "#D5A452", "#A15A2D"]}
      shapes={["maple", "ginkgo", "birch"]}
      opacity={0.28}
      zIndex={0}
      respectReducedMotion
    />
  );
}
