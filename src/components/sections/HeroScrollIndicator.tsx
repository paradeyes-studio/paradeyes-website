"use client";

import { useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroScrollIndicatorProps {
  label?: string;
}

export function HeroScrollIndicator({
  label = "Faites défiler",
}: HeroScrollIndicatorProps) {
  const reduced = useReducedMotion();

  const handleClick = () => {
    const hero = document.querySelector("[data-hero-root]");
    const next = hero?.nextElementSibling;
    if (next instanceof HTMLElement) {
      next.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: reduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <button
      type="button"
      className="pdy-scroll-indicator"
      onClick={handleClick}
      aria-label="Faire défiler vers la section suivante"
    >
      <span className="pdy-scroll-indicator-label">{label}</span>
      <span className="pdy-scroll-indicator-arrow" aria-hidden="true">
        <ChevronDown />
      </span>
    </button>
  );
}
