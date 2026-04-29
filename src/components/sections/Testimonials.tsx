"use client";

import { SectionHeadline } from "@/components/ui/SectionHeadline";
import { homeTestimonials } from "@/content/home-fallback";
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
  const items = data.items ?? homeTestimonials.items;
  const all = items.slice(0, 6).map((item, i) => toMiniData(item, i));

  if (all.length === 0) return null;

  return (
    <section
      className="pdy-testimonials pdy-testimonials--flat pdy-bloc-dark pdy-bloc-dark--tertiary"
      data-section-theme="dark"
      aria-labelledby="testimonials-title"
    >
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

      <div className="pdy-testimonials-inner">
        <div className="pdy-testimonials-grid">
          {all.map((t, idx) => (
            <TestimonialMini
              key={t.id}
              testimonial={t}
              inView
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
