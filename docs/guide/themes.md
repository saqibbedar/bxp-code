# Themes

bxp-code comes with built-in themes and supports full color customization.

## Built-in Themes

### Dark Theme (Default)

```tsx
<BxpCode code="const theme = 'dark';" lang="javascript" theme="dark" />
```

**Colors:**

- Header: `#16161e`
- Background: `#1a1b26`

### Light Theme

```tsx
<BxpCode code="const theme = 'light';" lang="javascript" theme="light" />
```

**Colors:**

- Header: `#e8e8e8`
- Background: `#fafafa`

## Custom Colors

Override colors with `headerColor` and `backgroundColor`:

```tsx
<BxpCode
  code="// Ocean theme"
  lang="javascript"
  headerColor="#1e3a5f"
  backgroundColor="#0d1b2a"
/>
```

### Theme Examples

#### GitHub Dark

```tsx
<BxpCode
  code="const github = 'dark';"
  lang="javascript"
  headerColor="#161b22"
  backgroundColor="#0d1117"
/>
```

#### Purple Night

```tsx
<BxpCode
  code="const mood = 'purple';"
  lang="javascript"
  headerColor="#2d1b4e"
  backgroundColor="#1a0f2e"
/>
```

#### Forest

```tsx
<BxpCode
  code="const nature = 'forest';"
  lang="javascript"
  headerColor="#1b3d2f"
  backgroundColor="#0f261c"
/>
```

## Color Reference

| Theme | Header    | Background |
| ----- | --------- | ---------- |
| Dark  | `#16161e` | `#1a1b26`  |
| Light | `#e8e8e8` | `#fafafa`  |

## Dynamic Theme Switching

```tsx
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
      <BxpCode code="const dynamic = true;" lang="javascript" theme={theme} />
    </div>
  );
}
```
