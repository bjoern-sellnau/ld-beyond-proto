import Link from "next/link";
import { MainNav } from "./nav";
import { MotionToggle, ThemeToggle } from "./toggles";
import { SiteSearch } from "./search";

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Loona! Designs – Startseite"
          className="group flex items-center gap-2.5"
        >
          <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent via-accent-2 to-amber-400 font-mono text-base font-bold text-white shadow-lg shadow-accent/30 transition-transform group-hover:scale-105 group-hover:-rotate-3">
            {/* Mond-Sichel als Loona-Anspielung */}
            <span className="absolute -right-1.5 -top-1.5 size-5 rounded-full bg-white/25" />
            LD
          </span>
          <span className="hidden flex-col leading-tight md:flex">
            <span className="text-sm font-bold tracking-tight">Loona! Designs</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
              beyond prototypes
            </span>
          </span>
        </Link>

        {/* Mittige Pill-Navigation – auf Mobilgeräten als Dock am unteren Rand */}
        <div className="max-sm:fixed max-sm:bottom-4 max-sm:left-1/2 max-sm:z-50 max-sm:-translate-x-1/2 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          <MainNav />
        </div>

        {/* Aktionen rechts */}
        <div className="glass flex items-center gap-1.5 rounded-full border border-line p-1 shadow-lg shadow-black/5">
          <ThemeToggle />
          <MotionToggle />
          <SiteSearch />
        </div>
      </div>
    </header>
  );
}
