import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QRPage from "./pages/QR";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr" element={<QRPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
