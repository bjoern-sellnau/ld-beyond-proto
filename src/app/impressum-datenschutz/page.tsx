import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum & Datenschutz",
  description: "Impressum und Datenschutzerklärung von Loona! Designs.",
};

export default function ImpressumDatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-28 sm:px-6">
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Rechtliches
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
          Impressum &amp; Datenschutz
        </h1>
      </header>

      <div className="space-y-12">
        <section id="impressum" className="scroll-mt-28">
          <h2 className="text-2xl font-black tracking-tight">Impressum</h2>
          <div className="mt-4 space-y-4 text-muted">
            <p className="font-semibold text-foreground">Angaben gemäß § 5 DDG</p>
            <p>
              Bjoern Sellnau
              <br />
              Loona! Designs
              <br />
              Musterstraße 1{/* TODO: echte Anschrift eintragen */}
              <br />
              12345 Musterstadt
            </p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:info@loona-designs.tech"
                className="text-accent underline-offset-4 hover:underline"
              >
                info@loona-designs.tech
              </a>
            </p>
            <p className="font-semibold text-foreground">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </p>
            <p>Bjoern Sellnau (Anschrift wie oben)</p>
            <p className="font-semibold text-foreground">Haftung für Inhalte</p>
            <p>
              Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen. Als
              Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich.
            </p>
            <p className="font-semibold text-foreground">Haftung für Links</p>
            <p>
              Dieses Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich
              keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber verantwortlich.
            </p>
          </div>
        </section>

        <hr className="border-line" />

        <section id="datenschutz" className="scroll-mt-28">
          <h2 className="text-2xl font-black tracking-tight">Datenschutzerklärung</h2>
          <div className="mt-4 space-y-4 text-muted">
            <p className="font-semibold text-foreground">1. Verantwortlicher</p>
            <p>
              Verantwortlicher im Sinne der DSGVO ist Bjoern Sellnau, erreichbar unter
              info@loona-designs.tech.
            </p>

            <p className="font-semibold text-foreground">2. Datenverarbeitung auf dieser Website</p>
            <p>
              Diese Website ist ein statisch generiertes Portfolio. Es werden keine Tracking- oder
              Analyse-Dienste eingesetzt, es werden keine Cookies zu Werbezwecken gesetzt und es
              findet keine Profilbildung statt.
            </p>

            <p className="font-semibold text-foreground">3. Server-Logfiles</p>
            <p>
              Beim Aufruf der Website verarbeitet der Hosting-Anbieter automatisch Informationen
              in sogenannten Server-Logfiles (z.&nbsp;B. IP-Adresse, Datum und Uhrzeit des
              Zugriffs, Browsertyp). Diese Daten dienen der Sicherstellung eines störungsfreien
              Betriebs (Art. 6 Abs. 1 lit. f DSGVO) und werden nach kurzer Zeit gelöscht.
            </p>

            <p className="font-semibold text-foreground">4. Lokale Speicherung (localStorage)</p>
            <p>
              Die Einstellungen für das Farbschema (hell/dunkel) und die Animations-Präferenz
              werden ausschließlich lokal in deinem Browser gespeichert (localStorage). Diese
              Daten verlassen dein Gerät nicht und können jederzeit über die Browser-Einstellungen
              gelöscht werden.
            </p>

            <p className="font-semibold text-foreground">5. Kontaktaufnahme</p>
            <p>
              Bei Kontaktaufnahme per E-Mail werden die übermittelten Daten (Name, E-Mail-Adresse,
              Inhalt der Nachricht) ausschließlich zur Bearbeitung der Anfrage verarbeitet
              (Art. 6 Abs. 1 lit. b DSGVO) und nicht an Dritte weitergegeben.
            </p>

            <p className="font-semibold text-foreground">6. Deine Rechte</p>
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung deiner personenbezogenen Daten sowie ein Beschwerderecht bei einer
              Datenschutz-Aufsichtsbehörde.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
