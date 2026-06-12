import type { Metadata } from "next";
import { jobs } from "@/lib/data/jobs";
import type { Job } from "@/lib/data/types";
import { SectionNav, type SectionLink } from "@/components/about/section-nav";

export const metadata: Metadata = {
  title: "About",
  description:
    "Die Geschichte hinter Loona! Designs: Bjoern Sellnau – Senior Fullstack Engineer & IT-Instructor.",
};

const jobLabels: Record<string, string> = {
  "job-current": "Aktueller Job",
  "job-previous": "Vorheriger Job",
  "job-before": "Davor",
  "job-loona": "Loona! Designs",
};

const sections: SectionLink[] = [
  { id: "intro", label: "Intro" },
  { id: "vita", label: "Vita" },
  { id: "skills", label: "Skills" },
  { id: "tools", label: "Tools" },
  { id: "zertifikate", label: "Zertifikate" },
  ...jobs.map((job) => ({ id: job.id, label: jobLabels[job.id] ?? job.company })),
];

const skillGroups = [
  { name: "React", detail: "Hooks, RSC, Suspense, Performance-Tuning", level: 95 },
  { name: "Next.js", detail: "App Router, Caching, Edge, View Transitions", level: 95 },
  { name: "Node.js", detail: "APIs, Streams, Worker, Tooling", level: 90 },
  { name: "JavaScript / TypeScript", detail: "Sprach-Internals, strikte Typisierung", level: 95 },
  { name: "GraphQL", detail: "Schema-Design, Federation, DataLoader", level: 85 },
  { name: "Teaching", detail: "Curricula, Live-Coding, Kohorten-Mentoring", level: 90 },
];

const tools = [
  "VS Code",
  "Git & GitHub",
  "Docker",
  "Vercel",
  "Tailwind CSS",
  "Figma",
  "Storybook",
  "PostgreSQL",
  "Redis",
  "Playwright",
  "ESLint",
  "GitHub Actions",
];

const certificates = [
  {
    title: "AEVO – Ausbildereignung (IHK)",
    detail: "Pädagogische Eignung für die Ausbildung in IT-Berufen.",
  },
  {
    title: "AWS Certified Developer – Associate",
    detail: "Serverless-Architekturen, Deployment und Betrieb auf AWS.",
  },
  {
    title: "Professional Scrum Master I",
    detail: "Agile Arbeitsweise in cross-funktionalen Produkt-Teams.",
  },
  {
    title: "GraphQL Associate Certification",
    detail: "Schema-Design und Operations nach GraphQL-Foundation-Standard.",
  },
];

const vita = [
  {
    year: "2014",
    text: "Gründung von Loona! Designs als freies Studio für Web-Projekte und Experimente.",
  },
  {
    year: "2015",
    text: "Einstieg als Frontend Developer – erste React-Anwendungen in Produktion.",
  },
  {
    year: "2018",
    text: "Wechsel in die Agenturwelt: Fullstack-Projekte mit React, Node.js und GraphQL.",
  },
  {
    year: "2022",
    text: "Senior-Rolle und Start als IT-Instructor: Engineering und Lehre als Doppelrolle.",
  },
  {
    year: "Heute",
    text: "Architektur moderner Web-Plattformen – und Ausbildung der nächsten Dev-Generation.",
  },
];

function JobSection({ job }: { job: Job }) {
  return (
    <section id={job.id} className="scroll-mt-28">
      <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {jobLabels[job.id]}
          </p>
          <p className="font-mono text-xs text-muted">
            {job.period} · {job.location}
          </p>
        </div>
        <h3 className="mt-2 text-2xl font-black tracking-tight">{job.role}</h3>
        <p className="text-sm font-semibold text-muted">{job.company}</p>
        <p className="mt-4 text-base leading-relaxed text-muted">{job.summary}</p>

        {/* Bento-Grid: Unterprojekte + Skills */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {job.subprojects.map((sub, i) => (
            <article
              key={sub.title}
              className={`rounded-2xl border border-line bg-surface-2 p-5 transition-colors hover:border-accent/40 ${
                i === 0 ? "sm:col-span-2 bg-gradient-to-br from-accent/10 to-accent-2/10" : ""
              }`}
            >
              <h4 className="font-bold tracking-tight">{sub.title}</h4>
              <p className="mt-1.5 text-sm text-muted">{sub.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {sub.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}

          <div className="rounded-2xl border border-line bg-surface-2 p-5 sm:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              Skills in dieser Rolle
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gradient-to-r from-accent/15 to-accent-2/15 px-3 py-1 text-sm font-semibold text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)_200px]">
        {/* Links: fixes (sticky) Bild, vertikal mittig im Viewport */}
        <aside className="hidden lg:block">
          <div className="sticky top-1/2 -translate-y-1/2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-accent via-accent-2 to-amber-400 shadow-2xl shadow-accent/20">
              <div className="bg-dot-grid absolute inset-0 opacity-30" />
              {/* Stilisiertes Porträt-Artwork */}
              <div className="absolute left-1/2 top-[30%] size-24 -translate-x-1/2 rounded-full bg-white/85" />
              <div className="absolute left-1/2 top-[58%] h-40 w-36 -translate-x-1/2 rounded-t-[4rem] bg-white/85" />
              <div className="absolute inset-x-0 bottom-0 bg-black/30 p-5 text-white backdrop-blur-sm">
                <p className="font-bold leading-tight">Bjoern Sellnau</p>
                <p className="text-xs text-white/80">
                  Senior Fullstack Engineer &amp; IT-Instructor
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mitte: scrollender Content – padding-right hält Abstand zur Bereichsnavigation */}
        <div className="space-y-16 xl:pr-6">
          <section id="intro" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Intro</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
              Code, der trägt.
              <br />
              Wissen, das bleibt.
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Hallo! Ich bin Bjoern – seit über zehn Jahren baue ich Software für das Web. Was
                als Neugier auf „View Source“ begann, ist heute mein Beruf in Doppelrolle: Als{" "}
                <strong className="text-foreground">Senior Fullstack Engineer</strong> entwerfe und
                baue ich Plattformen mit React, Next.js, Node.js und GraphQL. Als{" "}
                <strong className="text-foreground">IT-Instructor</strong> gebe ich genau dieses
                Wissen an angehende Entwickler:innen weiter.
              </p>
              <p>
                Die beiden Rollen befruchten sich gegenseitig: Wer etwas erklären muss, versteht es
                tiefer. Und wer täglich produktiven Code schreibt, unterrichtet keine Theorie,
                sondern Praxis. Loona! Designs ist der Ort, an dem beides zusammenkommt.
              </p>
            </div>
          </section>

          <section id="vita" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Vita</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Der Weg bis hierher</h2>
            <ol className="mt-6 space-y-0 border-l-2 border-line">
              {vita.map((entry) => (
                <li key={entry.year} className="relative pb-8 pl-8 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute -left-[7px] top-1.5 size-3 rounded-full bg-gradient-to-r from-accent to-accent-2"
                  />
                  <p className="font-mono text-sm font-bold text-accent">{entry.year}</p>
                  <p className="mt-1 text-muted">{entry.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="skills" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Skills</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Womit ich arbeite</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {skillGroups.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold">{skill.name}</h3>
                    <span className="font-mono text-xs text-muted">{skill.level}%</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{skill.detail}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="tools" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Tools</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Der Werkzeugkasten</h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-xl border border-line bg-surface px-4 py-2 font-mono text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section id="zertifikate" className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Zertifikate
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Schwarz auf weiß</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {certificates.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
                >
                  <h3 className="font-bold leading-snug">{cert.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{cert.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stationen: aktueller Job, vorherige Jobs, Loona! Designs */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Stationen
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Jobs, Projekte &amp; das Studio
              </h2>
            </div>
            {jobs.map((job) => (
              <JobSection key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Rechts: Bereichsnavigation in eigener Spalte */}
        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <SectionNav sections={sections} />
          </div>
        </aside>
      </div>
    </div>
  );
}
