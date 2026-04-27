"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
  index?: number;
}

const ICON_MAP: Record<string, string> = {
  "01": "/images/icons/offres/branding.png",
  "02": "/images/icons/offres/sites-web.png",
  "03": "/images/icons/offres/contenus.png",
  "04": "/images/icons/offres/deploiement.png",
  "05": "/images/icons/offres/acquisition.png",
};

export function OffreCard({ data, index = 0 }: OffreCardProps) {
  const titleParts = data.title.split(data.titleItalic);
  const before = titleParts[0] ?? "";
  const after = titleParts[1] ?? "";
  const iconSrc = ICON_MAP[data.number];

  return (
    <article className="pdy-offre-card">
      <span className="pdy-offre-ghost" aria-hidden="true">
        {data.number}
      </span>

      {iconSrc ? (
        <div className="pdy-offre-icon" aria-hidden="true">
          <Image
            src={iconSrc}
            alt=""
            width={120}
            height={120}
            className="pdy-offre-icon-img"
            priority={index < 3}
          />
        </div>
      ) : null}

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
        <span className="pdy-offre-duration">{data.duration}</span>
        <Link href={data.href} className="pdy-offre-cta" aria-label={`En savoir plus sur ${data.title}`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
