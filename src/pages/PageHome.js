import { useEffect } from "react";
import Typewriter from "typewriter-effect";
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
      <Main>
        <TypewriterContainer>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("요리 좋아하세요?,,,🍖🤔")
                .pauseFor(1500)
                .deleteAll()
                .typeString("유튜브 영상 많이 보셨겠네요.....🥸")
                .pauseFor(2500)
                .deleteAll()
                .typeString("이제 영상과 함께 나만의 요리 노트를 저장하세요📸")
                .pauseFor(2500)
                .deleteAll()
                .typeString("나만의 요리 노하우를 적고 싶다면..🖊")
                .pauseFor(1500)
                .deleteAll()
                .typeString("다른 사람의 요리 비법을 훔쳐보고 싶다면..😎")
                .pauseFor(1500)
                .deleteAll()
                .typeString("최고의 레시피를 찾고 싶다면..🔍")
                .pauseFor(1500)
                .deleteAll()
                .typeString("모조리...적으세요‼✍️")
                .pauseFor(3000)
                .deleteChars(12)
                .pauseFor(1000)
                .typeString("두의 조리 노트.")
                .pauseFor(1000)
                .deleteAll()
                .typeString("모조리 🫵")
                .start();
            }}
          />
        </TypewriterContainer>
      </Main>
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

const TypewriterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 75px;
`;
