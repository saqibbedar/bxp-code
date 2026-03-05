---
outline: deep
---

# BxpCode

The core component for rendering a single syntax-highlighted code block with auto-formatting, copy button, line numbers, and sticky headers.

## Import

::: code-group

```tsx [React (TSX)]
import { BxpCode } from "bxp-code";
import type { BxpCodeProps } from "bxp-code"; // optional type import
```

```jsx [React (JSX)]
import { BxpCode } from "bxp-code";
```

:::

## Basic Example

```tsx
<BxpCode
  code={`const greet = (name: string) => \`Hello, \${name}!\`;`}
  lang="typescript"
  fileName="greet.ts"
  theme="dark"
  showLineNumbers
/>
```

## Display Options

### File Name

Show a filename in the header:

```tsx
<BxpCode
  code={`export const API_URL = "https://api.example.com";`}
  lang="typescript"
  fileName="config.ts"
  theme="dark"
/>
```

### Line Numbers

```tsx
<BxpCode
  code={`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);`}
  lang="javascript"
  fileName="server.js"
  theme="dark"
  showLineNumbers
/>
```

### Hide the Header

Remove the header entirely for a minimal look:

```tsx
<BxpCode
  code={`print("Clean and minimal")`}
  lang="python"
  theme="dark"
  showHeader={false}
/>
```

### Hide Specific Header Elements

```tsx
{
  /* Hide language badge only */
}
<BxpCode code={code} lang="typescript" showLang={false} />;

{
  /* Hide file name only */
}
<BxpCode code={code} lang="typescript" showFileName={false} />;

{
  /* Hide copy button only */
}
<BxpCode code={code} lang="typescript" showCopyButton={false} />;
```

## Color Customization

Override the default theme colors:

```tsx
<BxpCode
  code={`fn main() {
    println!("Custom colors!");
}`}
  lang="rust"
  fileName="main.rs"
  theme="dark"
  headerColor="#2d1b4e"
  backgroundColor="#1a0f2e"
  showLineNumbers
/>
```

See [Customization](/guide/customization) for more color examples and presets.

## Sticky Headers

Pin the header while scrolling long code blocks. Uses `overflow: clip` internally so sticky positioning works reliably without breaking parent scroll context:

```tsx
const style = { maxHeight: "400px" };

<BxpCode
  code={longCodeString}
  lang="typescript"
  fileName="server.ts"
  theme="dark"
  stickyHeader
  stickyTop={64} // offset for a fixed navbar
  showLineNumbers
  style={style}
/>;
```

See [Sticky Headers](/guide/sticky-headers) for details on `overflow: clip` and best practices.

## Error Handling

Handle loading failures for `file` and `url` inputs:

```tsx
<BxpCode
  url="https://example.com/code.ts"
  theme="dark"
  onError={(error) => {
    console.error("Failed to load code:", error.message);
  }}
/>
```

## Inline Styles & Classes

```tsx
const style = { borderRadius: "12px", maxWidth: "600px" };

<BxpCode
  code={code}
  lang="typescript"
  theme="dark"
  style={style}
  className="my-code-block"
/>;
```

## Props Reference

For the complete props table, see the [BxpCode API Reference](/api/).

| Prop              | Type                     | Default  | Description                      |
| ----------------- | ------------------------ | -------- | -------------------------------- |
| `code`            | `string`                 | —        | Code string to highlight         |
| `file`            | `File`                   | —        | File object from input/drag-drop |
| `url`             | `string`                 | —        | URL to fetch code from           |
| `lang`            | `string`                 | auto     | Language for highlighting        |
| `fileName`        | `string`                 | auto     | File name displayed in header    |
| `theme`           | `"dark" \| "light"`      | `"dark"` | Color theme                      |
| `showHeader`      | `boolean`                | `true`   | Toggle header visibility         |
| `showLineNumbers` | `boolean`                | `false`  | Toggle line numbers              |
| `stickyHeader`    | `boolean`                | `false`  | Sticky header on scroll          |
| `stickyTop`       | `number`                 | `0`      | Sticky offset in pixels          |
| `headerColor`     | `string`                 | —        | Override header background       |
| `backgroundColor` | `string`                 | —        | Override code background         |
| `onError`         | `(error: Error) => void` | —        | Error callback                   |

→ [Full props table →](/api/)
