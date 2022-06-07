import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageHome from "../pages/PageHome";
import PageLogin from "../pages/PageLogin";

function DefaultRoutes({ loginUserInfo, handleLogin }) {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PageHome loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
          }
        />
        <Route
          path="/login"
          element={<PageLogin handleLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default DefaultRoutes;
