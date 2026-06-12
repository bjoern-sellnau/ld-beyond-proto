"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projekte", label: "Projekte" },
  { href: "/labs", label: "Labs" },
  { href: "/tech", label: ".Tech" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Mittige Navigation im Stil von Apple TV+ / iPadOS:
 * eine Glas-Pille, in der die aktive Markierung per View Transition
 * zwischen den Einträgen morpht (.nav-pill-active in globals.css).
 */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Hauptnavigation"
      className="glass flex items-center gap-1 rounded-full border border-line p-1 shadow-lg shadow-black/5"
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
              active ? "text-white" : "text-muted hover:text-foreground"
            }`}
          >
            {active && (
              <span
                aria-hidden
                className="nav-pill-active absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-md shadow-accent/30"
              />
            )}
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
