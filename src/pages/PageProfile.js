import { useState, useEffect } from "react";
import styled from "styled-components";
import { updateUser } from "../api/authApi";

import Header from "../components/Header";
import Footer from "../components/Footer";

function PageProfile({ loginUserInfo, handleLogin }) {
  const [inputNickname, setInputNickname] = useState(loginUserInfo.nickname);
  const handleChange = (event) => {
    setInputNickname(event.target.value);
  };

  const handleClick = async () => {
    try {
      const nickname = inputNickname;
      const { email, picture, token } = loginUserInfo;

      await updateUser({ nickname, email });

      localStorage.removeItem("allRecipesNoteLoginInfo");
      localStorage.setItem(
        "allRecipesNoteLoginInfo",
        JSON.stringify({ email, picture, nickname, token })
      );

      handleLogin({ email, picture, nickname, token });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <ProfileBox>
          <ProfileImg
            src={loginUserInfo.picture}
            alt="로그인 유저의 프로필 사진"
          />
          <ProfileLine>
            <label>별명</label>
            <div>
              <input
                type="text"
                value={inputNickname}
                onChange={handleChange}
              />
              <button type="button" onClick={handleClick}>
                변경
              </button>
            </div>
          </ProfileLine>
          <ProfileLine>
            <label>이메일</label>
            <div>
              <input type="email" value={loginUserInfo.email} disabled />
            </div>
          </ProfileLine>
        </ProfileBox>
      </Main>
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

const Main = styled.main`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileBox = styled.div`
  margin-top: 110px;
  background-color: white;
  border-radius: 20px;
  width: 40%;
  min-width: 350px;
  height: 45%;
  min-height: 315px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--secondary-color);
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  margin: 25px 0px;
`;

const ProfileLine = styled.div`
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  width: 90%;
  display: flex;

  label {
    display: inline-block;
    width: 20%;
    text-align: center;
    font-weight: bold;
    font-size: medium;
  }

  div {
    width: 80%;
    padding-left: 5px;
    border-bottom: 1px solid black;
    background-color: var(--secondary-color);
  }

  input {
    height: 35px;
    width: 80%;
    border: none;
    font-weight: bold;
    font-size: medium;
    background-color: var(--secondary-color);
    outline: none;
  }

  input:disabled {
    background-color: var(--secondary-color);
  }

  button {
    width: 60px;
    height: 100%;
    font-weight: bold;
    font-size: medium;
  }
`;
