"use client";

import { useSearchParams } from "next/navigation";
import { HeroDefault } from "./hero-default";
import { HeroVariant2 } from "./hero-variant-2";
import { HeroVariant3 } from "./hero-variant-3";
import { HeroVariant4 } from "./hero-variant-4";
import { HeroVariant5 } from "./hero-variant-5";
import { HeroVariant6 } from "./hero-variant-6";
import { HeroVariant7 } from "./hero-variant-7";

/**
 * Wählt die Hero-Variante anhand des Query-Parameters ?e.
 * ?e=2 → alternativer Hero, ?e=3 → kreativer Kinetic-Hero,
 * ?e=4 → abstrakte Matrix-Canvas-Animation,
 * ?e=5 → interaktive 3D-Netzwerk-Sphäre,
 * ?e=6 → Matrix in echtem 3D (Kamera schwenkt mit der Maus),
 * ?e=7 → wie 6, zusätzlich folgt der Text dem Mauszeiger,
 * sonst der Standard-Hero.
 *
 * Der Parameter wird clientseitig ausgewertet, damit die Seite
 * weiterhin statisch exportiert werden kann (GitHub Pages).
 * Muss in eine <Suspense>-Grenze gewrappt sein (useSearchParams).
 */
export function Hero() {
  const experiment = useSearchParams().get("e");

  if (experiment === "2") return <HeroVariant2 />;
  if (experiment === "3") return <HeroVariant3 />;
  if (experiment === "4") return <HeroVariant4 />;
  if (experiment === "5") return <HeroVariant5 />;
  if (experiment === "6") return <HeroVariant6 />;
  if (experiment === "7") return <HeroVariant7 />;
  return <HeroDefault />;
}
