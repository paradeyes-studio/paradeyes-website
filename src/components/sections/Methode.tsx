"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { homeMethode } from "@/content/home-fallback";
import { SectionHeadline } from "@/components/ui/SectionHeadline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Methode() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track || !progress) return;

    if (reduced) {
      track.style.transform = "translateX(0)";
      return;
    }

    const ctx = gsap.context(() => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(0, trackWidth - viewportWidth);

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.2}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="pdy-methode pdy-bloc-dark pdy-bloc-dark--secondary pdy-section-stacked"
      data-section-theme="dark"
      aria-labelledby="methode-title"
    >
      <header className="pdy-methode-header">
        <p className="pdy-methode-eyebrow">{homeMethode.eyebrow}</p>
        <SectionHeadline
          before={homeMethode.headline.before}
          italic={homeMethode.headline.italic}
          after={homeMethode.headline.after}
          className="pdy-methode-title"
          id="methode-title"
        />
        <p className="pdy-methode-sub">{homeMethode.sub}</p>
      </header>

      <div className="pdy-methode-track-wrapper">
        <div ref={trackRef} className="pdy-methode-track">
          {homeMethode.steps.map((step) => (
            <article key={step.number} className="pdy-methode-panel">
              <div className="pdy-methode-panel-num" aria-hidden="true">
                {step.number}
              </div>
              <div className="pdy-methode-panel-content">
                <span className="pdy-methode-panel-tag">
                  <span className="pdy-methode-panel-tag-dot" aria-hidden="true" />
                  {step.tag}
                </span>
                <h3 className="pdy-methode-panel-title">
                  {step.headline.before}
                  <em className="pdy-italic-accent">{step.headline.italic}</em>
                  {step.headline.after}
                </h3>
                <p className="pdy-methode-panel-description">{step.description}</p>
                <ul className="pdy-methode-panel-livrables">
                  {step.livrables.map((liv) => (
                    <li key={liv.label}>
                      <span>{liv.label}</span>
                      <span className="pdy-methode-panel-livrable-duration">
                        {liv.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="pdy-methode-progress-wrapper" aria-hidden="true">
        <div ref={progressRef} className="pdy-methode-progress" />
      </div>
    </section>
  );
}
