"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function HeroCurve() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div ref={ref} className="pdy-hero-curve-wrap" aria-hidden="true">
      <motion.svg
        className="pdy-hero-curve"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={reduced ? undefined : { y }}
      >
        <path
          d="M 0 200 L 0 100 C 240 100, 480 60, 720 80 C 960 100, 1200 140, 1440 90 L 1440 200 Z"
          fill="var(--color-white-warm)"
        />
        <path
          d="M 0 100 C 240 100, 480 60, 720 80 C 960 100, 1200 140, 1440 90"
          fill="none"
          stroke="var(--color-green-electric)"
          strokeWidth="0.5"
          strokeOpacity="0.4"
        />
      </motion.svg>
    </div>
  );
}
