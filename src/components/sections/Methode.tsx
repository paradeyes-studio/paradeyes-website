"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { homeMethode } from "@/content/home-fallback";
import type { MethodeStepItem } from "@/lib/sanity-mappers";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { CheckRond } from "@/components/ui/CheckRond";

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: idx * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export interface MethodeData {
  eyebrow?: string;
  title?: { before: string; italic: string; after: string };
  sub?: string;
  steps?: ReadonlyArray<MethodeStepItem>;
}

interface MethodeStepProps {
  step: MethodeStepItem;
  index: number;
  reduced: boolean;
}

function MethodeStep({ step, index, reduced }: MethodeStepProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      className="pdy-methode-step"
      custom={index}
      variants={reduced ? reducedVariants : stepVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="pdy-methode-step-number" aria-hidden="true">
        {step.number}
      </div>
      <div className="pdy-methode-step-content">
        <span className="pdy-methode-step-tag">
          <span className="pdy-methode-step-tag-dot" aria-hidden="true" />
          {step.tag}
        </span>
        <h3 className="pdy-methode-step-title">
          {step.headline.before}
          <em className="pdy-italic-accent">{step.headline.italic}</em>
          {step.headline.after}
        </h3>
        <p className="pdy-methode-step-description">{step.description}</p>
        <ul className="pdy-methode-step-livrables">
          {step.livrables.map((liv) => (
            <li key={liv.label}>
              <span>{liv.label}</span>
              <CheckRond inView={inView} delay={0} pulseDelay={0} />
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export function Methode({ data = {} }: { data?: MethodeData } = {}) {
  const eyebrow = data.eyebrow ?? homeMethode.eyebrow;
  const headline = data.title ?? homeMethode.headline;
  const sub = data.sub ?? homeMethode.sub;
  const steps = data.steps ?? homeMethode.steps;
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      className="pdy-methode pdy-methode--flat pdy-bloc-dark pdy-bloc-dark--secondary"
      data-section-theme="dark"
      aria-labelledby="methode-title"
    >
      <header className="pdy-methode-header">
        <p className="pdy-methode-eyebrow">{eyebrow}</p>
        <SectionHeadline
          before={headline.before}
          italic={headline.italic}
          after={headline.after}
          className="pdy-methode-title"
          id="methode-title"
        />
        <p className="pdy-methode-sub">{sub}</p>
      </header>

      <div className="pdy-methode-steps">
        {steps.map((step, idx) => (
          <MethodeStep key={step.number} step={step} index={idx} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}
