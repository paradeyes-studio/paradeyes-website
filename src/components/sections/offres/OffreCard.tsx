"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { OffrePicto, mapSlugToPictoType } from "@/components/icons/OffrePicto";

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
}

function extractSlug(href: string): string {
  const segments = href.split("/").filter(Boolean);
  return segments[segments.length - 1] ?? "";
}

export function OffreCard({ data }: OffreCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const titleParts = data.title.split(data.titleItalic);
  const before = titleParts[0] ?? "";
  const after = titleParts[1] ?? "";
  const pictoType = mapSlugToPictoType(extractSlug(data.href));
  const durationLabel = data.duration.split(/\s*·\s*/)[0] ?? data.duration;

  return (
    <article
      className="pdy-offre-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="pdy-offre-ghost" aria-hidden="true">
        {data.number}
      </span>

      <div className="pdy-offre-icon-wrapper">
        <div className="pdy-offre-icon">
          <OffrePicto type={pictoType} className="pdy-offre-picto" isHovered={isHovered} />
        </div>
      </div>

      <span className="pdy-offre-tag">
        <span className="pdy-offre-tag-dot" aria-hidden="true" />
        {data.tag}
      </span>

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
        <span className="pdy-offre-duration">{durationLabel}</span>
        <Link href={data.href} className="pdy-offre-cta" aria-label={`En savoir plus sur ${data.title}`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
