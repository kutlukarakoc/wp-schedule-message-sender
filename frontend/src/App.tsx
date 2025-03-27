import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import QRPage from "./pages/QR";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/qr" element={<QRPage />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
