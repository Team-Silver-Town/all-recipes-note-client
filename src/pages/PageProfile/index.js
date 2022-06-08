import { useState, useEffect } from "react";
import styled from "styled-components";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function PageProfile({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <ProfileBox>
          <ProfileImg src={loginUserInfo.picture} />
          <ProfileLine>
            <label>ID</label>
            <input type="text" value={loginUserInfo.id} disabled />
          </ProfileLine>
          <ProfileLine>
            <label>E-mail</label>
            <input type="email" value={loginUserInfo.email} disabled />
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

  input {
    height: 40px;
    width: 80%;
    border: none;
    font-weight: bold;
    font-size: medium;
    padding-left: 5px;
    border-bottom: 1px solid black;
  }

  input:disabled {
    background-color: white;
  }
`;
