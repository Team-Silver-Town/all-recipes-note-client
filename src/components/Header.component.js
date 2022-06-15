import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import useHeaderSpeechControl from "../hooks/header-speech-control";
import { useEffect, useRef } from "react";

export function Navigation() {
  const location = useLocation();
  const recipeLinkElement = useRef();
  const rankingLinkElement = useRef();
  const homeLinkElement = useRef();
  const [recognition, speechToText, isCommanding] = useHeaderSpeechControl(
    homeLinkElement.current,
    recipeLinkElement.current,
    rankingLinkElement.current
  );

  useEffect(() => {
    if (location.pathname === "/rankings") {
      recognition.stop();
    } else {
      recognition.start();
    }
  }, [speechToText]);

  return (
    <NavContainer role="tablist">
      {isCommanding && (
        <RecodingBox>
          <RecordingStatus className="blob red"></RecordingStatus>
        </RecodingBox>
      )}
      <StyledLink role="tab" to="/" ref={homeLinkElement}>
        Home
      </StyledLink>
      <StyledLink role="tab" to="/recipes" ref={recipeLinkElement}>
        Recipes
      </StyledLink>
      <StyledLink role="tab" to="/rankings" ref={rankingLinkElement}>
        Rankings
      </StyledLink>
    </NavContainer>
  );
}

export function MyAccount({ clickedToggle, keyDownedToggle, loginUserInfo }) {
  return (
    <ProfileImg
      role="button"
      tabIndex="0"
      onKeyDown={keyDownedToggle}
      onClick={clickedToggle}
      src={
        loginUserInfo
          ? loginUserInfo.picture
          : "https://archive.org/download/no-photo-available/no-photo-available.png"
      }
      alt="my-profile-image"
    />
  );
}

const RecodingBox = styled.div`
  background-color: var(--primary-color);
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 22%;
  left: 25%;
`;

const RecordingStatus = styled.div`
  background: rgba(255, 0, 0, 1);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 0, 0, 1);
  height: 30px;
  width: 30px;
  transform: scale(1);
  animation: pulse-red 1s infinite;

  @keyframes pulse-red {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  width: 300px;
  height: 80%;
  align-items: center;
  font-size: larger;
  font-weight: bolder;
`;

const StyledLink = styled(Link)`
  display: flex;
  padding: 4px 8px;
  margin: 0 5px;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;

  &:focus,
  &:hover {
    background-color: var(--secondary-color);
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  transition: all 0.4s ease-in;

  &:focus {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;
