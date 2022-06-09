import { useEffect } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

function PageRankings({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "Rankings";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>Rankings 화면입니다.</Main>
      <Footer />
    </Container>
  );
}

export default PageRankings;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
