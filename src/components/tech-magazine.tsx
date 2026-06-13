"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/data/types";
import { ArrowRightIcon, SearchIcon } from "@/components/icons";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function PostCard({ post }: { post: Post }) {
  const span =
    post.size === "large"
      ? "md:col-span-2 md:row-span-2"
      : post.size === "wide"
        ? "md:col-span-2"
        : "";

  return (
    <Link
      href={`/tech/${post.slug}`}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-line transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 ${span} ${
        post.size === "large" ? "min-h-[26rem]" : "min-h-[15rem]"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-90 ${post.gradient}`}
        style={{ viewTransitionName: `post-${post.slug}` }}
      />
      <div className="bg-dot-grid absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      <div className="relative p-6 text-white">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-white/20 px-3 py-1 font-semibold backdrop-blur-sm">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-white/75">
            {formatDate(post.date)}
          </time>
          <span className="text-white/75">· {post.readingTime}</span>
        </div>
        <h3
          className={`mt-3 font-black tracking-tight ${
            post.size === "large" ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
          }`}
        >
          {post.title}
        </h3>
        {post.size !== "normal" && (
          <p className="mt-2 max-w-xl text-sm text-white/80">{post.excerpt}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
          Lesen
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function TechMagazine({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alle");
  const [tag, setTag] = useState<string | null>(null);

  const categories = useMemo(() => ["Alle", ...new Set(posts.map((p) => p.category))], [posts]);
  const tags = useMemo(() => [...new Set(posts.flatMap((p) => p.tags))], [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== "Alle" && post.category !== category) return false;
      if (tag && !post.tags.includes(tag)) return false;
      if (
        q &&
        !`${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [posts, query, category, tag]);

  return (
    <div className="space-y-8">
      {/* Suche + Kategorien */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                category === cat
                  ? "bg-gradient-to-r from-accent to-accent-2 text-white shadow-md shadow-accent/25"
                  : "border border-line text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <label className="relative block lg:w-72">
          <span className="sr-only">Artikel durchsuchen</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Artikel durchsuchen …"
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent/60"
          />
        </label>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Tags</span>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(tag === t ? null : t)}
            aria-pressed={tag === t}
            className={`rounded-full px-3 py-1 font-mono text-xs transition-all ${
              tag === t
                ? "bg-accent text-white"
                : "bg-surface-2 text-muted hover:text-foreground"
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      {/* Magazin-Bento-Grid */}
      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-line bg-surface p-12 text-center text-muted">
          Keine Artikel gefunden – versuch eine andere Suche oder setz die Filter zurück.
        </p>
      ) : (
        <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
