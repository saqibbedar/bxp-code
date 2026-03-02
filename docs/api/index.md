# API Reference

Complete props reference for bxp-code components.

## BxpCode

### Input Props

Provide **one of** these to supply the code content:

| Prop   | Type     | Description                                     |
| ------ | -------- | ----------------------------------------------- |
| `code` | `string` | Code string to highlight                        |
| `file` | `File`   | File object from `<input type="file">`          |
| `url`  | `string` | URL to fetch code from (must return plain text) |

Priority: `code` > `file` > `url`.

### Display Props

| Prop              | Type                | Default     | Description                        |
| ----------------- | ------------------- | ----------- | ---------------------------------- |
| `lang`            | `string`            | Auto-detect | Language for syntax highlighting   |
| `fileName`        | `string`            | Auto-detect | File name shown in header          |
| `theme`           | `"dark" \| "light"` | `"dark"`    | Color theme                        |
| `showHeader`      | `boolean`           | `true`      | Show/hide the header bar           |
| `showFileName`    | `boolean`           | `true`      | Show/hide file name in header      |
| `showLang`        | `boolean`           | `true`      | Show/hide language badge in header |
| `showCopyButton`  | `boolean`           | `true`      | Show/hide copy button              |
| `showLineNumbers` | `boolean`           | `true`      | Show/hide line numbers             |

### Sticky Header Props

| Prop           | Type      | Default | Description                       |
| -------------- | --------- | ------- | --------------------------------- |
| `stickyHeader` | `boolean` | `false` | Pin header on scroll              |
| `stickyTop`    | `number`  | `0`     | Offset from viewport top (pixels) |

### Color Props

| Prop              | Type     | Default       | Description             |
| ----------------- | -------- | ------------- | ----------------------- |
| `headerColor`     | `string` | Theme default | Header background color |
| `backgroundColor` | `string` | Theme default | Code area background    |

### Other Props

| Prop        | Type                     | Description                    |
| ----------- | ------------------------ | ------------------------------ |
| `style`     | `CSSProperties`          | Additional container styles    |
| `className` | `string`                 | Additional CSS class           |
| `onError`   | `(error: Error) => void` | Callback for file/url failures |

### TypeScript Type

```typescript
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

---

## BxpCodeTabs

### Tab Object (`BxpCodeTab`)

Each item in the `tabs` array:

| Field      | Type     | Required | Description                                        |
| ---------- | -------- | -------- | -------------------------------------------------- |
| `lang`     | `string` | **Yes**  | Language identifier (lowercased internally)        |
| `label`    | `string` | No       | Tab display label (defaults to capitalized `lang`) |
| `code`     | `string` | No       | Code string (use this OR `file` / `url`)           |
| `file`     | `File`   | No       | File object from `<input type="file">`             |
| `url`      | `string` | No       | URL to fetch code from                             |
| `fileName` | `string` | No       | Display name (auto-detected from `file` / `url`)   |

### Component Props (`BxpCodeTabsProps`)

| Prop                 | Type                     | Default       | Description                        |
| -------------------- | ------------------------ | ------------- | ---------------------------------- |
| `tabs`               | `BxpCodeTab[]`           | —             | **Required.** Array of tab configs |
| `theme`              | `"dark" \| "light"`      | `"dark"`      | Color theme                        |
| `showLineNumbers`    | `boolean`                | `true`        | Show/hide line numbers             |
| `showCopyButton`     | `boolean`                | `true`        | Show/hide hover copy button        |
| `showHeader`         | `boolean`                | `true`        | Show/hide the tab bar entirely     |
| `stickyHeader`       | `boolean`                | `false`       | Pin tab bar on scroll              |
| `stickyTop`          | `number`                 | `0`           | Sticky offset from top (pixels)    |
| `defaultTab`         | `number`                 | `0`           | Initially active tab index         |
| `headerColor`        | `string`                 | Theme default | Tab bar background color           |
| `backgroundColor`    | `string`                 | Theme default | Code area background color         |
| `borderColor`        | `string`                 | Theme default | Container & header border color    |
| `tabActiveColor`     | `string`                 | Theme default | Active tab background color        |
| `tabActiveTextColor` | `string`                 | Theme default | Active tab text color              |
| `tabTextColor`       | `string`                 | Theme default | Inactive tab text color            |
| `tabIndicatorColor`  | `string`                 | `#e06b74`     | Active tab bottom indicator color  |
| `copyButtonColor`    | `string`                 | Theme default | Copy button background color       |
| `lineNumberColor`    | `string`                 | Theme default | Line number gutter text color      |
| `style`              | `CSSProperties`          | —             | Additional container styles        |
| `className`          | `string`                 | —             | Additional CSS class               |
| `onError`            | `(error: Error) => void` | —             | Callback for file/url failures     |

### TypeScript Types

```typescript
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

---

## Exports

```typescript
import { BxpCode, BxpCodeTabs } from "bxp-code";
import type { BxpCodeProps, BxpCodeTabsProps, BxpCodeTab } from "bxp-code";
```
