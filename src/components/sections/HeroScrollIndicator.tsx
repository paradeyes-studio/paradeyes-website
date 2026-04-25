"use client";

import { useReducedMotion } from "framer-motion";

interface HeroScrollIndicatorProps {
  label?: string;
}

export function HeroScrollIndicator({
  label = "Faites défiler",
}: HeroScrollIndicatorProps) {
  const reduced = useReducedMotion();

  const handleClick = () => {
    const hero = document.querySelector(".pdy-hero");
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
      <span className="pdy-scroll-indicator-track" aria-hidden="true">
        <span className="pdy-scroll-indicator-fill" />
      </span>
      <span className="pdy-scroll-indicator-label">{label}</span>
    </button>
  );
}
