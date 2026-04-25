"use client";

import { useEffect, useRef } from "react";

interface TiltOptions {
  /** Maximum tilt rotation in degrees. Default 6. */
  max?: number;
  /** Z translation on hover in px. Default 0. */
  perspective?: number;
  /** Speed of return to rest (ms). Default 600. */
  resetMs?: number;
  /** Disable on touch devices. Default true. */
  disableTouch?: boolean;
}

/**
 * Subtle 3D perspective tilt on mouse move. Returns a ref to attach to any HTMLElement.
 * Uses transform + rAF for buttery 60fps. Honors prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement>({
  max = 6,
  perspective = 1000,
  resetMs = 600,
  disableTouch = true,
}: TiltOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (disableTouch && window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const apply = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      node.style.transform = `perspective(${perspective}px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        raf = window.requestAnimationFrame(apply);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      targetX = dx * max;
      targetY = -dy * max;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      node.style.transition = `transform ${resetMs}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      node.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
      window.setTimeout(() => {
        if (node) node.style.transition = "";
      }, resetMs);
    };

    const onEnter = () => {
      node.style.transition = "";
    };

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [max, perspective, resetMs, disableTouch]);

  return ref;
}
