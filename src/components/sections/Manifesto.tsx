"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { homeManifesto } from "@/content/home-fallback";

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

const fadeOnly = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, delay } },
});

export function Manifesto() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));

  return (
    <section className="pdy-manifesto" data-section-theme="dark">
      <div className="pdy-manifesto-halo" aria-hidden="true" />
      <div className="pdy-manifesto-grain" aria-hidden="true" />

      <div className="pdy-manifesto-inner">
        <motion.p
          variants={v(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="pdy-manifesto-eyebrow"
        >
          {homeManifesto.eyebrow}
        </motion.p>

        <motion.h2
          variants={v(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="pdy-manifesto-h2"
        >
          {homeManifesto.headline.before}
          <em className="pdy-italic-accent">{homeManifesto.headline.italic}</em>
          {homeManifesto.headline.after}
        </motion.h2>

        <motion.p
          variants={v(0.25)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="pdy-manifesto-body"
        >
          {homeManifesto.body}
        </motion.p>

        <motion.ul
          variants={v(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="pdy-manifesto-stats"
        >
          {homeManifesto.miniStats.map((stat) => (
            <li key={stat.label} className="pdy-manifesto-stat">
              <span className="pdy-manifesto-stat-value">{stat.value}</span>
              <span className="pdy-manifesto-stat-label">{stat.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
