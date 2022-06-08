import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageHome from "../pages/PageHome";
import PageLogin from "../pages/PageLogin";
import PageNewRecipe from "../pages/PageNewRecipe";
import PageMyRecipes from "../pages/PageMyRecipes";
import PageOneRecipe from "../pages/PageOneRecipe";
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
            <PageMyRecipes
              loginUserInfo={loginUserInfo}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/recipes/:recipe_id"
          element={
            <PageOneRecipe
              loginUserInfo={loginUserInfo}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <PageProfile
              loginUserInfo={loginUserInfo}
              handleLogin={handleLogin}
            />
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
