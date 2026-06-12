import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <p className="text-gradient animate-shimmer text-8xl font-black">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        Diese Seite ist hinter dem Mond.
      </h1>
      <p className="mt-2 max-w-md text-muted">
        Der Link existiert nicht (mehr) – aber von der Startseite aus findest du alles wieder.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform hover:scale-105"
      >
        Zur Startseite <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  );
}
