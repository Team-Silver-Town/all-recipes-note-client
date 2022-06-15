import styled from "styled-components";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <NavContainer>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/recipes">Recipes</StyledLink>
      <StyledLink to="/rankings">Rankings</StyledLink>
    </NavContainer>
  );
}

export function MyAccount({ clickedToggle, keyDownedToggle, loginUserInfo }) {
  return (
    <ProfileImg
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
