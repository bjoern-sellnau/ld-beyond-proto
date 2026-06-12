import type { Job } from "./types";

export const jobs: Job[] = [
  {
    id: "job-current",
    role: "Senior Fullstack Engineer & IT-Instructor",
    company: "Aktuelle Position",
    period: "2022 – heute",
    location: "Remote / Deutschland",
    summary:
      "Doppelrolle aus Engineering und Lehre: Architektur und Umsetzung anspruchsvoller Web-Plattformen mit Next.js und Node.js – und parallel die Ausbildung der nächsten Entwickler-Generation in intensiven Trainings-Kohorten.",
    skills: ["Next.js", "React", "Node.js", "GraphQL", "TypeScript", "Teaching"],
    subprojects: [
      {
        title: "Plattform-Relaunch E-Commerce",
        description:
          "Technische Leitung der Migration eines Shop-Monolithen auf eine Headless-Architektur mit Next.js App Router und GraphQL-Mesh.",
        tech: ["Next.js", "GraphQL", "TypeScript"],
      },
      {
        title: "Fullstack-Curriculum",
        description:
          "Konzeption und Durchführung eines 12-monatigen Fullstack-Curriculums – von JavaScript-Grundlagen bis zum produktionsreifen Abschlussprojekt.",
        tech: ["JavaScript", "React", "Node.js"],
      },
      {
        title: "Design-System & Komponenten-Bibliothek",
        description:
          "Aufbau einer team-übergreifenden React-Komponentenbibliothek mit Token-Pipeline, Dokumentation und visueller Regression in CI.",
        tech: ["React", "Tailwind", "Storybook"],
      },
    ],
  },
  {
    id: "job-previous",
    role: "Fullstack Engineer",
    company: "Digitalagentur",
    period: "2018 – 2022",
    location: "Deutschland",
    summary:
      "Konzeption und Entwicklung von Web-Anwendungen und Markenauftritten für Kunden vom Start-up bis zum Konzern – mit Schwerpunkt auf React-Frontends und Node.js-APIs.",
    skills: ["React", "Node.js", "GraphQL", "PostgreSQL", "AWS"],
    subprojects: [
      {
        title: "Realtime-Logistik-Dashboard",
        description:
          "Echtzeit-Lagebild für Lieferketten: Node.js-Streaming-Backend mit WebSocket-Frontend für drei Leitstände im 24/7-Betrieb.",
        tech: ["Node.js", "WebSockets", "D3.js"],
      },
      {
        title: "GraphQL-API-Konsolidierung",
        description:
          "Zusammenführung von fünf REST-Diensten hinter einem versionierten GraphQL-Gateway inklusive Schema-Governance und Persisted Queries.",
        tech: ["GraphQL", "Node.js", "Redis"],
      },
      {
        title: "Award-Brandsite",
        description:
          "Markenauftritt mit WebGL-Hero und Scroll-Choreografie bei Lighthouse-Score 100 – Performance-Budget als Designwerkzeug.",
        tech: ["Next.js", "WebGL", "GSAP"],
      },
    ],
  },
  {
    id: "job-before",
    role: "Frontend Developer",
    company: "Software-Haus",
    period: "2015 – 2018",
    location: "Deutschland",
    summary:
      "Einstieg in die professionelle Webentwicklung: Single-Page-Anwendungen für B2B-Kunden, der Wechsel von jQuery zu komponentenbasierten Architekturen – und die ersten React-Projekte in Produktion.",
    skills: ["JavaScript", "React", "CSS", "REST", "Agile"],
    subprojects: [
      {
        title: "B2B-Konfigurator",
        description:
          "Produktkonfigurator mit Regelwerk und Live-Preisberechnung – das erste große React-Projekt des Hauses und Blaupause für alle folgenden.",
        tech: ["React", "Redux", "REST"],
      },
      {
        title: "Legacy-Modernisierung",
        description:
          "Schrittweise Strangler-Migration einer jQuery-Anwendung zu React – ohne Feature-Stopp und ohne Big-Bang-Release.",
        tech: ["JavaScript", "React", "Webpack"],
      },
    ],
  },
  {
    id: "job-loona",
    role: "Founder & Lead Engineer",
    company: "Loona! Designs",
    period: "2014 – heute",
    location: "loona-designs.tech",
    summary:
      "Mein eigenes Studio und Experimentierfeld: Hier entstehen freie Projekte, die Labs-Experimente und dieses Portfolio – alles, was zwischen Kundenarbeit und Unterricht an Ideen übrig bleibt, bekommt hier seinen Platz.",
    skills: ["Next.js", "React", "Node.js", "GraphQL", "Design", "Open Source"],
    subprojects: [
      {
        title: "Dieses Portfolio",
        description:
          "Next.js 16 mit App Router, View Transitions API und Tailwind v4 – die Website, die du gerade liest, ist selbst ein Lab.",
        tech: ["Next.js", "View Transitions", "Tailwind"],
      },
      {
        title: "Labs-Programm",
        description:
          "Laufende Experimente zu Web-APIs, AI-Tooling und Creative Coding – dokumentiert und veröffentlicht im Labs-Bereich dieser Seite.",
        tech: ["Web APIs", "AI", "Creative Coding"],
      },
      {
        title: "Open-Source-Beiträge",
        description:
          "Kleine Werkzeuge und Beiträge rund um das React- und GraphQL-Ökosystem – vom ESLint-Plugin bis zur Doku-Verbesserung.",
        tech: ["TypeScript", "Open Source"],
      },
    ],
  },
];
