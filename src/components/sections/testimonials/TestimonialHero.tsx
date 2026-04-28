"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export interface TestimonialHeroData {
  id: string;
  authorInitials?: string;
  authorPhotoSrc?: string | null;
  authorName: string;
  authorRole: string;
  authorCompany?: string;
  rating?: number;
  isVerified?: boolean;
  kpiValue?: string | null;
  kpiLabel?: string | null;
  quote: string;
  quoteHighlight?: string | null;
}

interface Props {
  testimonial: TestimonialHeroData;
  inView?: boolean;
}

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

function renderQuoteWithHighlight(quote: string, highlight: string | null | undefined) {
  if (!highlight || !quote.includes(highlight)) {
    return quote;
  }
  const parts = quote.split(highlight);
  return (
    <>
      {parts[0]}
      <span className="pdy-testimonial-hero-quote-italic">{highlight}</span>
      {parts.slice(1).join(highlight)}
    </>
  );
}

export function TestimonialHero({ testimonial, inView = true }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const rating = testimonial.rating ?? 5;
  const isVerified = testimonial.isVerified ?? true;
  const initials = testimonial.authorInitials ?? deriveInitials(testimonial.authorName);

  const containerVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 40, filter: "blur(16px)", scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.article
      className="pdy-testimonial-hero"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <span className="pdy-testimonial-hero-quote-mark" aria-hidden="true">
        &ldquo;
      </span>
      <div className="pdy-testimonial-hero-left">
        {testimonial.authorPhotoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.authorPhotoSrc}
            alt={testimonial.authorName}
            className="pdy-testimonial-hero-avatar"
            width={64}
            height={64}
          />
        ) : (
          <div className="pdy-testimonial-hero-avatar pdy-testimonial-hero-avatar-fallback">
            {initials}
          </div>
        )}
        <div className="pdy-testimonial-hero-identity">
          <p className="pdy-testimonial-hero-name">{testimonial.authorName}</p>
          <p className="pdy-testimonial-hero-role">
            {testimonial.authorRole}
            {testimonial.authorCompany ? (
              <>
                <br />
                {testimonial.authorCompany}
              </>
            ) : null}
          </p>
        </div>
        <div
          className="pdy-testimonial-hero-stars"
          aria-label={`${rating} étoiles sur 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="pdy-testimonial-hero-star"
              aria-hidden="true"
              data-filled={i < rating ? "true" : "false"}
            >
              ★
            </span>
          ))}
        </div>
        {isVerified ? (
          <span className="pdy-testimonial-hero-verified">
            <span className="pdy-testimonial-hero-verified-dot" aria-hidden="true" />
            Avis vérifié
          </span>
        ) : null}
        {testimonial.kpiValue && testimonial.kpiLabel ? (
          <div className="pdy-testimonial-hero-kpi">
            <div className="pdy-testimonial-hero-kpi-value">{testimonial.kpiValue}</div>
            <div className="pdy-testimonial-hero-kpi-label">{testimonial.kpiLabel}</div>
          </div>
        ) : null}
      </div>
      <div className="pdy-testimonial-hero-right">
        <blockquote className="pdy-testimonial-hero-quote">
          {renderQuoteWithHighlight(testimonial.quote, testimonial.quoteHighlight)}
        </blockquote>
      </div>
    </motion.article>
  );
}
