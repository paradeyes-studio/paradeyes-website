"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal a section on scroll once its top reaches the viewport.
 * Adds the modifier class `.pdy-section-reveal--in` once intersected.
 * Honors `prefers-reduced-motion` (applies the modifier immediately).
 */
export function useSectionReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.classList.add("pdy-section-reveal--in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("pdy-section-reveal--in");
            observer.unobserve(node);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
