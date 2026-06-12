import type { Work } from "./types";

export const labs: Work[] = [
  {
    slug: "view-transitions-playground",
    title: "View Transitions Playground",
    subtitle: "Seitenübergänge mit der nativen Browser-API",
    excerpt:
      "Experimente mit der View Transitions API: Shared-Element-Morphs, Route-Übergänge und was React 19 daraus macht.",
    category: "Web API",
    tags: ["React", "View Transitions", "CSS"],
    year: 2026,
    featured: true,
    gradient: "from-fuchsia-600 via-purple-500 to-indigo-500",
    story: [
      {
        heading: "Die Idee",
        body: "Native App-Übergänge im Web, ohne Animations-Bibliothek: Die View Transitions API verspricht genau das. Dieses Lab testet, wie weit Shared-Element-Transitions zwischen Routen heute tragen – diese Website hier ist das Ergebnis.",
      },
      {
        heading: "Erkenntnisse",
        body: "Der größte Aha-Moment: view-transition-name macht aus zwei völlig getrennten DOM-Bäumen einen flüssigen Morph. Die Stolperfallen liegen bei Scroll-Positionen, gestapelten Kontexten und doppelten Namen – alles im Code dokumentiert.",
      },
      {
        heading: "Status",
        body: "Die Technik ist produktionsreif, solange man sie als Progressive Enhancement begreift: Browser ohne Support bekommen schlicht harte Cuts statt Animationen, verlieren aber keinerlei Funktion.",
      },
    ],
  },
  {
    slug: "ai-pair-reviewer",
    title: "AI Pair Reviewer",
    subtitle: "LLM-gestützte Code-Reviews im CI",
    excerpt:
      "Ein GitHub-Bot, der Pull Requests mit einem LLM vor-reviewt und nur die Findings postet, die ein Senior auch anmerken würde.",
    category: "AI",
    tags: ["Node.js", "LLM", "GitHub API"],
    year: 2025,
    featured: true,
    gradient: "from-emerald-500 via-lime-400 to-yellow-300",
    story: [
      {
        heading: "Hypothese",
        body: "LLM-Reviews scheitern selten an der Analyse, sondern am Rauschen: zu viele triviale Anmerkungen. Das Experiment: ein zweistufiger Prompt, bei dem ein zweiter Durchlauf die eigenen Findings adversarial aussortiert.",
      },
      {
        heading: "Aufbau",
        body: "Ein Node.js-Service hört auf PR-Webhooks, baut aus Diff und betroffenen Dateien einen Kontext und lässt zwei Modell-Durchläufe gegeneinander arbeiten. Nur Findings, die den Filter überleben, landen als Review-Kommentar im PR.",
      },
      {
        heading: "Ergebnis",
        body: "Die Trefferquote nützlicher Kommentare stieg von etwa 30 auf über 80 Prozent. Das Team behandelt den Bot inzwischen wie einen zusätzlichen Reviewer – mit gesundem Misstrauen, aber echtem Mehrwert.",
      },
    ],
  },
  {
    slug: "css-houdini-orbits",
    title: "Houdini Orbits",
    subtitle: "Generative Hintergründe mit CSS Paint API",
    excerpt:
      "Ein Paint-Worklet, das animierte Orbit-Muster direkt im CSS-Rendering zeichnet – ohne Canvas-Element, ohne JavaScript im Main Thread.",
    category: "Creative Coding",
    tags: ["CSS Houdini", "Paint API", "Generative Art"],
    year: 2025,
    gradient: "from-blue-600 via-indigo-500 to-violet-500",
    story: [
      {
        heading: "Worum es geht",
        body: "CSS Houdini öffnet die Rendering-Pipeline des Browsers: Ein Paint-Worklet zeichnet die Orbit-Muster als echte CSS-background-image-Quelle, parametrisiert über Custom Properties und damit pur in CSS animierbar.",
      },
      {
        heading: "Warum das spannend ist",
        body: "Der Main Thread bleibt komplett frei – das Worklet läuft isoliert im Compositor-Kontext. Generative Grafik mit der Performance-Charakteristik eines Verlaufs: Das ändert, was an Hintergrund-Ästhetik machbar ist.",
      },
    ],
  },
  {
    slug: "edge-personalization",
    title: "Edge Personalization",
    subtitle: "A/B-Tests ohne Layout-Flackern",
    excerpt:
      "Personalisierung in der Edge-Middleware: Varianten werden vor dem ersten Byte entschieden – statisch gecacht und trotzdem persönlich.",
    category: "Architecture",
    tags: ["Next.js", "Edge", "Middleware"],
    year: 2024,
    gradient: "from-orange-500 via-rose-500 to-pink-500",
    story: [
      {
        heading: "Das Problem mit Client-Side-Testing",
        body: "Klassische A/B-Tools tauschen Inhalte nach dem Laden aus – sichtbar als Flackern und messbar als Layout Shift. Dieses Lab verlegt die Entscheidung in die Edge-Middleware, bevor das erste Byte HTML die Leitung verlässt.",
      },
      {
        heading: "Wie es funktioniert",
        body: "Die Middleware liest ein Bucket-Cookie, rewritet intern auf die passende statisch generierte Variante und bleibt damit voll CDN-cachefähig. Jede Variante ist eine eigene Route – kein Client-JavaScript für den Test nötig.",
      },
    ],
  },
  {
    slug: "graphql-live-queries",
    title: "GraphQL Live Queries",
    subtitle: "Reaktive Daten ohne Subscriptions-Boilerplate",
    excerpt:
      "Ein Experiment mit @live-Direktiven: Queries, die sich selbst aktualisieren, sobald sich die zugrunde liegenden Daten ändern.",
    category: "API Design",
    tags: ["GraphQL", "Node.js", "SSE"],
    year: 2024,
    gradient: "from-pink-600 via-fuchsia-500 to-purple-400",
    story: [
      {
        heading: "Die Idee",
        body: "Subscriptions sind mächtig, aber lästig: eigene Resolver, eigenes Protokoll, eigener State. Live Queries drehen das um – der Client markiert eine normale Query mit @live und bekommt sie neu ausgeliefert, wenn sich Ergebnisse ändern.",
      },
      {
        heading: "Umsetzung",
        body: "Der Server trackt, welche Entitäten in ein Query-Ergebnis eingeflossen sind, und invalidiert über einen Event-Bus. Transport ist schlichtes Server-Sent Events – kein WebSocket-Handshake, funktioniert durch jeden Proxy.",
      },
    ],
  },
  {
    slug: "wasm-image-pipeline",
    title: "WASM Image Pipeline",
    subtitle: "Bildverarbeitung im Browser mit Rust",
    excerpt:
      "Ein in Rust geschriebener Bild-Prozessor, kompiliert zu WebAssembly: Resizing, Farbkorrektur und Export – komplett clientseitig.",
    category: "Performance",
    tags: ["WebAssembly", "Rust", "Workers"],
    year: 2023,
    gradient: "from-amber-500 via-orange-400 to-red-400",
    story: [
      {
        heading: "Motivation",
        body: "Warum Nutzerbilder zum Server schicken, nur um sie zu verkleinern? Dieses Lab verlagert die komplette Pipeline in den Browser: Rust-Code, kompiliert zu WASM, läuft in einem Worker-Pool parallel über alle Kerne.",
      },
      {
        heading: "Benchmark",
        body: "Ein 24-Megapixel-Foto wird in unter 200 Millisekunden verkleinert und farbkorrigiert – schneller als der Upload allein gedauert hätte. Datenschutz gibt es gratis dazu: Die Bilder verlassen das Gerät nie.",
      },
    ],
  },
];

export function getLab(slug: string) {
  return labs.find((l) => l.slug === slug);
}
