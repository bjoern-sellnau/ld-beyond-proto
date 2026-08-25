"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@/components/icons";

const headline = ["Kreativität", "trifft", "Code."];

// Deterministisch verteiltes Sternenfeld (kein Math.random -> keine Hydration-Mismatches).
const stars = Array.from({ length: 30 }, (_, i) => {
  const angle = i * 137.5; // Goldener Winkel für gleichmäßige Streuung
  const rad = (angle * Math.PI) / 180;
  const spread = 22 + (i % 6) * 6;
  const x = 50 + Math.cos(rad) * spread + ((i * 13) % 17) - 8;
  const y = 46 + Math.sin(rad) * (spread * 0.7) + ((i * 7) % 13) - 6;
  return {
    x: Math.max(3, Math.min(97, x)),
    y: Math.max(4, Math.min(94, y)),
    size: 2 + (i % 3),
    delay: (i % 9) * 0.4,
  };
});

/** Prüft, ob Animationen erlaubt sind – konsistent mit dem Motion-Toggle. */
function motionEnabled() {
  const mode = document.documentElement.dataset.motion;
  if (mode === "off") return false;
  if (mode === "on") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Kreativer Hero (Variante 3), erreichbar über ?e=3.
 * Bewegte Aurora, leuchtender Orb mit umkreisenden Partikeln, Sternenfeld,
 * ein der Maus folgender Spotlight und kinetische Typografie.
 */
export function HeroVariant3() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      if (!motionEnabled()) return;
      const rect = el!.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      el!.style.setProperty("--mx", `${mx}`);
      el!.style.setProperty("--my", `${my}`);
    }

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  let charIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden [--mx:50] [--my:40]"
    >
      {/* Hintergrund */}
      <div aria-hidden className="absolute inset-0">
        {/* Bewegte Aurora-Blobs */}
        <div className="animate-aurora absolute -left-[10%] top-[8%] size-[38rem] rounded-full bg-gradient-to-br from-violet-500/40 via-fuchsia-500/30 to-transparent blur-3xl" />
        <div className="animate-aurora absolute right-[-12%] top-[20%] size-[34rem] rounded-full bg-gradient-to-tr from-sky-500/30 via-cyan-400/25 to-transparent blur-3xl [animation-delay:-8s]" />
        <div className="animate-aurora absolute bottom-[-14%] left-[25%] size-[32rem] rounded-full bg-gradient-to-t from-amber-400/25 via-rose-500/25 to-transparent blur-3xl [animation-delay:-16s]" />

        {/* Punktraster */}
        <div className="bg-dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]" />

        {/* Sternenfeld */}
        {stars.map((s, i) => (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.5)]"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {/* Orbit-System mit leuchtendem Orb */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Ringe */}
          <div className="animate-orbit absolute left-1/2 top-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line sm:size-[30rem]">
            <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_2px] shadow-accent" />
          </div>
          <div className="animate-orbit-rev absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/60 sm:size-[42rem]">
            <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_12px_2px] shadow-accent-2" />
            <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_10px_2px_rgba(56,189,248,0.6)]" />
          </div>
          {/* Orb */}
          <div className="relative size-40 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-400 opacity-80 blur-[1px] dark:from-zinc-200 dark:to-zinc-500 sm:size-52">
            <span className="animate-pulse-ring absolute inset-0 rounded-full border border-accent/50" />
            <div className="absolute left-8 top-10 size-6 rounded-full bg-black/10" />
            <div className="absolute bottom-12 right-10 size-9 rounded-full bg-black/10" />
            <div className="absolute bottom-8 left-16 size-4 rounded-full bg-black/10" />
          </div>
        </div>

        {/* Der Maus folgender Spotlight */}
        <div
          className="absolute inset-0 opacity-70 transition-[background] duration-200"
          style={{
            background:
              "radial-gradient(30rem 30rem at calc(var(--mx) * 1%) calc(var(--my) * 1%), rgba(167,139,250,0.22), transparent 60%)",
          }}
        />
      </div>

      {/* Inhalt */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur">
          <SparklesIcon className="size-4" />
          Experiment · Variante 3 · Kinetic
        </p>

        {/* Kinetische Headline – Buchstabe für Buchstabe (aria-label für Screenreader) */}
        <h1
          aria-label={headline.join(" ")}
          className="text-5xl font-black leading-[1.05] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.25)] sm:text-7xl md:text-8xl"
        >
          {headline.map((word, w) => (
            <span key={w} aria-hidden className="mx-[0.18em] inline-block">
              {word.split("").map((char, c) => {
                const delay = charIndex++ * 0.045;
                const isCode = w === 2;
                return (
                  <span
                    key={c}
                    className={`animate-letter inline-block ${
                      isCode ? "text-gradient animate-shimmer" : ""
                    }`}
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="animate-rise mt-6 max-w-xl text-lg text-muted [animation-delay:0.7s] sm:text-xl">
          <strong className="text-foreground">Bjoern Sellnau</strong> — wo Interface-Ideen und
          sauberes Engineering aufeinandertreffen. Beweg die Maus.
        </p>

        <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:0.85s]">
          <Link
            href="/projekte"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
          >
            Projekte ansehen <ArrowRightIcon className="size-4" />
          </Link>
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
          >
            Ab ins Labor
          </Link>
        </div>

        {/* Schwebende Tech-Pillen */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {["React", "Next.js", "GraphQL", "Node.js", "TypeScript"].map((tag, i) => (
            <li
              key={tag}
              className="animate-drift rounded-full border border-line bg-surface/50 px-4 py-1.5 font-mono text-sm text-muted backdrop-blur"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
