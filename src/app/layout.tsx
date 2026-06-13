import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ViewTransition } from "@/lib/view-transition";
import { SiteHeader } from "@/components/header";
import { SiteFooter } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Loona! Designs – Bjoern Sellnau",
    template: "%s · Loona! Designs",
  },
  description:
    "Portfolio von Bjoern Sellnau – Senior Fullstack Engineer & IT-Instructor. React, Next.js, Node.js, JavaScript und GraphQL.",
};

/**
 * Setzt Theme und Animations-Einstellung vor dem ersten Paint,
 * damit es beim Laden nicht flackert.
 */
const bootstrapScript = `
(function () {
  try {
    var theme = localStorage.getItem("ld-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme === "dark" || (!theme && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
    var motion = localStorage.getItem("ld-motion");
    if (motion === "off" || motion === "on") {
      document.documentElement.dataset.motion = motion;
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <ViewTransition>
          <main className="flex-1">{children}</main>
        </ViewTransition>
        <SiteFooter />
      </body>
    </html>
  );
}
