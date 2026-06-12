import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { posts } from "@/lib/data/posts";
import { WorkCard } from "@/components/work-card";
import { ArrowRightIcon } from "@/components/icons";

const skills = ["React", "Next.js", "Node.js", "JavaScript", "GraphQL", "TypeScript"];

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const news = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
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

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Featured
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Ausgewählte Projekte
            </h2>
          </div>
          <Link
            href="/projekte"
            className="hidden items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent sm:inline-flex"
          >
            Alle Projekte <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <WorkCard
              key={project.slug}
              work={project}
              basePath="/projekte"
              transitionName={`work-${project.slug}`}
            />
          ))}
        </div>
      </section>

      {/* News / Aktuelles aus dem Blog */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">News</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Frisch aus dem .Tech-Blog
            </h2>
          </div>
          <Link
            href="/tech"
            className="hidden items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-accent sm:inline-flex"
          >
            Zum Blog <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {news.map((post) => (
            <Link
              key={post.slug}
              href={`/tech/${post.slug}`}
              className="group flex flex-col rounded-3xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="rounded-full bg-gradient-to-r from-accent/15 to-accent-2/15 px-3 py-1 font-semibold text-accent">
                  {post.category}
                </span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Weiterlesen
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
