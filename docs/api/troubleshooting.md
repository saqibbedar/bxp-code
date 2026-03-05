---
outline: deep
---

# Troubleshooting

Common issues and solutions when using bxp-code.

## Installation Issues

### Peer Dependency Warnings

If you see peer dependency warnings during installation:

```bash
npm install bxp-code --legacy-peer-deps
```

### TypeScript Version

bxp-code requires TypeScript 5.0+. If you see type errors:

```bash
npm install typescript@^5.0.0 --save-dev
```

## Runtime Issues

### Blank or Empty Output

**Cause:** Shiki highlighter is still loading (it loads grammars asynchronously).

**Solution:** This resolves automatically after the first render. The component handles the loading state internally. If you need to show a placeholder, wrap in React Suspense:

::: code-group

```tsx [React (TSX)]
import { Suspense } from "react";
import { BxpCode } from "bxp-code";

<Suspense fallback={<div>Loading...</div>}>
  <BxpCode code={code} lang="javascript" theme="dark" />
</Suspense>;
```

```jsx [React (JSX)]
import { Suspense } from "react";
import { BxpCode } from "bxp-code";

<Suspense fallback={<div>Loading...</div>}>
  <BxpCode code={code} lang="javascript" theme="dark" />
</Suspense>;
```

:::

### Unsupported Language

**Cause:** Language identifier not recognized by Shiki.

**Solution:** Check the [Shiki languages list](https://shiki.style/languages) for supported identifiers. Use `"text"` or `"plaintext"` as a fallback.

### Formatting Doesn't Apply

**Cause:** Prettier doesn't support the language (e.g., Python, Rust, Go).

**Solution:** This is expected behavior. Prettier supports JavaScript, TypeScript, JSX, TSX, HTML, CSS, SCSS, Less, JSON, Markdown, YAML, and GraphQL. For other languages, format your code before passing it to the component.

### URL Fetch Fails

**Cause:** CORS restrictions, network issues, or non-text response.

**Solution:**

1. Ensure the URL returns plain text (raw GitHub URLs work well)
2. Check for CORS headers on the server
3. Use the `onError` callback to handle failures gracefully:

```tsx
<BxpCode
  url="https://example.com/code.ts"
  theme="dark"
  onError={(err) => console.error("Failed:", err.message)}
/>
```

## Styling Issues

### Code Overflows Container

**Solution:** Wrap in a container with max-width, or use the `style` prop:

```tsx
<BxpCode
  code={code}
  lang="javascript"
  theme="dark"
  style={{ maxWidth: "100%" }}
/>
```

### Theme Colors Not Applying

**Cause:** CSS specificity conflicts with your app's styles.

**Solution:** Use the color props directly instead of CSS overrides:

```tsx
<BxpCode
  code={code}
  lang="javascript"
  headerColor="#1a1a1a"
  backgroundColor="#0d0d0d"
/>
```

### Sticky Header Not Working

**Cause:** A parent container has `overflow: hidden`, which breaks `position: sticky`.

**Solution:** Replace `overflow: hidden` with `overflow: clip` on parent containers:

```css
/* ❌ Breaks sticky */
.parent {
  overflow: hidden;
}

/* ✅ Works with sticky */
.parent {
  overflow: clip;
}
```

→ See [Sticky Headers guide](/guide/sticky-headers) for details.

## Performance

### Slow Initial Render

**Cause:** Shiki loads grammars on-demand the first time a language is used.

**Solution:** This is a one-time cost per language. Subsequent renders of the same language are fast. For the best user experience, lazy-load code blocks that are below the fold.

### Large Code Blocks

**Solution:** Use `maxHeight` via the `style` prop to limit visible area:

```tsx
<BxpCode
  code={veryLongCode}
  lang="typescript"
  theme="dark"
  style={{ maxHeight: "500px" }}
/>
```

## Still Having Issues?

1. Check existing [GitHub Issues](https://github.com/saqibbedar/bxp-code/issues)
2. Open a new issue with:
   - bxp-code version
   - React version
   - Minimal code sample reproducing the issue
   - Error messages (if any)
3. Reach out via [GitHub Discussions](https://github.com/saqibbedar/bxp-code/discussions)
