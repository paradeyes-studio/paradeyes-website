"use client";

import { useEffect, useRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function IconBranding({ size = 64, className = "", animated = true }: IconProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!animated || !ref.current) return;

    const svg = ref.current;
    const paths = svg.querySelectorAll<SVGPathElement>('[data-draw="true"]');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          paths.forEach((path, idx) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            requestAnimationFrame(() => {
              path.style.transition = `stroke-dashoffset 1400ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`;
              path.style.strokeDashoffset = "0";
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`pdy-icon ${className}`}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="0.5" opacity="0.16" className="pdy-icon-halo" />

      <path
        d="M32 8 L52 20 L52 44 L32 56 L12 44 L12 20 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        data-draw="true"
      />

      <path
        d="M32 8 L32 56 M12 20 L52 44 M52 20 L12 44"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
        data-draw="true"
      />

      <circle cx="32" cy="32" r="2.5" fill="var(--color-green-electric)" className="pdy-icon-accent" />
      <circle cx="44" cy="20" r="1.5" fill="var(--color-orange-flame, #FF611D)" opacity="0.85" />
    </svg>
  );
}
