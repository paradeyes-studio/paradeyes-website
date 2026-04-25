"use client";

import { useReducedMotion } from "framer-motion";

interface ClientsMarqueeProps {
  clients: ReadonlyArray<string>;
  label?: string;
}

export function ClientsMarquee({ clients, label = "Sélection de clients" }: ClientsMarqueeProps) {
  const reduced = useReducedMotion();

  const duplicated = [...clients, ...clients];

  return (
    <div className="pdy-clients-marquee" data-reduced={reduced ? "true" : "false"}>
      <p className="pdy-clients-marquee-label">{label}</p>
      <div className="pdy-clients-marquee-track">
        <div className="pdy-clients-marquee-row">
          {duplicated.map((name, idx) => (
            <span key={`${name}-${idx}`} className="pdy-clients-marquee-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
