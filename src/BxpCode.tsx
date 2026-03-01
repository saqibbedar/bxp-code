/**
 * @fileoverview BxpCode - Syntax highlighting component with Shiki and Prettier.
 *
 * Features:
 * - Shiki-powered syntax highlighting with custom themes
 * - Prettier code formatting (auto-formats on render)
 * - Multiple input sources: direct string, File object, or URL
 * - Auto-detects language from filename
 * - Line numbers with proper alignment
 * - Dark/Light theme support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <BxpCode code={myCode} lang="typescript" />
 *
 * // From file input
 * <BxpCode file={uploadedFile} />
 *
 * // From URL with sticky header
 * <BxpCode url="https://example.com/code.ts" stickyHeader stickyTop={64} />
 * ```
 */

import { useEffect, useState, type CSSProperties } from "react";
import { createHighlighter, type ThemeRegistrationRaw } from "shiki";
import * as prettier from "prettier/standalone";
import prettierPluginBabel from "prettier/plugins/babel";
import prettierPluginEstree from "prettier/plugins/estree";
import prettierPluginTypescript from "prettier/plugins/typescript";
import prettierPluginHtml from "prettier/plugins/html";
import prettierPluginCss from "prettier/plugins/postcss";
import prettierPluginMarkdown from "prettier/plugins/markdown";

import { CodeContainer } from "./CodeContainer";
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

/** Maps language identifiers to Prettier parsers */
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

/** All Prettier plugins loaded for formatting */
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

/** Maps file extensions to language identifiers */
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

/* =============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================= */

/**
 * Formats code using Prettier if supported, otherwise dedents it.
 *
 * @param code - Raw code string to format
 * @param lang - Language identifier for parser selection
 * @returns Formatted code string
 */
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
      // Prettier failed (syntax error, etc.) - fall back to dedent
      return dedentCode(code);
    }
  }

  // No parser available - just dedent
  return dedentCode(code);
}

/**
 * Removes common leading indentation from code.
 * Handles template literal indentation issues.
 *
 * @param code - Code string to dedent
 * @returns Dedented code string
 */
function dedentCode(code: string): string {
  const lines = code.split("\n");

  // Trim leading/trailing empty lines
  let start = 0;
  let end = lines.length - 1;
  while (start < lines.length && lines[start].trim() === "") start++;
  while (end > start && lines[end].trim() === "") end--;

  const trimmedLines = lines.slice(start, end + 1);
  if (trimmedLines.length === 0) return "";

  // Find minimum indentation (ignoring empty lines)
  const minIndent = trimmedLines.reduce((min, line) => {
    if (line.trim() === "") return min;
    const leadingSpaces = line.match(/^[\t ]*/)?.[0].length ?? 0;
    return Math.min(min, leadingSpaces);
  }, Infinity);

  // Remove common indentation
  return trimmedLines
    .map((line) => (line.trim() === "" ? "" : line.slice(minIndent).trimEnd()))
    .join("\n");
}

/**
 * Extracts language from filename extension.
 *
 * @param fileName - File name with extension
 * @returns Language identifier or undefined
 */
function getLangFromFileName(fileName: string): string | undefined {
  const ext = fileName.split(".").pop()?.toLowerCase();
  return ext ? EXTENSION_TO_LANG[ext] || ext : undefined;
}

/* =============================================================================
 * TYPES
 * ============================================================================= */

export type BxpCodeProps = {
  /** Code string to highlight (use this OR file/url) */
  code?: string;

  /** File object from input[type=file] or drag-drop */
  file?: File;

  /** URL to fetch code from */
  url?: string;

  /** Language for syntax highlighting (auto-detected from fileName if not provided) */
  lang?: string;

  /** File name for header display (auto-detected from file/url if not provided) */
  fileName?: string;

  /** Color theme */
  theme?: "dark" | "light";

  /** Toggle header visibility */
  showHeader?: boolean;

  /** Toggle file name in header */
  showFileName?: boolean;

  /** Toggle language badge in header */
  showLang?: boolean;

  /** Toggle copy button in header */
  showCopyButton?: boolean;

  /** Toggle line numbers */
  showLineNumbers?: boolean;

  /**
   * Enable sticky header on page scroll.
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Sticky header offset from viewport top (pixels).
   * @default 0
   */
  stickyTop?: number;

  /** Override header background color */
  headerColor?: string;

  /** Override code background color */
  backgroundColor?: string;

  /** Additional container styles */
  style?: CSSProperties;

  /** Additional CSS class */
  className?: string;

  /** Error callback for file/url loading failures */
  onError?: (error: Error) => void;
};

/* =============================================================================
 * COMPONENT
 * ============================================================================= */

/**
 * BxpCode - Syntax-highlighted code block with formatting.
 *
 * Supports three input methods:
 * 1. `code` prop - Direct code string
 * 2. `file` prop - File object (reads asynchronously)
 * 3. `url` prop - Fetches code from URL
 *
 * Priority: code > file > url
 */
export function BxpCode({
  code,
  file,
  url,
  lang,
  fileName,
  theme = "dark",
  showHeader = true,
  showFileName = true,
  showLang = true,
  showCopyButton = true,
  showLineNumbers = true,
  stickyHeader = false,
  stickyTop = 0,
  headerColor,
  backgroundColor,
  style,
  className,
  onError,
}: BxpCodeProps) {
  /* ---------------------------------------------------------------------------
   * State
   * --------------------------------------------------------------------------- */

  const [html, setHtml] = useState("");
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loadedSource, setLoadedSource] = useState<File | string | null>(null);
  const [formattedCode, setFormattedCode] = useState("");

  /* ---------------------------------------------------------------------------
   * Computed Values
   * --------------------------------------------------------------------------- */

  // Resolve filename from props or source
  const resolvedFileName =
    fileName || file?.name || (url ? url.split("/").pop() : undefined);

  // Auto-detect language from filename if not explicitly provided
  const resolvedLang =
    lang ||
    (resolvedFileName ? getLangFromFileName(resolvedFileName) : undefined) ||
    "text";

  // Determine loading state
  const currentSource = file || url || null;
  const isLoading =
    !code && currentSource !== null && loadedSource !== currentSource;

  // Final source code (priority: code > file content > empty)
  const sourceCode = code ?? fileContent ?? "";

  /* ---------------------------------------------------------------------------
   * File Reading Effect
   *
   * Reads File object using FileReader API when `file` prop changes.
   * --------------------------------------------------------------------------- */

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setFileContent(e.target?.result as string);
      setLoadedSource(file);
    };

    reader.onerror = () => {
      onError?.(new Error("Failed to read file"));
      setLoadedSource(file);
    };

    reader.readAsText(file);
  }, [file, onError]);

  /* ---------------------------------------------------------------------------
   * URL Fetching Effect
   *
   * Fetches code content from URL when `url` prop changes.
   * --------------------------------------------------------------------------- */

  useEffect(() => {
    if (!url) return;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        setFileContent(text);
        setLoadedSource(url);
      })
      .catch((err) => {
        onError?.(err);
        setLoadedSource(url);
      });
  }, [url, onError]);

  /* ---------------------------------------------------------------------------
   * Code Formatting Effect
   *
   * Formats source code with Prettier (async).
   * Runs whenever sourceCode or language changes.
   * --------------------------------------------------------------------------- */

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

  /* ---------------------------------------------------------------------------
   * Syntax Highlighting Effect
   *
   * Creates Shiki highlighter and generates HTML.
   * Runs when formattedCode, theme, or language changes.
   * --------------------------------------------------------------------------- */

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

  /* ---------------------------------------------------------------------------
   * Loading State
   * --------------------------------------------------------------------------- */

  if (isLoading) {
    return (
      <CodeContainer
        code=""
        lang={resolvedLang}
        fileName={resolvedFileName}
        theme={theme}
        showHeader={showHeader}
        showFileName={showFileName}
        showLang={showLang}
        showCopyButton={false}
        stickyHeader={stickyHeader}
        stickyTop={stickyTop}
        headerColor={headerColor}
        backgroundColor={backgroundColor}
        style={style}
        className={className}
      >
        <div
          style={{
            color: theme === "dark" ? "#888" : "#666",
            padding: "8px 0",
          }}
        >
          Loading...
        </div>
      </CodeContainer>
    );
  }

  /* ---------------------------------------------------------------------------
   * Line Numbers Calculation
   * --------------------------------------------------------------------------- */

  const lineCount = formattedCode.split("\n").length;
  const lineNumberWidth = Math.max(String(lineCount).length * 10 + 16, 40);

  /* ---------------------------------------------------------------------------
   * Styles
   * --------------------------------------------------------------------------- */

  const lineNumbersStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingLeft: "0px",
    paddingRight: "16px",
    marginRight: "16px",
    borderRight: `1px solid ${theme === "dark" ? "#2a2a35" : "#e0e0e0"}`,
    color: theme === "dark" ? "#707085" : "#9898A0",
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

  /* ---------------------------------------------------------------------------
   * Render
   * --------------------------------------------------------------------------- */

  return (
    <CodeContainer
      code={formattedCode}
      lang={resolvedLang}
      fileName={resolvedFileName}
      theme={theme}
      showHeader={showHeader}
      showFileName={showFileName}
      showLang={showLang}
      showCopyButton={showCopyButton}
      stickyHeader={stickyHeader}
      stickyTop={stickyTop}
      headerColor={headerColor}
      backgroundColor={backgroundColor}
      style={style}
      className={className}
    >
      <div style={codeWrapperStyle}>
        {/* Line Numbers */}
        {showLineNumbers && (
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
    </CodeContainer>
  );
}
