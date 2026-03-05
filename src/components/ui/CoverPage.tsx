/**
 * CoverPage component - Landing page hero and features for bxp-code.
 */

import { useEffect } from "react";
import { BxpCode } from "../../lib/BxpCode";
import { BxpCodeTabs } from "../../lib/BxpCodeTabs";
import { Link } from "react-router-dom";

const CoverPage = () => {
  useEffect(() => {
    // scroll to when navigating from header link
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main style={styles.main}>
      {/* Hero Section */}
      <section style={styles.hero} className="hero-section">
        <div style={styles.heroContent} className="hero-content">
          <div style={styles.badge}>
            <span style={styles.badgeIcon}>✨</span>
            <span>v1.0.0 — Now Available</span>
          </div>

          <h1 style={styles.title} className="hero-title">
            Beautiful Code Blocks
            <br />
            <span style={styles.titleGradient}>for React</span>
          </h1>

          <p style={styles.subtitle} className="hero-subtitle">
            Drop-in React code blocks with Shiki highlighting, Prettier
            formatting, and zero config. Dark and light themes, copy button,
            line numbers — all built in.
          </p>

          <div style={styles.heroButtons} className="hero-buttons">
            <a href="#getting-started" style={styles.primaryButton}>
              Get Started
            </a>
            <a
              href="https://saqibbedar.github.io/bxp-code/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.secondaryButton}
            >
              <DocsIcon /> Documentation
            </a>
          </div>

          {/* Install Command */}
          <BxpCodeTabs
            tabs={[
              { lang: "bash", label: "npm", code: "npm install bxp-code" },
              { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
              { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
              { lang: "bash", label: "bun", code: "bun add bxp-code" },
            ]}
            showLineNumbers={false}
            theme="dark"
            style={{ marginTop: "16px" }}
          />
        </div>

        {/* Hero Code Example */}
        <div style={styles.heroDemo} className="hero-demo">
          <BxpCode
            code={heroCodeExample}
            lang="tsx"
            fileName="App.tsx"
            theme="dark"
            showLineNumbers
            stickyHeader
            stickyTop={64}
          />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.section} id="features">
        <h2 style={styles.sectionTitle} className="section-title">
          Why bxp-code?
        </h2>
        <p style={styles.sectionSubtitle} className="section-subtitle">
          Everything you need for production-ready code presentation
        </p>

        <div style={styles.featuresGrid} className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              style={styles.featureCard}
              className="feature-card"
            >
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples Section */}
      <section style={styles.section} id="examples">
        <h2 style={styles.sectionTitle} className="section-title">
          See it in Action
        </h2>
        <p style={styles.sectionSubtitle} className="section-subtitle">
          Dark and light themes, custom colors, tabbed views, and more
        </p>

        <div style={styles.examplesGrid} className="examples-grid">
          {/* Dark Theme */}
          <div style={styles.exampleCard}>
            <h4 style={styles.exampleTitle}>Dark Theme</h4>
            <BxpCode
              code={darkThemeExample}
              lang="typescript"
              fileName="utils.ts"
              theme="dark"
              showLineNumbers
            />
          </div>

          {/* Light Theme */}
          <div style={styles.exampleCard}>
            <h4 style={styles.exampleTitle}>Light Theme</h4>
            <BxpCode
              code={lightThemeExample}
              lang="javascript"
              fileName="config.js"
              theme="light"
              showLineNumbers
            />
          </div>

          {/* Minimal */}
          <div style={styles.exampleCard}>
            <h4 style={styles.exampleTitle}>Minimal Mode</h4>
            <BxpCode
              code={minimalExample}
              lang="python"
              theme="dark"
              showHeader={false}
            />
          </div>

          {/* Custom Colors */}
          <div style={styles.exampleCard}>
            <h4 style={styles.exampleTitle}>Custom Colors</h4>
            <BxpCode
              code={customColorsExample}
              lang="css"
              fileName="styles.css"
              theme="dark"
              headerColor="#2d1b4e"
              backgroundColor="#1a1028"
              showLineNumbers
            />
          </div>

          {/* Multi-Tab */}
          <div style={styles.exampleCard}>
            <h4 style={styles.exampleTitle}>Multi-Tab</h4>
            <BxpCodeTabs
              tabs={[
                { lang: "bash", label: "npm", code: "npm install bxp-code" },
                { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
                { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
                { lang: "bash", label: "bun", code: "bun add bxp-code" },
              ]}
              theme="dark"
            />
          </div>
        </div>

        {/* More Examples Button */}
        <div style={styles.moreExamples}>
          <Link to="/examples" style={styles.moreExamplesButton}>
            More Examples →
          </Link>
          <p style={styles.moreExamplesHint}>
            URL fetch, file upload, custom themes, and more interactive demos
          </p>
        </div>
      </section>

      {/* Getting Started Section */}
      <section style={styles.section} id="getting-started">
        <h2 style={styles.sectionTitle} className="section-title">
          Getting Started
        </h2>
        <p style={styles.sectionSubtitle} className="section-subtitle">
          Up and running in under a minute
        </p>

        <div style={styles.stepsContainer} className="step-container">
          {/* Step 1 */}
          <div style={styles.step}>
            <div style={styles.stepNumber} className="step-number">
              1
            </div>
            {/* <div style={styles.stepContent}>
              <h4 style={styles.stepTitle}>Install the package</h4>
              <BxpCode code="npm install bxp-code" lang="bash" theme="dark" />
            </div> */}
            <BxpCodeTabs
              tabs={[
                { lang: "bash", label: "npm", code: "npm install bxp-code" },
                { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
                { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
                { lang: "bash", label: "bun", code: "bun add bxp-code" },
              ]}
              theme="dark"
              style={styles.stepContent}
            />
          </div>

          {/* Step 2 */}
          <div style={styles.step}>
            <div style={styles.stepNumber} className="step-number">
              2
            </div>
            <div style={styles.stepContent}>
              <h4 style={styles.stepTitle}>Import and use</h4>
              <BxpCode
                code={gettingStartedExample}
                lang="tsx"
                fileName="MyComponent.tsx"
                theme="dark"
                stickyHeader
                stickyTop={64}
                showLineNumbers
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection} className="cta-section">
        <h2 style={styles.ctaTitle} className="cta-title">
          Ready to elevate your code blocks?
        </h2>
        <p style={styles.ctaSubtitle} className="cta-subtitle">
          Install bxp-code and start shipping beautiful code in minutes
        </p>
        <div style={styles.ctaButtons} className="cta-buttons">
          <a
            href="https://saqibbedar.github.io/bxp-code/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.primaryButton}
          >
            View Documentation
          </a>
          <a
            href="https://github.com/saqibbedar/bxp-code"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.secondaryButton}
          >
            <GitHubIcon /> Star on GitHub
          </a>
        </div>
      </section>
    </main>
  );
};

/* =============================================================================
 * CODE EXAMPLES
 * ============================================================================= */

const heroCodeExample = `import { BxpCode } from 'bxp-code';

function App() {
  return (
    <BxpCode
      code={myCode}
      lang="typescript"
      fileName="example.ts"
      theme="dark"
      showLineNumbers
    />
  );
}`;

const darkThemeExample = `export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \$\{response.status\}\`);
  }
  return response.json() as Promise<T>;
}`;

const lightThemeExample = `module.exports = {
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
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2`;

const customColorsExample = `/* Custom header and background colors with the dark theme */
.button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}


`;

const gettingStartedExample = `import { BxpCode } from 'bxp-code';

const MyComponent = () => {
  const code = \`console.log('Hello, World!');\`;

  return (
    <BxpCode
      code={code}
      lang="javascript"
      fileName="hello.js"
      theme="dark"
      showLineNumbers
      showCopyButton
    />
  );
};

export default MyComponent;`;

/* =============================================================================
 * FEATURES DATA
 * ============================================================================= */

const features = [
  {
    icon: "🎨",
    title: "Dark & Light Themes",
    description:
      "Two built-in themes with full color customization — header, background, tabs, borders, and more.",
  },
  {
    icon: "✨",
    title: "Prettier Built-In",
    description:
      "JS, TS, HTML, CSS, JSON, and Markdown are auto-formatted on render. No setup needed.",
  },
  {
    icon: "🚀",
    title: "Shiki Highlighting",
    description:
      "VS Code-grade syntax highlighting for 100+ languages via TextMate grammars.",
  },
  {
    icon: "📋",
    title: "Copy to Clipboard",
    description:
      "One-click copy button on every code block with instant visual feedback.",
  },
  {
    icon: "📁",
    title: "Three Input Methods",
    description:
      "Pass a code string, a File object, or a URL — language and filename are auto-detected.",
  },
  {
    icon: "📌",
    title: "Sticky Headers",
    description:
      "Pin file names and tab bars while scrolling. Powered by overflow: clip for reliable behavior.",
  },
];

/* =============================================================================
 * ICONS
 * ============================================================================= */

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ marginRight: "8px" }}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const DocsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "8px" }}
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

/* =============================================================================
 * STYLES
 * ============================================================================= */

const styles: Record<string, React.CSSProperties> = {
  main: {
    paddingTop: "64px", // Account for fixed header
    backgroundColor: "#0a0a0f",
    color: "#fff",
    minHeight: "100vh",
    // Use clip instead of hidden to prevent breaking position: sticky
    overflowX: "clip",
  },

  // Hero Section
  hero: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 24px",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "rgba(224, 107, 116, 0.1)",
    color: "#e06b74",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 500,
    width: "fit-content",
  },
  badgeIcon: {
    fontSize: "14px",
  },
  title: {
    fontSize: "56px",
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: "-2px",
  },
  titleGradient: {
    background: "linear-gradient(135deg, #e06d75, #e88490)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 1.6,
    maxWidth: "500px",
    margin: 0,
  },
  heroButtons: {
    display: "flex",
    gap: "16px",
    marginTop: "8px",
  },
  primaryButton: {
    backgroundColor: "#e06b74",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    transition: "border-color 0.2s",
  },

  // Sections
  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 24px",
  },
  sectionTitle: {
    fontSize: "40px",
    fontWeight: 700,
    textAlign: "center",
    margin: "0 0 16px",
  },
  sectionSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    margin: "0 0 48px",
  },

  // Features Grid
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    padding: "32px",
    transition: "border-color 0.2s",
  },
  featureIcon: {
    fontSize: "32px",
    marginBottom: "16px",
  },
  featureTitle: {
    fontSize: "18px",
    fontWeight: 600,
    margin: "0 0 8px",
  },
  featureDescription: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 1.6,
    margin: 0,
  },

  // Examples Grid
  examplesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  },
  exampleCard: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0, // Allow grid item to shrink below content size
    // Use clip instead of hidden - clips content but doesn't break position: sticky
    overflow: "clip",
  },
  exampleTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },

  // More examples CTA
  moreExamples: {
    textAlign: "center",
    marginTop: "48px",
  },
  moreExamplesButton: {
    display: "inline-block",
    backgroundColor: "#e06b74",
    color: "#fff",
    padding: "14px 32px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 600,
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  moreExamplesHint: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: "12px",
  },

  // Getting Started Steps
  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  step: {
    display: "flex",
    gap: "24px",
    alignItems: "flex-start",
  },
  stepNumber: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#e06b74",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: 700,
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
    minWidth: 0, // Allow flex item to shrink below content size
    // Note: overflow: hidden breaks position: sticky - removed for sticky support
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: 600,
    margin: "0 0 16px",
  },

  // CTA Section
  ctaSection: {
    textAlign: "center",
    padding: "100px 24px",
    background:
      "linear-gradient(180deg, transparent 0%, rgba(224, 107, 116, 0.05) 100%)",
  },
  ctaTitle: {
    fontSize: "36px",
    fontWeight: 700,
    margin: "0 0 16px",
  },
  ctaSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.6)",
    margin: "0 0 32px",
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
};

export default CoverPage;
