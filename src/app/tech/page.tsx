import type { Metadata } from "next";
import { posts } from "@/lib/data/posts";
import { TechMagazine } from "@/components/tech-magazine";

export const metadata: Metadata = {
  title: ".Tech",
  description:
    "Der .Tech-Blog von Loona! Designs – Artikel über React, Next.js, Node.js, GraphQL und das Lernen selbst.",
};

export default function TechPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Magazin</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          <span className="text-gradient animate-shimmer">.Tech</span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Notizen aus Engineering und Unterricht: tiefe Deep-Dives, ehrliche Learnings und das,
          was zwischen den Releases hängen bleibt.
        </p>
      </header>
      <TechMagazine posts={sorted} />
    </div>
  );
}
