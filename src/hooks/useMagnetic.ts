"use client";

import { useEffect, useRef } from "react";

interface UseMagneticOptions {
  /** Max translation in pixels when the pointer is at the element's edge. */
  strength?: number;
  /** Activation radius in pixels around the element's center. */
  radius?: number;
  /** Skip the effect entirely (e.g. when an outer flag disables it). */
  disabled?: boolean;
}

/**
 * Cursor-magnetic ref. Attaches a `mousemove` listener and translates the
 * element toward the pointer when within `radius`. Writes a CSS variable
 * `--mag-proximity` (0 → 1) so callers can drive proximity-based effects
 * (glow, scale, color) declaratively from CSS.
 *
 * Auto-disables under `prefers-reduced-motion: reduce` and on coarse
 * pointers (touch). All transforms cleared on `mouseleave`.
 */
export function useMagnetic<T extends HTMLElement>({
  strength = 4,
  radius = 100,
  disabled = false,
}: UseMagneticOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let lastTx = 0;
    let lastTy = 0;
    let lastProximity = 0;

    const apply = (tx: number, ty: number, proximity: number) => {
      // Cheap dirty-check to avoid layout thrash on micro-movements.
      if (
        Math.abs(tx - lastTx) < 0.05 &&
        Math.abs(ty - lastTy) < 0.05 &&
        Math.abs(proximity - lastProximity) < 0.01
      ) {
        return;
      }
      lastTx = tx;
      lastTy = ty;
      lastProximity = proximity;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      el.style.setProperty("--mag-proximity", proximity.toFixed(3));
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      cancelAnimationFrame(raf);

      if (dist > radius) {
        if (lastTx !== 0 || lastTy !== 0 || lastProximity !== 0) {
          raf = requestAnimationFrame(() => apply(0, 0, 0));
        }
        return;
      }

      const proximity = 1 - dist / radius;
      const factor = proximity * strength;
      const tx = (dx / radius) * factor * (radius / Math.max(rect.width, 1));
      const ty = (dy / radius) * factor * (radius / Math.max(rect.height, 1));
      // Clamp to strength so we never overshoot.
      const clampedTx = Math.max(-strength, Math.min(strength, tx));
      const clampedTy = Math.max(-strength, Math.min(strength, ty));

      raf = requestAnimationFrame(() => apply(clampedTx, clampedTy, proximity));
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      apply(0, 0, 0);
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
      cancelAnimationFrame(raf);
      el.style.transform = "";
      el.style.removeProperty("--mag-proximity");
    };
  }, [strength, radius, disabled]);

  return ref;
}
