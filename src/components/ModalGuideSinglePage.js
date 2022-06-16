import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";

const ModalGuideSinglePage = ({ children }) => {
  return (
    <ModalPortal>
      <Content>
        <div>VoiceControlGuideForSingleRecipe</div>;
      </Content>
    </ModalPortal>
  );
};

export default ModalGuideSinglePage;

const Content = styled.div`
  position: fixed;
  top: 3%;
  left: 30%;
  width: 25%;
  height: 90%;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 1);
  z-index: 99;
`;
