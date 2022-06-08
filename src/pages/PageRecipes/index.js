import { useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import { useQuery } from "react-query";
import { getRecipes } from "../../api/recipeApi";
import { Link } from "react-router-dom";

function PageRecipes({ loginUserInfo, handleLogin }) {
  const { data } = useQuery("recipes", getRecipes);
  console.log("recipes", data);

  useEffect(() => {
    document.title = "Recipes";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <Link to="/"> Home </Link>
        <div>영상추가하기</div>
      </Main>
      <Footer />
    </Container>
  );
}

export default PageRecipes;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
