# Basic Usage

Common patterns and examples for using BxpCode.

## Code String

The simplest way — pass a code string directly:

```tsx
import { BxpCode } from "bxp-code";

<BxpCode
  code={`function hello() {
  console.log("Hello!");
}`}
  lang="javascript"
/>;
```

## With File Name

Show a filename in the header:

```tsx
<BxpCode
  code={`export const API_URL = "https://api.example.com";`}
  lang="typescript"
  fileName="config.ts"
/>
```

## With Line Numbers

```tsx
<BxpCode
  code={`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);`}
  lang="javascript"
  fileName="server.js"
  showLineNumbers
/>
```

## From URL

Fetch code from any URL. The component loads and highlights it automatically:

```tsx
<BxpCode
  url="https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx"
  lang="typescript"
  fileName="App.tsx"
  onError={(err) => console.error("Failed to load:", err)}
/>
```

You can verify the source here: [View App.tsx on GitHub](https://github.com/saqibbedar/bxp-code/blob/main/src/App.tsx)

::: tip
The `url` prop accepts any URL that returns plain text. Raw GitHub URLs work great.
:::

## From File Input

Let users upload and preview code files:

```tsx
import { useState } from "react";
import { BxpCode } from "bxp-code";

function FileUploadDemo() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <input
        type="file"
        accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      {file && (
        <BxpCode
          file={file}
          onError={(err) => console.error("Read failed:", err)}
        />
      )}
    </div>
  );
}
```

::: info How it works
When you pass a `file` prop, BxpCode reads it with `FileReader`, auto-detects the language from the file extension, and highlights it.
:::

## Input Priority

If multiple input props are provided, the priority is:

1. `code` — direct string (highest)
2. `file` — File object
3. `url` — remote fetch (lowest)

## Multi-language Examples

### Python

```tsx
<BxpCode
  code={`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`}
  lang="python"
  fileName="fibonacci.py"
/>
```

### JSON

```tsx
<BxpCode
  code={`{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "bxp-code": "^1.0.0"
  }
}`}
  lang="json"
  fileName="package.json"
/>
```

### CSS

```tsx
<BxpCode
  code={`.card {
  border-radius: 8px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}`}
  lang="css"
  fileName="styles.css"
/>
```

## Dynamic Code

Use React state to display code that changes at runtime:

```tsx
import { useState } from "react";
import { BxpCode } from "bxp-code";

function DynamicExample() {
  const [code, setCode] = useState('console.log("Hello")');

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <BxpCode code={code} lang="javascript" />
    </div>
  );
}
```
