"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { homeMethode } from "@/content/home-fallback";

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

const stepGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const stepItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Methode() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));

  return (
    <section className="pdy-methode" data-section-theme="dark">
      {/* Ghost numbers in background */}
      <div className="pdy-methode-ghosts" aria-hidden="true">
        <span className="pdy-methode-ghost pdy-methode-ghost-1">01</span>
        <span className="pdy-methode-ghost pdy-methode-ghost-2">02</span>
        <span className="pdy-methode-ghost pdy-methode-ghost-3">03</span>
        <span className="pdy-methode-ghost pdy-methode-ghost-4">04</span>
      </div>
      <div className="pdy-methode-halo" aria-hidden="true" />

      <div className="pdy-methode-inner">
        <header className="pdy-methode-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {homeMethode.eyebrow}
          </motion.p>
          <motion.h2
            variants={v(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-h2"
          >
            {homeMethode.headline.before}
            <em className="pdy-italic-accent">{homeMethode.headline.italic}</em>
            {homeMethode.headline.after}
          </motion.h2>
          <motion.p
            variants={v(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-sub"
          >
            {homeMethode.sub}
          </motion.p>
        </header>

        {/* Timeline visuelle 4 segments */}
        <motion.div
          variants={v(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="pdy-methode-timeline"
        >
          <p className="pdy-methode-timeline-label">{homeMethode.timelineLabel}</p>
          <div className="pdy-methode-timeline-track">
            {homeMethode.timeline.map((seg, i) => (
              <div
                key={seg.label}
                className={`pdy-methode-segment ${i === 0 ? "pdy-methode-segment-active" : ""}`}
                style={{ flex: seg.flex }}
              >
                <span className="pdy-methode-seg-label">{seg.label}</span>
                <span className="pdy-methode-seg-duration">{seg.duration}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4 étapes detail */}
        <motion.ol
          variants={stepGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="pdy-methode-steps"
        >
          {homeMethode.steps.map((step) => (
            <motion.li key={step.number} variants={stepItem} className="pdy-methode-step">
              <span className="pdy-methode-step-ghost" aria-hidden="true">
                {step.number}
              </span>
              <div className="pdy-methode-step-body">
                <span className="pdy-methode-step-tag">
                  <span className="pdy-methode-step-dot" aria-hidden="true" />
                  {step.tag} ·{" "}
                  <em className="pdy-italic-accent">{step.titleItalic}</em>
                </span>
                <h3 className="pdy-methode-step-title">
                  {step.headline.before}
                  <em className="pdy-italic-accent">{step.headline.italic}</em>
                  {step.headline.after}
                </h3>
                <p className="pdy-methode-step-desc">{step.description}</p>
                <ul className="pdy-methode-step-livrables">
                  {step.livrables.map((l) => (
                    <li key={l.label}>
                      <span className="pdy-methode-step-livrable-label">{l.label}</span>
                      <span className="pdy-methode-step-livrable-duration">{l.duration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
