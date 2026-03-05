---
outline: deep
---

# Themes

bxp-code ships with dark and light themes and supports full color customization on both `BxpCode` and `BxpCodeTabs`.

## Built-in Themes

### Dark Theme (Default)

::: code-group

```tsx [React (TSX)]
<BxpCode
  code={`const theme: string = "dark";`}
  lang="typescript"
  theme="dark"
/>
```

```jsx [React (JSX)]
<BxpCode code={`const theme = "dark";`} lang="javascript" theme="dark" />
```

:::

**Default colors:**

| Element    | Color     |
| ---------- | --------- |
| Header     | `#16161e` |
| Background | `#1a1b26` |
| Border     | `#2a2a3a` |

### Light Theme

::: code-group

```tsx [React (TSX)]
<BxpCode
  code={`const theme: string = "light";`}
  lang="typescript"
  theme="light"
/>
```

```jsx [React (JSX)]
<BxpCode code={`const theme = "light";`} lang="javascript" theme="light" />
```

:::

**Default colors:**

| Element    | Color     |
| ---------- | --------- |
| Header     | `#e8e8e8` |
| Background | `#fafafa` |
| Border     | `#d0d7de` |

## Custom Colors

Override theme colors with `headerColor` and `backgroundColor`:

```tsx
<BxpCode
  code={`// Ocean theme`}
  lang="javascript"
  theme="dark"
  headerColor="#1e3a5f"
  backgroundColor="#0d1b2a"
/>
```

### Color Presets

#### GitHub Dark

```tsx
<BxpCode
  code={`const github = "dark";`}
  lang="javascript"
  headerColor="#161b22"
  backgroundColor="#0d1117"
/>
```

#### Purple Night

```tsx
<BxpCode
  code={`const mood = "purple";`}
  lang="javascript"
  headerColor="#2d1b4e"
  backgroundColor="#1a0f2e"
/>
```

#### Forest

```tsx
<BxpCode
  code={`const nature = "forest";`}
  lang="javascript"
  headerColor="#1b3d2f"
  backgroundColor="#0f261c"
/>
```

## BxpCodeTabs Theming

`BxpCodeTabs` provides additional color props for fine-grained control:

```tsx
<BxpCodeTabs
  theme="dark"
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
    { lang: "rust", code: `fn main() { println!("Styled!"); }` },
    { lang: "go", code: `func main() { fmt.Println("Styled!") }` },
  ]}
/>
```

→ See [BxpCodeTabs Customization](/guide/customization#bxpcodetabs) for all color props.

## Dynamic Theme Switching

::: code-group

```tsx [React (TSX)]
import { useState } from "react";
import { BxpCode } from "bxp-code";

function ThemeSwitcher() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <div>
      <button
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        Toggle Theme
      </button>
      <BxpCode code={`const dynamic = true;`} lang="javascript" theme={theme} />
    </div>
  );
}
```

```jsx [React (JSX)]
import { useState } from "react";
import { BxpCode } from "bxp-code";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark");

  return (
    <div>
      <button
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        Toggle Theme
      </button>
      <BxpCode code={`const dynamic = true;`} lang="javascript" theme={theme} />
    </div>
  );
}
```

:::

## Color Reference

| Prop                 | Applies to    | Description                 |
| -------------------- | ------------- | --------------------------- |
| `headerColor`        | Both          | Header / tab bar background |
| `backgroundColor`    | Both          | Code area background        |
| `borderColor`        | `BxpCodeTabs` | Container & header border   |
| `tabActiveColor`     | `BxpCodeTabs` | Active tab background       |
| `tabActiveTextColor` | `BxpCodeTabs` | Active tab text             |
| `tabTextColor`       | `BxpCodeTabs` | Inactive tab text           |
| `tabIndicatorColor`  | `BxpCodeTabs` | Active tab bottom indicator |
| `copyButtonColor`    | `BxpCodeTabs` | Copy button background      |
| `lineNumberColor`    | `BxpCodeTabs` | Line number gutter text     |
