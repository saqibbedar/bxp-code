/**
 * BxpTest - bxp-code component testing playground.
 *
 * Tests BxpCode and BxpCodeTabs with:
 * - Direct code strings
 * - File input (upload)
 * - URL fetching
 * - Various customization props
 */

import { useState } from "react";
import { BxpCode } from "../lib/BxpCode";
import { BxpCodeTabs } from "../lib/BxpCodeTabs";

const BxpTest = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tabFile, setTabFile] = useState<File | null>(null);

  return (
    <div style={styles.app}>
      {/* ------------------------------------------------------------------ */}
      {/* SECTION HEADING HELPER                                              */}
      {/* ------------------------------------------------------------------ */}

      <h1 style={styles.heading}>BxpTest — Test Page</h1>

      {/* ================================================================== */}
      {/* 1. BxpCode — basic code string                                     */}
      {/* ================================================================== */}
      <Section title="1. BxpCode — code string (TypeScript)">
        <BxpCode
          lang="typescript"
          code={`interface Product {
  id: string;
  name: string;
  price: number;
}

const formatPrice = (p: Product): string => {
  return \`\${p.name}: $\${p.price.toFixed(2)}\`;
};`}
        />
      </Section>

      {/* ================================================================== */}
      {/* 2. BxpCode — light theme, no copy button                          */}
      {/* ================================================================== */}
      <Section title="2. BxpCode — light theme, no copy button">
        <BxpCode
          lang="css"
          theme="light"
          showCopyButton={false}
          code={`.card {
  border-radius: 8px;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}`}
        />
      </Section>

      {/* ================================================================== */}
      {/* 3. BxpCode — URL fetch (raw GitHub file)                           */}
      {/* ================================================================== */}
      <Section title="3. BxpCode — URL fetch (raw GitHub)">
        <BxpCode
          url="https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx"
          lang="typescript"
          fileName="App.tsx"
          onError={(err) => console.error("[URL BxpCode]", err)}
        />
      </Section>

      {/* ================================================================== */}
      {/* 4. BxpCode — file input                                           */}
      {/* ================================================================== */}
      <Section title="4. BxpCode — file input (upload a code file)">
        <input
          type="file"
          accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json,.md,.go,.rs,.java,.c,.cpp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          style={styles.fileInput}
        />
        {file ? (
          <BxpCode
            file={file}
            onError={(err) => console.error("[File BxpCode]", err)}
          />
        ) : (
          <div style={styles.placeholder}>
            Upload a file to see it highlighted here.
          </div>
        )}
      </Section>

      {/* ================================================================== */}
      {/* 5. BxpCode — custom colors                                        */}
      {/* ================================================================== */}
      <Section title="5. BxpCode — custom header & background colors">
        <BxpCode
          lang="json"
          headerColor="#1a1a2e"
          backgroundColor="#16213e"
          code={`{
  "name": "bxp-code",
  "version": "1.0.0",
  "description": "Beautiful syntax highlighting for React",
  "keywords": ["react", "syntax", "highlighting", "shiki", "prettier"],
  "license": "MIT"
}`}
        />
      </Section>

      {/* ================================================================== */}
      {/* 6. BxpCode — no header, no line numbers                           */}
      {/* ================================================================== */}
      <Section title="6. BxpCode — no header, no line numbers">
        <BxpCode
          lang="bash"
          showHeader={false}
          showLineNumbers={false}
          code={`npm install bxp-code
# or
pnpm add bxp-code
# or
yarn add bxp-code`}
        />
      </Section>

      {/* ================================================================== */}
      {/* 7. BxpCodeTabs — basic multi-language                              */}
      {/* ================================================================== */}
      <Section title="7. BxpCodeTabs — multi-language (label derived from lang)">
        <BxpCodeTabs
          tabs={[
            {
              lang: "typescript",
              code: `const greet = (name: string): string => \`Hello, \${name}!\`;
console.log(greet("World"));`,
            },
            {
              lang: "python",
              code: `def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))`,
            },
            {
              lang: "go",
              code: `package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    fmt.Println(greet("World"))
}`,
            },
          ]}
        />
      </Section>

      {/* ================================================================== */}
      {/* 8. BxpCodeTabs — custom labels (package managers)                  */}
      {/* ================================================================== */}
      <Section title="8. BxpCodeTabs — custom labels (package managers)">
        <BxpCodeTabs
          tabs={[
            { lang: "bash", label: "npm", code: "npm install bxp-code" },
            { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
            { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
            { lang: "bash", label: "bun", code: "bun add bxp-code" },
          ]}
          showLineNumbers={false}
        />
      </Section>

      {/* ================================================================== */}
      {/* 9. BxpCodeTabs — light theme, custom colors                       */}
      {/* ================================================================== */}
      <Section title="9. BxpCodeTabs — light theme + custom indicator & border">
        <BxpCodeTabs
          theme="light"
          tabIndicatorColor="#0070f3"
          borderColor="#d0d7de"
          tabs={[
            {
              lang: "jsx",
              label: "React",
              code: `function App() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`,
            },
            {
              lang: "svelte",
              code: `<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Count: {count}
</button>`,
            },
            {
              lang: "vue",
              code: `<template>
  <button @click="count++">Count: {{ count }}</button>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>`,
            },
          ]}
        />
      </Section>

      {/* ================================================================== */}
      {/* 10. BxpCodeTabs — URL fetch in a tab                              */}
      {/* ================================================================== */}
      <Section title="10. BxpCodeTabs — with URL tab (raw GitHub)">
        <BxpCodeTabs
          tabs={[
            {
              lang: "typescript",
              label: "Local Code",
              code: `import { BxpCode } from "bxp-code";

export default function Demo() {
  return <BxpCode code="console.log('hi')" lang="javascript" />;
}`,
            },
            {
              lang: "typescript",
              label: "From URL",
              url: "https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx",
              fileName: "App.tsx",
            },
          ]}
          onError={(err) => console.error("[URL BxpCodeTabs]", err)}
        />
      </Section>

      {/* ================================================================== */}
      {/* 11. BxpCodeTabs — file input in a tab                             */}
      {/* ================================================================== */}
      <Section title="11. BxpCodeTabs — with file input tab">
        <input
          type="file"
          accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json,.md,.go,.rs,.java,.c,.cpp"
          onChange={(e) => setTabFile(e.target.files?.[0] ?? null)}
          style={styles.fileInput}
        />
        <BxpCodeTabs
          tabs={[
            {
              lang: "javascript",
              label: "Inline JS",
              code: `const sum = (a, b) => a + b;
console.log(sum(2, 3));`,
            },
            ...(tabFile
              ? [
                  {
                    lang:
                      tabFile.name.split(".").pop()?.toLowerCase() || "text",
                    label: tabFile.name,
                    file: tabFile,
                  },
                ]
              : []),
          ]}
          onError={(err) => console.error("[File BxpCodeTabs]", err)}
        />
        {!tabFile && (
          <div style={styles.placeholder}>
            Upload a file — it will appear as a second tab above.
          </div>
        )}
      </Section>

      {/* ================================================================== */}
      {/* 12. BxpCodeTabs — no header, no copy button                       */}
      {/* ================================================================== */}
      <Section title="12. BxpCodeTabs — showHeader=false, showCopyButton=false">
        <BxpCodeTabs
          showHeader={false}
          showCopyButton={false}
          tabs={[
            {
              lang: "sql",
              code: `SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.is_active = true
GROUP BY u.name
ORDER BY order_count DESC
LIMIT 10;`,
            },
          ]}
        />
      </Section>

      {/* ================================================================== */}
      {/* 13. BxpCodeTabs — full customization                              */}
      {/* ================================================================== */}
      <Section title="13. BxpCodeTabs — full customization">
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
            {
              lang: "rust",
              code: `fn main() {
    let numbers: Vec<i32> = (1..=10).collect();
    let sum: i32 = numbers.iter().sum();
    println!("Sum of 1..10 = {}", sum);
}`,
            },
            {
              lang: "cpp",
              label: "C++",
              code: `#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int sum = std::accumulate(nums.begin(), nums.end(), 0);
    std::cout << "Sum: " << sum << std::endl;
    return 0;
}`,
            },
          ]}
        />
      </Section>
    </div>
  );
};

/* =============================================================================
 * Section wrapper
 * ============================================================================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

/* =============================================================================
 * Styles
 * ============================================================================= */

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: "60px 80px",
    minHeight: "100vh",
    backgroundColor: "#0a0a0f",
    color: "#e1e1e1",
  },
  heading: {
    fontSize: "28px",
    fontWeight: 700,
    marginBottom: "40px",
    color: "#e06b74",
  },
  section: {
    marginBottom: "48px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#a0a0b0",
  },
  fileInput: {
    marginBottom: "12px",
    padding: "8px",
    backgroundColor: "#1a1a24",
    border: "1px solid #2a2a35",
    borderRadius: "6px",
    color: "#e1e1e1",
    fontSize: "13px",
    cursor: "pointer",
  },
  placeholder: {
    color: "#555",
    fontSize: "13px",
    fontStyle: "italic",
    marginTop: "8px",
  },
};

export default BxpTest;
