"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { homeOffres } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { OffreCard } from "./offres/OffreCard";

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

const grid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export function Offres() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));

  // First two cards are large (col-span-6), the next three are medium (col-span-4).
  const [large1, large2, ...mediums] = homeOffres.cards;
  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-offres pdy-section-stacked pdy-section-reveal"
      data-section-theme="light"
      id="section-offres"
    >
      <div className="pdy-offres-inner">
        <header className="pdy-offres-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {homeOffres.eyebrow}
          </motion.p>
          <SectionHeadline
            before={homeOffres.headline.before}
            italic={homeOffres.headline.italic}
            after={homeOffres.headline.after}
            className="pdy-section-h2"
          />
          <motion.p
            variants={v(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-sub"
          >
            {homeOffres.sub}
          </motion.p>
        </header>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="pdy-offres-grid"
        >
          {large1 ? <OffreCard data={large1} size="lg" /> : null}
          {large2 ? <OffreCard data={large2} size="lg" /> : null}
          {mediums.map((card) => (
            <OffreCard key={card.number} data={card} size="md" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
