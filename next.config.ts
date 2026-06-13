import type { NextConfig } from "next";

// Auf GitHub Pages liegt die Seite unter /<repo-name>/ –
// der Workflow setzt GITHUB_PAGES=true. Lokal bleibt alles unter /.
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repo = "ld-beyond-proto";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? `/${repo}` : undefined,
  assetPrefix: isGitHubPages ? `/${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
