"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { homeCases } from "@/content/home-fallback";
import type { CaseCardItem } from "@/lib/sanity-mappers";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
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

export interface CasesData {
  eyebrow?: string;
  title?: { before: string; italic: string; after: string };
  sub?: string;
  cases?: ReadonlyArray<CaseCardItem>;
  ctaLabel?: string;
  ctaHref?: string;
}

export function Cases({ data = {} }: { data?: CasesData } = {}) {
  const eyebrow = data.eyebrow ?? homeCases.eyebrow;
  const headline = data.title ?? homeCases.headline;
  const sub = data.sub ?? homeCases.sub;
  const cases = data.cases ?? homeCases.cases;
  const ctaLabel = data.ctaLabel ?? "Découvrir toutes les réalisations";
  const ctaHref = data.ctaHref ?? "/realisations";
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = cases.length;

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

  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-cases pdy-section-stacked pdy-section-stacked--z5 pdy-section-reveal"
      data-section-theme="light"
    >
      <div className="pdy-cases-inner">
        <header className="pdy-cases-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {eyebrow}
          </motion.p>
          <SectionHeadline
            before={headline.before}
            italic={headline.italic}
            after={headline.after}
            className="pdy-section-h2"
          />
          <motion.p
            variants={v(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-sub"
          >
            {sub}
          </motion.p>
        </header>

        <div className="pdy-cases-controls">
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
          {cases.map((c) => (
            <CaseCard key={c.number} data={c} />
          ))}
        </div>

        <div className="pdy-cases-progress" aria-hidden="true">
          <div
            className="pdy-cases-progress-bar"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>

        <div className="pdy-cases-cta-wrapper">
          <Link href={ctaHref} className="pdy-cases-cta">
            <span className="pdy-cases-cta-text">{ctaLabel}</span>
            <ArrowUpRight className="pdy-cases-cta-arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
