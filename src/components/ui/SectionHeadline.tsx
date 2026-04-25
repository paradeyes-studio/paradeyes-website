"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

interface SectionHeadlineProps {
  before: string;
  italic: string;
  after: string;
  className?: string;
  id?: string;
  /** Stagger delay between words (s). Default 0.05. */
  stagger?: number;
  /** Initial delay before first word reveals (s). Default 0.05. */
  delay?: number;
}

interface Token {
  text: string;
  italic: boolean;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Section headline with word-by-word reveal on scroll.
 * Splits before/italic/after into individual word spans, each masked by an
 * overflow:hidden parent so the slide-up reveal feels like a print-style wipe.
 */
export function SectionHeadline({
  before,
  italic,
  after,
  className,
  id,
  stagger = 0.05,
  delay = 0.05,
}: SectionHeadlineProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants : wordVariants;

  const tokens: Array<Token> = [
    ...before.split(/\s+/).filter(Boolean).map((t) => ({ text: t, italic: false })),
    ...italic.split(/\s+/).filter(Boolean).map((t) => ({ text: t, italic: true })),
    ...after.split(/\s+/).filter(Boolean).map((t) => ({ text: t, italic: false })),
  ];

  return (
    <motion.h2
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {tokens.map((tok, i) => (
        <span
          key={`${tok.text}-${i}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            paddingBottom: "0.05em",
            verticalAlign: "bottom",
          }}
        >
          <motion.span variants={variants} style={{ display: "inline-block" }}>
            {tok.italic ? (
              <em className="pdy-italic-accent">{tok.text}</em>
            ) : (
              tok.text
            )}
          </motion.span>
          {i < tokens.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </motion.h2>
  );
}
