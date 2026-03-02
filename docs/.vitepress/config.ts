import { defineConfig } from "vitepress";

export default defineConfig({
  title: " ",
  description:
    "A React component for beautiful code snippets with syntax highlighting and Prettier formatting",

  // Base URL for GitHub Pages
  base: "/bxp-code/",

  vite: {
    publicDir: "../public",
  },

  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/bxp-code/favicon.svg" },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        href: "/bxp-code/logo-512x512.png",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api/" },
      {
        text: "Links",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/saqibbedar/bxp-code",
          },
          { text: "npm", link: "https://www.npmjs.com/package/bxp-code" },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Basic Usage", link: "/guide/basic-usage" },
            { text: "BxpCodeTabs", link: "/guide/bxp-code-tabs" },
          ],
        },
        {
          text: "Features",
          items: [
            { text: "Themes", link: "/guide/themes" },
            { text: "Sticky Headers", link: "/guide/sticky-headers" },
            { text: "Customization", link: "/guide/customization" },
          ],
        },
      ],
      "/api/": [
        {
          text: "Reference",
          items: [
            { text: "Props", link: "/api/" },
            { text: "Troubleshooting", link: "/api/troubleshooting" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/saqibbedar/bxp-code" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present saqibbedar",
    },

    search: {
      provider: "local",
    },
  },
});
