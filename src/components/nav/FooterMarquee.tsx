"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PHRASES = ["On comprend.", "On conçoit.", "On construit."] as const;
const SEPARATOR = "·";

export function FooterMarquee() {
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="overflow-hidden py-[var(--spacing-6)]" aria-hidden="true">
        <div className="flex items-center gap-8 justify-center flex-wrap">
          {PHRASES.map((phrase, i) => (
            <span
              key={i}
              className="font-display text-display-md lg:text-display-xl font-medium text-[var(--color-text-inverse)]"
            >
              {phrase}
              {i < PHRASES.length - 1 && (
                <span className="mx-6 text-[var(--color-accent-on-dark)]">{SEPARATOR}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden py-[var(--spacing-6)]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-hidden="true"
    >
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: isHovering ? 100 : 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(4)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center gap-12 shrink-0">
            {PHRASES.map((phrase, i) => (
              <div
                key={`${setIndex}-${i}`}
                className="flex items-center gap-12 shrink-0"
              >
                <span className="font-display text-display-md lg:text-display-xl font-medium text-[var(--color-text-inverse)] leading-none">
                  {phrase}
                </span>
                <span className="font-display text-display-md lg:text-display-xl text-[var(--color-accent-on-dark)] leading-none shrink-0">
                  {SEPARATOR}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
