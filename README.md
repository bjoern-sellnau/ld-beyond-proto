# Loona! Designs — beyond prototypes

Online-Portfolio von **Bjoern Sellnau** – Senior Fullstack Engineer & IT-Instructor.
Gebaut mit **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** und der
**View Transitions API** (via `experimental.viewTransition`).

## Seiten

| Route | Inhalt |
| --- | --- |
| `/` | Landing Page mit Hero-Artwork, Featured Projects und News aus dem Blog |
| `/about` | Storytelling-Seite: sticky Bild links, Scroll-Spy-Bereichsnavigation rechts, Sections (Intro, Vita, Skills, Tools, Zertifikate) und Job-Stationen mit Unterprojekten im Bento-Grid |
| `/projekte` | Hero-Slider mit Featured Projects, Kategorie-Filter und Projekt-Grid |
| `/labs` | Wie Projekte, nur für Experimente |
| `/tech` | Blog-Plattform „.Tech“ mit Kategorien, Suche, Tags und Magazin-/Bento-Layout |
| `/impressum-datenschutz` | Impressum & Datenschutzerklärung |

Detailseiten (`/projekte/[slug]`, `/labs/[slug]`, `/tech/[slug]`) haben jeweils einen
großen Hero-Bereich und eine Storytelling-Struktur. Karten-Artwork und Detail-Hero
teilen sich einen `view-transition-name` und morphen beim Navigieren ineinander.

## Header

- **Logo** „LD“ links (mit Loona-Mondsichel)
- **Pill-Navigation** in der Mitte im Stil von Apple TV+ / iPadOS – die aktive
  Markierung wandert per View Transition zwischen den Einträgen; auf Mobilgeräten
  wird die Navigation zum Dock am unteren Rand
- **3 Buttons rechts:** Dark-/Light-Mode-Toggle, Animations-Toggle
  (deaktiviert alle Animationen inkl. View Transitions, respektiert zusätzlich
  `prefers-reduced-motion`) und Suche (⌘K / Strg+K) über Projekte, Labs und Blog

## Entwicklung

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # statischer Produktions-Build (SSG für alle Seiten)
npm run lint
```

## Struktur

```
src/
├── app/                  # Routen (App Router)
├── components/           # Header, Footer, Karten, Slider, Magazin, Detail-Bausteine
└── lib/
    ├── data/             # Inhalte: Projekte, Labs, Posts, Jobs (Platzhalter-Content)
    └── view-transition.ts  # Typ-Shim für Reacts <ViewTransition>
```

> **Hinweis:** Alle Inhalte (Projekte, Jobs, Zertifikate, Impressums-Anschrift)
> sind Platzhalter und sollten vor einem echten Launch ersetzt werden.
