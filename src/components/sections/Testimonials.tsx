"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Particles } from "@/components/ui/Particles";
import { homeTestimonials } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { TestimonialHero, type TestimonialHeroData } from "./testimonials/TestimonialHero";
import { TestimonialMini, type TestimonialMiniData } from "./testimonials/TestimonialMini";

type RawItem = (typeof homeTestimonials.items)[number];

function splitRoleCompany(role: string): { role: string; company?: string } {
  const idx = role.indexOf(",");
  if (idx < 0) return { role: role.trim() };
  return {
    role: role.slice(0, idx).trim(),
    company: role.slice(idx + 1).trim(),
  };
}

function toHeroData(item: RawItem, index: number): TestimonialHeroData {
  const split = splitRoleCompany(item.role);
  return {
    id: `testimonial-${index}`,
    authorName: item.author,
    authorRole: split.role,
    authorCompany: split.company,
    quote: item.quote,
    rating: 5,
    isVerified: true,
  };
}

function toMiniData(item: RawItem, index: number): TestimonialMiniData {
  const split = splitRoleCompany(item.role);
  return {
    id: `testimonial-${index}`,
    authorName: item.author,
    authorRole: split.role,
    authorCompany: split.company,
    quote: item.quote,
    rating: 5,
    isVerified: true,
  };
}

export function Testimonials() {
  const reveal = useSectionReveal<HTMLElement>(0.15);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = homeTestimonials.items;
  const featured = toHeroData(items[0], 0);
  // TODO si besoin de scaler au dela de 3 minis, prevoir grille 2x2 ou 3x2 ou bouton voir tous les avis
  const others = items.slice(1, 4).map((item, i) => toMiniData(item, i + 1));

  return (
    <section
      ref={reveal}
      className="pdy-testimonials pdy-bloc-dark pdy-bloc-dark--tertiary pdy-section-stacked pdy-section-stacked--z6 pdy-section-reveal"
      data-section-theme="dark"
      aria-labelledby="testimonials-title"
    >
      <Particles count={20} variant="green" />
      <header className="pdy-testimonials-header">
        <p className="pdy-eyebrow">{homeTestimonials.eyebrow}</p>
        <SectionHeadline
          before={homeTestimonials.headline.before}
          italic={homeTestimonials.headline.italic}
          after={homeTestimonials.headline.after}
          className="pdy-testimonials-title"
          id="testimonials-title"
        />
      </header>

      <div ref={ref} className="pdy-testimonials-inner">
        <TestimonialHero testimonial={featured} inView={isInView} />

        {others.length > 0 ? (
          <div className="pdy-testimonials-grid">
            {others.map((t, idx) => (
              <TestimonialMini
                key={t.id}
                testimonial={t}
                inView={isInView}
                index={idx}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
