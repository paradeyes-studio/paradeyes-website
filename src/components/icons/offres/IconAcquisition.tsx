"use client";

import { useEffect, useRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

type Drawable = SVGPathElement | SVGLineElement;

export function IconAcquisition({ size = 64, className = "", animated = true }: IconProps) {
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

      <line x1="10" y1="52" x2="54" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.2" data-draw="true" />
      <line x1="10" y1="10" x2="10" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.2" data-draw="true" />

      <path
        d="M10 48 L20 40 L26 44 L36 26 L46 18 L54 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-draw="true"
      />

      <circle cx="20" cy="40" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="26" cy="44" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="36" cy="26" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="46" cy="18" r="1.5" fill="currentColor" opacity="0.7" />

      <circle cx="54" cy="14" r="3.5" fill="var(--color-green-electric)" className="pdy-icon-accent" />
      <circle cx="54" cy="14" r="6" stroke="var(--color-green-electric)" strokeWidth="0.6" opacity="0.4" className="pdy-icon-pulse-ring" />

      <circle cx="10" cy="48" r="1.5" fill="var(--color-orange-flame, #FF611D)" />
    </svg>
  );
}
