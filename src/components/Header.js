import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../services/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAudio } from "@fortawesome/free-regular-svg-icons";
import { Navigation, MyAccount } from "./Header.component";
import ModalGuide from "./ModalGuide";

function Header({ loginUserInfo, handleLogin, toggleTheme, theme }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);
  const navigate = useNavigate();

  const clickedToggle = () => {
    setModalOpen((prev) => !prev);
  };

  const keyDownedToggle = (event) => {
    if (event.key === "Enter") {
      setModalOpen((prev) => !prev);
    }
  };

  const handleClick = async () => {
    await signOut();
    handleLogin(null);
    navigate("/login");
    localStorage.removeItem("allRecipesNoteLoginInfo");
  };

  const modalOnLogin = (
    <>
      <Link tabIndex="0" to="/profile">
        My Profile
      </Link>
      <Link tabIndex="0" to="/recipes/my-recipes">
        My Recipes
      </Link>
      <span tabIndex="0" onClick={handleClick}>
        Log out
      </span>
    </>
  );

  const modalOnLogout = (
    <>
      <Link to="/login">Login</Link>
    </>
  );

  const clickVoiceControlGuide = () => {
    setGuideModalOpen(!isGuideModalOpen);
  };

  if (isModalOpen) {
    return (
      <Container>
        <Navigation toggleTheme={toggleTheme} />
        <Status>
          {isGuideModalOpen && <ModalGuide />}
          <StyledFontAwesomeIcon
            icon={faFileAudio}
            onClick={clickVoiceControlGuide}
          />
          <ViewMode onClick={toggleTheme}>
            {theme === "light" && "Dark Mode"}
            {theme === "dark" && "Light Mode"}
          </ViewMode>
          <MyAccount
            tabIndex="0"
            clickedToggle={clickedToggle}
            keyDownedToggle={keyDownedToggle}
            loginUserInfo={loginUserInfo}
          />
          <MyAccountModal>
            {loginUserInfo ? modalOnLogin : modalOnLogout}
          </MyAccountModal>
        </Status>
      </Container>
    );
  } else {
    return (
      <Container>
        <Navigation toggleTheme={toggleTheme} />
        <Status>
          {isGuideModalOpen && <ModalGuide />}
          <StyledFontAwesomeIcon
            icon={faFileAudio}
            onClick={clickVoiceControlGuide}
          />
          <ViewMode onClick={toggleTheme}>
            {theme === "light" && "Dark Mode ☾"}
            {theme === "dark" && "Light Mode ☀"}
          </ViewMode>
          <MyAccount
            clickedToggle={clickedToggle}
            keyDownedToggle={keyDownedToggle}
            loginUserInfo={loginUserInfo}
          />
        </Status>
      </Container>
    );
  }
}

export default Header;

const Container = styled.header`
  height: 80px;
  width: 100%;
  padding: 0px 10px;
  background-color: var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--line-color);
  position: fixed;
  z-index: 1;
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

const Status = styled.div`
  display: flex;
  align-items: center;
`;

const ViewMode = styled.button`
  width: 105px;
  margin-right: 10px;
  border-radius: 10px;
  font-weight: bold;
  height: 40px;
  background-color: var(--font-color);
  color: var(--primary-color);
  border: none;

  &:hover {
    color: black;
    background-color: var(--secondary-color);
  }
`;

const MyAccountModal = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: var(--secondary-color);
  right: 10px;
  top: 90px;
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

  span:focus {
    font-weight: bold;
  }

  a {
    height: 30%;
    display: flex;
    align-items: center;
  }

  a:focus {
    font-weight: bold;
  }

  a:nth-child(2) {
    border-bottom: 1px solid var(--line-color);
  }

  animation: ${fadeIn} 0.15s ease-out;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-right: 15px;

  cursor: pointer;
`;
