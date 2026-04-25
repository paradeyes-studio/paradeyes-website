"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { homeCases } from "@/content/home-fallback";
import { CaseCard } from "./cases/CaseCard";

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

export function Cases() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = homeCases.cases.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      setProgress(p);
      const cardWidth = track.scrollWidth / total;
      const idx = Math.min(total - 1, Math.round(track.scrollLeft / cardWidth));
      setCurrentIndex(idx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, [total]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / total;
    track.scrollBy({
      left: direction * cardWidth,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const currentNumber = String(currentIndex + 1).padStart(2, "0");

  return (
    <section className="pdy-cases" data-section-theme="light">
      <div className="pdy-cases-inner">
        <header className="pdy-cases-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {homeCases.eyebrow}
          </motion.p>
          <motion.h2
            variants={v(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-h2"
          >
            {homeCases.headline.before}
            <em className="pdy-italic-accent">{homeCases.headline.italic}</em>
            {homeCases.headline.after}
          </motion.h2>
        </header>

        <div className="pdy-cases-controls">
          <span className="pdy-cases-counter">
            <span className="pdy-cases-counter-current">{currentNumber}</span>
            <span className="pdy-cases-counter-sep">/</span>
            <span className="pdy-cases-counter-total">{String(total).padStart(2, "0")}</span>
          </span>
          <div className="pdy-cases-arrows">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="pdy-cases-arrow"
              aria-label="Cas précédent"
              disabled={currentIndex === 0}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="pdy-cases-arrow"
              aria-label="Cas suivant"
              disabled={currentIndex >= total - 1}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="pdy-cases-track" role="region" aria-label="Études de cas">
          {homeCases.cases.map((c) => (
            <CaseCard key={c.number} data={c} />
          ))}
        </div>

        <div className="pdy-cases-progress" aria-hidden="true">
          <div
            className="pdy-cases-progress-bar"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
