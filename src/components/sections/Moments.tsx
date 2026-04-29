"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { homeMoments } from "@/content/home-fallback";
import type { MomentItemShape } from "@/lib/sanity-mappers";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionHeadline } from "@/components/ui/SectionHeadline";

type MomentItem = MomentItemShape;

const cardVariants: Variants = {
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

function renderTextWithBreak(text: string, marker: string, breakClass: string) {
  const idx = text.indexOf(marker);
  if (idx < 0) return text;
  const part1 = text.slice(0, idx + marker.length);
  const part2 = text.slice(idx + marker.length).trimStart();
  if (!part2) return text;
  return (
    <>
      {part1}
      <br className={breakClass} />
      {" "}
      {part2}
    </>
  );
}

function MomentCard({ item, index, reduced }: { item: MomentItem; index: number; reduced: boolean }) {
  return (
    <motion.li
      className="pdy-moment-card"
      custom={index}
      variants={reduced ? reducedVariants : cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="pdy-moment-card-content">
        <span className="pdy-moment-card-tag">
          <span className="pdy-moment-card-tag-dot" aria-hidden="true" />
          Étape {item.number}
        </span>
        <h3 className="pdy-moment-card-title">{item.title}</h3>
        <p className="pdy-moment-card-description">{item.description}</p>
      </div>
    </motion.li>
  );
}

export interface MomentsData {
  eyebrow?: string;
  title?: { before: string; italic: string; after: string };
  sub?: string;
  items?: ReadonlyArray<MomentItemShape>;
  outroCta?: string;
}

export function Moments({ data = {} }: { data?: MomentsData } = {}) {
  const eyebrow = data.eyebrow ?? homeMoments.eyebrow;
  const headline = data.title ?? homeMoments.headline;
  const sub = data.sub ?? homeMoments.sub;
  const items = data.items ?? homeMoments.items;
  const outroCta = data.outroCta ?? homeMoments.outroCta;
  const reduced = useReducedMotion() ?? false;
  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-moments pdy-moments--flat pdy-bloc-dark pdy-section-reveal"
      data-section-theme="dark"
      aria-labelledby="moments-title"
    >
      <div className="pdy-moments-inner">
        <header className="pdy-moments-head">
          <p className="pdy-eyebrow">{eyebrow}</p>
          <SectionHeadline
            before={headline.before}
            italic={headline.italic}
            after={headline.after}
            className="pdy-section-h2"
            id="moments-title"
          />
          <p className="pdy-section-sub">
            {renderTextWithBreak(sub, "Identifiez le vôtre,", "pdy-moments-sub-break")}
          </p>
        </header>

        <ul className="pdy-moments-grid">
          {items.map((m, idx) => (
            <MomentCard key={m.number} item={m} index={idx} reduced={reduced} />
          ))}
        </ul>

        <p className="pdy-moments-outro">
          {renderTextWithBreak(outroCta, "Parlez-en à IRIS,", "pdy-moments-outro-break")}
        </p>
      </div>
    </section>
  );
}
