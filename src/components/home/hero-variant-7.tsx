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

// Welt-/Kamera-Parameter (identisch zu Variante 6)
const STREAMS = 90;
const MAX_LEN = 15;
const SPREAD_X = 5.2;
const SPREAD_Z = 4.2;
const CAM_DIST = 12;
const FOCAL = 1400;
const CELL = 0.55;
const BASE = 0.19;
const WORLD_TOP = -6.5;
const WORLD_BOT = 7;
const MAX_YAW = 0.62;

// Text-Parallax
const TEXT_SHIFT_X = 60; // px bei voller Mausauslenkung
const TEXT_SHIFT_Y = 38;
const TEXT_TILT = 9; // Grad

type Stream = {
  x: number;
  z: number;
  headY: number;
  speed: number;
  len: number;
  chars: string[];
};

function randGlyph() {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0];
}

/**
 * Abstrakter Hero (Variante 7), erreichbar über ?e=7.
 * Wie Variante 6 (Matrix in echtem 3D, Kamera schwenkt mit der Maus),
 * zusätzlich folgt der Text-Block dem Mauszeiger (Parallax + leichter Tilt).
 */
export function HeroVariant7() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!canvas || !content) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const streams: Stream[] = Array.from({ length: STREAMS }, () => {
      const len = 7 + ((Math.random() * (MAX_LEN - 7)) | 0);
      return {
        x: (Math.random() * 2 - 1) * SPREAD_X,
        z: (Math.random() * 2 - 1) * SPREAD_Z,
        headY: WORLD_TOP + Math.random() * (WORLD_BOT - WORLD_TOP),
        speed: 0.03 + Math.random() * 0.05,
        len,
        chars: Array.from({ length: len }, randGlyph),
      };
    });

    let width = 0;
    let height = 0;
    let raf = 0;

    let yaw = 0;
    let targetYaw = 0;
    let idle = 0;
    let pointerActive = false;

    // Text-Parallax-Zustand
    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    let targetTX = 0;
    let targetTY = 0;
    let targetRX = 0;
    let targetRY = 0;

    const isDark = () => document.documentElement.classList.contains("dark");
    function palette() {
      return isDark()
        ? { head: "233, 213, 255", body: "167, 139, 250", accent: "103, 232, 249" }
        : { head: "109, 40, 217", body: "124, 58, 237", accent: "8, 145, 178" };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const order = streams.map((_, i) => i);

    function render() {
      const p = palette();
      const cx = width / 2;
      const cy = height / 2;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      ctx!.clearRect(0, 0, width, height);
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      for (const s of streams) {
        (s as Stream & { _z?: number })._z = s.x * sinY + s.z * cosY;
      }
      order.sort(
        (a, b) =>
          ((streams[b] as Stream & { _z: number })._z) -
          ((streams[a] as Stream & { _z: number })._z),
      );

      const scaleNear = FOCAL / (CAM_DIST - SPREAD_Z);
      const scaleFar = FOCAL / (CAM_DIST + SPREAD_Z);

      for (const idx of order) {
        const s = streams[idx];
        const xr = s.x * cosY - s.z * sinY;
        const zr = s.x * sinY + s.z * cosY;
        const pz = zr + CAM_DIST;
        if (pz < 1) continue;
        const scale = FOCAL / pz;
        const sx = cx + xr * scale;
        const fog = (scale - scaleFar) / (scaleNear - scaleFar);
        const fontPx = BASE * scale;
        if (fontPx < 4) continue;
        ctx!.font = `${fontPx}px ui-monospace, monospace`;

        for (let k = 0; k < s.len; k++) {
          const wy = s.headY - k * CELL;
          const sy = cy + wy * scale;
          if (sy < -30 || sy > height + 30) continue;
          const tail = 1 - k / s.len;
          const alpha = Math.min(1, (0.2 + fog * 0.8) * (0.15 + tail * 0.95));
          if (k === 0) {
            ctx!.fillStyle = `rgba(${Math.random() > 0.9 ? p.accent : p.head}, ${alpha})`;
          } else {
            ctx!.fillStyle = `rgba(${p.body}, ${alpha})`;
          }
          ctx!.fillText(s.chars[k], sx, sy);
        }
      }
    }

    function applyTextTransform() {
      content!.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(
        2,
      )}px, 0) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    }

    function update() {
      idle += 0.004;
      const goal = pointerActive ? targetYaw : Math.sin(idle) * 0.18;
      yaw += (goal - yaw) * 0.05;

      // Text folgt dem Mauszeiger (sanft nachziehen)
      tx += (targetTX - tx) * 0.08;
      ty += (targetTY - ty) * 0.08;
      rx += (targetRX - rx) * 0.08;
      ry += (targetRY - ry) * 0.08;
      applyTextTransform();

      for (const s of streams) {
        s.headY += s.speed;
        if (s.headY - s.len * CELL > WORLD_BOT) {
          s.headY = WORLD_TOP - Math.random() * 5;
          s.x = (Math.random() * 2 - 1) * SPREAD_X;
          s.z = (Math.random() * 2 - 1) * SPREAD_Z;
        }
        if (Math.random() > 0.85) s.chars[0] = randGlyph();
      }
    }

    function loop() {
      update();
      render();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (motionEnabled()) {
        raf = requestAnimationFrame(loop);
      } else {
        yaw = 0;
        tx = ty = rx = ry = 0;
        applyTextTransform();
        render();
      }
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetYaw = nx * 2 * MAX_YAW;
      targetTX = nx * 2 * TEXT_SHIFT_X;
      targetTY = ny * 2 * TEXT_SHIFT_Y;
      targetRY = nx * 2 * TEXT_TILT;
      targetRX = -ny * 2 * TEXT_TILT;
      pointerActive = true;
    }
    function onLeave() {
      pointerActive = false;
      targetTX = targetTY = targetRX = targetRY = 0;
    }
    function onResize() {
      resize();
      if (!motionEnabled()) render();
    }

    resize();
    start();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("ld-settings", start);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("ld-settings", start);
    };
  }, []);

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* 3D-Canvas */}
      <canvas
        ref={canvasRef}
        aria-label="Fallender Code in 3D – Maus bewegen; Raum und Text folgen"
        className="absolute inset-0 size-full touch-none"
      />

      {/* Scrim für Textlesbarkeit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45rem 32rem at 50% 50%, var(--background) 0%, transparent 70%)",
          opacity: 0.82,
        }}
      />

      {/* Perspektiv-Bühne, damit der Text-Tilt räumlich wirkt */}
      <div
        className="pointer-events-none relative z-10 flex w-full justify-center px-4 sm:px-6"
        style={{ perspective: "900px" }}
      >
        {/* Text-Block folgt dem Mauszeiger (JS setzt transform) */}
        <div
          ref={contentRef}
          className="mx-auto flex max-w-3xl flex-col items-center text-center [transform-style:preserve-3d] will-change-transform"
        >
          <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur">
            <SparklesIcon className="size-4" />
            Experiment · Variante 7 · Matrix 3D + Text
          </p>

          <h1 className="animate-rise text-5xl font-black leading-[1.03] tracking-tight [text-shadow:0_2px_40px_var(--background)] [animation-delay:0.1s] sm:text-7xl md:text-8xl">
            Alles
            <br />
            <span className="text-gradient animate-shimmer">bewegt sich.</span>
          </h1>

          <p className="animate-rise mt-6 max-w-xl text-lg text-muted [animation-delay:0.2s] sm:text-xl">
            <strong className="text-foreground">Bjoern Sellnau</strong> — Raum und Text folgen
            deiner Bewegung.
          </p>

          <p className="animate-rise mt-2 text-sm text-muted [animation-delay:0.3s]">
            ✦ Beweg die Maus – die Kamera schwenkt, der Text zieht mit.
          </p>

          <div className="animate-rise pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:0.4s]">
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
      </div>
    </section>
  );
}
