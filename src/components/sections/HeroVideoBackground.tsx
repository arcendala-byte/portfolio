"use client";

import { memo, useEffect, useRef, useState } from "react";

function HeroVideoBackgroundComponent() {
  const [motionAllowed, setMotionAllowed] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      const allowed = !preference.matches;
      setMotionAllowed(allowed);

      if (!allowed) {
        videoRef.current?.pause();
        setVideoPlaying(false);
      }
    };

    updatePreference();
    preference.addEventListener("change", updatePreference);

    return () => {
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionAllowed || videoFailed) return;

    const removeRetryListeners = () => {
      document.removeEventListener("pointerdown", retryPlayback);
      document.removeEventListener("keydown", retryPlayback);
    };

    const retryPlayback = () => {
      const playback = video.play();
      if (playback) {
        void playback
          .then(() => {
            setVideoPlaying(true);
            removeRetryListeners();
          })
          .catch(() => setVideoPlaying(false));
      }
    };

    document.addEventListener("pointerdown", retryPlayback);
    document.addEventListener("keydown", retryPlayback);
    retryPlayback();

    return removeRetryListeners;
  }, [motionAllowed, videoFailed]);

  return (
    <div
      data-story-hero-media
      className="hero-video-fallback absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {motionAllowed && !videoFailed && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            videoPlaying ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
          onPlaying={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          onError={() => {
            setVideoPlaying(false);
            setVideoFailed(true);
          }}
        >
          <source src="/hero-video" type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export const HeroVideoBackground = memo(HeroVideoBackgroundComponent);
