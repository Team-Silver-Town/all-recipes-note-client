import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/Card.Recipe";

function PageMyRecipes({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "MyRecipes";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <StyledLink to="/recipes">요기</StyledLink>
        <StyledLink to="/recipes">요기2</StyledLink>
        <StyledLink to="/recipes">요기3</StyledLink>
        <StyledLink to="/recipes">요기4</StyledLink>
        <StyledLink to="/recipes">요기5</StyledLink>
        <StyledLink to="/recipes">요기6</StyledLink>
        <StyledLink to="/recipes">요기7</StyledLink>
        <StyledLink to="/recipes">요기8</StyledLink>
        <StyledLink to="/recipes">요기9</StyledLink>
        <StyledLink to="/recipes">요기10</StyledLink>
        <StyledLink to="/recipes">요기11</StyledLink>
        <StyledLink to="/recipes">요기12</StyledLink>
      </Main>
      <Footer />
    </Container>
  );
}

export default PageMyRecipes;

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
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 250px;
  gap: 10px;
  margin: 10px;
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;

  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    border: 2px solid black;
    padding: 2px;
    font-weight: bolder;
  }
`;
