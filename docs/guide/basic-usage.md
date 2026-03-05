---
outline: deep
---

# Basic Usage

Common patterns and input methods for bxp-code components.

## Three Ways to Provide Code

Both `BxpCode` and `BxpCodeTabs` accept code from three sources. If multiple are provided, priority is: `code` > `file` > `url`.

### 1. Code String

The simplest approach — pass a string directly:

::: code-group

```tsx [React (TSX)]
import { BxpCode } from "bxp-code";

const App = () => (
  <BxpCode
    code={`function hello(name: string) {
  console.log(\`Hello, \${name}!\`);
}`}
    lang="typescript"
    fileName="greet.ts"
    theme="dark"
  />
);
```

```jsx [React (JSX)]
import { BxpCode } from "bxp-code";

const App = () => (
  <BxpCode
    code={`function hello(name) {
  console.log(\`Hello, \${name}!\`);
}`}
    lang="javascript"
    fileName="greet.js"
    theme="dark"
  />
);
```

:::

### 2. File Upload

Let users upload and preview code files. Language is auto-detected from the file extension:

::: code-group

```tsx [React (TSX)]
import { useState } from "react";
import { BxpCode } from "bxp-code";

function FileUploadDemo() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <input
        type="file"
        accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json,.go,.rs"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      {file && (
        <BxpCode
          file={file}
          theme="dark"
          showLineNumbers
          onError={(err) => console.error("Read failed:", err)}
        />
      )}
    </div>
  );
}
```

```jsx [React (JSX)]
import { useState } from "react";
import { BxpCode } from "bxp-code";

function FileUploadDemo() {
  const [file, setFile] = useState(null);

  return (
    <div>
      <input
        type="file"
        accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json,.go,.rs"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      {file && (
        <BxpCode
          file={file}
          theme="dark"
          showLineNumbers
          onError={(err) => console.error("Read failed:", err)}
        />
      )}
    </div>
  );
}
```

:::

::: info How it works
When you pass a `file` prop, BxpCode reads it with `FileReader`, auto-detects the language from the file extension, and highlights it. The file name is displayed in the header automatically.
:::

### 3. URL Fetch

Fetch code from any URL that returns plain text:

::: code-group

```tsx [React (TSX)]
import { BxpCode } from "bxp-code";

const App = () => (
  <BxpCode
    url="https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx"
    theme="dark"
    showLineNumbers
    onError={(err) => console.error("Failed to load:", err)}
  />
);
```

```jsx [React (JSX)]
import { BxpCode } from "bxp-code";

const App = () => (
  <BxpCode
    url="https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx"
    theme="dark"
    showLineNumbers
    onError={(err) => console.error("Failed to load:", err)}
  />
);
```

:::

::: tip
Raw GitHub URLs work great. The language and file name are auto-detected from the URL path.
:::

## Auto-Formatting with Prettier

bxp-code includes Prettier and automatically formats code on render. This means even poorly formatted or copy-pasted code will display cleanly.

Prettier supports formatting for: JavaScript, TypeScript, JSX, TSX, HTML, CSS, SCSS, Less, JSON, Markdown, YAML, and GraphQL.

::: warning
For languages Prettier doesn't support (e.g., Python, Rust, Go), code is displayed as-is. For best results with those languages, format your code before passing it to the component.
:::

## Dynamic Code

Use React state to display code that changes at runtime:

::: code-group

```tsx [React (TSX)]
import { useState } from "react";
import { BxpCode } from "bxp-code";

function LiveEditor() {
  const [code, setCode] = useState<string>('console.log("Hello")');

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={4}
      />
      <BxpCode code={code} lang="javascript" theme="dark" />
    </div>
  );
}
```

```jsx [React (JSX)]
import { useState } from "react";
import { BxpCode } from "bxp-code";

function LiveEditor() {
  const [code, setCode] = useState('console.log("Hello")');

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={4}
      />
      <BxpCode code={code} lang="javascript" theme="dark" />
    </div>
  );
}
```

:::

## Multi-Language Examples

### Python

```tsx
<BxpCode
  code={`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`}
  lang="python"
  fileName="fibonacci.py"
  theme="dark"
/>
```

### JSON

```tsx
<BxpCode
  code={`{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0",
    "bxp-code": "^1.0.0"
  }
}`}
  lang="json"
  fileName="package.json"
  theme="dark"
/>
```

### CSS

```tsx
<BxpCode
  code={`.card {
  border-radius: 8px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}`}
  lang="css"
  fileName="styles.css"
  theme="dark"
/>
```

## What's Next

Now that you know the basics, dive deeper into each component:

- [BxpCode](/guide/bxp-code) — Full guide with all display options
- [BxpCodeTabs](/guide/bxp-code-tabs) — Multi-tab code blocks
- [Sticky Headers](/guide/sticky-headers) — Pin headers while scrolling
- [API Reference](/api/) — Complete props reference
