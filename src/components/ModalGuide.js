import React from "react";
import ModalPortal from "./Portal";
import styled from "styled-components";

const ModalGuide = ({ children }) => {
  return (
    <ModalPortal>
      <Content>
        <h1>음성 명령 가이드</h1>
        <p>
          우선 "시리야" 를 말하고 🔴 음성인식 싸인이 보이면 아래 원하는 명령어를
          말씀 하시면 됩니다.
        </p>
        <ControlContainer>
          <h2>🚕 네비게이션 컨트롤</h2>
          <li>홈 이동</li>
          <li>레시피 이동</li>
          <li>랭킹 이동</li>
        </ControlContainer>

        <ControlContainer>
          <h2>🎥 영상 컨트롤</h2>
          <li>영상 시작</li>
          <li>영상 멈춰</li>
          <li>영상 앞으로</li>
          <li>영상 뒤로</li>
        </ControlContainer>

        <ControlContainer>
          <h2>📓 노트 컨트롤</h2>
          <li>노트 목록 이동</li>
          <li>노트로 이동</li>
          <li>노트 읽어 줘</li>
          <li>재료 읽어 줘</li>
          <li>노트 저장</li>
          <li>노트 삭제</li>
          <li>노트 비공개</li>
          <li>노트 공개</li>
          <li>재료 등록</li>
        </ControlContainer>

        <ControlContainer>
          <h2>🥕 재료 컨트롤</h2>
          <li>재료 등록</li>
          <li>재료 추가</li>
          <li>재료 추가 완료</li>
        </ControlContainer>

        <ControlContainer>
          <h2>🏆 랭킹 컨트롤</h2>
          <li>최신 레시피 랭킹</li>
          <li>전체 레시피 랭킹</li>
          <li>한식 메뉴 랭킹</li>
          <li>양식 메뉴 랭킹</li>
          <li>노트 랭킹</li>
          <li>꿀팁 랭킹</li>
        </ControlContainer>
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

  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;

  h1 {
    font-size: 25px;
    font-weight: 700;
  }

  h2 {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 5px;
    text-decoration: underline;
  }

  p {
    font-size: 11px;
  }
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
