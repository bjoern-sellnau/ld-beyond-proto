import type { Metadata } from "next";
import { projects } from "@/lib/data/projects";
import { WorkExplorer } from "@/components/work-explorer";

export const metadata: Metadata = {
  title: "Projekte",
  description: "Ausgewählte Projekte von Bjoern Sellnau – Web-Plattformen, Dashboards und mehr.",
};

export default function ProjektePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Portfolio</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Projekte</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Plattformen, Apps und Websites aus Kundenprojekten und Eigenentwicklung – vom Konzept
          bis zum Betrieb.
        </p>
      </header>
      <WorkExplorer works={projects} basePath="/projekte" sliderLabel="Featured Projekt" />
    </div>
  );
}
