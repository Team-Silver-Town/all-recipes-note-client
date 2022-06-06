import styled from "styled-components";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <NavContainer>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/">Recipes</StyledLink>
      <StyledLink to="/">Rankings</StyledLink>
    </NavContainer>
  );
}

export function MyAccount() {
  return (
    <ProfileImg src="https://avatars.githubusercontent.com/u/61281531?v=4" />
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
  margin: 0 auto;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  transition: all 0.6s;

  &:hover {
    background-color: white;
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;
