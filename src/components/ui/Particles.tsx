"use client";

import { useMemo } from "react";

interface ParticlesProps {
  /** How many particles. Default 22. */
  count?: number;
  /** Variant — controls hue. Default "green". */
  variant?: "green" | "violet";
  /** Optional className override on the container. */
  className?: string;
}

/**
 * Lightweight floating particles for dark backgrounds.
 * Pure CSS animations, deterministic positions (no hydration mismatch).
 * Each particle gets its own size, position, opacity, animation duration and delay.
 * Honors prefers-reduced-motion via CSS.
 */
export function Particles({ count = 22, variant = "green", className }: ParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Deterministic pseudo-random via prime-number multipliers + golden-angle distribution
      const x = (i * 37.508) % 100;
      const y = (i * 71.343) % 100;
      const size = 1 + ((i * 13) % 3) * 0.5; // 1px, 1.5px, 2px, 2.5px
      const driftIdx = i % 3; // 3 different drift animations
      const duration = 14 + ((i * 7) % 18); // 14-32s
      const delay = -((i * 3) % 24); // negative delay to stagger pre-start
      const opacity = 0.18 + ((i * 11) % 35) / 100; // 0.18 - 0.53

      return { i, x, y, size, driftIdx, duration, delay, opacity };
    });
  }, [count]);

  return (
    <div
      className={`pdy-particles pdy-particles--${variant} ${className ?? ""}`}
      aria-hidden="true"
    >
      {particles.map(({ i, x, y, size, driftIdx, duration, delay, opacity }) => (
        <span
          key={i}
          className={`pdy-particle pdy-particle--drift-${driftIdx + 1}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            opacity,
          }}
        />
      ))}
    </div>
  );
}
