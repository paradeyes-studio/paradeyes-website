"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { homeMethode } from "@/content/home-fallback";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Particles } from "@/components/ui/Particles";
import { CheckRond } from "@/components/ui/CheckRond";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(16px)", scale: 0.95 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.15 + idx * 0.18,
    },
  }),
};

const ghostNumberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (idx: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.15 + idx * 0.18 + 0.3,
    },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
};

export interface MethodeData {
  eyebrow?: string;
  title?: { before: string; italic: string; after: string };
  sub?: string;
  steps?: typeof homeMethode.steps;
}

export function Methode({ data = {} }: { data?: MethodeData } = {}) {
  const eyebrow = data.eyebrow ?? homeMethode.eyebrow;
  const headline = data.title ?? homeMethode.headline;
  const sub = data.sub ?? homeMethode.sub;
  const steps = data.steps ?? homeMethode.steps;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;

    if (reduced) {
      track.style.transform = "translateX(0)";
      return;
    }

    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(0, trackWidth - viewportWidth);

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.2}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="pdy-methode pdy-bloc-dark pdy-bloc-dark--secondary pdy-section-stacked pdy-section-stacked--z4"
      data-section-theme="dark"
      aria-labelledby="methode-title"
    >
      <Particles count={18} variant="green" />
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

      <div className="pdy-methode-track-wrapper">
        <div ref={trackRef} className="pdy-methode-track">
          {steps.map((step, idx) => (
            <motion.article
              key={step.number}
              className="pdy-methode-panel"
              custom={idx}
              variants={reduced ? reducedVariants : cardVariants}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
            >
              <motion.div
                className="pdy-methode-panel-num"
                aria-hidden="true"
                custom={idx}
                variants={reduced ? reducedVariants : ghostNumberVariants}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
              >
                {step.number}
              </motion.div>
              <div className="pdy-methode-panel-content">
                <span className="pdy-methode-panel-tag">
                  <span className="pdy-methode-panel-tag-dot" aria-hidden="true" />
                  {step.tag}
                </span>
                <h3 className="pdy-methode-panel-title">
                  {step.headline.before}
                  <em className="pdy-italic-accent">{step.headline.italic}</em>
                  {step.headline.after}
                </h3>
                <p className="pdy-methode-panel-description">{step.description}</p>
                <ul className="pdy-methode-panel-livrables">
                  {step.livrables.map((liv, livIdx) => {
                    const cardRevealDelay = 0.15 + idx * 0.18;
                    const checkBaseDelay = cardRevealDelay + 0.9 + 0.1;
                    return (
                      <li key={liv.label}>
                        <span>{liv.label}</span>
                        <CheckRond
                          inView={sectionInView}
                          delay={checkBaseDelay + livIdx * 0.15}
                          pulseDelay={1.6 + livIdx * 0.5}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="pdy-methode-progress-wrapper" aria-hidden="true">
        <div ref={progressRef} className="pdy-methode-progress" />
      </div>
    </section>
  );
}
