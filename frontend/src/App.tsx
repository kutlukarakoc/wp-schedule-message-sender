import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QRPage from "./pages/QR";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QRPage />} />
      </Routes>
    </Router>
  );
}

export default App;
