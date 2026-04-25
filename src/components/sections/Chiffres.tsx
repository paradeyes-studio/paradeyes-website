"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { homeChiffres } from "@/content/home-fallback";
import { useCountUp } from "@/hooks/useCountUp";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { ClientsMarquee } from "./chiffres/ClientsMarquee";

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

interface StatItemProps {
  data: (typeof homeChiffres.stats)[number];
}

function StatItem({ data }: StatItemProps) {
  const decimals = "decimals" in data && typeof data.decimals === "number" ? data.decimals : 0;
  const prefix = "prefix" in data && typeof data.prefix === "string" ? data.prefix : "";
  const [ref, value] = useCountUp<HTMLDivElement>({
    target: data.value,
    duration: 1600,
    decimals,
  });
  const formatted = decimals > 0 ? value.toFixed(decimals).replace(".", ",") : Math.round(value).toString();

  return (
    <div ref={ref} className="pdy-stat-card">
      <header className="pdy-stat-head">
        <span className="pdy-stat-label">
          <span className="pdy-stat-label-num">{data.number}</span>
          <span className="pdy-stat-label-name">· {data.label}</span>
        </span>
      </header>
      <div className="pdy-stat-value-wrap">
        <span className="pdy-stat-value">
          {prefix}
          {formatted}
        </span>
        {data.suffix ? <span className="pdy-stat-suffix">{data.suffix}</span> : null}
      </div>
      <p className="pdy-stat-caption">{data.caption}</p>
    </div>
  );
}

export function Chiffres() {
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));
  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-chiffres pdy-section-stacked pdy-section-reveal"
      data-section-theme="light"
    >
      <div className="pdy-chiffres-inner">
        <header className="pdy-chiffres-head">
          <motion.p
            variants={v(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-eyebrow"
          >
            {homeChiffres.eyebrow}
          </motion.p>
          <motion.h2
            variants={v(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-h2"
          >
            {homeChiffres.headline.before}
            <em className="pdy-italic-accent">{homeChiffres.headline.italic}</em>
            {homeChiffres.headline.after}
          </motion.h2>
          <motion.p
            variants={v(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-section-sub"
          >
            {homeChiffres.sub}
          </motion.p>
        </header>

        <div className="pdy-chiffres-stats">
          {homeChiffres.stats.map((stat) => (
            <StatItem key={stat.number} data={stat} />
          ))}
        </div>

        <motion.p
          variants={v(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="pdy-chiffres-transition"
        >
          {homeChiffres.transition}
        </motion.p>

        <ClientsMarquee
          clients={homeChiffres.clients}
          label={homeChiffres.clientsLabel}
        />
      </div>
    </section>
  );
}
