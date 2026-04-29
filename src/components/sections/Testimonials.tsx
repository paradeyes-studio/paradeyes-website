"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { Particles } from "@/components/ui/Particles";
import { homeTestimonials } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { TestimonialHero, type TestimonialHeroData } from "./testimonials/TestimonialHero";
import { TestimonialMini, type TestimonialMiniData } from "./testimonials/TestimonialMini";

type RawItem = { quote: string; author: string; role: string };

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

export interface TestimonialsData {
  eyebrow?: string;
  title?: { before: string; italic: string; after: string };
  items?: ReadonlyArray<RawItem>;
}

export function Testimonials({ data = {} }: { data?: TestimonialsData } = {}) {
  const eyebrow = data.eyebrow ?? homeTestimonials.eyebrow;
  const headline = data.title ?? homeTestimonials.headline;
  const reveal = useSectionReveal<HTMLElement>(0.15);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = data.items ?? homeTestimonials.items;
  const firstItem = items[0];
  if (!firstItem) return null;
  const featured = toHeroData(firstItem, 0);
  // TODO si besoin de scaler au dela de 6 minis, prevoir grille 4 cols ou bouton voir tous les avis
  const others = items.slice(1, 7).map((item, i) => toMiniData(item, i + 1));

  return (
    <section
      ref={reveal}
      className="pdy-testimonials pdy-bloc-dark pdy-bloc-dark--tertiary pdy-section-stacked pdy-section-stacked--z6 pdy-section-reveal"
      data-section-theme="dark"
      aria-labelledby="testimonials-title"
    >
      <Particles count={20} variant="green" />
      <header className="pdy-testimonials-header">
        <p className="pdy-eyebrow">{eyebrow}</p>
        <SectionHeadline
          before={headline.before}
          italic={headline.italic}
          after={headline.after}
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
