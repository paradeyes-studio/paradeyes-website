"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { homeOffres } from "@/content/home-fallback";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { OffreCard } from "./offres/OffreCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Offres() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;

    if (reduced || window.innerWidth < 1024) {
      track.style.transform = "translateX(0)";
      return;
    }

    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(0, trackWidth - viewportWidth);

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.2}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="pdy-offres pdy-section-stacked pdy-section-stacked--z1"
      data-section-theme="light"
      id="section-offres"
      aria-labelledby="offres-title"
    >
      <header className="pdy-offres-header">
        <p className="pdy-offres-eyebrow">{homeOffres.eyebrow}</p>
        <SectionHeadline
          before={homeOffres.headline.before}
          italic={homeOffres.headline.italic}
          after={homeOffres.headline.after}
          className="pdy-offres-title"
          id="offres-title"
        />
        <p className="pdy-offres-sub">{homeOffres.sub}</p>
      </header>

      <div className="pdy-offres-track-wrapper">
        <div ref={trackRef} className="pdy-offres-track">
          {homeOffres.cards.map((card, idx) => (
            <OffreCard key={card.number} data={card} index={idx} />
          ))}
        </div>
      </div>

      <div className="pdy-offres-progress-wrapper" aria-hidden="true">
        <div ref={progressRef} className="pdy-offres-progress" />
      </div>
    </section>
  );
}
