"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { homeFaq } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const fadeOnly = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay } },
});

export function Faq() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idBase = useId();
  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-faq pdy-bloc-dark pdy-section-stacked pdy-section-reveal"
      data-section-theme="dark"
    >
      <div className="pdy-faq-halo" aria-hidden="true" />
      <div className="pdy-faq-inner">
        <div className="pdy-faq-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {homeFaq.eyebrow}
          </motion.p>
          <motion.h2
            variants={v(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-h2"
          >
            {homeFaq.headline.before}
            <em className="pdy-italic-accent">{homeFaq.headline.italic}</em>
            {homeFaq.headline.after}
          </motion.h2>
        </div>

        <motion.ul
          variants={v(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="pdy-faq-list"
        >
          {homeFaq.items.map((it, i) => {
            const isOpen = openIndex === i;
            const itemId = `${idBase}-${i}`;
            return (
              <li key={i} className="pdy-faq-item">
                <button
                  type="button"
                  className="pdy-faq-btn"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`${itemId}-body`}
                  id={`${itemId}-btn`}
                >
                  <span className="pdy-faq-q">{it.q}</span>
                  <span
                    className="pdy-faq-chevron"
                    aria-hidden="true"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <ChevronDown />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="body"
                      id={`${itemId}-body`}
                      role="region"
                      aria-labelledby={`${itemId}-btn`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pdy-faq-a">{it.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
