import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PageHome from "../pages/PageHome";
import PageLogin from "../pages/PageLogin";
import PageNewRecipe from "../pages/PageNewRecipe";
import PageMyRecipes from "../pages/PageMyRecipes";
import PageSingleRecipe from "../pages/PageSingleRecipe";
import PageProfile from "../pages/PageProfile";
import PageRankings from "../pages/PageRankings";
import PageRecipes from "../pages/PageRecipes";
import PageTips from "../pages/PageTips";

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
        <Route
          path="/recipes"
          element={
            <PageRecipes
              loginUserInfo={loginUserInfo}
              handleLogin={handleLogin}
            />
          }
        />
        <Route path="/recipes/new" element={<PageNewRecipe />} />
        <Route
          path="/recipes/my-recipes"
          element={
            loginUserInfo ? (
              <PageMyRecipes
                loginUserInfo={loginUserInfo}
                handleLogin={handleLogin}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/recipes/:recipe_id"
          element={
            <PageSingleRecipe
              loginUserInfo={loginUserInfo}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/profile"
          element={
            loginUserInfo ? (
              <PageProfile
                loginUserInfo={loginUserInfo}
                handleLogin={handleLogin}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/rankings"
          element={
            <PageRankings
              loginUserInfo={loginUserInfo}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/tips"
          element={
            <PageTips loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
          }
        />
      </Routes>
    </Router>
  );
}

export default DefaultRoutes;
