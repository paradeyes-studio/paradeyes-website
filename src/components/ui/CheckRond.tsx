"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface CheckRondProps {
  className?: string;
  inView?: boolean;
  delay?: number;
}

export function CheckRond({ className, inView = true, delay = 0 }: CheckRondProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, scale: 1 },
        visible: { opacity: 1, scale: 1 },
      }
    : {
        hidden: { opacity: 0, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.4,
            delay,
            ease: [0.34, 1.56, 0.64, 1],
          },
        },
      };

  const checkPathVariants: Variants = shouldReduceMotion
    ? {
        hidden: { pathLength: 1, opacity: 1 },
        visible: { pathLength: 1, opacity: 1 },
      }
    : {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration: 0.3, delay: delay + 0.2, ease: "easeOut" },
            opacity: { duration: 0.1, delay: delay + 0.2 },
          },
        },
      };

  return (
    <motion.span
      className={`pdy-check-rond ${className || ""}`.trim()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      data-pulse={shouldReduceMotion ? "false" : "true"}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <motion.path
          d="M 6 12 L 10 16 L 18 8"
          stroke="#57EEA1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={checkPathVariants}
        />
      </svg>
    </motion.span>
  );
}
