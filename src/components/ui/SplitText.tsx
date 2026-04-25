"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface SplitTextProps {
  children: string;
  /** Stagger delay between words (s). Default 0.04. */
  stagger?: number;
  /** Initial delay before first word reveals (s). Default 0. */
  delay?: number;
  /** Wrapper element type. Defaults to span. */
  as?: "span" | "div";
  className?: string;
  /** Reveals once the element enters the viewport (default true). */
  whileInView?: boolean;
  /** Element appended after the words (e.g. an <em> accent). */
  accent?: ReactNode;
}

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedWord: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export function SplitText({
  children,
  stagger = 0.04,
  delay = 0,
  as = "span",
  className,
  whileInView = true,
  accent,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedWord : word;
  const Component = as === "div" ? motion.div : motion.span;

  const words = children.split(/\s+/).filter(Boolean);

  const triggerProps = whileInView
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: "0px 0px -10% 0px" },
      }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <Component
      {...triggerProps}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}
        >
          <motion.span variants={variants} style={{ display: "inline-block" }}>
            {w}
          </motion.span>
        </span>
      ))}
      {accent}
    </Component>
  );
}
