---
outline: deep
---

# Getting Started

Get bxp-code up and running in your project in under a minute.

## Installation

::: code-group

```bash [npm]
npm install bxp-code
```

```bash [pnpm]
pnpm add bxp-code
```

```bash [yarn]
yarn add bxp-code
```

```bash [bun]
bun add bxp-code
```

:::

## Quick Start

bxp-code ships two components. Import what you need:

::: code-group

```tsx [React (TSX)]
import { BxpCode, BxpCodeTabs } from "bxp-code";

function App() {
  return (
    <>
      {/* Single code block */}
      <BxpCode
        code={`const greeting = "Hello, World!";
console.log(greeting);`}
        lang="javascript"
        fileName="hello.js"
        theme="dark"
        showLineNumbers
      />

      {/* Tabbed code blocks */}
      <BxpCodeTabs
        tabs={[
          { lang: "bash", label: "npm", code: "npm install bxp-code" },
          { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
          { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
        ]}
        theme="dark"
      />
    </>
  );
}
```

```jsx [React (JSX)]
import { BxpCode, BxpCodeTabs } from "bxp-code";

function App() {
  return (
    <>
      <BxpCode
        code={`const greeting = "Hello, World!";
console.log(greeting);`}
        lang="javascript"
        fileName="hello.js"
        theme="dark"
        showLineNumbers
      />

      <BxpCodeTabs
        tabs={[
          { lang: "bash", label: "npm", code: "npm install bxp-code" },
          { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
          { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
        ]}
        theme="dark"
      />
    </>
  );
}
```

:::

## Requirements

- **React 17+** — Compatible with React 17, 18, and 19
- **Modern browser** — ES2020+ support required

## What's Included

| Component                             | Purpose                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`BxpCode`](/guide/bxp-code)          | Single code block with highlighting, formatting, copy button, line numbers, sticky headers |
| [`BxpCodeTabs`](/guide/bxp-code-tabs) | Multi-tab container for multiple code blocks with shared controls                          |

Both components support three input methods:

1. **Code string** — Pass code directly via the `code` prop
2. **File upload** — Pass a `File` object from `<input type="file">`
3. **URL fetch** — Pass a URL to fetch code from remotely

## Supported Languages

bxp-code supports all languages that [Shiki supports](https://shiki.style/languages), including:

TypeScript, JavaScript, Python, Go, Rust, Java, C, C++, C#, HTML, CSS, JSON, YAML, Markdown, SQL, Bash, Ruby, PHP, Swift, Kotlin, and **100+ more**.

## Next Steps

- [Basic Usage](/guide/basic-usage) — Input methods, formatting, and common patterns
- [BxpCode](/guide/bxp-code) — Detailed guide for single code blocks
- [BxpCodeTabs](/guide/bxp-code-tabs) — Detailed guide for multi-tab code blocks
- [Themes](/guide/themes) — Dark, light, and custom color schemes
- [API Reference](/api/) — Full props reference
