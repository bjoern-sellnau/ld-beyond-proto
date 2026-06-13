import Link from "next/link";
import type { Work } from "@/lib/data/types";
import { ArrowRightIcon } from "@/components/icons";

type WorkCardProps = {
  work: Work;
  basePath: "/projekte" | "/labs";
  /** view-transition-name fürs Artwork – muss pro Seite eindeutig sein */
  transitionName?: string;
};

export function WorkCard({ work, basePath, transitionName }: WorkCardProps) {
  return (
    <Link
      href={`${basePath}/${work.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${work.gradient}`}
        style={transitionName ? { viewTransitionName: transitionName } : undefined}
      >
        <div className="bg-dot-grid absolute inset-0 opacity-30" />
        <span className="absolute right-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {work.category}
        </span>
        <span className="absolute bottom-4 left-4 font-mono text-xs text-white/80">
          {work.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-accent">
          {work.title}
        </h3>
        <p className="text-sm text-muted">{work.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex flex-wrap gap-1.5">
            {work.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <ArrowRightIcon className="size-4 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
}
