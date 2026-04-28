"use client";

export type OffrePictoType =
  | "branding"
  | "site-web"
  | "contenus"
  | "deploiement"
  | "acquisition";

interface OffrePictoProps {
  type: OffrePictoType;
  className?: string;
  inView?: boolean;
  isHovered?: boolean;
}

const SLUG_TO_TYPE: Record<string, OffrePictoType> = {
  branding: "branding",
  "branding-identite": "branding",
  "sites-et-plateformes": "site-web",
  "sites-et-plateformes-digitales": "site-web",
  "site-web": "site-web",
  "creation-de-contenus": "contenus",
  "creation-et-production-de-contenus": "contenus",
  contenus: "contenus",
  "deploiement-et-supports": "deploiement",
  "deploiement-et-supports-de-marque": "deploiement",
  deploiement: "deploiement",
  "acquisition-et-reputation": "acquisition",
  "acquisition-et-reputation-digitale": "acquisition",
  acquisition: "acquisition",
};

export function mapSlugToPictoType(slug: string | undefined | null): OffrePictoType {
  if (!slug) {
    if (typeof window !== "undefined") {
      console.warn("[OffrePicto] mapSlugToPictoType received empty slug, fallback branding");
    }
    return "branding";
  }
  const normalized = slug.trim().toLowerCase();
  const match = SLUG_TO_TYPE[normalized];
  if (!match) {
    if (typeof window !== "undefined") {
      console.warn(`[OffrePicto] unknown slug "${slug}", fallback branding`);
    }
    return "branding";
  }
  return match;
}

const COLOR_DEEP = "#003135";
const COLOR_ELECTRIC = "#57EEA1";

function PictoBranding() {
  return (
    <>
      <rect x="8" y="8" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="25" y="8" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="42" y="8" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="8" y="25" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="42" y="25" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="8" y="42" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="25" y="42" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="42" y="42" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" />
      <rect x="25" y="25" width="14" height="14" fill={COLOR_ELECTRIC} stroke="none" />
      <line x1="29" y1="32" x2="35" y2="32" stroke={COLOR_DEEP} strokeWidth="1" strokeLinecap="round" />
      <line x1="32" y1="29" x2="32" y2="35" stroke={COLOR_DEEP} strokeWidth="1" strokeLinecap="round" />
    </>
  );
}

function PictoSiteWeb() {
  return (
    <>
      <path d="M 10 18 L 10 10 L 18 10" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 46 10 L 54 10 L 54 18" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 10 46 L 10 54 L 18 54" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 46 54 L 54 54 L 54 46" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="22" x2="32" y2="38" stroke={COLOR_ELECTRIC} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="46" x2="42" y2="46" stroke={COLOR_DEEP} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="22" y1="50" x2="36" y2="50" stroke={COLOR_DEEP} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </>
  );
}

function PictoContenus() {
  return (
    <>
      <rect x="8" y="14" width="48" height="36" rx="2" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" />
      <circle cx="13" cy="22" r="0.9" fill={COLOR_DEEP} />
      <circle cx="13" cy="32" r="0.9" fill={COLOR_DEEP} />
      <circle cx="13" cy="42" r="0.9" fill={COLOR_DEEP} />
      <circle cx="51" cy="22" r="0.9" fill={COLOR_DEEP} />
      <circle cx="51" cy="32" r="0.9" fill={COLOR_DEEP} />
      <circle cx="51" cy="42" r="0.9" fill={COLOR_DEEP} />
      <path d="M 27 24 L 41 32 L 27 40 Z" fill={COLOR_ELECTRIC} stroke="none" />
    </>
  );
}

function PictoDeploiement() {
  return (
    <>
      <path
        d="M 12 22 L 22 32 L 12 42"
        stroke={COLOR_DEEP}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
        fill="none"
      />
      <path
        d="M 26 22 L 36 32 L 26 42"
        stroke={COLOR_DEEP}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        fill="none"
      />
      <path
        d="M 40 22 L 50 32 L 40 42"
        stroke={COLOR_ELECTRIC}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  );
}

function PictoAcquisition() {
  return (
    <>
      <line x1="10" y1="54" x2="58" y2="54" stroke={COLOR_DEEP} strokeWidth="1" opacity="0.25" />
      <line x1="10" y1="6" x2="10" y2="54" stroke={COLOR_DEEP} strokeWidth="1" opacity="0.25" />
      <path d="M 10 50 Q 22 48 28 36 T 46 16" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="46" cy="16" r="6" stroke={COLOR_ELECTRIC} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="46" cy="16" r="2.5" fill={COLOR_ELECTRIC} stroke="none" />
    </>
  );
}

const PICTO_MAP: Record<OffrePictoType, () => React.JSX.Element> = {
  branding: PictoBranding,
  "site-web": PictoSiteWeb,
  contenus: PictoContenus,
  deploiement: PictoDeploiement,
  acquisition: PictoAcquisition,
};

export function OffrePicto({ type, className }: OffrePictoProps) {
  const Picto = PICTO_MAP[type];
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <Picto />
    </svg>
  );
}
