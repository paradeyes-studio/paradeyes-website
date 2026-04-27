"use client";

import { useEffect, useRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

type Drawable = SVGPathElement | SVGCircleElement | SVGEllipseElement | SVGLineElement;

export function IconDeploiement({ size = 64, className = "", animated = true }: IconProps) {
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

      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1.5" data-draw="true" />
      <ellipse cx="32" cy="32" rx="8" ry="20" stroke="currentColor" strokeWidth="1.5" data-draw="true" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1.5" data-draw="true" />
      <ellipse cx="32" cy="32" rx="20" ry="6" stroke="currentColor" strokeWidth="1" opacity="0.4" data-draw="true" />

      <circle cx="44" cy="22" r="2.5" fill="var(--color-green-electric)" className="pdy-icon-accent" />

      <circle cx="14" cy="44" r="1.8" fill="var(--color-orange-flame, #FF611D)" className="pdy-icon-satellite" />
      <line x1="14" y1="44" x2="20" y2="40" stroke="var(--color-orange-flame, #FF611D)" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}
