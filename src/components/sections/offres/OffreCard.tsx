"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  IconBranding,
  IconSitesWeb,
  IconContenus,
  IconDeploiement,
  IconAcquisition,
} from "@/components/icons/offres";

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

type IconComponent = (props: { size?: number; className?: string; animated?: boolean }) => React.JSX.Element;

const ICON_MAP: Record<string, IconComponent> = {
  "01": IconBranding,
  "02": IconSitesWeb,
  "03": IconContenus,
  "04": IconDeploiement,
  "05": IconAcquisition,
};

const ROMAN_NUMERALS = ["i", "ii", "iii", "iv", "v"] as const;

export function OffreCard({ data, index = 0 }: OffreCardProps) {
  const titleParts = data.title.split(data.titleItalic);
  const before = titleParts[0] ?? "";
  const after = titleParts[1] ?? "";
  const Icon = ICON_MAP[data.number];
  const romanNumeral = ROMAN_NUMERALS[index] ?? `${index + 1}`;

  return (
    <article className="pdy-offre-card">
      <span className="pdy-offre-ghost" aria-hidden="true">
        {data.number}
      </span>

      <div className="pdy-offre-icon-wrapper">
        <div className="pdy-offre-icon">
          {Icon ? <Icon size={64} /> : null}
        </div>
        <span className="pdy-offre-icon-numeral" aria-hidden="true">
          {romanNumeral}.
        </span>
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
        <span className="pdy-offre-duration">{data.duration}</span>
        <Link href={data.href} className="pdy-offre-cta" aria-label={`En savoir plus sur ${data.title}`}>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
