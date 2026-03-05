---
outline: deep
---

# BxpCodeTabs

Display multiple code blocks in a tabbed interface. Each tab can have its own language, label, and input source — code string, file, or URL.

## Import

::: code-group

```tsx [React (TSX)]
import { BxpCodeTabs } from "bxp-code";
import type { BxpCodeTabsProps, BxpCodeTab } from "bxp-code"; // optional
```

```jsx [React (JSX)]
import { BxpCodeTabs } from "bxp-code";
```

:::

## Basic Usage

Pass an array of tabs. Each tab requires `lang`; `label` is auto-derived if omitted:

```tsx
<BxpCodeTabs
  tabs={[
    {
      lang: "typescript",
      code: `const greet = (name: string): string => \`Hello, \${name}!\`;`,
    },
    {
      lang: "python",
      code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
    },
    {
      lang: "go",
      code: `func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}`,
    },
  ]}
  theme="dark"
/>
```

::: info Auto-labels
When `label` is omitted, it's derived from `lang` with the first letter capitalized — e.g., `lang: "typescript"` → tab label **Typescript**.
:::

## Custom Labels

Use `label` for display names that differ from the language — useful when multiple tabs share the same language:

```tsx
<BxpCodeTabs
  tabs={[
    { lang: "bash", label: "npm", code: "npm install bxp-code" },
    { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
    { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
    { lang: "bash", label: "bun", code: "bun add bxp-code" },
  ]}
  theme="dark"
/>
```

## From URL

Load code from a remote URL in any tab:

```tsx
<BxpCodeTabs
  tabs={[
    {
      lang: "typescript",
      label: "Local",
      code: `import { BxpCode } from "bxp-code";

export default function Demo() {
  return <BxpCode code="console.log('hi')" lang="javascript" />;
}`,
    },
    {
      lang: "typescript",
      label: "From URL",
      url: "https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx",
      fileName: "App.tsx",
    },
  ]}
  theme="dark"
  onError={(err) => console.error("URL load failed:", err)}
/>
```

::: tip
Any URL that returns plain text works. Raw GitHub URLs are ideal.
:::

## From File Input

Add a file-upload tab dynamically:

::: code-group

```tsx [React (TSX)]
import { useState } from "react";
import { BxpCodeTabs } from "bxp-code";

function FileTabsDemo() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <input
        type="file"
        accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json,.go,.rs"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <BxpCodeTabs
        tabs={[
          {
            lang: "javascript",
            label: "Inline",
            code: `const sum = (a, b) => a + b;`,
          },
          ...(file
            ? [
                {
                  lang: file.name.split(".").pop()?.toLowerCase() || "text",
                  label: file.name,
                  file: file,
                },
              ]
            : []),
        ]}
        theme="dark"
        onError={(err) => console.error("File read failed:", err)}
      />
    </div>
  );
}
```

```jsx [React (JSX)]
import { useState } from "react";
import { BxpCodeTabs } from "bxp-code";

function FileTabsDemo() {
  const [file, setFile] = useState(null);

  return (
    <div>
      <input
        type="file"
        accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json,.go,.rs"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <BxpCodeTabs
        tabs={[
          {
            lang: "javascript",
            label: "Inline",
            code: "const sum = (a, b) => a + b;",
          },
          ...(file
            ? [
                {
                  lang: file.name.split(".").pop()?.toLowerCase() || "text",
                  label: file.name,
                  file: file,
                },
              ]
            : []),
        ]}
        theme="dark"
        onError={(err) => console.error("File read failed:", err)}
      />
    </div>
  );
}
```

:::

::: info
The file appears as a new tab once selected. Language is auto-detected from the file extension. On page refresh the file tab disappears since `File` objects don't persist.
:::

## Themes

### Dark (default)

```tsx
<BxpCodeTabs
  theme="dark"
  tabs={[{ lang: "typescript", code: `const theme = "dark";` }]}
/>
```

### Light

```tsx
<BxpCodeTabs
  theme="light"
  tabs={[{ lang: "typescript", code: `const theme = "light";` }]}
/>
```

## Display Options

### Hide Copy Button

```tsx
<BxpCodeTabs
  showCopyButton={false}
  tabs={[{ lang: "sql", code: `SELECT * FROM users LIMIT 10;` }]}
/>
```

### Hide Tab Bar

When `showHeader` is `false`, only the active (or `defaultTab`) tab's content is displayed:

```tsx
<BxpCodeTabs
  showHeader={false}
  tabs={[{ lang: "bash", code: "echo 'No tabs visible'" }]}
/>
```

### Default Active Tab

Open a specific tab by default (zero-indexed):

```tsx
<BxpCodeTabs
  defaultTab={1}
  tabs={[
    { lang: "javascript", code: `console.log("Tab 0")` },
    { lang: "typescript", code: `console.log("Tab 1 — active by default")` },
  ]}
/>
```

## Color Customization

Full color control over every part of the component:

```tsx
<BxpCodeTabs
  headerColor="#1e1e2e"
  backgroundColor="#181825"
  borderColor="#45475a"
  tabIndicatorColor="#cba6f7"
  tabActiveColor="#1e1e2e"
  tabActiveTextColor="#cdd6f4"
  tabTextColor="#6c7086"
  copyButtonColor="rgba(30, 30, 46, 0.9)"
  lineNumberColor="#585b70"
  tabs={[
    {
      lang: "rust",
      code: `fn main() {
    println!("Catppuccin-themed!");
}`,
    },
    {
      lang: "cpp",
      label: "C++",
      code: `#include <iostream>
int main() {
    std::cout << "Custom colors!" << std::endl;
    return 0;
}`,
    },
  ]}
/>
```

See [Customization](/guide/customization) for more color presets.

## Sticky Tab Bar

Keep the tab bar pinned while scrolling long content. Uses `overflow: clip` internally for reliable behavior:

```tsx
const style = { maxHeight: "400px", overflow: "auto" };

<BxpCodeTabs
  stickyHeader
  stickyTop={64}
  style={style}
  tabs={[
    { lang: "typescript", code: longTsCode },
    { lang: "python", code: longPyCode },
  ]}
/>;
```

See [Sticky Headers](/guide/sticky-headers) for details.

## Tab Type Reference

Each tab object accepts these fields:

| Field      | Type     | Required | Description                                       |
| ---------- | -------- | -------- | ------------------------------------------------- |
| `lang`     | `string` | **Yes**  | Language for highlighting (lowercased internally) |
| `label`    | `string` | No       | Tab display text (defaults to capitalized `lang`) |
| `code`     | `string` | No       | Code string (use this OR `file`/`url`)            |
| `file`     | `File`   | No       | File object from `<input type="file">`            |
| `url`      | `string` | No       | URL to fetch code from                            |
| `fileName` | `string` | No       | Display name (auto-detected from `file`/`url`)    |

→ [Full BxpCodeTabs props table →](/api/bxp-code-tabs)
