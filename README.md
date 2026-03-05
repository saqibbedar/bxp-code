<p align="center">
  <img src="https://raw.githubusercontent.com/saqibbedar/bxp-code/main/public/logo.svg" alt="bxp-code" height="60" />
</p>

<h3 align="center">Drop-in React code blocks with Shiki highlighting, Prettier formatting, and zero config.</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/bxp-code"><img src="https://img.shields.io/npm/v/bxp-code?color=e06b74&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/bxp-code"><img src="https://img.shields.io/npm/dm/bxp-code?color=e88490" alt="npm downloads" /></a>
  <a href="https://github.com/saqibbedar/bxp-code/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/bxp-code?color=4f9a7a" alt="license" /></a>
  <a href="https://github.com/saqibbedar/bxp-code"><img src="https://img.shields.io/github/stars/saqibbedar/bxp-code?style=social" alt="GitHub stars" /></a>
</p>

<p align="center">
  <a href="https://saqibbedar.github.io/bxp-code/">Documentation</a> · <a href="https://saqibbedar.github.io/bxp-code/getting-started">Getting Started</a> · <a href="https://saqibbedar.github.io/bxp-code/bxp-code">API Reference</a> · <a href="https://saqibbedar.github.io/bxp-code/bxp-code-tabs">BxpCodeTabs</a>
</p>

---

## Features

- **Shiki syntax highlighting** — TextMate-grammar-based highlighting for 100+ languages
- **Prettier formatting on render** — Automatically formats code before display
- **Dark & light themes** — Built-in themes with easy customization
- **Copy to clipboard** — One-click copy with visual feedback
- **Line numbers** — Optional gutter (`showLineNumbers`)
- **Sticky headers** — Pin the header/tab bar while scrolling long blocks (`stickyHeader`)
- **Multiple input methods** — Render from `code`, `File`, or remote `url`
- **Tabbed code blocks** — `BxpCodeTabs` for multi-snippet containers
- **TypeScript-first** — Full types exported for all public APIs

## Install

```bash
npm install bxp-code
```

```bash
pnpm add bxp-code
```

```bash
yarn add bxp-code
```

## Quick Start

### BxpCode

```tsx
import { BxpCode } from "bxp-code";

function App() {
  return (
    <BxpCode
      code={`console.log('Hello, World!');`}
      lang="javascript"
      fileName="hello.js"
      theme="dark"
      showLineNumbers
    />
  );
}
```

### BxpCodeTabs

```tsx
import { BxpCodeTabs } from "bxp-code";

function App() {
  return (
    <BxpCodeTabs
      tabs={[
        { lang: "bash", label: "npm", code: "npm install bxp-code" },
        { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
        { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
      ]}
      theme="dark"
    />
  );
}
```

## Components

> Full API documentation lives in [`docs/api/index.md`](docs/api/index.md) and on the website: https://saqibbedar.github.io/bxp-code/bxp-code

### `BxpCode`

Render a single highlighted + formatted code block.

**Input (provide one):**

- `code?: string`
- `file?: File`
- `url?: string`  
  Priority: `code` > `file` > `url`

**Common props:**

- `lang?: string` (auto-detect)
- `fileName?: string` (auto-detect)
- `theme?: "dark" | "light"` (default `"dark"`)
- `showHeader?: boolean` (default `true`)
- `showCopyButton?: boolean` (default `true`)
- `showLineNumbers?: boolean` (default `true`)
- `stickyHeader?: boolean` (default `false`)
- `stickyTop?: number` (default `0`)
- `headerColor?: string`
- `backgroundColor?: string`
- `className?: string`
- `style?: CSSProperties`
- `onError?: (error: Error) => void`

### `BxpCodeTabs`

Render multiple code blocks inside a tabbed container.

**Tabs (`BxpCodeTab`)**
Each tab supports: `lang` (required), `label?`, and one of `code?` / `file?` / `url?` (+ optional `fileName?`).

**Common props:**

- `tabs: BxpCodeTab[]` (**required**)
- `theme?: "dark" | "light"` (default `"dark"`)
- `showLineNumbers?: boolean` (default `true`)
- `showCopyButton?: boolean` (default `true`)
- `showHeader?: boolean` (default `true`)
- `stickyHeader?: boolean` (default `false`)
- `stickyTop?: number` (default `0`)
- `defaultTab?: number` (default `0`)
- `headerColor?: string`
- `backgroundColor?: string`
- `borderColor?: string`
- `tabActiveColor?: string`
- `tabActiveTextColor?: string`
- `tabTextColor?: string`
- `tabIndicatorColor?: string` (default `#e06b74`)
- `copyButtonColor?: string`
- `lineNumberColor?: string`
- `className?: string`
- `style?: CSSProperties`
- `onError?: (error: Error) => void`

## Contributing

Contributions are welcome!

- Please read: [CONTRIBUTING.md](./CONTRIBUTING.md) of Conduct
- Please follow: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## License

[MIT](LICENSE) — Made by [Saqib Bedar](https://github.com/saqibbedar)
