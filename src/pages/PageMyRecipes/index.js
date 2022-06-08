import { useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

function PageMyRecipes({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "MyRecipes";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>MyRecipes 화면입니다.</Main>
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
