"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export interface TestimonialMiniData {
  id: string;
  rating?: number;
  isVerified?: boolean;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany?: string;
}

interface Props {
  testimonial: TestimonialMiniData;
  inView?: boolean;
  index?: number;
}

export function TestimonialMini({ testimonial, inView = true, index = 0 }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const rating = testimonial.rating ?? 5;

  const variants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          transition: {
            duration: 0.8,
            delay: 0.4 + index * 0.15,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

  return (
    <motion.article
      className="pdy-testimonial-mini"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      <div
        className="pdy-testimonial-mini-stars"
        aria-label={`${rating} étoiles sur 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="pdy-testimonial-mini-star"
            aria-hidden="true"
            data-filled={i < rating ? "true" : "false"}
          >
            ★
          </span>
        ))}
      </div>
      <blockquote className="pdy-testimonial-mini-quote">{testimonial.quote}</blockquote>
      <div className="pdy-testimonial-mini-divider">
        <p className="pdy-testimonial-mini-name">{testimonial.authorName}</p>
        <p className="pdy-testimonial-mini-role">
          {testimonial.authorRole}
          {testimonial.authorCompany ? `, ${testimonial.authorCompany}` : ""}
        </p>
      </div>
    </motion.article>
  );
}
