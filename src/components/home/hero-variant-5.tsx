"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@/components/icons";

/** Konsistent mit dem Motion-Toggle (data-motion / prefers-reduced-motion). */
function motionEnabled() {
  const mode = document.documentElement.dataset.motion;
  if (mode === "off") return false;
  if (mode === "on") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const NODE_COUNT = 130;
const LINK_DIST = 0.62; // Verbindungsschwelle auf der Einheitskugel

type Vec3 = { x: number; y: number; z: number };

/** Punkte gleichmäßig auf einer Kugel verteilen (Fibonacci-Spirale). */
function fibonacciSphere(n: number): Vec3[] {
  const pts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
  }
  return pts;
}

/**
 * Interaktiver Hero (Variante 5), erreichbar über ?e=5.
 * Eine echte 3D-Netzwerk-Sphäre auf Canvas mit perspektivischer Projektion:
 * ziehen zum Drehen (mit Momentum), Hover erzeugt Parallax-Tilt,
 * Knoten in Cursor-Nähe leuchten auf.
 */
export function HeroVariant5() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes = fibonacciSphere(NODE_COUNT);

    // Statische Konnektivität einmalig bestimmen.
    const links: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        if (Math.hypot(dx, dy, dz) < LINK_DIST) links.push([i, j]);
      }
    }

    let width = 0;
    let height = 0;
    let radius = 0;
    let raf = 0;

    // Rotationszustand
    let spin = 0; // fortlaufende Y-Drehung
    let spinVel = 0.003; // Auto-Rotation
    let dragRotX = 0.25;
    let tiltX = 0;
    let tiltY = 0;
    let pointerNX = 0; // -0.5..0.5 relativ zur Mitte
    let pointerNY = 0;
    let pointerActive = false;
    let px = -9999;
    let py = -9999;

    // Drag
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const isDark = () => document.documentElement.classList.contains("dark");
    function palette() {
      return isDark()
        ? { node: "233, 213, 255", link: "167, 139, 250", hot: "103, 232, 249" }
        : { node: "109, 40, 217", link: "124, 58, 237", hot: "8, 145, 178" };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      radius = Math.min(width, height) * 0.42;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function render() {
      const p = palette();
      const cx = width / 2;
      const cy = height / 2;
      const rotY = spin + tiltY;
      const rotX = dragRotX + tiltX;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const fov = 3;

      // Projektion aller Knoten
      const proj = nodes.map((n) => {
        const x1 = n.x * cosY + n.z * sinY;
        const z1 = -n.x * sinY + n.z * cosY;
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        return {
          sx: cx + x1 * scale * radius,
          sy: cy + y2 * scale * radius,
          depth: scale, // größer = näher
        };
      });

      ctx!.clearRect(0, 0, width, height);

      // Kanten
      const dmin = fov / (fov + 1);
      const dmax = fov / (fov - 1);
      for (const [a, b] of links) {
        const pa = proj[a];
        const pb = proj[b];
        const d = (pa.depth + pb.depth) / 2;
        const t = (d - dmin) / (dmax - dmin);
        ctx!.strokeStyle = `rgba(${p.link}, ${0.06 + t * 0.28})`;
        ctx!.lineWidth = 0.6 + t * 0.8;
        ctx!.beginPath();
        ctx!.moveTo(pa.sx, pa.sy);
        ctx!.lineTo(pb.sx, pb.sy);
        ctx!.stroke();
      }

      // Knoten
      for (const pr of proj) {
        const t = (pr.depth - dmin) / (dmax - dmin);
        const near = pointerActive && Math.hypot(pr.sx - px, pr.sy - py) < 60;
        const r = (1 + t * 2.4) * (near ? 2.1 : 1);
        ctx!.beginPath();
        ctx!.arc(pr.sx, pr.sy, r, 0, Math.PI * 2);
        ctx!.fillStyle = near
          ? `rgba(${p.hot}, 1)`
          : `rgba(${p.node}, ${0.25 + t * 0.7})`;
        if (near) {
          ctx!.shadowColor = `rgba(${p.hot}, 0.9)`;
          ctx!.shadowBlur = 12;
        }
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    function frame() {
      if (!dragging) {
        spin += spinVel;
        spinVel += (0.003 - spinVel) * 0.03; // zurück zur Auto-Rotation
      }
      // Hover-Parallax sanft nachziehen
      const targetTiltX = pointerActive ? pointerNY * 0.5 : 0;
      const targetTiltY = pointerActive ? pointerNX * 0.5 : 0;
      tiltX += (targetTiltX - tiltX) * 0.06;
      tiltY += (targetTiltY - tiltY) * 0.06;
      render();
      raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (motionEnabled()) {
        raf = requestAnimationFrame(frame);
      } else {
        render(); // Standbild
      }
    }

    function updatePointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      pointerNX = px / width - 0.5;
      pointerNY = py / height - 0.5;
      pointerActive = true;
    }

    function onMove(e: PointerEvent) {
      updatePointer(e);
      if (dragging && motionEnabled()) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        spin += dx * 0.006;
        dragRotX += dy * 0.006;
        dragRotX = Math.max(-1.3, Math.min(1.3, dragRotX));
        spinVel = dx * 0.006; // Momentum für den Release
      }
    }

    function onDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas!.setPointerCapture(e.pointerId);
      canvas!.style.cursor = "grabbing";
    }

    function onUp(e: PointerEvent) {
      dragging = false;
      canvas!.style.cursor = "grab";
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {}
    }

    function onLeave() {
      pointerActive = false;
      px = -9999;
      py = -9999;
    }

    function onResize() {
      resize();
      if (!motionEnabled()) render();
    }

    resize();
    canvas.style.cursor = "grab";
    start();

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("ld-settings", start);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("ld-settings", start);
    };
  }, []);

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Ambient-Glow */}
      <div aria-hidden className="absolute inset-0">
        <div className="animate-float-slow absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/20 via-accent-2/10 to-transparent blur-3xl" />
      </div>

      {/* Interaktive 3D-Sphäre */}
      <canvas
        ref={canvasRef}
        aria-label="Interaktive 3D-Netzwerk-Sphäre – zum Drehen ziehen"
        className="absolute inset-0 size-full touch-none"
      />

      {/* Scrim für Textlesbarkeit */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(26rem 20rem at 50% 48%, var(--background) 0%, color-mix(in oklab, var(--background) 55%, transparent) 45%, transparent 72%)",
        }}
      />

      {/* Inhalt – pointer-events-none, damit die Sphäre überall greifbar bleibt */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur">
          <SparklesIcon className="size-4" />
          Experiment · Variante 5 · 3D
        </p>

        <h1 className="animate-rise text-5xl font-black leading-[1.03] tracking-tight [text-shadow:0_2px_40px_var(--background)] [animation-delay:0.1s] sm:text-7xl md:text-8xl">
          Alles ist
          <br />
          <span className="text-gradient animate-shimmer">vernetzt.</span>
        </h1>

        <p className="animate-rise mt-6 max-w-lg text-lg text-muted [animation-delay:0.2s] sm:text-xl">
          <strong className="text-foreground">Bjoern Sellnau</strong> — Systeme, die zusammenhängen.
        </p>

        <p className="animate-rise mt-2 text-sm text-muted [animation-delay:0.3s]">
          ✦ Zieh an der Sphäre, um sie zu drehen.
        </p>

        {/* Buttons wieder klickbar */}
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
    </section>
  );
}
