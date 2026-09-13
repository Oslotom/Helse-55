// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages serves the repo at https://<user>.github.io/<repo>/, so the
// app needs to know it's not mounted at the domain root.
const base = process.env.GITHUB_PAGES ? "/Helse-55/" : "/";

export default defineConfig({
  vite: { base },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: { basepath: base },
    client: { base },
    // GitHub Pages has no server runtime — prerender every route to static
    // HTML so the site works with plain static file hosting.
    prerender: process.env.GITHUB_PAGES ? { enabled: true, crawlLinks: true } : undefined,
  },
});
