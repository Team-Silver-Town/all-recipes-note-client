import styled from "styled-components";
import { Navigation, MyAccount } from "./component";

function Header() {
  return (
    <Container>
      <Navigation />
      <MyAccount />
    </Container>
  );
}

export default Header;

const Container = styled.header`
  height: 80px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`;
