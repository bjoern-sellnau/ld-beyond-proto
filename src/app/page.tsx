import Link from "next/link";
import { Suspense } from "react";
import { projects } from "@/lib/data/projects";
import { posts } from "@/lib/data/posts";
import { WorkCard } from "@/components/work-card";
import { ArrowRightIcon } from "@/components/icons";
import { Hero } from "@/components/home/hero";
import { HeroDefault } from "@/components/home/hero-default";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const news = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="overflow-x-clip">
      {/* Hero – Variante per ?e=2 umschaltbar (clientseitig) */}
      <Suspense fallback={<HeroDefault />}>
        <Hero />
      </Suspense>

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
