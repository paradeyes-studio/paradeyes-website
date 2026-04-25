"use client";

import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/StarRating";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { homeTestimonials } from "@/content/home-fallback";
import { useSectionReveal } from "@/hooks/useSectionReveal";

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
        <h2 id="testimonials-title" className="pdy-testimonials-title">
          {homeTestimonials.headline.before}
          <em className="pdy-italic-accent">{homeTestimonials.headline.italic}</em>
          {homeTestimonials.headline.after}
        </h2>
      </header>

      <ul className="pdy-testimonials-grid">
        {homeTestimonials.items.map((item, idx) => (
          <motion.li
            key={item.author}
            className="pdy-testimonial-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pdy-testimonial-card-top">
              <StarRating rating={5} label="5 sur 5 étoiles" />
              <VerifiedBadge />
            </div>
            <blockquote className="pdy-testimonial-card-quote">
              {item.quote}
            </blockquote>
            <footer className="pdy-testimonial-card-author">
              <div className="pdy-testimonial-card-name">{item.author}</div>
              <div className="pdy-testimonial-card-role">{item.role}</div>
            </footer>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
