"use client";

import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface OffreCardData {
  number: string;
  tag: string;
  title: string;
  titleItalic: string;
  promise: string;
  glyph: string;
  livrables: readonly string[];
  duration: string;
  href: string;
}

interface OffreCardProps {
  data: OffreCardData;
  size?: "lg" | "md";
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function OffreCard({ data, size = "md" }: OffreCardProps) {
  const titleParts = data.title.split(data.titleItalic);
  const before = titleParts[0] ?? "";
  const after = titleParts[1] ?? "";

  return (
    <motion.div variants={cardVariants} className={`pdy-offre-card pdy-offre-card-${size}`}>
      <span className="pdy-offre-ghost" aria-hidden="true">
        {data.number}
      </span>

      <div className="pdy-offre-head">
        <span className="pdy-offre-tag">
          <span className="pdy-offre-tag-dot" aria-hidden="true" />
          {data.tag}
        </span>
        <span className="pdy-offre-glyph" aria-hidden="true">
          {data.glyph}
        </span>
      </div>

      <h3 className="pdy-offre-title">
        {before}
        <em className="pdy-italic-accent">{data.titleItalic}</em>
        {after}
      </h3>

      <p className="pdy-offre-promise">{data.promise}</p>

      <ul className="pdy-offre-livrables">
        {data.livrables.map((l) => (
          <li key={l}>
            <span className="pdy-offre-bullet" aria-hidden="true" />
            {l}
          </li>
        ))}
      </ul>

      <div className="pdy-offre-footer">
        <span className="pdy-offre-duration">{data.duration}</span>
        <Link href={data.href} className="pdy-offre-cta" aria-label={`En savoir plus sur ${data.title}`}>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
