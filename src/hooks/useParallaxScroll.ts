"use client";

import { useEffect, useRef } from "react";

interface ParallaxOptions {
  /** Translation in px at full-scroll progress. Default 80. Negative for opposite direction. */
  amount?: number;
  /** Element on which to read the scroll position. Defaults to window. */
  axis?: "y";
}

/**
 * Drive a CSS variable `--parallax-y` (in px) on the ref'd element based on
 * the document scroll position. Pass that variable into a transform:
 *   transform: translateY(var(--parallax-y));
 * Honors prefers-reduced-motion (sets var to 0px).
 */
export function useParallaxScroll<T extends HTMLElement>({
  amount = 80,
}: ParallaxOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--parallax-y", "0px");
      return;
    }

    let raf = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Progress 0..1 as the element scrolls through the viewport
      const progress = Math.max(0, Math.min(1, 1 - (rect.top + rect.height) / (viewportH + rect.height)));
      const y = (progress - 0.5) * amount * 2;
      node.style.setProperty("--parallax-y", `${y.toFixed(1)}px`);
      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [amount]);

  return ref;
}
