"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { homeMoments } from "@/content/home-fallback";
import type { MomentItemShape } from "@/lib/sanity-mappers";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Particles } from "@/components/ui/Particles";

type MomentItem = MomentItemShape;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(20px)",
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ghostNumberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
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

function MomentCard({ item, reduced }: { item: MomentItem; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.li
      ref={ref}
      className="pdy-moment-card"
      variants={reduced ? reducedVariants : cardVariants}
    >
      <motion.span
        className="pdy-moment-card-num"
        aria-hidden="true"
        variants={reduced ? reducedVariants : ghostNumberVariants}
        style={reduced ? undefined : { y: parallaxY }}
      >
        {item.number}
      </motion.span>
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
  const gridRef = useRef<HTMLUListElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={reveal}
      className="pdy-moments pdy-bloc-dark pdy-section-reveal"
      data-section-theme="dark"
      aria-labelledby="moments-title"
    >
      <div className="pdy-moments-halo" aria-hidden="true" />
      <Particles count={20} variant="green" />

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

        <motion.ul
          ref={gridRef}
          className="pdy-moments-grid"
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {items.map((m) => (
            <MomentCard key={m.number} item={m} reduced={reduced} />
          ))}
        </motion.ul>

        <p className="pdy-moments-outro">
          {renderTextWithBreak(outroCta, "Parlez-en à IRIS,", "pdy-moments-outro-break")}
        </p>
      </div>
    </section>
  );
}
