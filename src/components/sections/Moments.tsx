"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { homeMoments } from "@/content/home-fallback";

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

const grid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Moments() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));

  return (
    <section className="pdy-moments pdy-bloc-dark pdy-section-stacked" data-section-theme="dark">
      <div className="pdy-moments-halo" aria-hidden="true" />

      <div className="pdy-moments-inner">
        <header className="pdy-moments-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {homeMoments.eyebrow}
          </motion.p>
          <motion.h2
            variants={v(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-h2"
          >
            {homeMoments.headline.before}
            <em className="pdy-italic-accent">{homeMoments.headline.italic}</em>
            {homeMoments.headline.after}
          </motion.h2>
          <motion.p
            variants={v(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-sub"
          >
            {homeMoments.sub}
          </motion.p>
        </header>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="pdy-moments-grid"
        >
          {homeMoments.items.map((m) => (
            <motion.article key={m.number} variants={item} className="pdy-moment-card">
              <span className="pdy-moment-number">{m.number}</span>
              <h3 className="pdy-moment-title">{m.title}</h3>
              <p className="pdy-moment-desc">{m.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
