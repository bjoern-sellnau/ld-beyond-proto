import type { Metadata } from "next";
import { labs } from "@/lib/data/labs";
import { WorkExplorer } from "@/components/work-explorer";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Experimente von Loona! Designs – Web-APIs, AI-Tooling und Creative Coding zum Anfassen.",
};

export default function LabsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Experimente
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Labs</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Das Spielfeld: neue Web-APIs, Architektur-Ideen und Creative Coding – manches wird
          Produkt, alles wird Erkenntnis.
        </p>
      </header>
      <WorkExplorer works={labs} basePath="/labs" sliderLabel="Featured Experiment" />
    </div>
  );
}
