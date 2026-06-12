"use client";

import { useEffect, useState } from "react";

export type SectionLink = { id: string; label: string };

/**
 * Bereichsnavigation der About-Seite mit Scroll-Spy.
 * Liegt in einer eigenen Grid-Spalte und überlagert den Content daher nie.
 */
export function SectionNav({ sections }: { sections: SectionLink[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Aktiv ist die Section, die das obere Drittel des Viewports schneidet
      { rootMargin: "-20% 0px -65% 0px" },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Bereiche dieser Seite" className="space-y-1">
      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
        Auf dieser Seite
      </p>
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "true" : undefined}
            className={`flex items-center gap-2.5 rounded-full px-3 py-1.5 text-sm transition-all ${
              isActive
                ? "bg-gradient-to-r from-accent/15 to-accent-2/15 font-semibold text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            <span
              aria-hidden
              className={`h-1.5 rounded-full transition-all ${
                isActive ? "w-4 bg-accent" : "w-1.5 bg-line"
              }`}
            />
            {section.label}
          </a>
        );
      })}
    </nav>
  );
}
