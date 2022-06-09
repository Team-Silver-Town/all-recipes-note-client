import { useEffect } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

function PageTips({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "Tips";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>Tips 화면입니다.</Main>
      <Footer />
    </Container>
  );
}

export default PageTips;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
