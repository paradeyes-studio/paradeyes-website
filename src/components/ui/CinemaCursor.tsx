"use client";

import { useEffect, useRef } from "react";

/**
 * Cinema cursor: a green-electric ring that follows the pointer with subtle lerp,
 * morphs (scales up + fills) over interactive elements (a, button, [role=button], [data-cursor=hover]).
 * Pure CSS transform — no React re-renders, just rAF.
 * Hidden on touch devices.
 */
export function CinemaCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!active) {
        active = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      // Smooth lerp for ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(tick);
    };

    const isInteractive = (el: Element | null): boolean => {
      while (el && el !== document.body) {
        if (
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.getAttribute("role") === "button" ||
          el.hasAttribute("data-cursor-hover") ||
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA"
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target as Element)) {
        ring.classList.add("pdy-cursor-active");
        dot.classList.add("pdy-cursor-dot-active");
      } else {
        ring.classList.remove("pdy-cursor-active");
        dot.classList.remove("pdy-cursor-dot-active");
      }
    };

    const onLeave = () => {
      active = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = window.requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pdy-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="pdy-cursor-dot" aria-hidden="true" />
    </>
  );
}
