import { useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

function PageOneRecipe({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "OneRecipe";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>OneRecipes 화면입니다. 화면 구성 변경이 필요합니다!</Main>
      <Footer />
    </Container>
  );
}

export default PageOneRecipe;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
