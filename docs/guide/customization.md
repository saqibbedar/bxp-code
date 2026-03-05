---
outline: deep
---

# Customization

Both `BxpCode` and `BxpCodeTabs` provide extensive customization options for controlling visibility, colors, and layout.

## BxpCode

### Hide the Header

```tsx
<BxpCode
  code={`const minimal = true;`}
  lang="javascript"
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

### Custom Header & Background Colors

```tsx
<BxpCode
  code={`const branded = true;`}
  lang="javascript"
  theme="dark"
  headerColor="#1a1a2e"
  backgroundColor="#16213e"
/>
```

### Combining Options

```tsx
<BxpCode
  code={code}
  lang="typescript"
  fileName="example.ts"
  theme="dark"
  headerColor="#1a1a2e"
  backgroundColor="#16213e"
  showLineNumbers
  showCopyButton
  stickyHeader
  stickyTop={64}
/>
```

### Inline Styles

```tsx
const style = {
  borderRadius: "12px",
  maxWidth: "700px",
  maxHeight: "400px",
};

<BxpCode code={code} lang="typescript" theme="dark" style={style} />;
```

## BxpCodeTabs {#bxpcodetabs}

`BxpCodeTabs` provides color props for every visual element.

### Hide Tab Bar

```tsx
<BxpCodeTabs
  showHeader={false}
  tabs={[{ lang: "bash", code: "echo 'clean'" }]}
/>
```

### Hide Copy Button

```tsx
<BxpCodeTabs
  showCopyButton={false}
  tabs={[{ lang: "sql", code: "SELECT 1;" }]}
/>
```

### Custom Border

```tsx
<BxpCodeTabs
  borderColor="#d0d7de"
  tabs={[
    { lang: "javascript", code: "const a = 1;" },
    { lang: "typescript", code: "const a: number = 1;" },
  ]}
/>
```

### Custom Tab Indicator

```tsx
<BxpCodeTabs
  tabIndicatorColor="#0070f3"
  tabs={[
    { lang: "jsx", label: "React", code: `<App />` },
    { lang: "html", label: "Vue", code: `<template><App /></template>` },
  ]}
/>
```

### Full Color Override

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
  showLineNumbers
  tabs={[
    { lang: "rust", code: `fn main() { println!("styled!"); }` },
    { lang: "go", code: `func main() { fmt.Println("styled!") }` },
  ]}
/>
```

## Color Props Reference

### BxpCode

| Prop              | Description                |
| ----------------- | -------------------------- |
| `headerColor`     | Header background color    |
| `backgroundColor` | Code area background color |

→ [Full BxpCode props →](/api/)

### BxpCodeTabs

| Prop                 | Description                     |
| -------------------- | ------------------------------- |
| `headerColor`        | Tab bar background color        |
| `backgroundColor`    | Code area background color      |
| `borderColor`        | Container & header border color |
| `tabActiveColor`     | Active tab background           |
| `tabActiveTextColor` | Active tab text color           |
| `tabTextColor`       | Inactive tab text color         |
| `tabIndicatorColor`  | Active tab bottom indicator     |
| `copyButtonColor`    | Copy button background          |
| `lineNumberColor`    | Line number gutter text         |

→ [Full BxpCodeTabs props →](/api/bxp-code-tabs)
