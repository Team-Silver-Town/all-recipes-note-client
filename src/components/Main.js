import styled from "styled-components";

function Main({ children }) {
  return <Container>{children}</Container>;
}

export default Main;

const Container = styled.main`
  height: 100%;
  overflow: auto;
  padding-top: 80px;
`;
