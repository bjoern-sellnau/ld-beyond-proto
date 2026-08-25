"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@/components/icons";

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌ0123456789<>[]{}/\\=+*#$%&λΣΔ".split("");

/** Konsistent mit dem Motion-Toggle (data-motion / prefers-reduced-motion). */
function motionEnabled() {
  const mode = document.documentElement.dataset.motion;
  if (mode === "off") return false;
  if (mode === "on") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Column = {
  x: number;
  y: number;
  depth: number; // 0.35 (fern) .. 1 (nah) -> Pseudo-3D
  speed: number;
  size: number;
};

/**
 * Abstrakter Hero (Variante 4), erreichbar über ?e=4.
 * Eine Canvas-Animation aus fallendem "Matrix"-Code mit Tiefen-Parallax:
 * nähere Spalten sind größer, heller und schneller. Kein Mond.
 */
export function HeroVariant4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let columns: Column[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isDark = () => document.documentElement.classList.contains("dark");

    function fadeColor() {
      // Halbtransparenter Hintergrund erzeugt die nachziehenden Spuren.
      return isDark() ? "rgba(9, 9, 13, 0.10)" : "rgba(250, 250, 250, 0.13)";
    }

    function palette() {
      return isDark()
        ? { head: "#e9d5ff", body: "#a78bfa", accent: "#67e8f9" }
        : { head: "#6d28d9", body: "#7c3aed", accent: "#0891b2" };
    }

    function build() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colWidth = 18;
      const count = Math.ceil(width / colWidth);
      columns = Array.from({ length: count }, (_, i) => {
        const depth = 0.35 + Math.random() * 0.65;
        return {
          x: i * colWidth + colWidth / 2,
          y: Math.random() * height,
          depth,
          speed: 0.6 + depth * 2.6,
          size: 10 + depth * 12,
        };
      });
    }

    function glyph() {
      return GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }

    function step() {
      const p = palette();
      ctx!.fillStyle = fadeColor();
      ctx!.fillRect(0, 0, width, height);
      ctx!.textAlign = "center";

      for (const col of columns) {
        ctx!.font = `${col.size}px ui-monospace, monospace`;
        // Kopf hell, gelegentlich Akzentfarbe
        ctx!.fillStyle = Math.random() > 0.96 ? p.accent : p.head;
        ctx!.globalAlpha = 0.25 + col.depth * 0.75;
        ctx!.fillText(glyph(), col.x, col.y);

        // Ein Zeichen dahinter in gedämpfter Körperfarbe
        ctx!.fillStyle = p.body;
        ctx!.globalAlpha = (0.25 + col.depth * 0.75) * 0.5;
        ctx!.fillText(glyph(), col.x, col.y - col.size);

        col.y += col.speed;
        if (col.y > height + col.size) {
          col.y = -col.size * (2 + Math.random() * 8);
          col.depth = 0.35 + Math.random() * 0.65;
          col.speed = 0.6 + col.depth * 2.6;
          col.size = 10 + col.depth * 12;
        }
      }
      ctx!.globalAlpha = 1;
    }

    function staticFrame() {
      // Ruhiges Standbild bei deaktivierten Animationen.
      const p = palette();
      ctx!.clearRect(0, 0, width, height);
      ctx!.textAlign = "center";
      ctx!.globalAlpha = 0.5;
      for (const col of columns) {
        ctx!.font = `${col.size}px ui-monospace, monospace`;
        ctx!.fillStyle = p.body;
        ctx!.fillText(glyph(), col.x, col.y);
      }
      ctx!.globalAlpha = 1;
    }

    function loop() {
      step();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (motionEnabled()) {
        loop();
      } else {
        staticFrame();
      }
    }

    function onResize() {
      build();
      start();
    }

    build();
    start();

    window.addEventListener("resize", onResize);
    // Auf Theme-/Motion-Änderungen reagieren (Toggles feuern dieses Event).
    window.addEventListener("ld-settings", start);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("ld-settings", start);
    };
  }, []);

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Canvas-Ebene */}
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />

      {/* Vignette + Scrim für Lesbarkeit des Textes */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45rem 32rem at 50% 50%, var(--background) 0%, transparent 70%)",
          opacity: 0.82,
        }}
      />
      <div className="bg-dot-grid absolute inset-0 opacity-20" aria-hidden />

      {/* Inhalt */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur">
          <SparklesIcon className="size-4" />
          Experiment · Variante 4 · Matrix
        </p>

        <h1 className="animate-rise text-5xl font-black leading-[1.03] tracking-tight [text-shadow:0_2px_40px_var(--background)] [animation-delay:0.1s] sm:text-7xl md:text-8xl">
          Alles ist
          <br />
          <span className="text-gradient animate-shimmer">Code.</span>
        </h1>

        <p className="animate-rise mt-6 max-w-xl text-lg text-muted [animation-delay:0.2s] sm:text-xl">
          <strong className="text-foreground">Bjoern Sellnau</strong> — Systeme aus Signal und
          Struktur. Was hier fällt, ist reines JavaScript.
        </p>

        <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:0.35s]">
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
      </div>
    </section>
  );
}
