# Customization

Both `BxpCode` and `BxpCodeTabs` provide extensive customization options.

## BxpCode

### Hide the Header

```tsx
<BxpCode code="const minimal = true;" lang="javascript" showHeader={false} />
```

### Hide Language Badge or File Name

```tsx
<BxpCode code="const x = 1;" lang="typescript" showLang={false} />
<BxpCode code="const x = 1;" lang="typescript" showFileName={false} />
```

### Custom Header Color

```tsx
<BxpCode code="const branded = true;" lang="javascript" headerColor="#1a365d" />
```

### Custom Background Color

```tsx
<BxpCode
  code="const deep = true;"
  lang="javascript"
  headerColor="#1a1a2e"
  backgroundColor="#16213e"
/>
```

### Disable Copy Button

```tsx
<BxpCode code="const noCopy = true;" lang="javascript" showCopyButton={false} />
```

### Disable Line Numbers

```tsx
<BxpCode code={code} lang="typescript" showLineNumbers={false} />
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

## BxpCodeTabs

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

### Custom Border Color

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
    { lang: "vue", code: `<template><App /></template>` },
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
  tabs={[
    { lang: "rust", code: `fn main() { println!("styled!"); }` },
    { lang: "go", code: `func main() { fmt.Println("styled!") }` },
  ]}
/>
```
