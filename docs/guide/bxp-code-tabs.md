# BxpCodeTabs

Display multiple code blocks in a tabbed interface. Each tab can have its own language, label, and input source (code string, file, or URL).

## Import

```tsx
import { BxpCodeTabs } from "bxp-code";
```

## Basic Usage

Pass an array of tabs with `lang` (required) and `code`:

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
/>
```

::: info Auto-labels
When `label` is omitted, it's derived from `lang` with capitalized first letter — e.g. `lang: "typescript"` → tab label **Typescript**.
:::

## Custom Labels

Use `label` for display names that differ from the language:

```tsx
<BxpCodeTabs
  tabs={[
    { lang: "bash", label: "npm", code: "npm install bxp-code" },
    { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
    { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
    { lang: "bash", label: "bun", code: "bun add bxp-code" },
  ]}
  showLineNumbers={false}
/>
```

This is useful when multiple tabs share the same language but represent different tools, files, or contexts.

## From URL

Load code from a remote URL in any tab. The default URL below points to this project's own source — you can replace it with any raw URL:

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
  onError={(err) => console.error("URL load failed:", err)}
/>
```

Verify the source: [View App.tsx on GitHub](https://github.com/saqibbedar/bxp-code/blob/main/src/App.tsx)

::: tip
On refresh the default URL always loads. Users can override it in their own code with any URL that returns plain text.
:::

## From File Input

Add a file-upload tab that lets users pick a local file:

```tsx
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
          // Spread the file tab only when a file is selected
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
        onError={(err) => console.error("File read failed:", err)}
      />
    </div>
  );
}
```

::: info
The file appears as a new tab once uploaded. The language is auto-detected from the file extension. On page refresh the file tab disappears (since `File` objects don't persist).
:::

## Themes

### Dark (default)

```tsx
<BxpCodeTabs
  theme="dark"
  tabs={[
    { lang: "typescript", code: `const theme = "dark";` },
  ]}
/>
```

### Light

```tsx
<BxpCodeTabs
  theme="light"
  tabs={[
    { lang: "typescript", code: `const theme = "light";` },
  ]}
/>
```

## Customization

### Hide Copy Button

```tsx
<BxpCodeTabs
  showCopyButton={false}
  tabs={[{ lang: "sql", code: `SELECT * FROM users LIMIT 10;` }]}
/>
```

### Hide Tab Bar

When `showHeader` is `false`, only the active tab's content is displayed:

```tsx
<BxpCodeTabs
  showHeader={false}
  tabs={[{ lang: "bash", code: "echo 'No tabs visible'" }]}
/>
```

### Custom Colors

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

### Default Active Tab

Open the second tab by default:

```tsx
<BxpCodeTabs
  defaultTab={1}
  tabs={[
    { lang: "javascript", code: `console.log("Tab 0")` },
    { lang: "typescript", code: `console.log("Tab 1 — active by default")` },
  ]}
/>
```

## Sticky Header

Keep the tab bar pinned while scrolling:

```tsx
<BxpCodeTabs
  stickyHeader
  stickyTop={64} // offset for a fixed navbar
  style={{ maxHeight: "400px", overflow: "auto" }}
  tabs={[
    { lang: "typescript", code: longCodeString },
    { lang: "python", code: longPythonCode },
  ]}
/>
```

## Tab Type Reference

Each tab object has these fields:

| Field      | Type     | Required | Description                                                |
| ---------- | -------- | -------- | ---------------------------------------------------------- |
| `lang`     | `string` | **Yes**  | Language for highlighting (lowercased internally)          |
| `label`    | `string` | No       | Tab display text (defaults to capitalized `lang`)          |
| `code`     | `string` | No       | Code string (use this OR `file` / `url`)                   |
| `file`     | `File`   | No       | File object from `<input type="file">`                     |
| `url`      | `string` | No       | URL to fetch code from                                     |
| `fileName` | `string` | No       | Display name (auto-detected from `file` / `url` if absent) |
