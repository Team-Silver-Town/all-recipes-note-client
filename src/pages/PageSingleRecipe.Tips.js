import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTipsByRecipeId } from "../api/tipApi";
import useTipMutation from "../hooks/tip-mutation-hook";
import { isLikedCheck } from "../utils/likeHelper";
import { sortDescendingByUpdatedAt } from "../utils/sortHelper";

const Tips = ({ loginUserInfo, recipeId }) => {
  const { data: tips } = useQuery(["tips", recipeId], () =>
    getTipsByRecipeId(recipeId)
  );

  return (
    <TipsContainer>
      <CreateTip loginUserInfo={loginUserInfo} recipeId={recipeId} />
      {tips?.length &&
        sortDescendingByUpdatedAt(tips).map((tip) => {
          return (
            <TipCard key={tip._id} loginUserInfo={loginUserInfo} tip={tip} />
          );
        })}
    </TipsContainer>
  );
};

const CreateTip = ({ loginUserInfo, recipeId }) => {
  const [tipInput, setTipInput] = useState("");
  const { createTipMutation } = useTipMutation();

  const inputTipHandler = (event) => {
    setTipInput(event.target.value);
  };

  const clickCancelTipHandler = () => {
    setTipInput("");
  };

  const clickCreateTipHandler = () => {
    createTipMutation.mutate({
      email: loginUserInfo.email,
      relatedRecipe: recipeId,
      content: tipInput,
    });

    setTipInput("");
  };

  return (
    <TipsCardContainer>
      <TipProfileImg src="" alt="tip-owner-profile-image" />
      <TipInputContainer>
        <TipInput
          placeholder="꿀팁 추가..."
          onChange={inputTipHandler}
          value={tipInput}
        />
        <TipButtonBox>
          <TipButton onClick={clickCancelTipHandler}>취소</TipButton>
          <TipButton onClick={clickCreateTipHandler}>등록</TipButton>
        </TipButtonBox>
      </TipInputContainer>
    </TipsCardContainer>
  );
};

const TipCard = ({ loginUserInfo, tip }) => {
  const { updateTipLikeMutation, cancelTipLikeMutation } = useTipMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState("");

  useEffect(() => {
    const isAlreadyLiked = isLikedCheck(loginUserInfo.email, tip.liked);
    const isAlreadyDisliked = isLikedCheck(loginUserInfo.email, tip.disliked);

    if (isAlreadyLiked || isAlreadyDisliked) {
      setIsLiked(true);
      isAlreadyLiked && setLikeOrDislike("like");
      isAlreadyDisliked && setLikeOrDislike("dislike");
    }
  }, [tip]);

  const clickLikeHandler = (event) => {
    if (isLiked && event.target.name === likeOrDislike) {
      cancelTipLikeMutation.mutate({
        email: loginUserInfo.email,
        tip_id: tip._id,
        like: event.target.name,
      });

      setIsLiked(false);
    } else if (!isLiked) {
      updateTipLikeMutation.mutate({
        email: loginUserInfo.email,
        tip_id: tip._id,
        like: event.target.name,
      });

      setIsLiked(true);
    }
  };

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
        <button name="like" onClick={clickLikeHandler}>
          👍 {tip.liked.length}
        </button>
        <button name="dislike" onClick={clickLikeHandler}>
          👎 {tip.disliked.length}
        </button>
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
