import { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { getRecipes } from "../api/recipeApi";
import { shuffle } from "lodash";

import Header from "../components/Header";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecipeCard from "../components/Card.Recipe";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

function PageRecipes({ loginUserInfo, handleLogin }) {
  const { data: recipes } = useQuery("recipes", getRecipes, {
    staleTime: 300000,
  });

  useEffect(() => {
    document.title = "Recipes";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      {!recipes && (
        <LoagingMain>
          <Loading />
        </LoagingMain>
      )}
      {recipes && (
        <Main>
          <StyledNewLink to="/recipes/new">
            <div>
              <FontAwesomeIcon icon={faPlus} size="4x" />
            </div>
            <div>새 영상 추가하기</div>
          </StyledNewLink>
          {recipes.map((recipe) => {
            return (
              <StyledRecipeLink key={recipe._id} to={`/recipes/${recipe._id}`}>
                <RecipeCard recipeData={recipe} />
              </StyledRecipeLink>
            );
          })}
        </Main>
      )}
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
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 250px;
  gap: 10px;
  margin: 10px;
`;

const LoagingMain = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNewLink = styled(NavLink)`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2px;
  border: 2px solid black;

  &:hover,
  &:focus {
    background-color: var(--secondary-color);

    div:nth-child(1) {
      transform: rotate(90deg);
    }
  }

  div:nth-child(1) {
    transition: all ease-in-out 0.5s;
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
  border-radius: 10px;
  background-color: white;
  border: 2px solid black;

  &:hover,
  &:focus {
    background-color: var(--secondary-color);
    font-weight: bold;
  }
`;
