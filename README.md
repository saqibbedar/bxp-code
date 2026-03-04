<p align="center">
  <img src="public/logo.svg" alt="bxp-code" height="60" />
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

- **Shiki Syntax Highlighting** — Accurate, TextMate-grammar-based highlighting for 100+ languages
- **Prettier Auto-Formatting** — Code is automatically formatted on render
- **Dark & Light Themes** — Built-in themes with full color customization
- **Copy to Clipboard** — One-click copy with visual feedback
- **Line Numbers** — Optional line number gutter
- **Sticky Headers** — Pin file names while scrolling long blocks
- **File & URL Input** — Load code from `File` objects or remote URLs
- **Multi-Tab Code Blocks** — `BxpCodeTabs` for tabbed code containers
- **Zero Config** — Works out of the box with sensible defaults
- **TypeScript First** — Full type definitions included

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

### `BxpCode`

The core component for rendering a single code block.

| Prop              | Type                     | Default  | Description                      |
| ----------------- | ------------------------ | -------- | -------------------------------- |
| `code`            | `string`                 | —        | Code string to highlight         |
| `file`            | `File`                   | —        | File object from input/drag-drop |
| `url`             | `string`                 | —        | URL to fetch code from           |
| `lang`            | `string`                 | auto     | Language for highlighting        |
| `fileName`        | `string`                 | auto     | File name displayed in header    |
| `theme`           | `"dark" \| "light"`      | `"dark"` | Color theme                      |
| `showHeader`      | `boolean`                | `true`   | Toggle header visibility         |
| `showFileName`    | `boolean`                | `true`   | Toggle file name in header       |
| `showLang`        | `boolean`                | `true`   | Toggle language badge            |
| `showCopyButton`  | `boolean`                | `true`   | Toggle copy button               |
| `showLineNumbers` | `boolean`                | `false`  | Toggle line numbers              |
| `stickyHeader`    | `boolean`                | `false`  | Sticky header on scroll          |
| `stickyTop`       | `number`                 | `0`      | Sticky offset in pixels          |
| `headerColor`     | `string`                 | —        | Override header background       |
| `backgroundColor` | `string`                 | —        | Override code background         |
| `style`           | `CSSProperties`          | —        | Additional container styles      |
| `className`       | `string`                 | —        | Additional CSS class             |
| `onError`         | `(error: Error) => void` | —        | Error callback                   |

### `BxpCodeTabs`

Multi-tab code block component for showing multiple code snippets in tabs.

| Prop                 | Type                     | Default      | Description                 |
| -------------------- | ------------------------ | ------------ | --------------------------- |
| `tabs`               | `BxpCodeTab[]`           | **required** | Array of tab configurations |
| `theme`              | `"dark" \| "light"`      | `"dark"`     | Color theme                 |
| `showLineNumbers`    | `boolean`                | `false`      | Toggle line numbers         |
| `showCopyButton`     | `boolean`                | `true`       | Toggle copy button          |
| `showHeader`         | `boolean`                | `true`       | Toggle tab bar visibility   |
| `stickyHeader`       | `boolean`                | `false`      | Sticky tab bar on scroll    |
| `stickyTop`          | `number`                 | `0`          | Sticky offset in pixels     |
| `defaultTab`         | `number`                 | `0`          | Default active tab index    |
| `headerColor`        | `string`                 | —            | Tab bar background color    |
| `backgroundColor`    | `string`                 | —            | Code area background color  |
| `borderColor`        | `string`                 | —            | Container border color      |
| `tabActiveColor`     | `string`                 | —            | Active tab background       |
| `tabActiveTextColor` | `string`                 | —            | Active tab text color       |
| `tabTextColor`       | `string`                 | —            | Inactive tab text color     |
| `tabIndicatorColor`  | `string`                 | —            | Active tab indicator color  |
| `copyButtonColor`    | `string`                 | —            | Copy button background      |
| `lineNumberColor`    | `string`                 | —            | Line number text color      |
| `style`              | `CSSProperties`          | —            | Additional container styles |
| `className`          | `string`                 | —            | Additional CSS class        |
| `onError`            | `(error: Error) => void` | —            | Error callback              |

#### `BxpCodeTab`

| Prop       | Type     | Required | Description                    |
| ---------- | -------- | -------- | ------------------------------ |
| `lang`     | `string` | Yes      | Language identifier            |
| `label`    | `string` | No       | Tab label (defaults to `lang`) |
| `code`     | `string` | No       | Code string                    |
| `file`     | `File`   | No       | File object                    |
| `url`      | `string` | No       | URL to fetch code from         |
| `fileName` | `string` | No       | Display file name              |

## Input Methods

```tsx
// 1. Code string
<BxpCode code="const x = 1;" lang="typescript" />

// 2. File upload
<BxpCode file={fileObject} />

// 3. Remote URL
<BxpCode url="https://raw.githubusercontent.com/user/repo/main/index.ts" />
```

## License

[MIT](LICENSE) — Made by [Saqib Bedar](https://github.com/saqibbedar)
