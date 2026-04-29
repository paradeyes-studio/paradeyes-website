"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { homeJournal } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useTilt } from "@/hooks/useTilt";
import { SectionHeadline } from "@/components/ui/SectionHeadline";

type JournalArticle = (typeof homeJournal.articles)[number];

function JournalCard({ article }: { article: JournalArticle }) {
  const tiltRef = useTilt<HTMLElement>({ max: 4, perspective: 1200 });
  const slug = article.href.replace("/journal/", "");

  return (
    <motion.article
      ref={tiltRef}
      variants={item}
      className="pdy-journal-card"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Link href={article.href} className="pdy-journal-card-link">
        <div className="pdy-journal-card-cover" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/journal/${slug}-cover.png`}
            alt=""
            loading="lazy"
            width={1920}
            height={1080}
          />
        </div>
        <div className="pdy-journal-card-content">
          <span className="pdy-journal-category">{article.category}</span>
          <h3 className="pdy-journal-title">{article.title}</h3>
          <p className="pdy-journal-excerpt">{article.excerpt}</p>
          <footer className="pdy-journal-card-footer">
            <span className="pdy-journal-readtime">{article.readTime}</span>
            <span className="pdy-journal-date">{article.date}</span>
          </footer>
        </div>
      </Link>
    </motion.article>
  );
}

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

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export interface JournalPreviewData {
  eyebrow?: string;
  title?: { before: string; italic: string; after: string };
  sub?: string;
  cta?: string;
  ctaHref?: string;
  articles?: typeof homeJournal.articles;
}

export function JournalPreview({ data = {} }: { data?: JournalPreviewData } = {}) {
  const eyebrow = data.eyebrow ?? homeJournal.eyebrow;
  const headline = data.title ?? homeJournal.headline;
  const sub = data.sub ?? homeJournal.sub;
  const cta = data.cta ?? homeJournal.cta;
  const ctaHref = data.ctaHref ?? homeJournal.ctaHref;
  const articles = data.articles ?? homeJournal.articles;
  const reduced = useReducedMotion();
  const v = (delay: number) => (reduced ? fadeOnly(delay) : fadeUp(delay));
  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-journal pdy-section-stacked pdy-section-stacked--z7 pdy-section-reveal"
      data-section-theme="light"
    >
      <div className="pdy-journal-inner">
        <header className="pdy-journal-head">
          <div className="pdy-journal-head-text">
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
          </div>
          <motion.div
            variants={v(0.25)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="pdy-journal-cta-wrap"
          >
            <Link href={ctaHref} className="pdy-journal-cta">
              {cta}
              <ArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </header>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="pdy-journal-grid"
        >
          {articles.map((article) => (
            <JournalCard key={article.href} article={article} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
