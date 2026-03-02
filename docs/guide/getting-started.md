# Getting Started

Learn how to install and set up bxp-code in your React project.

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

:::

## Quick Start

Import and use the components in your React app:

```tsx
import { BxpCode, BxpCodeTabs } from "bxp-code";

function App() {
  return (
    <>
      {/* Single code block */}
      <BxpCode
        code={`const greeting = "Hello, World!";
console.log(greeting);`}
        lang="javascript"
      />

      {/* Tabbed code blocks */}
      <BxpCodeTabs
        tabs={[
          { lang: "bash", label: "npm", code: "npm install bxp-code" },
          { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
          { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
        ]}
      />
    </>
  );
}
```

## Requirements

- **React 18+** - Uses modern React features
- **Modern browser** - ES2020+ support required

## Supported Languages

bxp-code supports all languages that Shiki supports, including:

- JavaScript / TypeScript
- Python
- Go
- Rust
- Java
- C / C++
- HTML / CSS
- JSON / YAML
- Markdown
- And 100+ more...

## Next Steps

- [Basic Usage](/guide/basic-usage) - Code strings, file uploads, URL fetching
- [BxpCodeTabs](/guide/bxp-code-tabs) - Multi-tab code blocks
- [Themes](/guide/themes) - Customize the look
- [API Reference](/api/) - All available props
