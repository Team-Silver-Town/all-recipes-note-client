import { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import Header from "../components/Header";
import { getRecipes } from "../api/recipeApi";
import { NavLink } from "react-router-dom";
import RecipeCard from "../components/Card.Recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
        <StyledNewLink to="/recipes/new">
          <div>
            <FontAwesomeIcon icon={faPlus} size="4x" />
          </div>
          <div>새 영상 추가하기</div>
        </StyledNewLink>
        {recipes &&
          recipes.map((recipe) => {
            return (
              <StyledRecipeLink id={recipe._id} to={`/recipes/${recipe._id}`}>
                <RecipeCard recipeData={recipe} />
              </StyledRecipeLink>
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

const Main = styled.main`
  height: 100%;
  overflow: auto;
  padding-top: 80px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 300px;
  gap: 10px;
  margin: 10px;
`;

const StyledNewLink = styled(NavLink)`
  display: block;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all ease 1s;

  div:nth-child(1) {
    transition: all ease-in-out 0.5s;
  }

  div:nth-child(1):hover {
    transform: rotate(90deg);
  }

  div:nth-child(2) {
    position: absolute;
    bottom: 10px;
    font-size: medium;
  }
`;

const StyledRecipeLink = styled(NavLink)`
  display: block;
  width: 100%;
  height: 100%;
  background-color: white;
`;
