"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const strokeVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.4, ease: "easeOut" },
    },
  },
};

const ghostVariants = (targetOpacity: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: targetOpacity,
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
  },
});

const fillVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, pathLength: 1, scale: 1 },
  visible: { opacity: 1, pathLength: 1, scale: 1 },
};

const reducedGhost = (targetOpacity: number): Variants => ({
  hidden: { opacity: targetOpacity },
  visible: { opacity: targetOpacity },
});

function PictoBranding({
  reduced,
  hovered,
  s,
  ghost,
  fill,
}: {
  reduced: boolean;
  hovered: boolean;
  s: Variants;
  ghost: (o: number) => Variants;
  fill: Variants;
}) {
  return (
    <>
      <motion.rect x="8" y="8" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.rect x="25" y="8" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.rect x="42" y="8" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.rect x="8" y="25" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.rect x="42" y="25" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.rect x="8" y="42" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.rect x="25" y="42" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.rect x="42" y="42" width="14" height="14" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.g
        style={{ originX: "32px", originY: "32px" }}
        variants={fill}
        animate={!reduced && hovered ? { scale: [1, 1.06, 1] } : undefined}
        transition={!reduced && hovered ? { duration: 0.6, ease: "easeInOut", repeat: Infinity } : undefined}
      >
        <rect x="25" y="25" width="14" height="14" fill={COLOR_ELECTRIC} stroke="none" />
        <motion.g
          style={{ originX: "32px", originY: "32px" }}
          animate={!reduced && hovered ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <line x1="29" y1="32" x2="35" y2="32" stroke={COLOR_DEEP} strokeWidth="1" strokeLinecap="round" />
          <line x1="32" y1="29" x2="32" y2="35" stroke={COLOR_DEEP} strokeWidth="1" strokeLinecap="round" />
        </motion.g>
      </motion.g>
      <motion.g variants={ghost(1)} />
    </>
  );
}

function PictoSiteWeb({
  reduced,
  hovered,
  s,
  ghost,
  fill,
}: {
  reduced: boolean;
  hovered: boolean;
  s: Variants;
  ghost: (o: number) => Variants;
  fill: Variants;
}) {
  return (
    <>
      <motion.path d="M 10 18 L 10 10 L 18 10" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" variants={s} />
      <motion.path d="M 46 10 L 54 10 L 54 18" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" variants={s} />
      <motion.path d="M 10 46 L 10 54 L 18 54" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" variants={s} />
      <motion.path d="M 46 54 L 54 54 L 54 46" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" variants={s} />
      <motion.line
        x1="32"
        y1="22"
        x2="32"
        y2="38"
        stroke={COLOR_ELECTRIC}
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={fill}
        animate={!reduced && hovered ? { opacity: [1, 0.4, 1] } : undefined}
        transition={!reduced && hovered ? { duration: 0.8, ease: "easeInOut", repeat: Infinity } : undefined}
      />
      <motion.line x1="22" y1="46" x2="42" y2="46" stroke={COLOR_DEEP} strokeWidth="1" strokeLinecap="round" variants={ghost(0.4)} />
      <motion.line x1="22" y1="50" x2="36" y2="50" stroke={COLOR_DEEP} strokeWidth="1" strokeLinecap="round" variants={ghost(0.4)} />
    </>
  );
}

function PictoContenus({
  reduced,
  hovered,
  s,
  ghost,
  fill,
}: {
  reduced: boolean;
  hovered: boolean;
  s: Variants;
  ghost: (o: number) => Variants;
  fill: Variants;
}) {
  return (
    <>
      <motion.rect x="8" y="14" width="48" height="36" rx="2" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" variants={s} />
      <motion.circle cx="13" cy="22" r="0.9" fill={COLOR_DEEP} variants={ghost(1)} />
      <motion.circle cx="13" cy="32" r="0.9" fill={COLOR_DEEP} variants={ghost(1)} />
      <motion.circle cx="13" cy="42" r="0.9" fill={COLOR_DEEP} variants={ghost(1)} />
      <motion.circle cx="51" cy="22" r="0.9" fill={COLOR_DEEP} variants={ghost(1)} />
      <motion.circle cx="51" cy="32" r="0.9" fill={COLOR_DEEP} variants={ghost(1)} />
      <motion.circle cx="51" cy="42" r="0.9" fill={COLOR_DEEP} variants={ghost(1)} />
      <motion.path
        d="M 27 24 L 41 32 L 27 40 Z"
        fill={COLOR_ELECTRIC}
        stroke="none"
        variants={fill}
        animate={!reduced && hovered ? { x: [0, 2, 0] } : undefined}
        transition={!reduced && hovered ? { duration: 0.8, ease: "easeInOut", repeat: Infinity } : undefined}
      />
    </>
  );
}

function PictoDeploiement({
  reduced,
  hovered,
  ghost,
  fill,
}: {
  reduced: boolean;
  hovered: boolean;
  s: Variants;
  ghost: (o: number) => Variants;
  fill: Variants;
}) {
  return (
    <>
      <motion.path
        d="M 12 22 L 22 32 L 12 42"
        stroke={COLOR_DEEP}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={ghost(0.25)}
        animate={!reduced && hovered ? { x: [0, 1, 0] } : undefined}
        transition={!reduced && hovered ? { duration: 0.8, ease: "easeInOut", repeat: Infinity, delay: 0 } : undefined}
      />
      <motion.path
        d="M 26 22 L 36 32 L 26 42"
        stroke={COLOR_DEEP}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={ghost(0.55)}
        animate={!reduced && hovered ? { x: [0, 1.5, 0] } : undefined}
        transition={!reduced && hovered ? { duration: 0.8, ease: "easeInOut", repeat: Infinity, delay: 0.1 } : undefined}
      />
      <motion.path
        d="M 40 22 L 50 32 L 40 42"
        stroke={COLOR_ELECTRIC}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={fill}
        animate={!reduced && hovered ? { x: [0, 2, 0] } : undefined}
        transition={!reduced && hovered ? { duration: 0.8, ease: "easeInOut", repeat: Infinity, delay: 0.2 } : undefined}
      />
    </>
  );
}

function PictoAcquisition({
  reduced,
  hovered,
  s,
  ghost,
  fill,
}: {
  reduced: boolean;
  hovered: boolean;
  s: Variants;
  ghost: (o: number) => Variants;
  fill: Variants;
}) {
  return (
    <>
      <motion.line x1="10" y1="54" x2="58" y2="54" stroke={COLOR_DEEP} strokeWidth="1" variants={ghost(0.25)} />
      <motion.line x1="10" y1="6" x2="10" y2="54" stroke={COLOR_DEEP} strokeWidth="1" variants={ghost(0.25)} />
      <motion.path d="M 10 50 Q 22 48 28 36 T 46 16" stroke={COLOR_DEEP} strokeWidth="1.5" fill="none" strokeLinecap="round" variants={s} />
      <motion.circle
        cx="46"
        cy="16"
        r="6"
        stroke={COLOR_ELECTRIC}
        strokeWidth="1"
        fill="none"
        style={{ originX: "46px", originY: "16px" }}
        variants={fill}
        animate={!reduced && hovered ? { scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] } : { opacity: 0.6 }}
        transition={!reduced && hovered ? { duration: 0.7, ease: "easeOut", repeat: Infinity } : { duration: 0.4 }}
      />
      <motion.circle
        cx="46"
        cy="16"
        r="2.5"
        fill={COLOR_ELECTRIC}
        stroke="none"
        style={{ originX: "46px", originY: "16px" }}
        variants={fill}
        animate={!reduced && hovered ? { scale: [1, 1.1, 1] } : undefined}
        transition={!reduced && hovered ? { duration: 0.7, ease: "easeOut", repeat: Infinity } : undefined}
      />
    </>
  );
}

const PICTO_COMPONENTS: Record<
  OffrePictoType,
  (props: {
    reduced: boolean;
    hovered: boolean;
    s: Variants;
    ghost: (o: number) => Variants;
    fill: Variants;
  }) => React.JSX.Element
> = {
  branding: PictoBranding,
  "site-web": PictoSiteWeb,
  contenus: PictoContenus,
  deploiement: PictoDeploiement,
  acquisition: PictoAcquisition,
};

export function OffrePicto({ type, className, inView, isHovered = false }: OffrePictoProps) {
  const reduced = useReducedMotion() ?? false;
  const localRef = useRef<SVGSVGElement | null>(null);
  const localInView = useInView(localRef, { once: true, amount: 0.4 });
  const isVisible = inView !== undefined ? inView : localInView;

  const stroke = reduced ? reducedVariants : strokeVariants;
  const fill = reduced ? reducedVariants : fillVariants;
  const ghost = reduced ? reducedGhost : ghostVariants;

  const Picto = PICTO_COMPONENTS[type];

  return (
    <motion.svg
      ref={localRef}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Picto reduced={reduced} hovered={isHovered} s={stroke} ghost={ghost} fill={fill} />
    </motion.svg>
  );
}
