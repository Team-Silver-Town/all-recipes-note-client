import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";

const ModalGuide = ({ children }) => {
  return (
    <ModalPortal>
      <Content>
        <div>VoiceControlGuideForHeader</div>;
      </Content>
    </ModalPortal>
  );
};

export default ModalGuide;

const Content = styled.div`
  position: fixed;
  top: 13%;
  right: 4%;
  width: 25%;
  height: 84%;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 1);
  z-index: 99;
`;
