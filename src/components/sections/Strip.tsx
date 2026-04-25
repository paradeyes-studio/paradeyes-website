"use client";

import { Fragment } from "react";
import { homeStrip } from "@/content/home-fallback";

export function Strip() {
  // Duplicate the items twice so the marquee loops without a visible seam.
  const sequence = [...homeStrip.items, ...homeStrip.items];

  return (
    <section className="pdy-strip" data-section-theme="light" aria-hidden="true">
      <div className="pdy-strip-track">
        {sequence.map((item, idx) => (
          <Fragment key={`${item}-${idx}`}>
            <span className="pdy-strip-item">{item}</span>
            <span className="pdy-strip-sep">·</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
