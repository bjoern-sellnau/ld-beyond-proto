import type { Work } from "./types";

export const projects: Work[] = [
  {
    slug: "nova-commerce",
    title: "Nova Commerce",
    subtitle: "Headless E-Commerce Plattform",
    excerpt:
      "Eine performante Headless-Commerce-Plattform mit Next.js, GraphQL-Mesh und Echtzeit-Inventar für über 40.000 Produkte.",
    category: "Web App",
    tags: ["Next.js", "GraphQL", "TypeScript", "Stripe"],
    year: 2025,
    featured: true,
    gradient: "from-violet-600 via-fuchsia-500 to-amber-400",
    story: [
      {
        heading: "Die Ausgangslage",
        body: "Ein gewachsener Shopsystem-Monolith bremste das Team aus: Releases dauerten Wochen, die Time-to-Interactive lag bei über sechs Sekunden. Ziel war eine vollständig entkoppelte Architektur, die Content, Commerce und Suche über eine einheitliche GraphQL-Schicht zusammenführt.",
      },
      {
        heading: "Architektur & Umsetzung",
        body: "Das Frontend wurde mit Next.js App Router und React Server Components neu aufgebaut. Produkt- und Kategorieseiten werden statisch generiert und über On-Demand-Revalidation aktualisiert. Ein GraphQL-Mesh aggregiert Shop-API, CMS und Suchindex zu einem einzigen, typsicheren Schema.",
      },
      {
        heading: "Ergebnis",
        body: "Die Core Web Vitals liegen seitdem durchgehend im grünen Bereich, die Conversion-Rate stieg im ersten Quartal um 18 Prozent. Das Team deployt heute mehrmals täglich statt einmal pro Sprint.",
      },
    ],
  },
  {
    slug: "atlas-dashboard",
    title: "Atlas Dashboard",
    subtitle: "Realtime Analytics für Logistik",
    excerpt:
      "Ein Echtzeit-Dashboard, das Lieferketten-Daten aus 12 Quellsystemen visualisiert – mit Node.js-Streaming-Backend und WebSockets.",
    category: "Dashboard",
    tags: ["React", "Node.js", "WebSockets", "D3.js"],
    year: 2024,
    featured: true,
    gradient: "from-sky-600 via-cyan-400 to-emerald-400",
    story: [
      {
        heading: "Die Herausforderung",
        body: "Disponenten arbeiteten mit nächtlichen CSV-Exporten – Störungen in der Lieferkette fielen erst Stunden später auf. Gefordert war ein Live-Lagebild über zwölf heterogene Quellsysteme hinweg, vom ERP bis zur Telematik der Fahrzeugflotte.",
      },
      {
        heading: "Technischer Ansatz",
        body: "Ein Node.js-Backend konsumiert die Quellsysteme über Event-Streams, normalisiert die Daten und pusht Deltas via WebSockets ins Frontend. Die Visualisierung kombiniert D3.js-Karten mit virtualisierten Tabellen, damit auch zehntausende Sendungen flüssig dargestellt werden.",
      },
      {
        heading: "Wirkung",
        body: "Die mittlere Reaktionszeit auf Störungen sank von vier Stunden auf unter zehn Minuten. Das Dashboard ist heute das zentrale Arbeitswerkzeug von drei Leitständen im 24/7-Betrieb.",
      },
    ],
  },
  {
    slug: "lumen-cms",
    title: "Lumen CMS",
    subtitle: "Komponentenbasiertes Content-System",
    excerpt:
      "Ein schlankes, komponentenbasiertes CMS mit visuellem Editor, das Marketing-Teams unabhängig von Entwicklern macht.",
    category: "Web App",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "Tailwind"],
    year: 2024,
    featured: true,
    gradient: "from-rose-500 via-orange-400 to-yellow-300",
    story: [
      {
        heading: "Warum noch ein CMS?",
        body: "Bestehende Systeme waren entweder zu starr oder zu komplex. Das Marketing wollte Landingpages aus geprüften Design-System-Komponenten zusammenstellen – ohne Tickets, ohne Wartezeit, aber auch ohne Wildwuchs.",
      },
      {
        heading: "Der visuelle Editor",
        body: "Herzstück ist ein Drag-and-Drop-Editor, der direkt auf den echten React-Komponenten des Design-Systems arbeitet. Jede Komponente deklariert ihr Schema per Zod, daraus generiert das CMS Formulare, Validierung und die GraphQL-API automatisch.",
      },
      {
        heading: "Ergebnis",
        body: "Kampagnenseiten entstehen heute in Stunden statt Wochen. Über 200 Seiten wurden im ersten Jahr ohne einen einzigen Entwickler-Eingriff veröffentlicht – und alle sehen aus wie aus einem Guss.",
      },
    ],
  },
  {
    slug: "fintrack-app",
    title: "FinTrack",
    subtitle: "Progressive Web App für Finanzen",
    excerpt:
      "Offline-fähige PWA für persönliches Finanz-Tracking mit Ende-zu-Ende-Verschlüsselung und Sync über mehrere Geräte.",
    category: "Mobile",
    tags: ["React", "PWA", "IndexedDB", "Node.js"],
    year: 2023,
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    story: [
      {
        heading: "Offline first",
        body: "Finanzdaten gehören dem Nutzer. FinTrack speichert alles zuerst lokal in IndexedDB und synchronisiert verschlüsselt, sobald eine Verbindung besteht. Die App funktioniert im Flugzeug genauso wie im Funkloch.",
      },
      {
        heading: "Sync ohne Konflikte",
        body: "Ein CRDT-basiertes Sync-Protokoll führt Änderungen von mehreren Geräten zusammen, ohne dass Nutzer je einen Merge-Konflikt sehen. Der Server sieht dabei nur verschlüsselte Blobs – Zero Knowledge by Design.",
      },
      {
        heading: "Learnings",
        body: "Das Projekt hat gezeigt, wie weit das Web als App-Plattform heute trägt: Installierbarkeit, Push-Notifications und Hintergrund-Sync machen die PWA von einer nativen App praktisch ununterscheidbar.",
      },
    ],
  },
  {
    slug: "campus-lms",
    title: "Campus LMS",
    subtitle: "Lernplattform für IT-Trainings",
    excerpt:
      "Eine interaktive Lernplattform mit Code-Sandboxes im Browser, Live-Sessions und automatisiertem Feedback für Trainings-Kohorten.",
    category: "EdTech",
    tags: ["Next.js", "WebContainers", "GraphQL", "WebRTC"],
    year: 2023,
    gradient: "from-indigo-600 via-blue-500 to-sky-400",
    story: [
      {
        heading: "Lernen durch Tun",
        body: "Als IT-Instructor weiß ich: Folien erzeugen kein Können. Campus LMS stellt jeder Lektion eine lauffähige Code-Sandbox direkt im Browser zur Seite – Node.js inklusive, ohne lokale Installation.",
      },
      {
        heading: "Automatisiertes Feedback",
        body: "Übungsabgaben laufen gegen Test-Suites in isolierten Containern. Lernende bekommen in Sekunden präzises Feedback, Trainer sehen aggregiert, wo eine Kohorte hängt, und können den Kurs live nachsteuern.",
      },
      {
        heading: "Einsatz in der Praxis",
        body: "Die Plattform begleitet inzwischen mehrere Umschulungs-Jahrgänge. Die Abschlussquote der Kurse stieg messbar, weil Probleme sichtbar werden, bevor jemand abgehängt ist.",
      },
    ],
  },
  {
    slug: "studio-site",
    title: "Studio Brandsite",
    subtitle: "Award-fähige Agentur-Website",
    excerpt:
      "Markenauftritt mit WebGL-Hero, Scroll-Choreografie und einem Lighthouse-Score von 100 – Beweis, dass beides zusammen geht.",
    category: "Website",
    tags: ["Next.js", "WebGL", "GSAP", "Tailwind"],
    year: 2022,
    gradient: "from-zinc-700 via-zinc-500 to-zinc-300",
    story: [
      {
        heading: "Anspruch",
        body: "Die Seite sollte sich anfühlen wie ein Filmvorspann – und trotzdem auf einem fünf Jahre alten Android-Gerät butterweich laufen. Diese Spannung hat das ganze Projekt geprägt.",
      },
      {
        heading: "Performance-Budget als Designwerkzeug",
        body: "Jeder Effekt musste sich sein Gewicht verdienen: WebGL nur above the fold, Animationen GPU-komponiert, Fonts subsetted, alles unterhalb der Falte lazy. Das Budget von 150 KB initialem JavaScript wurde nie gerissen.",
      },
      {
        heading: "Ergebnis",
        body: "Lighthouse 100 in allen Kategorien bei voller Scroll-Choreografie. Die Seite wurde intern zur Referenz dafür, wie Markeninszenierung und Web-Performance zusammen gedacht werden.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
