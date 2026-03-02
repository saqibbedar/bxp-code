# Troubleshooting

Common issues and solutions when using bxp-code.

## Installation Issues

### Peer Dependency Warnings

If you see peer dependency warnings:

```bash
npm install bxp-code --legacy-peer-deps
```

### TypeScript Errors

Ensure you have the correct TypeScript version:

```bash
npm install typescript@^5.0.0 --save-dev
```

## Runtime Issues

### Blank/Empty Output

**Cause:** Shiki highlighter hasn't loaded yet.

**Solution:** The component handles loading internally. If issues persist, wrap in Suspense:

```tsx
import { Suspense } from "react";
import { BxpCode } from "bxp-code";

<Suspense fallback={<div>Loading...</div>}>
  <BxpCode code={code} lang="javascript" />
</Suspense>;
```

### Unsupported Language

**Cause:** Language not recognized by Shiki.

**Solution:** Check the [Shiki languages list](https://shiki.style/languages) for supported languages. Use `text` or `plaintext` as fallback.

### Formatting Errors

**Cause:** Prettier can't parse the code.

**Solution:** Disable formatting for problematic code:

```tsx
<BxpCode code={problematicCode} lang="text" formatCode={false} />
```

## Styling Issues

### Code Overflow

**Solution:** Set a max width or use overflow styles:

```tsx
<div style={{ maxWidth: "100%", overflow: "auto" }}>
  <BxpCode code={code} lang="javascript" />
</div>
```

### Theme Not Applying

**Cause:** CSS specificity conflicts.

**Solution:** Use the color props directly:

```tsx
<BxpCode
  code={code}
  lang="javascript"
  headerColor="#1a1a1a"
  backgroundColor="#0d0d0d"
/>
```

### Sticky Header Not Working

**Cause:** Parent container has `overflow: hidden`.

**Solution:** Ensure parent containers allow overflow:

```css
.parent-container {
  overflow: visible;
}
```

## Performance Issues

### Slow Initial Load

**Cause:** Shiki grammar loading.

**Solution:** Shiki loads grammars on-demand. First render may be slower.

### Large Code Blocks

**Solution:** Use `maxHeight` to virtualize display:

```tsx
<BxpCode code={veryLongCode} lang="typescript" maxHeight="500px" />
```

## Still Having Issues?

1. Check the [GitHub Issues](https://github.com/saqibbedar/bxp-code/issues)
2. Open a new issue with:
   - bxp-code version
   - React version
   - Code sample reproducing the issue
   - Error messages (if any)
