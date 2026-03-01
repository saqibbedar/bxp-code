/**
 * @fileoverview CodeContainer - A flexible container for displaying code blocks
 * with optional header, copy functionality, and sticky header support.
 *
 * @example
 * ```tsx
 * <CodeContainer
 *   code={rawCode}
 *   lang="typescript"
 *   fileName="example.ts"
 *   stickyHeader
 *   stickyTop={60}
 * >
 *   <HighlightedCode />
 * </CodeContainer>
 * ```
 */

import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";

/* =============================================================================
 * TYPES
 * ============================================================================= */

export type CodeContainerProps = {
  /** Rendered content (typically syntax-highlighted code) */
  children: ReactNode;

  /** File name displayed in header (e.g., "index.js") */
  fileName?: string;

  /** Language badge text in header */
  lang?: string;

  /** Raw code string used for copy-to-clipboard */
  code: string;

  /** Color theme affecting all default colors */
  theme?: "dark" | "light";

  /** Toggle entire header section visibility */
  showHeader?: boolean;

  /** Toggle file name in header */
  showFileName?: boolean;

  /** Toggle language badge in header */
  showLang?: boolean;

  /** Toggle copy button in header */
  showCopyButton?: boolean;

  /**
   * Enable sticky header on page scroll.
   * Header sticks to viewport at `stickyTop` position.
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Sticky header offset from viewport top (pixels).
   * Use this when page has a fixed navbar.
   * @default 0
   */
  stickyTop?: number;

  /** Override header background color */
  headerColor?: string;

  /** Override code area background color */
  backgroundColor?: string;

  /** Additional container styles */
  style?: CSSProperties;

  /** Additional CSS class */
  className?: string;
};

/* =============================================================================
 * THEME CONFIGURATION
 * ============================================================================= */

/** Default color palettes for dark/light themes */
const THEME_COLORS = {
  dark: {
    header: "#0f0f14",
    background: "#14141a",
    text: "#e1e1e1",
    border: "#2a2a35",
    langBadge: "#1e1e28",
    copyButton: "transparent",
    copyButtonHover: "#1e1e28",
  },
  light: {
    header: "#f5f5f5",
    background: "#ffffff",
    text: "#1e1e1e",
    border: "#e0e0e0",
    langBadge: "#e8e8e8",
    copyButton: "transparent",
    copyButtonHover: "#e8e8e8",
  },
} as const;

/* =============================================================================
 * STYLE OVERRIDES
 * ============================================================================= */

/** CSS overrides for Shiki-generated styles (ensures transparent backgrounds) */
const SHIKI_STYLE_OVERRIDES = `
  .bxp-code-content pre {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    overflow: visible !important;
  }
  .bxp-code-content code {
    background: transparent !important;
    font-family: inherit !important;
  }
  .bxp-code-content .shiki {
    background: transparent !important;
  }
`;

/* =============================================================================
 * ICONS (Lucide-style SVG icons)
 * ============================================================================= */

/** Clipboard copy icon */
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

/** Checkmark icon (shown after successful copy) */
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
 * COMPONENT
 * ============================================================================= */

/**
 * CodeContainer - Wrapper for code display with header and actions.
 *
 * Features:
 * - Header with language badge, filename, and copy button
 * - Dark/Light theme support
 * - Sticky header that attaches to viewport on scroll
 * - Copy to clipboard with visual feedback
 */
export function CodeContainer({
  children,
  fileName,
  lang,
  code,
  theme = "dark",
  showHeader = true,
  showFileName = true,
  showLang = true,
  showCopyButton = true,
  stickyHeader = false,
  stickyTop = 0,
  headerColor,
  backgroundColor,
  style,
  className,
}: CodeContainerProps) {
  /* ---------------------------------------------------------------------------
   * State & Refs
   * --------------------------------------------------------------------------- */

  const [copied, setCopied] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const colors = THEME_COLORS[theme];

  /* ---------------------------------------------------------------------------
   * Sticky Header Detection
   *
   * Monitors scroll position to detect when header becomes "stuck".
   * This is used to toggle border-radius for visual polish.
   * --------------------------------------------------------------------------- */

  useEffect(() => {
    if (!stickyHeader) return;

    const handleScroll = () => {
      if (!headerRef.current) return;

      const rect = headerRef.current.getBoundingClientRect();
      // +1 accounts for sub-pixel rendering differences
      setIsStuck(rect.top <= stickyTop + 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [stickyHeader, stickyTop]);

  /* ---------------------------------------------------------------------------
   * Event Handlers
   * --------------------------------------------------------------------------- */

  /** Copies code to clipboard with 2-second success feedback */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[CodeContainer] Copy failed:", err);
    }
  };

  /* ---------------------------------------------------------------------------
   * Computed Values
   * --------------------------------------------------------------------------- */

  // Header renders only if there's at least one visible element
  const shouldShowHeader =
    showHeader &&
    ((showFileName && fileName) || (showLang && lang) || showCopyButton);

  // Extract height-related styles for special sticky handling
  // When sticky: height constraints apply to code area, not container
  // This keeps header sticky while code scrolls internally
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
    overflow: stickyHeader ? "visible" : "hidden", // visible required for sticky
    border: `1px solid ${colors.border}`,
    fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
    fontSize: "14px",
    ...(stickyHeader ? restStyle : style),
    ...(!stickyHeader && {
      height: styleHeight,
      maxHeight: styleMaxHeight,
      minHeight: styleMinHeight,
      overflow: styleOverflow,
      overflowY: styleOverflowY,
    }),
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    backgroundColor: headerColor || colors.header,
    borderBottom: `1px solid ${colors.border}`,
    // Dynamic border-radius: rounded when floating, flat when stuck
    borderTopLeftRadius: stickyHeader ? (isStuck ? 0 : "8px") : undefined,
    borderTopRightRadius: stickyHeader ? (isStuck ? 0 : "8px") : undefined,
    ...(stickyHeader && {
      position: "sticky",
      top: stickyTop,
      zIndex: 10,
      // Extend borders for visual consistency when sticky
      marginLeft: "-1px",
      marginRight: "-1px",
      marginTop: "-1px",
      borderLeft: `1px solid ${colors.border}`,
      borderRight: `1px solid ${colors.border}`,
      borderTop: `1px solid ${colors.border}`,
    }),
  };

  const leftSectionStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const langBadgeStyle: CSSProperties = {
    padding: "2px 8px",
    borderRadius: "4px",
    backgroundColor: colors.langBadge,
    color: colors.text,
    fontSize: "12px",
    fontWeight: 500,
    textTransform: "uppercase",
  };

  const fileNameStyle: CSSProperties = {
    color: colors.text,
    fontSize: "13px",
    opacity: 0.9,
  };

  const copyButtonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: colors.copyButton,
    color: colors.text,
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    transition: "background-color 0.2s",
  };

  const codeAreaStyle: CSSProperties = {
    backgroundColor: backgroundColor || colors.background,
    margin: 0,
    padding: "16px",
    overflow: "auto",
    borderBottomLeftRadius: stickyHeader ? "8px" : undefined,
    borderBottomRightRadius: stickyHeader ? "8px" : undefined,
    // Sticky: height constraints here for internal scrolling
    ...(stickyHeader && {
      height: styleHeight,
      maxHeight: styleMaxHeight,
      minHeight: styleMinHeight,
      overflow: styleOverflow || styleOverflowY || "auto",
    }),
  };

  /* ---------------------------------------------------------------------------
   * Render
   * --------------------------------------------------------------------------- */

  return (
    <div className={className} style={containerStyle}>
      <style>{SHIKI_STYLE_OVERRIDES}</style>

      {/* Header */}
      {shouldShowHeader && (
        <div ref={headerRef} style={headerStyle}>
          <div style={leftSectionStyle}>
            {showLang && lang && <span style={langBadgeStyle}>{lang}</span>}
            {showFileName && fileName && (
              <span style={fileNameStyle}>{fileName}</span>
            )}
          </div>

          {showCopyButton && (
            <button
              onClick={handleCopy}
              style={copyButtonStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = colors.copyButtonHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = colors.copyButton)
              }
              title="Copy code"
              aria-label={copied ? "Copied!" : "Copy code"}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      )}

      {/* Code Content */}
      <div className="bxp-code-content" style={codeAreaStyle}>
        {children}
      </div>
    </div>
  );
}
