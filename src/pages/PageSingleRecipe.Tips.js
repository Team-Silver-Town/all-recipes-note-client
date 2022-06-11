import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import {
  createTip,
  cancelTipLike,
  deleteTip,
  updateTip,
  updateTipLike,
} from "../api/tipApi";

const Tips = ({ tips }) => {
  const queryClient = useQueryClient();
  const updateTipMutation = useMutation(updateTip, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const deleteTipMutation = useMutation(deleteTip, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const updateTipLikeMutation = useMutation(updateTipLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const cancelTipLikeMutation = useMutation(cancelTipLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  return (
    <TipsContainer>
      <CreateTip />
      {tips.length &&
        tips.map((tip) => {
          return <TipCard key={tip._id} tip={tip} />;
        })}
    </TipsContainer>
  );
};

const CreateTip = () => {
  const [tipInput, setTipInput] = useState("");
  const queryClient = useQueryClient();

  const inputTipHandler = (event) => {
    setTipInput(event.target.value);
  };

  const createTipMutation = useMutation(createTip, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  return (
    <TipsCardContainer>
      <TipProfileImg src="" alt="tip-owner-profile-image" />
      <TipInputContainer>
        <TipInput placeholder="꿀팁 추가..." onChange={inputTipHandler} />
        <TipButtonBox>
          <TipButton>취소</TipButton>
          <TipButton>등록</TipButton>
        </TipButtonBox>
      </TipInputContainer>
    </TipsCardContainer>
  );
};

const TipCard = ({ tip }) => {
  return (
    <TipsCardContainer>
      <TipProfileImg src="" alt="tip-owner-profile-image" />
      <TipContent>
        <TipContentInfo>
          {tip.creator.nickname} / {tip.creator.updatedAt}
        </TipContentInfo>
        <TipContentDeatil>{tip.content}</TipContentDeatil>
      </TipContent>
      <TipPreference>
        👍 {tip.liked.length} 👎 {tip.disliked.length}
      </TipPreference>
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
