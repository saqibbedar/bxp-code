/**
 * App - bxp-code documentation landing page.
 */

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CoverPage from "./components/ui/CoverPage";

const App = () => {
  return (
    <div style={styles.app}>
      <Header />
      <CoverPage />
      <Footer />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
    minHeight: "100vh",
    backgroundColor: "#0a0a0f",
  },
};

export default App;
