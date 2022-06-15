import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";

const ModalGuide = ({ children }) => {
  return (
    <ModalPortal>
      <Background>
        <Content>{children}</Content>
      </Background>
    </ModalPortal>
  );
};

export default ModalGuide;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 99;
`;
