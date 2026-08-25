import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@/components/icons";

const marquee = [
  "React",
  "Next.js",
  "Node.js",
  "GraphQL",
  "TypeScript",
  "View Transitions",
  "Tailwind",
  "Teaching",
];

const codeLines: { indent?: number; content: React.ReactNode }[] = [
  {
    content: (
      <>
        <span className="text-fuchsia-400">const</span>{" "}
        <span className="text-sky-400">bjoern</span> = {"{"}
      </>
    ),
  },
  { indent: 1, content: <><span className="text-emerald-400">role</span>: <span className="text-amber-300">&quot;Senior Fullstack Engineer&quot;</span>,</> },
  { indent: 1, content: <><span className="text-emerald-400">teaches</span>: <span className="text-amber-300">&quot;IT-Instructor&quot;</span>,</> },
  { indent: 1, content: <><span className="text-emerald-400">stack</span>: [<span className="text-amber-300">&quot;React&quot;</span>, <span className="text-amber-300">&quot;Node&quot;</span>, <span className="text-amber-300">&quot;GraphQL&quot;</span>],</> },
  { indent: 1, content: <><span className="text-emerald-400">ships</span>: <span className="text-fuchsia-400">true</span>,</> },
  { content: <>{"}"};</> },
];

/**
 * Alternativer Hero (Variante 2), erreichbar über ?e=2.
 * Zentriertes, editoriales Layout mit Terminal-Karte und Marquee –
 * bewusst anders als der Standard-Hero.
 */
export function HeroVariant2() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pt-24">
      {/* Hintergrund: Spotlight, rotierender Ring, Raster */}
      <div aria-hidden className="absolute inset-0">
        <div className="bg-dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_50%_at_50%_45%,black,transparent)]" />
        <div className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,var(--color-accent),var(--color-accent-2),transparent,var(--color-accent))] opacity-20 blur-3xl animate-spin-slow" />
        <div className="animate-float-slow absolute left-[12%] top-[20%] size-40 rounded-full bg-accent/25 blur-3xl" />
        <div className="animate-float-slower absolute bottom-[16%] right-[12%] size-52 rounded-full bg-accent-2/25 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <p className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent backdrop-blur">
          <SparklesIcon className="size-4" />
          Experiment · Variante 2
        </p>

        <h1 className="animate-rise text-5xl font-black leading-[1.02] tracking-tight [animation-delay:0.1s] sm:text-7xl md:text-8xl">
          Ich baue das
          <br />
          <span className="text-gradient animate-shimmer">Web von morgen.</span>
        </h1>

        <p className="animate-rise mt-6 max-w-xl text-lg text-muted [animation-delay:0.2s] sm:text-xl">
          <strong className="text-foreground">Bjoern Sellnau</strong> — Senior Fullstack Engineer
          &amp; IT-Instructor bei Loona! Designs. Von der Architektur bis zur Ausbildung.
        </p>

        {/* Terminal-Karte */}
        <div className="animate-rise mt-10 w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface/80 text-left shadow-2xl shadow-accent/10 backdrop-blur [animation-delay:0.3s]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-xs text-muted">bjoern.ts</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground">
            <code>
              {codeLines.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${(line.indent ?? 0) * 1.5}rem` }}>
                  {line.content}
                </div>
              ))}
            </code>
          </pre>
        </div>

        <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:0.4s]">
          <Link
            href="/projekte"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
          >
            Projekte ansehen <ArrowRightIcon className="size-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-accent/50 hover:text-accent"
          >
            Mehr über mich
          </Link>
        </div>
      </div>

      {/* Marquee-Leiste am unteren Rand */}
      <div className="animate-rise absolute inset-x-0 bottom-8 [animation-delay:0.5s]">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
            {[...marquee, ...marquee].map((item, i) => (
              <span
                key={i}
                className="font-mono text-sm font-semibold uppercase tracking-widest text-muted"
              >
                {item} <span className="text-accent">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
