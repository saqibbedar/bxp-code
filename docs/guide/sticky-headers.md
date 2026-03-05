---
outline: deep
---

# Sticky Headers

Pin file names and tab bars while scrolling through long code blocks.

## How It Works

Enable sticky headers with the `stickyHeader` prop. The header stays pinned at the top of the viewport (or offset by `stickyTop` pixels) while the code scrolls beneath it.

### The `overflow: clip` Approach

Sticky positioning (`position: sticky`) breaks when any ancestor has `overflow: hidden`. bxp-code solves this by using `overflow: clip` on the container instead:

- **`overflow: hidden`** — Creates a new scroll context, breaking `position: sticky`
- **`overflow: clip`** — Clips overflowing content like `hidden`, but **does not** create a scroll context, so sticky works correctly

This is handled internally — you don't need to do anything. But if you wrap `BxpCode` or `BxpCodeTabs` in your own container, make sure to use `overflow: clip` instead of `overflow: hidden` on parent elements:

```css
/* ❌ Breaks sticky headers */
.parent {
  overflow: hidden;
}

/* ✅ Works with sticky headers */
.parent {
  overflow: clip;
}
```

## BxpCode — Sticky Header

::: code-group

```tsx [React (TSX)]
import { BxpCode } from "bxp-code";

<BxpCode
  code={longCodeString}
  lang="typescript"
  fileName="server.ts"
  theme="dark"
  stickyHeader
  stickyTop={64}
  showLineNumbers
/>;
```

```jsx [React (JSX)]
import { BxpCode } from "bxp-code";

<BxpCode
  code={longCodeString}
  lang="javascript"
  fileName="server.js"
  theme="dark"
  stickyHeader
  stickyTop={64}
  showLineNumbers
/>;
```

:::

### With Container Height

Set a maximum height to enable internal scrolling:

```tsx
const style = { maxHeight: "400px" };

<BxpCode
  code={longCodeString}
  lang="typescript"
  fileName="api.ts"
  theme="dark"
  stickyHeader
  stickyTop={0}
  showLineNumbers
  style={style}
/>;
```

### Full Example

```tsx
const serverCode = `
import express from 'express';
const app = express();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', async (req, res) => {
  const users = await db.users.findMany();
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
`;

const style = { maxHeight: "300px" };

<BxpCode
  code={serverCode}
  lang="typescript"
  fileName="server.ts"
  theme="dark"
  stickyHeader
  stickyTop={0}
  showLineNumbers
  style={style}
/>;
```

## BxpCodeTabs — Sticky Tab Bar

The tab bar stays pinned while you scroll through the active tab's content:

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

## `stickyTop` Offset

If your app has a fixed navbar, set `stickyTop` to the navbar's height so the sticky header doesn't overlap:

```tsx
// Navbar is 64px tall
<BxpCode code={code} lang="typescript" stickyHeader stickyTop={64} />
```

| Value  | Use Case                     |
| ------ | ---------------------------- |
| `0`    | No fixed navbar              |
| `64`   | Standard navbar              |
| Custom | Your navbar height in pixels |

## Best Practices

1. **Use with long code** — Sticky headers are most useful when code exceeds the viewport height
2. **Set max height** — Combine with a `maxHeight` style for contained scrollable areas
3. **Account for navbars** — Use `stickyTop` to offset below fixed headers
4. **Avoid `overflow: hidden` on parents** — Use `overflow: clip` instead to preserve sticky behavior
5. **Both components** — Works identically on `BxpCode` and `BxpCodeTabs`

## Props Reference

| Prop           | Type      | Default | Component |
| -------------- | --------- | ------- | --------- |
| `stickyHeader` | `boolean` | `false` | Both      |
| `stickyTop`    | `number`  | `0`     | Both      |

→ [BxpCode API Reference](/api/) · [BxpCodeTabs API Reference](/api/bxp-code-tabs)
