"use client";

import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { homeTestimonials } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { TestimonialCard } from "./testimonials/TestimonialCard";

export function Testimonials() {
  const reveal = useSectionReveal<HTMLElement>(0.15);

  return (
    <section
      ref={reveal}
      className="pdy-testimonials pdy-bloc-dark pdy-bloc-dark--tertiary pdy-section-stacked pdy-section-reveal"
      data-section-theme="dark"
      aria-labelledby="testimonials-title"
    >
      <header className="pdy-testimonials-header">
        <p className="pdy-testimonials-eyebrow">{homeTestimonials.eyebrow}</p>
        <SectionHeadline
          before={homeTestimonials.headline.before}
          italic={homeTestimonials.headline.italic}
          after={homeTestimonials.headline.after}
          className="pdy-testimonials-title"
          id="testimonials-title"
        />
      </header>

      <ul className="pdy-testimonials-grid">
        {homeTestimonials.items.map((item, idx) => (
          <TestimonialCard
            key={item.author}
            quote={item.quote}
            author={item.author}
            role={item.role}
            index={idx}
          />
        ))}
      </ul>
    </section>
  );
}
