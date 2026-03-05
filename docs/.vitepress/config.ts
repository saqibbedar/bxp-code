import { defineConfig } from "vitepress";

export default defineConfig({
  title: " ",
  description:
    "Drop-in React code blocks with Shiki highlighting, Prettier formatting, and zero config.",

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
      { text: "Playground", link: "/playground/"},
      {
        text: "Blog",
        items: [
          {
            text: "The Journey to BxpCode v1.0.0",
            link: "/blog/v1.0.0",
          },
        ],
      },
      {
        text: "v1.0.0",
        items: [
          {
            text: "v1.0.0 (current)",
            link: "/",
          },
          {
            text: "Release Notes",
            link: "https://www.github.com/saqibbedar/bxp-code/releases",
          },
          {
            text: "Contributing",
            link: "https://github.com/saqibbedar/bxp-code/blob/main/CONTRIBUTING.md",
          },
          // {
          //   items: [

          //   ]
          // }
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
          ],
        },
        {
          text: "Components",
          items: [
            { text: "BxpCode", link: "/guide/bxp-code" },
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
            { text: "BxpCode Props", link: "/api/" },
            { text: "BxpCodeTabs Props", link: "/api/bxp-code-tabs" },
            { text: "Troubleshooting", link: "/api/troubleshooting" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/saqibbedar/bxp-code" },
      { icon: "npm", link: "https://www.npmjs.com/package/bxp-code" },
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
