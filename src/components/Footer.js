import styled from "styled-components";

function Footer() {
  return <Container>@2022 VanillaCoding, Team SilverTown.</Container>;
}

export default Footer;

const Container = styled.footer`
  height: 25px;
  padding: 0px 10px;
  line-height: 25px;
  font-weight: bolder;
`;
