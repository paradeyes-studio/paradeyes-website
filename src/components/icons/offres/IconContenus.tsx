"use client";

import { useEffect, useRef } from "react";

interface IconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

type Drawable = SVGPathElement | SVGRectElement | SVGCircleElement;

export function IconContenus({ size = 64, className = "", animated = true }: IconProps) {
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

      <rect x="6" y="22" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" data-draw="true" />

      <circle cx="22" cy="33" r="7" stroke="currentColor" strokeWidth="1.5" data-draw="true" />
      <circle cx="22" cy="33" r="3" stroke="currentColor" strokeWidth="1" opacity="0.5" data-draw="true" />
      <circle cx="22" cy="33" r="1.5" fill="var(--color-green-electric)" className="pdy-icon-accent" />

      <path
        d="M40 25 L56 18 L56 48 L40 41 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        data-draw="true"
      />

      <circle cx="11" cy="27" r="1.5" fill="var(--color-orange-flame, #FF611D)" className="pdy-icon-recording" />
    </svg>
  );
}
