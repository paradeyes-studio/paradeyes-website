"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { homeMoments } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Particles } from "@/components/ui/Particles";

type MomentItem = (typeof homeMoments.items)[number];

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
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.li
      ref={ref}
      className="pdy-moment-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="pdy-moment-card-num"
        aria-hidden="true"
        style={reduced ? undefined : { y }}
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

export function Moments() {
  const reduced = useReducedMotion() ?? false;
  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-moments pdy-bloc-dark pdy-section-stacked pdy-section-stacked--z2 pdy-section-reveal"
      data-section-theme="dark"
      aria-labelledby="moments-title"
    >
      <div className="pdy-moments-halo" aria-hidden="true" />
      <Particles count={20} variant="green" />

      <div className="pdy-moments-inner">
        <header className="pdy-moments-head">
          <p className="pdy-eyebrow">{homeMoments.eyebrow}</p>
          <SectionHeadline
            before={homeMoments.headline.before}
            italic={homeMoments.headline.italic}
            after={homeMoments.headline.after}
            className="pdy-section-h2"
            id="moments-title"
          />
          <p className="pdy-section-sub">
            {renderTextWithBreak(homeMoments.sub, "Identifiez le vôtre,", "pdy-moments-sub-break")}
          </p>
        </header>

        <ul className="pdy-moments-grid">
          {homeMoments.items.map((m, idx) => (
            <MomentCard key={m.number} item={m} index={idx} reduced={reduced} />
          ))}
        </ul>

        <p className="pdy-moments-outro">{homeMoments.outroCta}</p>
      </div>
    </section>
  );
}
