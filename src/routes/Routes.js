import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageHome from "../pages/PageHome";
import PageSignup from "../pages/PageSignup";
import PageLogin from "../pages/PageLogin";

function DefaultRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageHome />} />
        <Route path="/signup" element={<PageSignup />} />
        <Route path="/login" element={<PageLogin />} />
      </Routes>
    </Router>
  );
}

export default DefaultRoutes;
