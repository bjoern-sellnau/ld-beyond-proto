"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/lib/data/projects";
import { labs } from "@/lib/data/labs";
import { posts } from "@/lib/data/posts";
import { CloseIcon, SearchIcon } from "@/components/icons";

type Result = {
  href: string;
  title: string;
  excerpt: string;
  kind: string;
  haystack: string;
};

const index: Result[] = [
  ...projects.map((p) => ({
    href: `/projekte/${p.slug}`,
    title: p.title,
    excerpt: p.subtitle,
    kind: "Projekt",
    haystack: `${p.title} ${p.subtitle} ${p.excerpt} ${p.category} ${p.tags.join(" ")}`.toLowerCase(),
  })),
  ...labs.map((l) => ({
    href: `/labs/${l.slug}`,
    title: l.title,
    excerpt: l.subtitle,
    kind: "Lab",
    haystack: `${l.title} ${l.subtitle} ${l.excerpt} ${l.category} ${l.tags.join(" ")}`.toLowerCase(),
  })),
  ...posts.map((p) => ({
    href: `/tech/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
    kind: ".Tech",
    haystack: `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(" ")}`.toLowerCase(),
  })),
];

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((r) => r.haystack.includes(q)).slice(0, 8);
  }, [query]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex size-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:scale-105 hover:border-accent/50 hover:text-foreground active:scale-95"
        aria-label="Suche öffnen"
        title="Suche (⌘K)"
      >
        <SearchIcon className="size-4.5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Website durchsuchen"
        >
          <div
            className="animate-rise w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="size-5 shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Projekte, Labs und Artikel durchsuchen …"
                className="w-full bg-transparent py-4 text-base outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1 text-muted hover:text-foreground"
                aria-label="Suche schließen"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {query.trim() === "" && (
                <p className="px-3 py-6 text-center text-sm text-muted">
                  Tippe los – durchsucht werden Projekte, Labs und der .Tech-Blog.
                </p>
              )}
              {query.trim() !== "" && results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">
                  Keine Treffer für „{query}“.
                </p>
              )}
              {results.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={close}
                  className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{r.title}</span>
                    <span className="block truncate text-xs text-muted">{r.excerpt}</span>
                  </span>
                  <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {r.kind}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
