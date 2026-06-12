"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Work } from "@/lib/data/types";
import { WorkCard } from "@/components/work-card";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

type WorkExplorerProps = {
  works: Work[];
  basePath: "/projekte" | "/labs";
  sliderLabel: string;
};

/**
 * Hero-Slider mit Featured-Einträgen, darunter Filter-Chips
 * und das Grid – gemeinsame Basis für /projekte und /labs.
 */
export function WorkExplorer({ works, basePath, sliderLabel }: WorkExplorerProps) {
  const featured = works.filter((w) => w.featured);
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState<string>("Alle");

  const categories = useMemo(
    () => ["Alle", ...new Set(works.map((w) => w.category))],
    [works],
  );

  const filtered = useMemo(
    () => (filter === "Alle" ? works : works.filter((w) => w.category === filter)),
    [works, filter],
  );

  const current = featured[slide];

  return (
    <div className="space-y-14">
      {/* Hero-Slider */}
      {current && (
        <section aria-label={sliderLabel} className="relative">
          <div
            className={`relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br p-8 transition-all duration-700 sm:p-12 md:p-16 ${current.gradient}`}
          >
            <div className="bg-dot-grid absolute inset-0 opacity-25" />
            <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/15 blur-3xl" />

            <div className="relative max-w-2xl text-white">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                {sliderLabel} · {slide + 1}/{featured.length}
              </p>
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">{current.title}</h2>
              <p className="mt-3 max-w-xl text-base text-white/85 sm:text-lg">
                {current.excerpt}
              </p>
              <Link
                href={`${basePath}/${current.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-transform hover:scale-105"
              >
                Ansehen <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          {/* Slider-Steuerung */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setSlide((s) => (s - 1 + featured.length) % featured.length)}
              className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-foreground"
              aria-label="Vorheriger Slide"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
              {featured.map((w, i) => (
                <button
                  key={w.slug}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}: ${w.title}`}
                  aria-current={i === slide}
                  className={`h-2 rounded-full transition-all ${
                    i === slide ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSlide((s) => (s + 1) % featured.length)}
              className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-foreground"
              aria-label="Nächster Slide"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </section>
      )}

      {/* Filter */}
      <section aria-label="Filter und Übersicht" className="space-y-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-gradient-to-r from-accent to-accent-2 text-white shadow-md shadow-accent/25"
                  : "border border-line text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-sm text-muted">
            {filtered.length} {filtered.length === 1 ? "Eintrag" : "Einträge"}
          </span>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((work) => (
            <WorkCard
              key={work.slug}
              work={work}
              basePath={basePath}
              transitionName={`work-${work.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
