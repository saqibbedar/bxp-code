# Sticky Headers

Keep file information visible while scrolling through long code blocks.

## Basic Usage

Enable sticky headers with the `stickyHeader` prop:

```tsx
<BxpCode
  code={longCodeString}
  lang="typescript"
  fileName="server.ts"
  stickyHeader={true}
/>
```

## With Container Height

Set a maximum height to enable scrolling:

```tsx
<BxpCode
  code={longCodeString}
  lang="typescript"
  fileName="api.ts"
  stickyHeader={true}
  maxHeight="400px"
/>
```

## Example: Long Code Block

```tsx
<BxpCode
  code={`import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/users', async (req, res) => {
  const users = await db.users.findMany();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await db.users.create(req.body);
  res.status(201).json(user);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
  lang="typescript"
  fileName="server.ts"
  stickyHeader={true}
  maxHeight="300px"
  showLineNumbers={true}
/>
```

## Sticky Header Offset

Adjust the sticky position if you have a fixed navbar:

```tsx
<BxpCode
  code={code}
  lang="typescript"
  stickyHeader
  stickyTop={60} // Navbar height in pixels
/>
```

## Sticky in BxpCodeTabs

```tsx
<BxpCodeTabs
  stickyHeader
  stickyTop={64}
  style={{ maxHeight: "400px", overflow: "auto" }}
  tabs={[
    { lang: "typescript", code: longTsCode },
    { lang: "python", code: longPyCode },
  ]}
/>
```

## Best Practices

1. **Use with long code** - Sticky headers are most useful for code blocks that exceed the viewport height
2. **Set max height** - Combine with `maxHeight` for contained scrollable areas
3. **Account for navbars** - Use `stickyOffset` when you have fixed headers
