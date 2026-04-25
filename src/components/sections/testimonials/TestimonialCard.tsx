"use client";

import { motion } from "framer-motion";
import { StarRating } from "@/components/ui/StarRating";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useTilt } from "@/hooks/useTilt";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  index: number;
}

export function TestimonialCard({ quote, author, role, index }: TestimonialCardProps) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 5, perspective: 1100 });

  return (
    <motion.li
      style={{ listStyle: "none" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div ref={tiltRef} className="pdy-testimonial-card" style={{ transformStyle: "preserve-3d" }}>
        <div className="pdy-testimonial-card-top">
          <StarRating rating={5} label="5 sur 5 étoiles" />
          <VerifiedBadge />
        </div>
        <blockquote className="pdy-testimonial-card-quote">{quote}</blockquote>
        <footer className="pdy-testimonial-card-author">
          <div className="pdy-testimonial-card-name">{author}</div>
          <div className="pdy-testimonial-card-role">{role}</div>
        </footer>
      </div>
    </motion.li>
  );
}
