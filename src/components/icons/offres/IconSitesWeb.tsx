"use client";

import { useEffect, useRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

type Drawable = SVGPathElement | SVGRectElement | SVGLineElement;

export function IconSitesWeb({ size = 64, className = "", animated = true }: IconProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!animated || !ref.current) return;

    const svg = ref.current;
    const paths = svg.querySelectorAll<Drawable>('[data-draw="true"]');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          paths.forEach((path, idx) => {
            const length = (path as SVGPathElement).getTotalLength?.() ?? 200;
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

      <rect x="8" y="14" width="48" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" data-draw="true" />
      <line x1="8" y1="22" x2="56" y2="22" stroke="currentColor" strokeWidth="1.5" data-draw="true" />

      <circle cx="13" cy="18" r="1.2" fill="var(--color-orange-flame, #FF611D)" />
      <circle cx="17" cy="18" r="1.2" fill="currentColor" opacity="0.4" />
      <circle cx="21" cy="18" r="1.2" fill="currentColor" opacity="0.4" />

      <line x1="48" y1="18" x2="48" y2="20" stroke="var(--color-green-electric)" strokeWidth="1.2" className="pdy-icon-cursor" />

      <line x1="14" y1="32" x2="34" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" data-draw="true" />
      <line x1="14" y1="38" x2="50" y2="38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" data-draw="true" />
      <line x1="14" y1="44" x2="28" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" data-draw="true" />

      <circle cx="50" cy="44" r="2" fill="var(--color-green-electric)" className="pdy-icon-accent" />
    </svg>
  );
}
