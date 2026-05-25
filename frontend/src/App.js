import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Insights from "./pages/Insights";
import ChartsPage from "./pages/ChartsPage";
import EmojiPage from "./pages/EmojiPage"; // ✅ NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/charts" element={<ChartsPage />} />

        {/* ✅ NEW ROUTE */}
        <Route path="/emoji" element={<EmojiPage />} />
      </Routes>
    </Router>
  );
}

export default App;