import { useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Container>
      <LoginBox>
        <h1>로그인</h1>
        <ButtonList>
          <button>
            <img
              alt="google-logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3xqbVcEHLEUb5nZrVBscKBEw9bQ3TSkDc1wjM-NzsJBuzQqgFIbsrztLrUMRTAnfRSIE&usqp=CAU"
            />
            구글로 계속 하기
          </button>
        </ButtonList>
        <div>
          <p>계정이 없으신가요?</p>
          <Link to="/singup">회원가입</Link>
        </div>
      </LoginBox>
    </Container>
  );
}

export default Login;

const Container = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 20%;
  min-width: 280px;
  height: 50%;
  min-height: 380px;
  border-radius: 15px;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-size: xx-large;
    text-align: center;
    margin: 40px 0px;
  }

  p {
    margin-bottom: 10px;
  }

  a {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-weight: bolder;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const ButtonList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 55%;

  button {
    width: 90%;
    display: flex;
    justify-content: center;

    img {
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }
  }
`;
