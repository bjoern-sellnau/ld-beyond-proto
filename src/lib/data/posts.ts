import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "view-transitions-nextjs-16",
    title: "View Transitions in Next.js 16: Der komplette Guide",
    excerpt:
      "Wie React 19 und der App Router die View Transitions API zähmen – von der ersten Cross-Fade bis zum Shared-Element-Morph zwischen Routen.",
    category: "Frontend",
    tags: ["Next.js", "React", "View Transitions"],
    date: "2026-05-28",
    readingTime: "9 Min.",
    featured: true,
    size: "large",
    gradient: "from-violet-600 via-fuchsia-500 to-rose-400",
    story: [
      {
        heading: "Warum View Transitions?",
        body: "Jahrelang haben wir Seitenübergänge mit Animations-Bibliotheken simuliert – inklusive doppeltem DOM, Z-Index-Schlachten und kaputtem Fokus-Management. Die View Transitions API verschiebt diese Arbeit in den Browser: Er erstellt Screenshots des alten Zustands, blendet zum neuen über und animiert Elemente mit gleichem view-transition-name als zusammenhängenden Morph.",
      },
      {
        heading: "Die React-Integration",
        body: "Mit experimental.viewTransition in Next.js 16 reicht es, Seiteninhalte in die ViewTransition-Komponente zu wrappen. React triggert die Transition bei jeder Navigation automatisch und koordiniert sie mit Suspense und Streaming – manuelles startViewTransition entfällt komplett.",
      },
      {
        heading: "Shared Elements in der Praxis",
        body: "Der eigentliche Wow-Effekt entsteht, wenn eine Projektkarte in der Übersicht und der Hero der Detailseite denselben view-transition-name tragen. Der Browser morpht dann Größe, Position und Border-Radius – die Karte wird buchstäblich zur Seite. Wichtig: Namen müssen pro Snapshot eindeutig sein, sonst bricht der Browser die Transition ab.",
      },
      {
        heading: "Progressive Enhancement",
        body: "Browser ohne Support bekommen normale, harte Navigationen – kein Fehler, kein Fallback-Code. Zusammen mit prefers-reduced-motion ist das die seltene API, bei der die richtige Lösung auch die einfachste ist.",
      },
    ],
  },
  {
    slug: "server-components-mental-model",
    title: "React Server Components: Das fehlende Mental Model",
    excerpt:
      "RSC verstehen heißt umdenken: Komponenten als Server-Programm, das UI beschreibt – nicht als Client-Programm, das auf dem Server vorrendert.",
    category: "Frontend",
    tags: ["React", "RSC", "Next.js"],
    date: "2026-04-14",
    readingTime: "12 Min.",
    featured: true,
    size: "wide",
    gradient: "from-sky-600 via-blue-500 to-indigo-500",
    story: [
      {
        heading: "Das falsche Bild im Kopf",
        body: "Die meisten Verwirrungen um Server Components entstehen, weil wir sie als 'SSR mit Extraschritten' lesen. Tatsächlich sind sie ein anderes Programm: Sie laufen ausschließlich auf dem Server, ihr Output ist serialisiertes UI – kein HTML, sondern eine Beschreibung, die der Client-React-Baum konsumiert.",
      },
      {
        heading: "Die Grenze ist ein Feature",
        body: "use client markiert keine 'Client-Datei', sondern einen Übergabepunkt: Alles dahinter wird Teil des Browser-Bundles. Wer die Grenze bewusst tief in den Baum schiebt, bekommt interaktive Inseln in einem Meer aus kostenlosem Server-UI.",
      },
      {
        heading: "Praktische Konsequenzen",
        body: "Datenzugriff gehört in Server Components, Zustand in Client Components, und Props über die Grenze müssen serialisierbar sein. Wer diese drei Regeln verinnerlicht, braucht 90 Prozent der RSC-Blogposts nicht mehr.",
      },
    ],
  },
  {
    slug: "graphql-schema-design",
    title: "GraphQL-Schemas, die mitwachsen",
    excerpt:
      "Fünf Design-Regeln aus acht Jahren GraphQL in Produktion: Warum Nullable der Default ist und Connections kein Over-Engineering sind.",
    category: "Backend",
    tags: ["GraphQL", "API Design", "Node.js"],
    date: "2026-03-02",
    readingTime: "10 Min.",
    size: "normal",
    gradient: "from-pink-600 via-rose-500 to-red-400",
    story: [
      {
        heading: "Schema ist Vertrag",
        body: "Ein GraphQL-Schema überlebt jede Client-Generation, die es konsumiert. Deshalb gilt: Felder werden nie umbenannt, nur deprecated; nullable ist der Default, weil jedes Non-Null-Feld ein Versprechen ist, das Resolver für immer halten müssen.",
      },
      {
        heading: "Connections von Anfang an",
        body: "Listen ohne Pagination wirken am Tag eins pragmatisch und sind am Tag 400 ein Breaking Change. Das Relay-Connection-Pattern kostet zwanzig Minuten Setup und erspart die schmerzhafteste aller Migrationen.",
      },
      {
        heading: "Resolver-Disziplin",
        body: "N+1 ist kein GraphQL-Problem, sondern ein Resolver-Problem. DataLoader pro Request, Batching pro Entität, und Feld-Resolver bleiben dumm – die Komposition übernimmt das Schema, nicht der Code.",
      },
    ],
  },
  {
    slug: "teaching-developers",
    title: "Vom Senior zum Instructor: Entwickler ausbilden, die bleiben",
    excerpt:
      "Was ich aus fünf Jahren IT-Training gelernt habe: Warum Live-Coding schlägt, Folien lügen und die beste Lektion eine gut gestellte Frage ist.",
    category: "Karriere",
    tags: ["Teaching", "Mentoring", "Karriere"],
    date: "2026-01-20",
    readingTime: "7 Min.",
    size: "normal",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    story: [
      {
        heading: "Folien lügen",
        body: "Eine Folie zeigt das Ergebnis, nie den Weg. Beim Live-Coding sehen Lernende das Wichtigste überhaupt: wie ein erfahrener Entwickler Fehler liest, Hypothesen bildet und sich aus einer Sackgasse herausarbeitet. Der Tippfehler des Trainers ist mehr wert als zehn perfekte Slides.",
      },
      {
        heading: "Fragen statt Antworten",
        body: "Die wirksamste Intervention im Unterricht ist die zurückgegebene Frage: 'Was sagt dir die Fehlermeldung?' Wer Lernenden die Antwort gibt, löst ihr Problem. Wer ihnen die Frage beibringt, löst alle folgenden.",
      },
      {
        heading: "Kohorten brauchen Rhythmus",
        body: "Umschulungs-Klassen scheitern selten am Stoff, sondern am Tempo-Gefälle. Mein Werkzeug dagegen: tägliche Stand-ups, Pair-Rotationen und Übungen mit drei Ausbaustufen – so arbeitet niemand unter- und niemand dauerhaft überfordert.",
      },
    ],
  },
  {
    slug: "node-streams-backpressure",
    title: "Node.js Streams: Backpressure endlich verstehen",
    excerpt:
      "Warum dein Speicher vollläuft, obwohl du streamst – und wie pipeline(), highWaterMark und async Iteratoren das Problem elegant lösen.",
    category: "Backend",
    tags: ["Node.js", "Streams", "Performance"],
    date: "2025-11-18",
    readingTime: "11 Min.",
    size: "wide",
    gradient: "from-lime-600 via-green-500 to-emerald-400",
    story: [
      {
        heading: "Das Missverständnis",
        body: "Streams sparen nicht automatisch Speicher – sie geben dir nur die Chance dazu. Wer eine schnelle Quelle ungebremst in eine langsame Senke pumpt, puffert die Differenz im RAM. Genau das verhindert Backpressure: Die Senke diktiert das Tempo der Quelle.",
      },
      {
        heading: "pipeline() statt pipe()",
        body: "pipe() propagiert Fehler nicht und räumt bei Abbrüchen nicht auf – in Produktion ist das ein Leck mit Ansage. pipeline() schließt alle Streams bei jedem Fehlerpfad und ist seit Node 15 auch als Promise-Variante zu haben.",
      },
      {
        heading: "Async Iteratoren als Lesart",
        body: "for await (const chunk of readable) macht Backpressure implizit: Der nächste Chunk wird erst angefordert, wenn der Body der Schleife fertig ist. Für 80 Prozent der Fälle ist das die lesbarste und korrekteste Form, Streams zu konsumieren.",
      },
    ],
  },
  {
    slug: "typescript-strictness-budget",
    title: "Das Strictness-Budget: TypeScript-Migration ohne Stillstand",
    excerpt:
      "Wie man eine 300.000-Zeilen-Codebase auf strict umstellt, ohne ein Quartal lang Features zu streichen: mit einem messbaren Fehler-Budget.",
    category: "Frontend",
    tags: ["TypeScript", "Refactoring", "DX"],
    date: "2025-09-30",
    readingTime: "8 Min.",
    size: "normal",
    gradient: "from-blue-700 via-indigo-500 to-violet-400",
    story: [
      {
        heading: "Der Big Bang scheitert immer",
        body: "strict: true in einer gewachsenen Codebase produziert tausende Fehler – und der Branch, der sie alle fixt, ist nach zwei Wochen unmergebar. Die Alternative: strict anschalten, alle Bestandsfehler in eine Baseline-Datei einfrieren und nur das Delta in CI prüfen.",
      },
      {
        heading: "Das Budget",
        body: "Die Regel ist simpel: Die Baseline darf nur schrumpfen. Jeder PR, der eine Datei anfasst, nimmt ihre Fehler mit – Boy-Scout-Prinzip mit Messinstrument. Nach acht Monaten war die Baseline leer, ohne dass je ein Feature dafür pausiert hätte.",
      },
    ],
  },
  {
    slug: "design-tokens-pipeline",
    title: "Design Tokens: Eine Pipeline von Figma bis CSS",
    excerpt:
      "Wie ein Token-Build aus Figma-Variablen typsichere Tailwind-Themes erzeugt – und Designer wie Entwickler in derselben Quelle arbeiten.",
    category: "Design Systems",
    tags: ["Design Tokens", "Tailwind", "Tooling"],
    date: "2025-08-12",
    readingTime: "6 Min.",
    size: "normal",
    gradient: "from-amber-500 via-orange-400 to-rose-400",
    story: [
      {
        heading: "Eine Quelle der Wahrheit",
        body: "Farben, die in Figma anders heißen als im Code, sind keine Stilfrage, sondern ein Synchronisationsproblem. Die Pipeline exportiert Figma-Variablen als W3C-Design-Tokens und generiert daraus CSS Custom Properties, Tailwind-Theme und TypeScript-Typen in einem Build-Schritt.",
      },
      {
        heading: "Semantik schlägt Skala",
        body: "Komponenten referenzieren nie blue-500, sondern surface-accent: Die semantische Ebene macht Dark Mode, Brand-Varianten und Rebrandings zu reinen Token-Änderungen – ohne ein einziges Komponenten-Refactoring.",
      },
    ],
  },
  {
    slug: "web-performance-2026",
    title: "Web Performance 2026: Was nach Core Web Vitals kommt",
    excerpt:
      "INP hat LCP als härteste Metrik abgelöst, Soft Navigations werden messbar – ein Lagebild der Performance-Arbeit in modernen SPAs.",
    category: "Performance",
    tags: ["Performance", "Core Web Vitals", "Metrics"],
    date: "2025-06-25",
    readingTime: "9 Min.",
    size: "normal",
    gradient: "from-cyan-600 via-sky-500 to-blue-400",
    story: [
      {
        heading: "INP ist die ehrlichste Metrik",
        body: "Interaction to Next Paint misst, was Nutzer wirklich spüren: die Latenz jeder einzelnen Interaktion, nicht nur des ersten Ladens. Lange Tasks im Main Thread, Hydration-Spitzen, Event-Handler-Kaskaden – INP deckt auf, was Lighthouse-Laborwerte verstecken.",
      },
      {
        heading: "Soft Navigations",
        body: "SPAs waren für Messwerkzeuge lange unsichtbar: Nach dem ersten Load existierte offiziell keine Navigation mehr. Die Soft Navigation Heuristik ändert das – Router-Übergänge bekommen eigene LCP- und INP-Werte und werden damit endlich vergleichbar mit MPAs.",
      },
    ],
  },
];

export const postCategories = [...new Set(posts.map((p) => p.category))];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
