"use client";

interface RowConfig {
  tags: readonly string[];
  accentTag: string;
  direction: "right" | "left";
}

const ROWS: readonly RowConfig[] = [
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

export function MarqueeTags() {
  return (
    <section
      className="pdy-marquee-tags-section"
      data-section-theme="light"
      aria-hidden="true"
    >
      <div className="pdy-marquee-tags-rows">
        {ROWS.map((row, idx) => (
          <MarqueeRow key={idx} {...row} />
        ))}
      </div>
    </section>
  );
}
