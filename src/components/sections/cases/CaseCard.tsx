"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface CaseCardData {
  number: string;
  total: string;
  tag: string;
  title: string;
  sub: string;
  metrics: ReadonlyArray<{ value: string; label: string }>;
  year: string;
  location: string;
  bgVariant: number;
  href: string;
}

interface CaseCardProps {
  data: CaseCardData;
}

export function CaseCard({ data }: CaseCardProps) {
  return (
    <article
      className={`pdy-case-card pdy-case-card-bg-${data.bgVariant}`}
      data-case-number={data.number}
    >
      <div className="pdy-case-pattern" aria-hidden="true" />
      <header className="pdy-case-head">
        <span className="pdy-case-tag">
          <span className="pdy-case-tag-dot" aria-hidden="true" />
          {data.tag}
        </span>
        <span className="pdy-case-num">
          {data.number} / {data.total}
        </span>
      </header>

      <div className="pdy-case-body">
        <h3 className="pdy-case-title">{data.title}</h3>
        <p className="pdy-case-sub">{data.sub}</p>

        <ul className="pdy-case-metrics">
          {data.metrics.map((m) => (
            <li key={m.label} className="pdy-case-metric">
              <span className="pdy-case-metric-value">{m.value}</span>
              <span className="pdy-case-metric-label">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="pdy-case-footer">
        <span className="pdy-case-meta">
          {data.year} · {data.location}
        </span>
        <Link href={data.href} className="pdy-case-cta" aria-label={`Voir ${data.title}`}>
          <ArrowRight aria-hidden="true" />
        </Link>
      </footer>
    </article>
  );
}
