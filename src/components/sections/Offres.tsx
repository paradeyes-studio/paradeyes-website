"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { homeOffres } from "@/content/home-fallback";
import type { OffreCardItem } from "@/lib/sanity-mappers";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { OffreCard } from "./offres/OffreCard";

function renderSubWithBreak(sub: string) {
  const marker = "croissance.";
  const idx = sub.indexOf(marker);
  if (idx < 0) return sub;
  const part1 = sub.slice(0, idx + marker.length);
  const part2 = sub.slice(idx + marker.length).trimStart();
  if (!part2) return sub;
  return (
    <>
      {part1}
      <br className="pdy-offres-sub-break" />
      {" "}
      {part2}
    </>
  );
}

export interface OffresData {
  eyebrow?: string;
  title?: { before: string; italic: string; after: string };
  sub?: string;
  cards?: ReadonlyArray<OffreCardItem>;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: idx * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export function Offres({ data = {} }: { data?: OffresData } = {}) {
  const eyebrow = data.eyebrow ?? homeOffres.eyebrow;
  const headline = data.title ?? homeOffres.headline;
  const sub = data.sub ?? homeOffres.sub;
  const cards = data.cards ?? homeOffres.cards;
  const reduced = useReducedMotion();
  const variants = reduced ? reducedVariants : cardVariants;

  return (
    <section
      className="pdy-offres pdy-offres--flat"
      data-section-theme="light"
      id="section-offres"
      aria-labelledby="offres-title"
    >
      <header className="pdy-offres-header">
        <p className="pdy-offres-eyebrow">{eyebrow}</p>
        <SectionHeadline
          before={headline.before}
          italic={headline.italic}
          after={headline.after}
          className="pdy-offres-title"
          id="offres-title"
        />
        <p className="pdy-offres-sub">{renderSubWithBreak(sub)}</p>
      </header>

      <div className="pdy-offres-grid">
        {cards.map((card, idx) => (
          <motion.div
            key={card.number}
            className="pdy-offres-grid-cell"
            custom={idx}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <OffreCard data={card} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
