import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <ModalPortal>
      <Background>
        <Content>{children}</Content>
      </Background>
    </ModalPortal>
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px); */
  z-index: 10;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 60%;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  z-index: 99;
`;
