"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

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
}

export function mapSlugToPictoType(slug: string | undefined | null): OffrePictoType {
  if (!slug) {
    if (typeof window !== "undefined") {
      console.warn("[OffrePicto] mapSlugToPictoType received empty slug, fallback branding");
    }
    return "branding";
  }
  const normalized = slug.trim().toLowerCase();
  if (normalized.includes("branding") || normalized.includes("identite")) return "branding";
  if (normalized.includes("site") || normalized.includes("plateforme")) return "site-web";
  if (normalized.includes("contenu") || normalized.includes("creation")) return "contenus";
  if (normalized.includes("deploiement") || normalized.includes("support")) return "deploiement";
  if (normalized.includes("acquisition") || normalized.includes("reputation")) return "acquisition";
  if (typeof window !== "undefined") {
    console.warn(`[OffrePicto] unknown slug "${slug}", fallback branding`);
  }
  return "branding";
}

function renderPicto(type: OffrePictoType) {
  switch (type) {
    case "branding":
      return (
        <>
          <path d="M 32 8 L 32 24" />
          <path d="M 32 40 L 32 56" />
          <path d="M 8 32 L 24 32" />
          <path d="M 40 32 L 56 32" />
          <path d="M 17 17 L 25 25" opacity="0.55" />
          <path d="M 39 39 L 47 47" opacity="0.55" />
          <path d="M 47 17 L 39 25" opacity="0.55" />
          <path d="M 25 39 L 17 47" opacity="0.55" />
        </>
      );
    case "site-web":
      return (
        <>
          <rect x="8" y="14" width="48" height="36" rx="3" />
          <line x1="8" y1="22" x2="56" y2="22" />
          <circle cx="13" cy="18" r="0.8" fill="#003135" stroke="none" />
          <circle cx="16" cy="18" r="0.8" fill="#003135" stroke="none" />
          <circle cx="19" cy="18" r="0.8" fill="#003135" stroke="none" />
          <line x1="14" y1="30" x2="50" y2="30" />
          <line x1="14" y1="36" x2="44" y2="36" />
          <line x1="14" y1="42" x2="38" y2="42" />
        </>
      );
    case "contenus":
      return (
        <>
          <rect x="8" y="14" width="48" height="36" rx="3" />
          <path d="M 27 24 L 41 32 L 27 40 Z" />
        </>
      );
    case "deploiement":
      return (
        <>
          <path d="M 32 10 L 54 22 L 32 34 L 10 22 Z" />
          <path d="M 10 32 L 32 44 L 54 32" />
          <path d="M 10 42 L 32 54 L 54 42" />
        </>
      );
    case "acquisition":
      return (
        <>
          <polyline points="8,44 22,30 32,38 54,14" />
          <polyline points="44,14 54,14 54,24" />
        </>
      );
  }
}

export function OffrePicto({ type, className, inView = true }: OffrePictoProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, scale: 1 },
        visible: { opacity: 1, scale: 1 },
      }
    : {
        hidden: { opacity: 0, scale: 0.92 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#003135"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      aria-hidden="true"
    >
      {renderPicto(type)}
    </motion.svg>
  );
}
