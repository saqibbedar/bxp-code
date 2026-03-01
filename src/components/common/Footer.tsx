/**
 * Footer component for bxp-code documentation landing page.
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Main Footer Content */}
        <div style={styles.grid} className="footer-grid">
          {/* Brand Column */}
          <div style={styles.brandColumn} className="footer-brand">
            <div style={styles.logoWrapper}>
              <img src="/logo.svg" alt="bxp-code" style={styles.logoImg} />
            </div>
            <p style={styles.description} className="footer-description">
              Beautiful syntax highlighting for React applications. Built with
              Shiki and Prettier for the best developer experience.
            </p>
            <div style={styles.socialLinks} className="footer-social">
              <a
                href="https://github.com/saqibbedar/bxp-code"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://x.com/saqibbedar"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
                aria-label="X (Twitter)"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://linkedin.com/in/saqibbedar"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.npmjs.com/package/bxp-code"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialLink}
                aria-label="npm"
              >
                <NpmIcon />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div style={styles.linksColumn} className="footer-links-column">
            <h4 style={styles.columnTitle}>Resources</h4>
            <ul style={styles.linksList}>
              <li>
                <a
                  href="https://saqibbedar.github.io/bxp-code/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a href="#examples" style={styles.link}>
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/saqibbedar/bxp-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/bxp-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  npm Package
                </a>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div style={styles.linksColumn} className="footer-links-column">
            <h4 style={styles.columnTitle}>Community</h4>
            <ul style={styles.linksList}>
              <li>
                <a
                  href="https://github.com/saqibbedar/bxp-code/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/saqibbedar/bxp-code/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/saqibbedar/bxp-code/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  Contributing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div style={styles.linksColumn} className="footer-links-column">
            <h4 style={styles.columnTitle}>Legal</h4>
            <ul style={styles.linksList}>
              <li>
                <a
                  href="https://github.com/saqibbedar/bxp-code/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © {currentYear} bxp-code. Built with ❤️ by{" "}
            <a
              href="https://github.com/saqibbedar"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.authorLink}
            >
              Saqib Bedar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

/* =============================================================================
 * ICONS
 * ============================================================================= */

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const NpmIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
  </svg>
);

/* =============================================================================
 * STYLES
 * ============================================================================= */

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: "#0a0a0f",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "64px 0 24px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "48px",
    marginBottom: "48px",
  },
  brandColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    height: "24px",
    width: "auto",
  },
  description: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "14px",
    lineHeight: 1.6,
    maxWidth: "300px",
  },
  socialLinks: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  socialLink: {
    color: "rgba(255, 255, 255, 0.5)",
    transition: "color 0.2s",
  },
  linksColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  columnTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },
  linksList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "rgba(255, 255, 255, 0.6)",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.2s",
  },
  bottomBar: {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "24px",
    textAlign: "center",
  },
  copyright: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "14px",
    margin: 0,
  },
  authorLink: {
    color: "#e06b74",
    textDecoration: "none",
  },
};

export default Footer;
