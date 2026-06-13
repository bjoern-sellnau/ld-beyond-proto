import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 pb-24 sm:px-6 sm:pb-10 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-white">
            LD
          </span>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Loona! Designs · Bjoern Sellnau
          </p>
        </div>

        <nav aria-label="Rechtliches" className="flex items-center gap-6 text-sm text-muted">
          <Link href="/tech" className="transition-colors hover:text-foreground">
            .Tech Blog
          </Link>
          <Link href="/impressum-datenschutz" className="transition-colors hover:text-foreground">
            Impressum &amp; Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
