/**
 * @fileoverview BxpCodeTabs - Multi-tab syntax highlighting component.
 *
 * Displays multiple code blocks in a tabbed interface. Each tab can have
 * its own language, file name, and code content. The copy button appears
 * on hover at the top-right corner of the code area.
 *
 * Features:
 * - All BxpCode features (Shiki highlighting, Prettier formatting, themes)
 * - Tabbed interface for multiple code snippets
 * - Copy button on hover (top-right corner over code area)
 * - Supports different languages per tab
 * - Multiple input sources per tab: code string, File, or URL
 *
 * @example
 * ```tsx
 * // Package manager tabs (lang required, label optional)
 * <BxpCodeTabs
 *   tabs={[
 *     { lang: "bash", label: "npm", code: "npm install bxp-code" },
 *     { lang: "bash", label: "pnpm", code: "pnpm add bxp-code" },
 *     { lang: "bash", label: "yarn", code: "yarn add bxp-code" },
 *   ]}
 * />
 *
 * // Multi-language example (label derived from lang automatically)
 * <BxpCodeTabs
 *   tabs={[
 *     { lang: "tsx", code: tsxCode, fileName: "App.tsx" },
 *     { lang: "css", code: cssCode, fileName: "styles.css" },
 *   ]}
 *   showLineNumbers
 *   stickyHeader
 * />
 *
 * // Full customization
 * <BxpCodeTabs
 *   tabs={[
 *     { lang: "typescript", code: tsCode },
 *     { lang: "javascript", code: jsCode },
 *   ]}
 *   showCopyButton={false}
 *   borderColor="#444"
 *   headerColor="#1a1a2e"
 *   backgroundColor="#16213e"
 *   tabIndicatorColor="#00d4ff"
 * />
 * ```
 */

import { useEffect, useState, useRef, type CSSProperties } from "react";
import { createHighlighter, type ThemeRegistrationRaw } from "shiki";
import * as prettier from "prettier/standalone";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";
import prettierPluginTypescript from "prettier/plugins/typescript";
import prettierPluginHtml from "prettier/plugins/html";
import prettierPluginCss from "prettier/plugins/postcss";
import prettierPluginMarkdown from "prettier/plugins/markdown";

import darkTheme from "./themes/bxp-dark.json";
import lightTheme from "./themes/bxp-light.json";

/* =============================================================================
 * THEME SETUP
 * ============================================================================= */

const dark = darkTheme as unknown as ThemeRegistrationRaw;
const light = lightTheme as unknown as ThemeRegistrationRaw;

/* =============================================================================
 * PRETTIER CONFIGURATION
 * ============================================================================= */

const PRETTIER_PARSER_MAP: Record<string, string> = {
  javascript: "babel",
  js: "babel",
  jsx: "babel",
  typescript: "typescript",
  ts: "typescript",
  tsx: "typescript",
  html: "html",
  css: "css",
  scss: "scss",
  less: "less",
  json: "json",
  markdown: "markdown",
  md: "markdown",
};

const PRETTIER_PLUGINS = [
  prettierPluginBabel,
  prettierPluginEstree,
  prettierPluginTypescript,
  prettierPluginHtml,
  prettierPluginCss,
  prettierPluginMarkdown,
];

/* =============================================================================
 * LANGUAGE DETECTION
 * ============================================================================= */

const EXTENSION_TO_LANG: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  py: "python",
  rb: "ruby",
  java: "java",
  c: "c",
  cpp: "cpp",
  cs: "csharp",
  go: "go",
  rs: "rust",
  php: "php",
  swift: "swift",
  kt: "kotlin",
  scala: "scala",
  html: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",
  json: "json",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  sql: "sql",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  ps1: "powershell",
  dockerfile: "dockerfile",
  graphql: "graphql",
  vue: "vue",
  svelte: "svelte",
};

/** Maps common label names to language identifiers */
const LABEL_TO_LANG: Record<string, string> = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  py: "python",
  ruby: "ruby",
  java: "java",
  c: "c",
  "c++": "cpp",
  cpp: "cpp",
  "c#": "csharp",
  csharp: "csharp",
  go: "go",
  golang: "go",
  rust: "rust",
  rs: "rust",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
  scala: "scala",
  html: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",
  json: "json",
  xml: "xml",
  yaml: "yaml",
  markdown: "markdown",
  md: "markdown",
  sql: "sql",
  bash: "bash",
  shell: "bash",
  sh: "bash",
  zsh: "bash",
  powershell: "powershell",
  dockerfile: "dockerfile",
  docker: "dockerfile",
  graphql: "graphql",
  vue: "vue",
  svelte: "svelte",
  react: "tsx",
  tsx: "tsx",
  jsx: "jsx",
  npm: "bash",
  pnpm: "bash",
  yarn: "bash",
  bun: "bash",
};

/* =============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================= */

async function formatCode(code: string, lang: string): Promise<string> {
  const parser = PRETTIER_PARSER_MAP[lang.toLowerCase()];

  if (parser) {
    try {
      const formatted = await prettier.format(code, {
        parser,
        plugins: PRETTIER_PLUGINS,
        semi: true,
        singleQuote: false,
        tabWidth: 2,
        printWidth: 80,
      });
      return formatted.trim();
    } catch {
      return dedentCode(code);
    }
  }

  return dedentCode(code);
}

function dedentCode(code: string): string {
  const lines = code.split("\n");

  let start = 0;
  let end = lines.length - 1;
  while (start < lines.length && lines[start].trim() === "") start++;
  while (end > start && lines[end].trim() === "") end--;

  const trimmedLines = lines.slice(start, end + 1);
  if (trimmedLines.length === 0) return "";

  const minIndent = trimmedLines.reduce((min, line) => {
    if (line.trim() === "") return min;
    const leadingSpaces = line.match(/^[\t ]*/)?.[0].length ?? 0;
    return Math.min(min, leadingSpaces);
  }, Infinity);

  return trimmedLines
    .map((line) => (line.trim() === "" ? "" : line.slice(minIndent).trimEnd()))
    .join("\n");
}

function getLangFromFileName(fileName: string): string | undefined {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext ? EXTENSION_TO_LANG[ext] || ext : undefined;
}

/* =============================================================================
 * ICONS
 * ============================================================================= */

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* =============================================================================
 * THEME COLORS
 * ============================================================================= */

const THEME_COLORS = {
  dark: {
    header: "#0f0f14",
    background: "#14141a",
    text: "#e1e1e1",
    textMuted: "#707085",
    border: "#2a2a35",
    tabActive: "#14141a",
    tabInactive: "transparent",
    tabHover: "rgba(255, 255, 255, 0.05)",
    tabIndicator: "#e06b74",
    copyBg: "rgba(30, 30, 40, 0.9)",
    copyHoverBg: "rgba(50, 50, 65, 0.95)",
  },
  light: {
    header: "#f5f5f5",
    background: "#ffffff",
    text: "#1e1e1e",
    textMuted: "#9898A0",
    border: "#e0e0e0",
    tabActive: "#ffffff",
    tabInactive: "transparent",
    tabHover: "rgba(0, 0, 0, 0.04)",
    tabIndicator: "#e06b74",
    copyBg: "rgba(240, 240, 240, 0.95)",
    copyHoverBg: "rgba(228, 228, 228, 0.98)",
  },
} as const;

type ThemeColors =
  | (typeof THEME_COLORS)["dark"]
  | (typeof THEME_COLORS)["light"];

/* =============================================================================
 * STYLE OVERRIDES
 * ============================================================================= */

const SHIKI_STYLE_OVERRIDES = `
  .bxp-codetabs-content pre {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    overflow: visible !important;
  }
  .bxp-codetabs-content code {
    background: transparent !important;
    font-family: inherit !important;
  }
  .bxp-codetabs-content .shiki {
    background: transparent !important;
  }
`;

/* =============================================================================
 * TYPES
 * ============================================================================= */

export type BxpCodeTab = {
  /** Language identifier for syntax highlighting (required). Lowercased internally. */
  lang: string;

  /**
   * Tab label displayed in the tab bar.
   * If omitted, derived from `lang` (first letter capitalized).
   */
  label?: string;

  /** Code string to highlight (use this OR file/url) */
  code?: string;

  /** File object from input[type=file] or drag-drop */
  file?: File;

  /** URL to fetch code from */
  url?: string;

  /** File name for display (auto-detected from file/url if not provided) */
  fileName?: string;
};

export type BxpCodeTabsProps = {
  /** Array of tab configurations */
  tabs: BxpCodeTab[];

  /** Color theme */
  theme?: "dark" | "light";

  /** Toggle line numbers */
  showLineNumbers?: boolean;

  /**
   * Show or hide the copy button.
   * @default true
   */
  showCopyButton?: boolean;

  /**
   * Show or hide the tab bar / header entirely.
   * When hidden, the first (or defaultTab) tab is displayed.
   * @default true
   */
  showHeader?: boolean;

  /**
   * Enable sticky tab bar on page scroll.
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Sticky header offset from viewport top (pixels).
   * @default 0
   */
  stickyTop?: number;

  /** Default active tab index */
  defaultTab?: number;

  /** Override header / tab bar background color */
  headerColor?: string;

  /** Override code area background color */
  backgroundColor?: string;

  /** Override container & header border color */
  borderColor?: string;

  /** Override active tab background color */
  tabActiveColor?: string;

  /** Override active tab text color */
  tabActiveTextColor?: string;

  /** Override inactive tab text color */
  tabTextColor?: string;

  /** Override active tab bottom-indicator color */
  tabIndicatorColor?: string;

  /** Override copy-button background color */
  copyButtonColor?: string;

  /** Override line-number gutter text color */
  lineNumberColor?: string;

  /** Additional container styles */
  style?: CSSProperties;

  /** Additional CSS class */
  className?: string;

  /** Error callback for file/url loading failures */
  onError?: (error: Error) => void;
};

/* =============================================================================
 * INTERNAL: SINGLE TAB PANEL
 * ============================================================================= */

type TabPanelState = {
  html: string;
  formattedCode: string;
  loading: boolean;
};

function useTabPanel(
  tab: BxpCodeTab,
  theme: "dark" | "light",
  onError?: (error: Error) => void
): TabPanelState {
  const [html, setHtml] = useState("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loadedSource, setLoadedSource] = useState<File | string | null>(null);
  const [formattedCode, setFormattedCode] = useState("");

  const resolvedFileName =
    tab.fileName ||
    tab.file?.name ||
    (tab.url ? tab.url.split("/").pop() : undefined);

  const normalizedLang = tab.lang.toLowerCase();

  const resolvedLang =
    normalizedLang ||
    (resolvedFileName ? getLangFromFileName(resolvedFileName) : undefined) ||
    (tab.label ? LABEL_TO_LANG[tab.label.toLowerCase()] : undefined) ||
    "text";

  const currentSource = tab.file || tab.url || null;
  const isLoading =
    !tab.code && currentSource !== null && loadedSource !== currentSource;

  const sourceCode = tab.code ?? fileContent ?? "";

  // File reading
  useEffect(() => {
    if (!tab.file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target?.result as string);
      setLoadedSource(tab.file!);
    };
    reader.onerror = () => {
      onError?.(new Error("Failed to read file"));
      setLoadedSource(tab.file!);
    };
    reader.readAsText(tab.file);
  }, [tab.file, onError]);

  // URL fetching
  useEffect(() => {
    if (!tab.url) return;

    fetch(tab.url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        setFileContent(text);
        setLoadedSource(tab.url!);
      })
      .catch((err) => {
        onError?.(err);
        setLoadedSource(tab.url!);
      });
  }, [tab.url, onError]);

  // Code formatting
  useEffect(() => {
    if (!sourceCode) return;

    let cancelled = false;
    formatCode(sourceCode, resolvedLang).then((result) => {
      if (!cancelled) setFormattedCode(result);
    });
    return () => {
      cancelled = true;
    };
  }, [sourceCode, resolvedLang]);

  // Syntax highlighting
  useEffect(() => {
    if (!formattedCode || isLoading) return;

    async function highlight() {
      const highlighter = await createHighlighter({
        themes: [dark, light],
        langs: [resolvedLang],
      });

      const selectedTheme = theme === "dark" ? dark.name! : light.name!;
      const result = highlighter.codeToHtml(formattedCode, {
        lang: resolvedLang,
        theme: selectedTheme,
      });
      setHtml(result);
    }

    highlight();
  }, [formattedCode, resolvedLang, theme, isLoading]);

  return { html, formattedCode, loading: isLoading };
}

/* =============================================================================
 * COMPONENT
 * ============================================================================= */

/**
 * BxpCodeTabs - Multi-tab code block with syntax highlighting.
 *
 * Displays multiple code snippets in a tabbed interface. Each tab
 * independently highlights and formats its code. The copy button
 * appears on hover over the code area.
 */
export function BxpCodeTabs({
  tabs,
  theme = "dark",
  showLineNumbers = true,
  showCopyButton = true,
  showHeader = true,
  stickyHeader = false,
  stickyTop = 0,
  defaultTab = 0,
  headerColor,
  backgroundColor,
  borderColor,
  tabActiveColor,
  tabActiveTextColor,
  tabTextColor,
  tabIndicatorColor,
  copyButtonColor,
  lineNumberColor,
  style,
  className,
  onError,
}: BxpCodeTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const colors = THEME_COLORS[theme];

  // Clamp active tab to valid range
  const safeActiveTab = Math.min(Math.max(0, activeTab), tabs.length - 1);

  // Process all tabs using the hook pattern via a wrapper component
  // But since hooks can't be called conditionally, we'll render TabPanelRenderer for each tab

  /* ---------------------------------------------------------------------------
   * Sticky Header Detection
   * --------------------------------------------------------------------------- */

  useEffect(() => {
    if (!stickyHeader) return;

    const handleScroll = () => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      setIsStuck(rect.top <= stickyTop + 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyHeader, stickyTop]);

  /* ---------------------------------------------------------------------------
   * Copy Handler
   * --------------------------------------------------------------------------- */

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[BxpCodeTabs] Copy failed:", err);
    }
  };

  /* ---------------------------------------------------------------------------
   * Extract height styles for sticky mode
   * --------------------------------------------------------------------------- */

  const {
    height: styleHeight,
    maxHeight: styleMaxHeight,
    minHeight: styleMinHeight,
    overflow: styleOverflow,
    overflowY: styleOverflowY,
    ...restStyle
  } = style || {};

  /* ---------------------------------------------------------------------------
   * Styles
   * --------------------------------------------------------------------------- */

  const containerStyle: CSSProperties = {
    borderRadius: "8px",
    overflow: stickyHeader ? "visible" : "hidden",
    border: `1px solid ${borderColor || colors.border}`,
    fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
    fontSize: "14px",
    position: "relative",
    ...(stickyHeader ? restStyle : style),
    ...(!stickyHeader && {
      height: styleHeight,
      maxHeight: styleMaxHeight,
      minHeight: styleMinHeight,
      overflow: styleOverflow,
      overflowY: styleOverflowY,
    }),
  };

  const resolvedBorder = borderColor || colors.border;

  const tabBarStyle: CSSProperties = {
    display: "flex",
    alignItems: "stretch",
    backgroundColor: headerColor || colors.header,
    borderBottom: `1px solid ${resolvedBorder}`,
    borderTopLeftRadius: stickyHeader ? (isStuck ? 0 : "7px") : "7px",
    borderTopRightRadius: stickyHeader ? (isStuck ? 0 : "7px") : "7px",
    overflow: "hidden",
    ...(stickyHeader && {
      position: "sticky",
      top: stickyTop,
      zIndex: 10,
      marginLeft: "-1px",
      marginRight: "-1px",
      marginTop: "-1px",
      borderLeft: `1px solid ${resolvedBorder}`,
      borderRight: `1px solid ${resolvedBorder}`,
      borderTop: `1px solid ${resolvedBorder}`,
    }),
  };

  const codeAreaStyle: CSSProperties = {
    backgroundColor: backgroundColor || colors.background,
    margin: 0,
    padding: "16px",
    overflow: "auto",
    position: "relative",
    borderBottomLeftRadius: "7px",
    borderBottomRightRadius: "7px",
    ...(stickyHeader && {
      height: styleHeight,
      maxHeight: styleMaxHeight,
      minHeight: styleMinHeight,
      overflow: styleOverflow || styleOverflowY || "auto",
    }),
  };

  const copyButtonStyle: CSSProperties = {
    position: "absolute",
    top: "8px",
    right: "8px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 10px",
    borderRadius: "6px",
    backgroundColor: copyButtonColor || colors.copyBg,
    color: colors.text,
    border: `1px solid ${borderColor || colors.border}`,
    cursor: "pointer",
    fontSize: "12px",
    transition: "opacity 0.2s, background-color 0.2s",
    opacity: isHovered ? 1 : 0,
    pointerEvents: isHovered ? "auto" : "none",
    zIndex: 5,
    backdropFilter: "blur(4px)",
  };

  return (
    <div className={className} style={containerStyle}>
      <style>{SHIKI_STYLE_OVERRIDES}</style>

      {/* Tab Bar */}
      {showHeader && (
        <div ref={headerRef} style={tabBarStyle} role="tablist">
          {tabs.map((tab, index) => {
            const displayLabel =
              tab.label || tab.lang.charAt(0).toUpperCase() + tab.lang.slice(1);
            return (
              <TabButton
                key={index}
                label={displayLabel}
                isActive={index === safeActiveTab}
                theme={theme}
                colors={colors}
                tabActiveColor={tabActiveColor}
                tabActiveTextColor={tabActiveTextColor}
                tabTextColor={tabTextColor}
                tabIndicatorColor={tabIndicatorColor}
                onClick={() => {
                  setActiveTab(index);
                  setCopied(false);
                }}
              />
            );
          })}
        </div>
      )}

      {/* Tab Panels */}
      {tabs.map((tab, index) => (
        <TabPanel
          key={index}
          tab={tab}
          theme={theme}
          showLineNumbers={showLineNumbers}
          showCopyButton={showCopyButton}
          isActive={index === safeActiveTab}
          copied={copied}
          colors={colors}
          borderColor={borderColor}
          lineNumberColor={lineNumberColor}
          codeAreaStyle={
            showHeader
              ? codeAreaStyle
              : { ...codeAreaStyle, borderRadius: "7px" }
          }
          copyButtonStyle={copyButtonStyle}
          onHover={setIsHovered}
          onCopy={handleCopy}
          onError={onError}
        />
      ))}
    </div>
  );
}

/* =============================================================================
 * TAB BUTTON
 * ============================================================================= */

function TabButton({
  label,
  isActive,
  theme,
  colors,
  tabActiveColor,
  tabActiveTextColor,
  tabTextColor,
  tabIndicatorColor,
  onClick,
}: {
  label: string;
  isActive: boolean;
  theme: "dark" | "light";
  colors: ThemeColors;
  tabActiveColor?: string;
  tabActiveTextColor?: string;
  tabTextColor?: string;
  tabIndicatorColor?: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const style: CSSProperties = {
    padding: "10px 18px",
    backgroundColor: isActive
      ? tabActiveColor || colors.tabActive
      : hovered
        ? colors.tabHover
        : colors.tabInactive,
    color: isActive
      ? tabActiveTextColor || colors.text
      : tabTextColor || colors.textMuted,
    border: "none",
    borderBottom: isActive
      ? `2px solid ${tabIndicatorColor || colors.tabIndicator}`
      : "2px solid transparent",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: isActive ? 600 : 400,
    fontFamily: "inherit",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
    position: "relative",
    ...(isActive && {
      boxShadow:
        theme === "dark"
          ? "0 1px 0 0 rgba(0,0,0,0.3)"
          : "0 1px 0 0 rgba(0,0,0,0.05)",
    }),
  };

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="tab"
      aria-selected={isActive ? "true" : "false"}
    >
      {label}
    </button>
  );
}

/* =============================================================================
 * TAB PANEL
 * ============================================================================= */

function TabPanel({
  tab,
  theme,
  showLineNumbers,
  showCopyButton,
  isActive,
  copied,
  colors,
  borderColor,
  lineNumberColor,
  codeAreaStyle,
  copyButtonStyle,
  onHover,
  onCopy,
  onError,
}: {
  tab: BxpCodeTab;
  theme: "dark" | "light";
  showLineNumbers: boolean;
  showCopyButton: boolean;
  isActive: boolean;
  copied: boolean;
  colors: ThemeColors;
  borderColor?: string;
  lineNumberColor?: string;
  codeAreaStyle: CSSProperties;
  copyButtonStyle: CSSProperties;
  onHover: (hovered: boolean) => void;
  onCopy: (code: string) => void;
  onError?: (error: Error) => void;
}) {
  const { html, formattedCode, loading } = useTabPanel(tab, theme, onError);

  if (!isActive) return null;

  const lineCount = formattedCode.split("\n").length;
  const lineNumberWidth = Math.max(String(lineCount).length * 10 + 16, 40);

  const lineNumbersStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingLeft: "0px",
    paddingRight: "16px",
    marginRight: "16px",
    borderRight: `1px solid ${borderColor || (theme === "dark" ? "#2a2a35" : "#e0e0e0")}`,
    color: lineNumberColor || colors.textMuted,
    fontSize: "14px",
    lineHeight: 1.6,
    fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
    userSelect: "none",
    minWidth: lineNumberWidth - 16,
    flexShrink: 0,
  };

  const codeWrapperStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
  };

  const codeContentStyle: CSSProperties = {
    margin: 0,
    lineHeight: 1.6,
    fontSize: "14px",
    fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
    flex: 1,
    overflow: "auto",
  };

  if (loading) {
    return (
      <div
        className="bxp-codetabs-content"
        style={codeAreaStyle}
        role="tabpanel"
      >
        <div
          style={{
            color: theme === "dark" ? "#888" : "#666",
            padding: "8px 0",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      className="bxp-codetabs-content"
      style={codeAreaStyle}
      role="tabpanel"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Hover copy button */}
      {showCopyButton && (
        <button
          style={copyButtonStyle}
          onClick={() => onCopy(formattedCode)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = colors.copyHoverBg)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = colors.copyBg)
          }
          title="Copy code"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied!" : "Copy"}
        </button>
      )}

      <div style={codeWrapperStyle}>
        {/* Line Numbers */}
        {showLineNumbers && formattedCode && (
          <div style={lineNumbersStyle}>
            {Array.from({ length: lineCount }, (_, i) => (
              <span key={i + 1}>{i + 1}</span>
            ))}
          </div>
        )}

        {/* Highlighted Code */}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          style={codeContentStyle}
        />
      </div>
    </div>
  );
}
