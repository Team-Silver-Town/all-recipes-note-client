import { useEffect } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { useQuery } from "react-query";
import { getRecipes } from "../api/recipeApi";
import { NavLink } from "react-router-dom";
import RecipeCard from "../components/Card.Recipe";

function PageRecipes({ loginUserInfo, handleLogin }) {
  const { data: recipes } = useQuery("recipes", getRecipes);
  console.log(recipes);

  useEffect(() => {
    document.title = "Recipes";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <NavLink to="/recipes/new">영상추가하기</NavLink>
        {recipes &&
          recipes.map((recipe) => {
            return (
              <NavLink id={recipe._id} to={`/recipes/${recipe._id}`}>
                <RecipeCard recipeData={recipe} />;
              </NavLink>
            );
          })}
      </Main>
    </Container>
  );
}

export default PageRecipes;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
