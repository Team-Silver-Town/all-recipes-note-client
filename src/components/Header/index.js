import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import { Navigation, MyAccount } from "./component";

function Header() {
  const [isModalOpen, setModalOpen] = useState(false);
  const clickedToggle = () => {
    setModalOpen((prev) => !prev);
  };

  if (isModalOpen) {
    return (
      <Container>
        <Navigation />
        <MyAccount clickedToggle={clickedToggle} />
        <MyAccountModal>
          <Link to="/">My Profile</Link>
          <Link to="/">My Recipes</Link>
          <Link to="/">Log out</Link>
        </MyAccountModal>
      </Container>
    );
  } else {
    return (
      <Container>
        <Navigation />
        <MyAccount clickedToggle={clickedToggle} />
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
