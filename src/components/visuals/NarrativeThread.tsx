"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface NarrativeThreadProps {
  variant?: "methode-cases" | "default";
  className?: string;
}

const PATH_DATA: Record<NonNullable<NarrativeThreadProps["variant"]>, string> = {
  "methode-cases":
    "M 200 0 C 300 200, 100 400, 250 600 S 500 900, 350 1100 S 200 1400, 400 1600 S 700 1900, 500 2100",
  default: "M 100 0 C 200 200, 50 400, 150 600 S 350 900, 200 1100",
};

export function NarrativeThread({ variant = "default", className = "" }: NarrativeThreadProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={containerRef} className={`pdy-narrative-thread ${className}`} aria-hidden="true">
      <motion.svg
        className="pdy-narrative-thread-svg"
        viewBox="0 0 800 2200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={reduced ? undefined : { y }}
      >
        <defs>
          <linearGradient id="pdy-thread-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-green-deep)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="var(--color-green-electric)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-green-deep)" stopOpacity="0.6" />
          </linearGradient>

          <filter id="pdy-thread-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={PATH_DATA[variant]}
          stroke="url(#pdy-thread-gradient)"
          strokeWidth="80"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pdy-thread-glow)"
          style={{ pathLength: reduced ? 1 : pathLength }}
          initial={{ pathLength: 0 }}
        />

        <motion.path
          d={PATH_DATA[variant]}
          stroke="var(--color-green-electric)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.4"
          style={{ pathLength: reduced ? 1 : pathLength }}
          initial={{ pathLength: 0 }}
        />
      </motion.svg>
    </div>
  );
}
