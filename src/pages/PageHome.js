import { useEffect } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

function Home({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>Home 화면입니다.</Main>
      <Footer />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
