"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { homeCases } from "@/content/home-fallback";
import type { CaseCardItem } from "@/lib/sanity-mappers";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { CaseCard } from "./cases/CaseCard";

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
  const variants = reduced ? reducedVariants : cardVariants;

  return (
    <section
      className="pdy-cases pdy-cases--flat"
      data-section-theme="light"
    >
      <div className="pdy-cases-inner">
        <header className="pdy-cases-head">
          <p className="pdy-eyebrow">{eyebrow}</p>
          <SectionHeadline
            before={headline.before}
            italic={headline.italic}
            after={headline.after}
            className="pdy-section-h2"
          />
          <p className="pdy-section-sub">{sub}</p>
        </header>

        <div className="pdy-cases-grid">
          {cases.map((c, idx) => (
            <motion.div
              key={c.number}
              className="pdy-cases-grid-cell"
              custom={idx}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <CaseCard data={c} />
            </motion.div>
          ))}
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
