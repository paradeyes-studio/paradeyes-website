"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { homeTestimonials } from "@/content/home-fallback";

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Testimonials() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));

  return (
    <section className="pdy-testis pdy-section-stacked" data-section-theme="dark">
      <div className="pdy-testis-halo" aria-hidden="true" />
      <div className="pdy-testis-inner">
        <header className="pdy-testis-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {homeTestimonials.eyebrow}
          </motion.p>
          <motion.h2
            variants={v(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-h2"
          >
            {homeTestimonials.headline.before}
            <em className="pdy-italic-accent">{homeTestimonials.headline.italic}</em>
            {homeTestimonials.headline.after}
          </motion.h2>
        </header>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="pdy-testis-grid"
        >
          {homeTestimonials.items.map((t, i) => (
            <motion.figure key={i} variants={item} className="pdy-testi-card">
              <blockquote className="pdy-testi-quote">
                <span className="pdy-testi-mark" aria-hidden="true">
                  «
                </span>
                {t.quote}
                <span className="pdy-testi-mark" aria-hidden="true">
                  »
                </span>
              </blockquote>
              <figcaption className="pdy-testi-meta">
                <span className="pdy-testi-author">{t.author}</span>
                <span className="pdy-testi-role">{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
