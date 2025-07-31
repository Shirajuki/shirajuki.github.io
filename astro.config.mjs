// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://shirajuki.js.org",
  integrations: [
    expressiveCode({
      themes: ["catppuccin-mocha", "dracula"],
      styleOverrides: {
        codeFontSize: "0.75rem",
        borderRadius: "0.5rem",
        borderColor: "color-mix(in oklab, var(--card) 80%, transparent)",
        codeBackground: "color-mix(in oklab, var(--card) 50%, transparent)",
        frames: {
          editorTabBarBackground:
            "color-mix(in oklab, var(--card) 25%, transparent)",
          editorActiveTabBackground:
            "color-mix(in oklab, var(--card) 25%, transparent)",
          editorActiveTabIndicatorTopColor: "var(--secondary)",
          editorActiveTabIndicatorHeight: "3px",
          terminalBackground:
            "color-mix(in oklab, var(--card) 50%, transparent)",
          terminalTitlebarBackground:
            "color-mix(in oklab, var(--card) 25%, transparent)",
          terminalTitlebarBorderBottomColor:
            "color-mix(in oklab, var(--card) 80%, transparent)",
        },
      },
    }),
    mdx(),
    sitemap(),
    preact(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
