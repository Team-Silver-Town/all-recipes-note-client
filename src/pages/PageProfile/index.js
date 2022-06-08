import { useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";

function PageProfile({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>Profile 영역입니다.</Main>
      <Footer />
    </Container>
  );
}

export default PageProfile;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
