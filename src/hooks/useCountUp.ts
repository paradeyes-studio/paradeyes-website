"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  target: number;
  duration?: number; // ms
  decimals?: number;
  startWhenInView?: boolean;
  threshold?: number;
}

/**
 * Counts up from 0 to `target` once the element comes into view.
 * Returns a tuple [ref, displayed].
 *
 * Honors `prefers-reduced-motion` (no animation, instant value).
 */
export function useCountUp<T extends HTMLElement>({
  target,
  duration = 1600,
  decimals = 0,
  startWhenInView = true,
  threshold = 0.4,
}: UseCountUpOptions) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Legitimate sync from environment to React (matchMedia).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTime = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const p = Math.min(1, (now - startTime) / duration);
        const v = target * ease(p);
        setValue(Number(v.toFixed(decimals)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!startWhenInView) {
      start();
      return;
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, decimals, startWhenInView, threshold]);

  return [ref, value] as const;
}
