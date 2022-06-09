import { Link } from "react-router-dom";
import styled from "styled-components";

const Tips = () => {
  return (
    <TipsContainer>
      <CreateTip>CreatTip</CreateTip>
      <TipCard>Tips!</TipCard>
      <TipCard>Tips!</TipCard>
      <TipCard>Tips!</TipCard>
      <TipCard>Tips!</TipCard>
      <TipCard>Tips!</TipCard>
      <TipCard>Tips!</TipCard>
      <TipCard>Tips!</TipCard>
      <TipCard>Tips!</TipCard>
    </TipsContainer>
  );
};

const CreateTip = () => {
  return (
    <TipsCardContainer>
      <TipProfileImg src="" alt="tip-owner-profile-image" />
      <TipInputContainer>
        <TipInput placeholder="꿀팁 추가..." />
        <TipButtonBox>
          <TipButton>취소</TipButton>
          <TipButton>등록</TipButton>
        </TipButtonBox>
      </TipInputContainer>
    </TipsCardContainer>
  );
};

const TipCard = ({ children }) => {
  return (
    <TipsCardContainer>
      <TipProfileImg src="" alt="tip-owner-profile-image" />
      <TipContent>
        <TipContentInfo>sp863 / 2022.06.09 </TipContentInfo>
        <TipContentDeatil>
          Tip
          상세내용입니다.안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
        </TipContentDeatil>
      </TipContent>
      <TipPreference>👍 3 👎 5</TipPreference>
    </TipsCardContainer>
  );
};

export default Tips;

const TipsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TipsCardContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  margin-top: 5px;
`;

const TipProfileImg = styled.img`
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: silver;
  margin-right: 10px;
`;

const TipContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  padding: 20px 0px;
`;
const TipContentInfo = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
  font-size: smaller;
`;
const TipContentDeatil = styled.div`
  height: 70%;
  display: flex;
  align-items: center;
`;

const TipPreference = styled.div`
  min-width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TipInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const TipInput = styled.input`
  border: none;
  margin-bottom: 5px;

  &:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid black;
  }
`;

const TipButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TipButton = styled.button`
  margin-left: 5px;
`;
