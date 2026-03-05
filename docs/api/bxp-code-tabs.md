---
outline: deep
---

# BxpCodeTabs — API Reference

Complete props reference for the `BxpCodeTabs` component and the `BxpCodeTab` type.

## Import

::: code-group

```tsx [React (TSX)]
import { BxpCodeTabs } from "bxp-code";
import type { BxpCodeTabsProps, BxpCodeTab } from "bxp-code";
```

```jsx [React (JSX)]
import { BxpCodeTabs } from "bxp-code";
```

:::

## BxpCodeTab

Each item in the `tabs` array:

| Field      | Type     | Required | Description                                                  |
| ---------- | -------- | -------- | ------------------------------------------------------------ |
| `lang`     | `string` | **Yes**  | Language identifier for highlighting (lowercased internally) |
| `label`    | `string` | No       | Tab display label. Defaults to capitalized `lang`            |
| `code`     | `string` | No       | Code string (use this OR `file`/`url`)                       |
| `file`     | `File`   | No       | File object from `<input type="file">`                       |
| `url`      | `string` | No       | URL to fetch code from                                       |
| `fileName` | `string` | No       | Display name. Auto-detected from `file`/`url` if absent      |

### Input Priority

Within each tab, priority is: `code` > `file` > `url`.

## Component Props

### Required

| Prop   | Type           | Description                 |
| ------ | -------------- | --------------------------- |
| `tabs` | `BxpCodeTab[]` | Array of tab configurations |

### Display Props

| Prop              | Type                | Default  | Description                                                                        |
| ----------------- | ------------------- | -------- | ---------------------------------------------------------------------------------- |
| `theme`           | `"dark" \| "light"` | `"dark"` | Color theme                                                                        |
| `showLineNumbers` | `boolean`           | `false`  | Show/hide line numbers                                                             |
| `showCopyButton`  | `boolean`           | `true`   | Show/hide copy-to-clipboard button (appears on hover)                              |
| `showHeader`      | `boolean`           | `true`   | Show/hide the tab bar entirely. When hidden, the `defaultTab` content is displayed |
| `defaultTab`      | `number`            | `0`      | Initially active tab index (zero-based)                                            |

### Sticky Header Props

| Prop           | Type      | Default | Description                                             |
| -------------- | --------- | ------- | ------------------------------------------------------- |
| `stickyHeader` | `boolean` | `false` | Pin tab bar on scroll. Uses `overflow: clip` internally |
| `stickyTop`    | `number`  | `0`     | Sticky offset from top in pixels                        |

→ See [Sticky Headers guide](/guide/sticky-headers) for details.

### Color Props

| Prop                 | Type     | Default       | Description                       |
| -------------------- | -------- | ------------- | --------------------------------- |
| `headerColor`        | `string` | Theme default | Tab bar background color          |
| `backgroundColor`    | `string` | Theme default | Code area background color        |
| `borderColor`        | `string` | Theme default | Container & header border color   |
| `tabActiveColor`     | `string` | Theme default | Active tab background color       |
| `tabActiveTextColor` | `string` | Theme default | Active tab text color             |
| `tabTextColor`       | `string` | Theme default | Inactive tab text color           |
| `tabIndicatorColor`  | `string` | `#e06b74`     | Active tab bottom indicator color |
| `copyButtonColor`    | `string` | Theme default | Copy button background color      |
| `lineNumberColor`    | `string` | Theme default | Line number gutter text color     |

→ See [Themes guide](/guide/themes) and [Customization guide](/guide/customization) for presets.

### Other Props

| Prop        | Type                     | Description                                |
| ----------- | ------------------------ | ------------------------------------------ |
| `style`     | `CSSProperties`          | Additional inline styles on the container  |
| `className` | `string`                 | Additional CSS class on the container      |
| `onError`   | `(error: Error) => void` | Callback for `file`/`url` loading failures |

## TypeScript Types

```typescript
import type { CSSProperties } from "react";

type BxpCodeTab = {
  lang: string;
  label?: string;
  code?: string;
  file?: File;
  url?: string;
  fileName?: string;
};

type BxpCodeTabsProps = {
  tabs: BxpCodeTab[];
  theme?: "dark" | "light";
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showHeader?: boolean;
  stickyHeader?: boolean;
  stickyTop?: number;
  defaultTab?: number;
  headerColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  tabActiveColor?: string;
  tabActiveTextColor?: string;
  tabTextColor?: string;
  tabIndicatorColor?: string;
  copyButtonColor?: string;
  lineNumberColor?: string;
  style?: CSSProperties;
  className?: string;
  onError?: (error: Error) => void;
};
```

## Usage Examples

### Minimal

```tsx
<BxpCodeTabs
  tabs={[
    { lang: "javascript", code: `console.log("hello")` },
    { lang: "python", code: `print("hello")` },
  ]}
/>
```

### Full-featured

```tsx
<BxpCodeTabs
  tabs={[
    { lang: "bash", label: "npm", code: "npm install bxp-code" },
    { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
    { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
    { lang: "bash", label: "bun", code: "bun add bxp-code" },
  ]}
  theme="dark"
  showLineNumbers
  showCopyButton
  stickyHeader
  stickyTop={64}
  defaultTab={0}
  headerColor="#161b22"
  backgroundColor="#0d1117"
  borderColor="#30363d"
  tabActiveColor="#161b22"
  tabActiveTextColor="#f0f6fc"
  tabTextColor="#8b949e"
  tabIndicatorColor="#e06b74"
  copyButtonColor="rgba(22, 27, 34, 0.9)"
  lineNumberColor="#484f58"
  style={{ maxHeight: "400px" }}
  className="my-tabs"
  onError={(err) => console.error(err)}
/>
```

## Exports

```typescript
import { BxpCode, BxpCodeTabs } from "bxp-code";
import type { BxpCodeProps, BxpCodeTabsProps, BxpCodeTab } from "bxp-code";
```

→ [BxpCode API Reference](/api/)
