"use client";

import { useEffect, useRef } from "react";

/**
 * Cinema-grade scroll progress bar.
 * Sits at the very top of the viewport, 2px tall, fills with green-electric
 * as the user scrolls through the page. Uses requestAnimationFrame + transform:scaleX
 * for buttery 60fps performance.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      bar.style.transform = `scaleX(${progress})`;
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
  }, []);

  return (
    <div className="pdy-scroll-progress" aria-hidden="true">
      <div ref={barRef} className="pdy-scroll-progress-bar" />
    </div>
  );
}
