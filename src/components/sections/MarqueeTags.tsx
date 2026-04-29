"use client";

interface RowConfig {
  tags: readonly string[];
  accentTag: string;
  direction: "right" | "left";
}

export interface MarqueeTagsData {
  line1?: string[];
  line1Accent?: string;
  line2?: string[];
  line2Accent?: string;
  line3?: string[];
  line3Accent?: string;
}

const FALLBACK_ROWS: readonly RowConfig[] = [
  {
    tags: [
      "Branding",
      "Site web",
      "Identité",
      "Stratégie de marque",
      "Direction artistique",
      "Motion design",
      "Storytelling",
      "UX UI",
      "Editorial",
      "Production de contenus",
    ],
    accentTag: "Direction artistique",
    direction: "right",
  },
  {
    tags: [
      "Croissance mesurable",
      "Conversion",
      "Visibilité",
      "Notoriété",
      "Performance",
      "Différenciation",
      "Acquisition",
      "Engagement",
      "Positionnement clair",
      "Reconnaissance",
    ],
    accentTag: "Croissance mesurable",
    direction: "left",
  },
  {
    tags: [
      "Premium",
      "Sur mesure",
      "Conseil intégré",
      "Exécution propre",
      "Sans esbroufe",
      "Cannes",
      "Paris",
      "Depuis 7 ans",
      "60+ marques accompagnées",
      "Studio créatif",
    ],
    accentTag: "Conseil intégré",
    direction: "right",
  },
];

function MarqueeRow({ tags, accentTag, direction }: RowConfig) {
  const doubled = [...tags, ...tags];
  return (
    <div className={`pdy-marquee-tags-row direction-${direction}`}>
      {doubled.map((tag, idx) => {
        const isAccent = tag === accentTag;
        return (
          <span
            key={`${tag}-${idx}`}
            className={`pdy-marquee-tag${isAccent ? " is-accent" : ""}`}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function buildRowsFromData(
  data: MarqueeTagsData,
): readonly RowConfig[] | null {
  const lines: Array<{
    tags?: string[];
    accent?: string;
    direction: "right" | "left";
  }> = [
    { tags: data.line1, accent: data.line1Accent, direction: "right" },
    { tags: data.line2, accent: data.line2Accent, direction: "left" },
    { tags: data.line3, accent: data.line3Accent, direction: "right" },
  ];
  const rows: RowConfig[] = [];
  for (const { tags, accent, direction } of lines) {
    if (!Array.isArray(tags) || tags.length === 0) continue;
    rows.push({
      tags,
      accentTag: accent ?? tags[0] ?? "",
      direction,
    });
  }
  return rows.length > 0 ? rows : null;
}

export function MarqueeTags({ data }: { data?: MarqueeTagsData } = {}) {
  const rows = (data && buildRowsFromData(data)) ?? FALLBACK_ROWS;
  return (
    <section
      className="pdy-marquee-tags-section"
      data-section-theme="light"
      aria-hidden="true"
    >
      <div className="pdy-marquee-tags-rows">
        {rows.map((row, idx) => (
          <MarqueeRow key={idx} {...row} />
        ))}
      </div>
    </section>
  );
}
