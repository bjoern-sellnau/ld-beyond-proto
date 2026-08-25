"use client";

import { useSearchParams } from "next/navigation";
import { HeroDefault } from "./hero-default";
import { HeroVariant2 } from "./hero-variant-2";

/**
 * Wählt die Hero-Variante anhand des Query-Parameters ?e.
 * ?e=2 → alternativer Hero, sonst der Standard-Hero.
 *
 * Der Parameter wird clientseitig ausgewertet, damit die Seite
 * weiterhin statisch exportiert werden kann (GitHub Pages).
 * Muss in eine <Suspense>-Grenze gewrappt sein (useSearchParams).
 */
export function Hero() {
  const experiment = useSearchParams().get("e");

  if (experiment === "2") return <HeroVariant2 />;
  return <HeroDefault />;
}
