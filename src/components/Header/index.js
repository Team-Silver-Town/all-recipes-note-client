import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../services/firebase";

import { Navigation, MyAccount } from "./component";

function Header({ loginUserInfo, handleLogin }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const clickedToggle = () => {
    setModalOpen((prev) => !prev);
  };

  const handleClick = async () => {
    await signOut();
    localStorage.removeItem("allRecipesNoteLoginInfo");
    handleLogin(null);

    navigate("/login");
  };

  const modalOnLogin = (
    <>
      <Link to="/">My Profile</Link>
      <Link to="/">My Recipes</Link>
      <span onClick={handleClick}>Log out</span>
    </>
  );

  const modalOnLogout = (
    <>
      <Link to="/login">Login</Link>
    </>
  );

  if (isModalOpen) {
    return (
      <Container>
        <Navigation />
        <MyAccount
          clickedToggle={clickedToggle}
          loginUserInfo={loginUserInfo}
        />
        <MyAccountModal>
          {loginUserInfo ? modalOnLogin : modalOnLogout}
        </MyAccountModal>
      </Container>
    );
  } else {
    return (
      <Container>
        <Navigation />
        <MyAccount
          clickedToggle={clickedToggle}
          loginUserInfo={loginUserInfo}
        />
      </Container>
    );
  }
}

export default Header;

const Container = styled.header`
  height: 80px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  position: relative;
`;

const fadeIn = keyframes`
  from {
    transform: scale(0.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const MyAccountModal = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: white;
  right: 10px;
  top: 80px;
  padding: 0 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    height: 30%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  a {
    height: 30%;
    display: flex;
    align-items: center;
  }

  a:nth-child(2) {
    border-bottom: 1px solid black;
  }

  animation: ${fadeIn} 0.15s ease-out;
`;
