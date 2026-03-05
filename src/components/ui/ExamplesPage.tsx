/**
 * ExamplesPage - Dedicated interactive examples page for bxp-code.
 */

import { useEffect, useState, type ChangeEvent } from "react";
import { BxpCode } from "../../lib/BxpCode";
import { BxpCodeTabs } from "../../lib/BxpCodeTabs";

const DEFAULT_URL =
  "https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx";

const ExamplesPage = () => {
  // URL demo
  const [url, setUrl] = useState(DEFAULT_URL);
  const [activeUrl, setActiveUrl] = useState(DEFAULT_URL);
  const [urlKey, setUrlKey] = useState(0);

  // File upload demo
  const [file, setFile] = useState<File | null>(null);

  // Tabs file upload demo
  const [tabFile, setTabFile] = useState<File | null>(null);

  const handleUrlLoad = () => {
    setActiveUrl(url);
    setUrlKey((k) => k + 1);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleTabFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTabFile(e.target.files?.[0] ?? null);
  };

  useEffect(() => {
    // scroll to when navigating from header link
    const hash = window.location.hash;
    if (hash === "#examples") {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <main style={styles.main}>
      {/* Page Header */}
      <section style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Interactive Examples</h1>
        <p style={styles.pageSubtitle}>
          Explore every feature of bxp-code — edit URLs, upload files, switch
          themes, and customize colors
        </p>
      </section>

      {/* ── CODE STRING ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Code String</h2>
        <p style={styles.sectionSubtitle}>
          The simplest way — pass a code string directly. Prettier formats JS,
          TS, HTML, CSS, and JSON automatically.
        </p>

        <div style={styles.grid} className="examples-grid">
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Dark Theme</h4>
            <BxpCode
              code={darkExample}
              lang="typescript"
              fileName="utils.ts"
              theme="dark"
              showLineNumbers
            />
          </div>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Light Theme</h4>
            <BxpCode
              code={lightExample}
              lang="javascript"
              fileName="config.js"
              theme="light"
              showLineNumbers
            />
          </div>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Minimal (No Header)</h4>
            <BxpCode
              code={minimalExample}
              lang="python"
              theme="dark"
              showHeader={false}
            />
          </div>
          <div style={styles.card}>
            <h4 style={styles.cardTitle}>Custom Colors</h4>
            <BxpCode
              code={cssExample}
              lang="css"
              fileName="styles.css"
              theme="dark"
              headerColor="#2d1b4e"
              backgroundColor="#1a1028"
              showLineNumbers
            />
          </div>
        </div>

        <div style={styles.usage}>
          <p style={styles.usageLabel}>Usage</p>
          <BxpCode code={codeStringUsage} lang="tsx" theme="dark" />
        </div>
      </section>

      {/* ── FETCH FROM URL ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Fetch from URL</h2>
        <p style={styles.sectionSubtitle}>
          Load and highlight any raw source file — language and filename are
          auto-detected from the URL
        </p>

        <div style={styles.card}>
          <div style={styles.inputRow}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a raw file URL..."
              style={styles.textInput}
            />
            <button onClick={handleUrlLoad} style={styles.loadButton}>
              Load
            </button>
          </div>
          <p style={styles.hint}>
            Default URL points to this project's{" "}
            <a
              href="https://github.com/saqibbedar/bxp-code/blob/main/src/App.tsx"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.hintLink}
            >
              App.tsx on GitHub
            </a>{" "}
            — verify the source ↗
          </p>
          <BxpCode
            key={urlKey}
            url={activeUrl}
            theme="dark"
            showLineNumbers
            stickyHeader
            stickyTop={64}
          />
        </div>

        <div style={styles.usage}>
          <p style={styles.usageLabel}>Usage</p>
          <BxpCode code={urlUsage} lang="tsx" theme="dark" />
        </div>
      </section>

      {/* ── FILE UPLOAD ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>File Upload</h2>
        <p style={styles.sectionSubtitle}>
          Pick any source file from your machine — language is auto-detected
          from the file extension
        </p>

        <div style={styles.card}>
          <label style={styles.fileLabel}>
            <span>{file ? file.name : "Choose a file…"}</span>
            <input
              type="file"
              onChange={handleFileChange}
              style={styles.fileInput}
              accept=".js,.jsx,.ts,.tsx,.py,.css,.html,.json,.md,.yaml,.yml,.rs,.go,.java,.rb,.php,.swift,.kt,.c,.cpp,.h,.sh,.bash,.sql,.xml,.toml,.vue,.svelte"
            />
          </label>
          {file ? (
            <BxpCode file={file} theme="dark" showLineNumbers />
          ) : (
            <div style={styles.placeholder}>
              Upload a file to see it highlighted here
            </div>
          )}
        </div>

        <div style={styles.usage}>
          <p style={styles.usageLabel}>Usage</p>
          <BxpCode code={fileUsage} lang="tsx" theme="dark" />
        </div>
      </section>

      {/* ── MULTI-TAB: BASIC ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Multi-Tab Code Blocks</h2>
        <p style={styles.sectionSubtitle}>
          Display multiple languages or commands in a single tabbed container
          using <code style={styles.inlineCode}>BxpCodeTabs</code>
        </p>

        {/* Package managers */}
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Package Manager Tabs</h4>
          <BxpCodeTabs
            tabs={[
              { lang: "bash", label: "npm", code: "npm install bxp-code" },
              { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
              { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
              { lang: "bash", label: "bun", code: "bun add bxp-code" },
            ]}
            theme="dark"
          />
          <div style={styles.usage}>
            <p style={styles.usageLabel}>Usage</p>
            <BxpCode code={tabsBasicUsage} lang="tsx" theme="dark" />
          </div>
        </div>

        {/* Multi lang */}
        <div style={{ ...styles.card, marginTop: "32px" }}>
          <h4 style={styles.cardTitle}>Multi Language</h4>
          <BxpCodeTabs
            tabs={[
              {
                lang: "typescript",
                code: `const greet = (name: string): string => \`Hello, \${name}!\`;\nconsole.log(greet("World"));`,
              },
              {
                lang: "python",
                code: `def greet(name: str) -> str:\n    return f"Hello, {name}!"\n\nprint(greet("World"))`,
              },
              {
                lang: "rust",
                code: `fn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}\n\nfn main() {\n    println!("{}", greet("World"));\n}`,
              },
            ]}
            theme="dark"
            showLineNumbers
          />
        </div>
      </section>

      {/* ── MULTI-TAB: URL ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Tabs with URL Source</h2>
        <p style={styles.sectionSubtitle}>
          One tab can load code from a remote URL while others show inline code
        </p>

        <div style={styles.card}>
          <p style={styles.hint}>
            The "From URL" tab loads code from{" "}
            <a
              href="https://github.com/saqibbedar/bxp-code/blob/main/src/App.tsx"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.hintLink}
            >
              this file on GitHub ↗
            </a>
          </p>
          <BxpCodeTabs
            tabs={[
              {
                lang: "tsx",
                label: "Local Code",
                code: `import { BxpCode } from 'bxp-code';\n\nexport default function App() {\n  return <BxpCode code="hello" lang="text" />;\n}`,
              },
              {
                lang: "tsx",
                label: "From URL",
                url: DEFAULT_URL,
              },
            ]}
            theme="dark"
            showLineNumbers
            stickyHeader
            stickyTop={64}
          />
        </div>

        <div style={styles.usage}>
          <p style={styles.usageLabel}>Usage</p>
          <BxpCode code={tabsUrlUsage} lang="tsx" theme="dark" />
        </div>
      </section>

      {/* ── MULTI-TAB: FILE ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Tabs with File Upload</h2>
        <p style={styles.sectionSubtitle}>
          Dynamically add a tab from a file input — pick a file and it appears
          as a new tab
        </p>

        <div style={styles.card}>
          <label style={styles.fileLabel}>
            <span>
              {tabFile ? tabFile.name : "Choose a file for the second tab…"}
            </span>
            <input
              type="file"
              onChange={handleTabFileChange}
              style={styles.fileInput}
              accept=".js,.jsx,.ts,.tsx,.py,.css,.html,.json,.md,.yaml,.yml,.rs,.go,.java,.rb,.php,.swift,.kt,.c,.cpp,.h,.sh,.bash,.sql,.xml,.toml,.vue,.svelte"
            />
          </label>
          <BxpCodeTabs
            tabs={[
              {
                lang: "javascript",
                code: `// This tab has inline code\nconsole.log("Hello from tab 1!");`,
              },
              ...(tabFile
                ? [
                    {
                      lang:
                        tabFile.name.split(".").pop()?.toLowerCase() ?? "text",
                      label: tabFile.name,
                      file: tabFile,
                    },
                  ]
                : []),
            ]}
            theme="dark"
            showLineNumbers
          />
        </div>

        <div style={styles.usage}>
          <p style={styles.usageLabel}>Usage</p>
          <BxpCode code={tabsFileUsage} lang="tsx" theme="dark" />
        </div>
      </section>

      {/* ── MULTI-TAB: CUSTOM THEME ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Custom Themed Tabs</h2>
        <p style={styles.sectionSubtitle}>
          Override every color — active tab, indicator, border, header, and
          background. Match any design system.
        </p>

        <div style={styles.card}>
          <BxpCodeTabs
            tabs={[
              {
                lang: "html",
                code: `<div class="card">\n  <h2>Hello</h2>\n  <p>Custom themed tabs</p>\n</div>`,
              },
              {
                lang: "css",
                code: `.card {\n  background: #1e1e2e;\n  border-radius: 8px;\n  padding: 24px;\n}`,
              },
            ]}
            theme="dark"
            showLineNumbers
            tabActiveColor="#e06b74"
            tabActiveTextColor="#fff"
            tabIndicatorColor="#e06b74"
            borderColor="rgba(224, 107, 116, 0.3)"
            headerColor="#1a1020"
            backgroundColor="#13101a"
          />
        </div>

        <div style={styles.usage}>
          <p style={styles.usageLabel}>Usage</p>
          <BxpCode code={tabsCustomUsage} lang="tsx" theme="dark" />
        </div>
      </section>

      {/* ── MULTI-TAB: LIGHT THEME ── */}
      <section style={{ ...styles.section, paddingBottom: "120px" }}>
        <h2 style={styles.sectionTitle}>Light Theme Tabs</h2>
        <p style={styles.sectionSubtitle}>Tabs work with the light theme too</p>

        <div style={styles.card}>
          <BxpCodeTabs
            tabs={[
              {
                lang: "javascript",
                code: `const add = (a, b) => a + b;\nconsole.log(add(2, 3));`,
              },
              {
                lang: "typescript",
                code: `const add = (a: number, b: number): number => a + b;\nconsole.log(add(2, 3));`,
              },
            ]}
            theme="light"
            showLineNumbers
          />
        </div>
      </section>
    </main>
  );
};

/* =============================================================================
 * CODE EXAMPLES
 * ============================================================================= */

const darkExample = `export async function fetchData<T>(
  url: string
): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
}`;

const lightExample = `module.exports = {
  api: {
    baseUrl: process.env.API_URL,
    timeout: 5000,
  },
  features: {
    darkMode: true,
    analytics: false,
  },
};`;

const minimalExample = `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + [pivot] + quicksort(right)`;

const cssExample = `.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}`;

/* =============================================================================
 * USAGE SNIPPETS
 * ============================================================================= */

const codeStringUsage = `import { BxpCode } from 'bxp-code';

<BxpCode
  code={\`const x = 42;\`}
  lang="typescript"
  fileName="example.ts"
  theme="dark"
  showLineNumbers
/>`;

const urlUsage = `import { BxpCode } from 'bxp-code';

<BxpCode
  url="https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx"
  theme="dark"
  showLineNumbers
/>`;

const fileUsage = `import { useState } from 'react';
import { BxpCode } from 'bxp-code';

function FileDemo() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      {file && <BxpCode file={file} theme="dark" showLineNumbers />}
    </>
  );
}`;

const tabsBasicUsage = `import { BxpCodeTabs } from 'bxp-code';

<BxpCodeTabs
  tabs={[
    { lang: "bash", label: "npm",  code: "npm install bxp-code" },
    { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
    { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
    { lang: "bash", label: "bun",  code: "bun add bxp-code" },
  ]}
  theme="dark"
/>`;

const tabsUrlUsage = `import { BxpCodeTabs } from 'bxp-code';

<BxpCodeTabs
  tabs={[
    { lang: "tsx", label: "Local Code", code: myCode },
    {
      lang: "tsx",
      label: "From URL",
      url: "https://raw.githubusercontent.com/saqibbedar/bxp-code/refs/heads/main/src/App.tsx",
    },
  ]}
  theme="dark"
  showLineNumbers
/>`;

const tabsFileUsage = `import { useState } from 'react';
import { BxpCodeTabs } from 'bxp-code';

function TabsFileDemo() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <BxpCodeTabs
        tabs={[
          { lang: "javascript", code: "console.log('tab 1');" },
          ...(file
            ? [{ lang: file.name.split('.').pop() ?? 'text', label: file.name, file }]
            : []),
        ]}
        theme="dark"
        showLineNumbers
      />
    </>
  );
}`;

const tabsCustomUsage = `<BxpCodeTabs
  tabs={[
    { lang: "html", code: htmlCode },
    { lang: "css",  code: cssCode },
  ]}
  theme="dark"
  showLineNumbers
  tabActiveColor="#e06b74"
  tabActiveTextColor="#fff"
  tabIndicatorColor="#e06b74"
  borderColor="rgba(224, 107, 116, 0.3)"
  headerColor="#1a1020"
  backgroundColor="#13101a"
/>`;

/* =============================================================================
 * STYLES
 * ============================================================================= */

const styles: Record<string, React.CSSProperties> = {
  main: {
    paddingTop: "64px",
    backgroundColor: "#0a0a0f",
    color: "#fff",
    minHeight: "100vh",
    overflowX: "clip",
  },
  pageHeader: {
    textAlign: "center",
    padding: "80px 24px 40px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  pageTitle: {
    fontSize: "48px",
    fontWeight: 800,
    margin: "0 0 16px",
    background: "linear-gradient(135deg, #e06d75, #e88490)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  pageSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 1.6,
    margin: 0,
  },

  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 24px 0",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: 700,
    margin: "0 0 8px",
  },
  sectionSubtitle: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.5)",
    margin: "0 0 32px",
    lineHeight: 1.5,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(340px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "24px",
    minWidth: 0,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.8)",
    margin: "0 0 12px",
  },

  inputRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "12px",
  },
  textInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    outline: "none",
  },
  loadButton: {
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e06b74",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  hint: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.45)",
    margin: "0 0 16px",
    lineHeight: 1.5,
  },
  hintLink: {
    color: "#e06b74",
    textDecoration: "underline",
  },

  fileLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "1px dashed rgba(224, 107, 116, 0.4)",
    backgroundColor: "rgba(224, 107, 116, 0.06)",
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "16px",
    transition: "border-color 0.2s",
  },
  fileInput: {
    display: "none",
  },
  placeholder: {
    padding: "48px 24px",
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: "14px",
    border: "1px dashed rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
  },

  usage: {
    marginTop: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    paddingTop: "16px",
  },
  usageLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.4)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 8px",
  },

  inlineCode: {
    backgroundColor: "rgba(224, 107, 116, 0.15)",
    color: "#e06b74",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "14px",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  },
};

export default ExamplesPage;
