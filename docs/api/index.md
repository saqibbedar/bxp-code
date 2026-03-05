---
outline: deep
---

# BxpCode — API Reference

Complete props reference for the `BxpCode` component.

## Import

::: code-group

```tsx [React (TSX)]
import { BxpCode } from "bxp-code";
import type { BxpCodeProps } from "bxp-code";
```

```jsx [React (JSX)]
import { BxpCode } from "bxp-code";
```

:::

## Input Props

Provide **one** of these to supply the code content. Priority: `code` > `file` > `url`.

| Prop   | Type     | Description                                         |
| ------ | -------- | --------------------------------------------------- |
| `code` | `string` | Code string to highlight                            |
| `file` | `File`   | File object from `<input type="file">` or drag-drop |
| `url`  | `string` | URL to fetch code from (must return plain text)     |

## Display Props

| Prop              | Type                | Default     | Description                                                                                       |
| ----------------- | ------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `lang`            | `string`            | Auto-detect | Language for syntax highlighting. Auto-detected from `fileName`, `file`, or `url` if not provided |
| `fileName`        | `string`            | Auto-detect | File name shown in header. Auto-detected from `file` or `url` if not provided                     |
| `theme`           | `"dark" \| "light"` | `"dark"`    | Color theme                                                                                       |
| `showHeader`      | `boolean`           | `true`      | Show/hide the entire header bar                                                                   |
| `showFileName`    | `boolean`           | `true`      | Show/hide file name in header                                                                     |
| `showLang`        | `boolean`           | `true`      | Show/hide language badge in header                                                                |
| `showCopyButton`  | `boolean`           | `true`      | Show/hide copy-to-clipboard button                                                                |
| `showLineNumbers` | `boolean`           | `false`     | Show/hide line numbers                                                                            |

## Sticky Header Props

| Prop           | Type      | Default | Description                                                                  |
| -------------- | --------- | ------- | ---------------------------------------------------------------------------- |
| `stickyHeader` | `boolean` | `false` | Pin header on scroll. Uses `overflow: clip` internally for reliable behavior |
| `stickyTop`    | `number`  | `0`     | Offset from viewport top in pixels (useful for fixed navbars)                |

→ See [Sticky Headers guide](/guide/sticky-headers) for details on the `overflow: clip` approach.

## Color Props

| Prop              | Type     | Default       | Description                         |
| ----------------- | -------- | ------------- | ----------------------------------- |
| `headerColor`     | `string` | Theme default | Override header background color    |
| `backgroundColor` | `string` | Theme default | Override code area background color |

→ See [Themes guide](/guide/themes) for color presets and examples.

## Other Props

| Prop        | Type                     | Description                                |
| ----------- | ------------------------ | ------------------------------------------ |
| `style`     | `CSSProperties`          | Additional inline styles on the container  |
| `className` | `string`                 | Additional CSS class on the container      |
| `onError`   | `(error: Error) => void` | Callback for `file`/`url` loading failures |

## TypeScript Type

```typescript
import type { CSSProperties } from "react";

type BxpCodeProps = {
  code?: string;
  file?: File;
  url?: string;
  lang?: string;
  fileName?: string;
  theme?: "dark" | "light";
  showHeader?: boolean;
  showFileName?: boolean;
  showLang?: boolean;
  showCopyButton?: boolean;
  showLineNumbers?: boolean;
  stickyHeader?: boolean;
  stickyTop?: number;
  headerColor?: string;
  backgroundColor?: string;
  style?: CSSProperties;
  className?: string;
  onError?: (error: Error) => void;
};
```

## Usage Examples

### Minimal

```tsx
<BxpCode code={`print("hello")`} lang="python" />
```

### Full-featured

```tsx
<BxpCode
  code={code}
  lang="typescript"
  fileName="server.ts"
  theme="dark"
  showHeader
  showFileName
  showLang
  showCopyButton
  showLineNumbers
  stickyHeader
  stickyTop={64}
  headerColor="#161b22"
  backgroundColor="#0d1117"
  style={{ maxHeight: "500px", borderRadius: "12px" }}
  className="my-code-block"
  onError={(err) => console.error(err)}
/>
```

→ [BxpCodeTabs API Reference](/api/bxp-code-tabs)
