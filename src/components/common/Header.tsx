/**
 * Header component for bxp-code documentation landing page.
 */

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logoLink}>
          <img src="/logo.svg" alt="bxp-code" style={styles.logoImg} />
        </Link>

        {/* Navigation */}
        <nav style={styles.nav} className="header-nav">
          <a
            href="/#features"
            style={styles.navLink}
            className="header-nav-links"
          >
            Features
          </a>
          <Link
            to="/examples"
            style={styles.navLink}
            className="header-nav-links"
          >
            Examples
          </Link>
          <a
            href="https://github.com/saqibbedar/bxp-code"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.navLink}
          >
            <GitHubIcon />
          </a>
          <a
            href="https://saqibbedar.github.io/bxp-code/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.docsButton}
            className="header-docs-btn"
          >
            Documentation
          </a>
        </nav>
      </div>
    </header>
  );
};

const GitHubIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/* =============================================================================
 * STYLES
 * ============================================================================= */

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "64px",
    backgroundColor: "rgba(10, 10, 15, 0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logoImg: {
    height: "24px",
    width: "auto",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  navLink: {
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  docsButton: {
    backgroundColor: "#e06b74",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};

export default Header;
