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
}

const ICON_BY_NUMBER: Record<string, (props: { size?: number }) => React.JSX.Element> = {
  "01": IconBranding,
  "02": IconSitesWeb,
  "03": IconContenus,
  "04": IconDeploiement,
  "05": IconAcquisition,
};

export function OffreCard({ data }: OffreCardProps) {
  const titleParts = data.title.split(data.titleItalic);
  const before = titleParts[0] ?? "";
  const after = titleParts[1] ?? "";
  const Icon = ICON_BY_NUMBER[data.number];

  return (
    <article className="pdy-offre-card">
      <span className="pdy-offre-ghost" aria-hidden="true">
        {data.number}
      </span>

      {Icon ? (
        <div className="pdy-offre-icon" aria-hidden="true">
          <Icon size={36} />
        </div>
      ) : null}

      <span className="pdy-offre-tag">
        <span className="pdy-offre-tag-dot" aria-hidden="true" />
        {data.tag}
      </span>

      <h3 className="pdy-offre-title">
        {before}
        <em className="pdy-italic">{data.titleItalic}</em>
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
