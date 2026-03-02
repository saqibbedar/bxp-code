/**
 * App - bxp-code documentation landing page with routing.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CoverPage from "./components/ui/CoverPage";
import ExamplesPage from "./components/ui/ExamplesPage";

const App = () => {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <Header />
        <Routes>
          <Route path="/" element={<CoverPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
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
