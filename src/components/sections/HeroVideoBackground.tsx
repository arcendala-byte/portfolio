"use client";

import { useEffect, useState } from "react";

export function HeroVideoBackground() {
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!preference.matches);
    const frame = window.requestAnimationFrame(updatePreference);
    preference.addEventListener("change", updatePreference);

    return () => {
      window.cancelAnimationFrame(frame);
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#111111]" aria-hidden="true">
      {motionAllowed && !videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          onError={() => setVideoFailed(true)}
        >
          <source src="/hero-video" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
