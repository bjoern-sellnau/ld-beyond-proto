import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

const skills = ["React", "Next.js", "Node.js", "JavaScript", "GraphQL", "TypeScript"];

/** Standard-Hero (Variante 1) der Startseite. */
export function HeroDefault() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* Hintergrund-Artwork: Mond, Verläufe, Raster */}
      <div aria-hidden className="absolute inset-0">
        <div className="bg-dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
        <div className="animate-float-slow absolute -top-32 right-[-10%] size-[34rem] rounded-full bg-gradient-to-br from-accent/40 to-accent-2/30 blur-3xl" />
        <div className="animate-float-slower absolute bottom-[-20%] left-[-10%] size-[30rem] rounded-full bg-gradient-to-tr from-sky-500/25 to-accent/25 blur-3xl" />
        {/* Loona-Mond */}
        <div className="absolute right-[8%] top-[16%] hidden size-44 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-400 opacity-90 shadow-[0_0_120px_40px_rgba(167,139,250,0.25)] lg:block dark:from-zinc-200 dark:to-zinc-500">
          <div className="absolute left-7 top-9 size-7 rounded-full bg-black/10" />
          <div className="absolute bottom-10 right-9 size-10 rounded-full bg-black/10" />
          <div className="absolute bottom-6 left-16 size-4 rounded-full bg-black/10" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6">
        <p className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur">
          <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
          Verfügbar für Projekte &amp; Trainings
        </p>

        <h1 className="animate-rise max-w-4xl text-5xl font-black leading-[1.05] tracking-tight [animation-delay:0.1s] sm:text-7xl md:text-8xl">
          Loona<span className="text-gradient animate-shimmer">!</span> Designs
          <span className="mt-3 block text-2xl font-bold text-muted sm:text-4xl">
            Webentwicklung jenseits des Prototyps.
          </span>
        </h1>

        <p className="animate-rise mt-6 max-w-2xl text-lg text-muted [animation-delay:0.2s] sm:text-xl">
          Ich bin <strong className="text-foreground">Bjoern Sellnau</strong> – Senior Fullstack
          Engineer &amp; IT-Instructor. Ich baue performante Web-Plattformen und bilde die
          Entwickler:innen aus, die sie weiterbauen.
        </p>

        <div className="animate-rise mt-8 flex flex-wrap items-center gap-3 [animation-delay:0.3s]">
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

        <ul className="animate-rise mt-12 flex flex-wrap gap-2 [animation-delay:0.4s]">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-sm text-muted backdrop-blur"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
