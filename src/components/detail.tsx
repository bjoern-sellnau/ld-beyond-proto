import Link from "next/link";
import type { StoryBlock } from "@/lib/data/types";
import { ChevronLeftIcon } from "@/components/icons";

type DetailHeroProps = {
  title: string;
  subtitle: string;
  gradient: string;
  meta: string[];
  tags: string[];
  backHref: string;
  backLabel: string;
  /** view-transition-name – muss zum Karten-Artwork der Übersicht passen */
  transitionName?: string;
};

export function DetailHero({
  title,
  subtitle,
  gradient,
  meta,
  tags,
  backHref,
  backLabel,
  transitionName,
}: DetailHeroProps) {
  return (
    <section
      className={`relative flex min-h-[60vh] items-end overflow-hidden bg-gradient-to-br ${gradient}`}
      style={transitionName ? { viewTransitionName: transitionName } : undefined}
    >
      <div className="bg-dot-grid absolute inset-0 opacity-25" />
      <div className="absolute -left-24 top-10 size-80 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-14 pt-40 text-white sm:px-6">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-black/25 px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-black/40"
        >
          <ChevronLeftIcon className="size-4" /> {backLabel}
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-white/80">
          {meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden>·</span>}
              {m}
            </span>
          ))}
        </div>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/85">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Storytelling-Bereich der Detailseiten: nummerierte Kapitel. */
export function Story({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="space-y-14">
        {blocks.map((block, i) => (
          <article key={block.heading} className="animate-rise relative pl-14 sm:pl-16">
            <span
              aria-hidden
              className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-white"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{block.heading}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
