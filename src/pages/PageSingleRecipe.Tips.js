import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { getTipsByRecipeId } from "../api/tipApi";
import { dateOptions } from "../config/dateConfig";
import useTipMutation from "../hooks/tip-mutation-hook";
import { isLikedCheck } from "../utils/likeHelper";
import { sortDescendingByUpdatedAt } from "../utils/sortHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";

const Tips = ({ loginUserInfo, recipeId }) => {
  const { data: tips } = useQuery(["tips", recipeId], () =>
    getTipsByRecipeId(recipeId)
  );

  return (
    <TipsContainer>
      <CreateTip loginUserInfo={loginUserInfo} recipeId={recipeId} />
      {tips?.length > 0 &&
        sortDescendingByUpdatedAt(tips).map((tip) => {
          return (
            <TipCard
              key={tip._id}
              loginUserInfo={loginUserInfo}
              tip={tip}
              isMyTip={tip.creator.email === loginUserInfo.email}
            />
          );
        })}
    </TipsContainer>
  );
};

const CreateTip = ({
  loginUserInfo,
  recipeId,
  isEditing,
  closeEditMode,
  tip,
}) => {
  const [tipInput, setTipInput] = useState("");
  const { createTipMutation, updateTipMutation } = useTipMutation();
  const inputElement = useRef();

  const inputTipHandler = (event) => {
    setTipInput(event.target.value);
  };

  const clickCancelTipHandler = () => {
    if (isEditing) {
      closeEditMode();
    }
    setTipInput("");
  };

  const clickCreateTipHandler = () => {
    createTipMutation.mutate({
      email: loginUserInfo.email,
      relatedRecipe: recipeId,
      content: tipInput,
    });
    inputElement.current.value = "";
    setTipInput("");
  };

  const clickUpdateTipHandler = () => {
    updateTipMutation.mutate({
      tip_id: tip._id,
      content: tipInput,
    });
    closeEditMode();
    inputElement.current.value = "";
    setTipInput("");
  };

  return (
    <TipsCardContainer>
      <TipProfileImg
        src={loginUserInfo.picture}
        alt="tip-owner-profile-image"
      />
      <TipInputContainer>
        <TipInput
          placeholder="꿀팁 추가..."
          onChange={inputTipHandler}
          defaultValue={isEditing ? tip.content : tipInput}
          ref={inputElement}
        />
        <TipButtonBox>
          <TipButton onClick={clickCancelTipHandler}>취소</TipButton>
          <TipButton
            onClick={isEditing ? clickUpdateTipHandler : clickCreateTipHandler}
          >
            {isEditing ? "수정" : "등록"}
          </TipButton>
        </TipButtonBox>
      </TipInputContainer>
    </TipsCardContainer>
  );
};

const TipCard = ({ loginUserInfo, tip, isMyTip }) => {
  const { updateTipLikeMutation, cancelTipLikeMutation, deleteTipMutation } =
    useTipMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const clickEditHandler = () => {
    if (isEditing) {
      clickEditModal();
    }
    setIsEditing(!isEditing);
  };

  const clickDeleteHandler = () => {
    deleteTipMutation.mutate({
      tip_id: tip._id,
    });
  };

  const clickEditModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isEditing) {
    return (
      <CreateTip
        loginUserInfo={loginUserInfo}
        recipeId={tip.relatedRecipe._id}
        isEditing={isEditing}
        closeEditMode={clickEditHandler}
        tip={tip}
      />
    );
  } else {
    return (
      <TipsCardContainer>
        <TipProfileImg
          src={tip.creator.picture}
          alt="tip-owner-profile-image"
        />
        <TipContent>
          <TipContentInfo>
            {tip.creator.nickname} /{" "}
            {new Date(tip.creator.updatedAt).toLocaleDateString(
              "ko-KR",
              dateOptions
            )}
          </TipContentInfo>
          <TipContentDeatil>{tip.content}</TipContentDeatil>
        </TipContent>
        <div></div>
        <TipPreference>
          {isMyTip && (
            <TipEditButton onClick={clickEditModal}>...</TipEditButton>
          )}
          {isModalOpen && (
            <TipEditContainer>
              <div onClick={clickEditHandler}>수정</div>
              <div onClick={clickDeleteHandler}>삭제</div>
            </TipEditContainer>
          )}
          <button name="like" onClick={clickLikeHandler}>
            👍 {tip.liked.length}
          </button>
          <button name="dislike" onClick={clickLikeHandler}>
            👎 {tip.disliked.length}
          </button>
        </TipPreference>
      </TipsCardContainer>
    );
  }
};

export default Tips;

const TipEditButton = styled.button``;

const fadeIn = keyframes`
  from {
    transform: scale(0.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const TipPreference = styled.div`
  position: relative;
  min-width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TipEditContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: #dee2e6;
  right: 115%;
  top: 25%;
  padding: 0 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  div {
    height: 30%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  div {
    height: 30%;
    display: flex;
    align-items: center;
  }

  div:nth-child(2) {
    border-bottom: 1px solid var(--line-color);
  }

  animation: ${fadeIn} 0.15s ease-out;
`;

const TipsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TipsCardContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: var(--secondary-color);
  color: var(--button-font-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  margin-bottom: 5px;
`;

const TipProfileImg = styled.img`
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: var(--secondary-color);
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

const TipInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const TipInput = styled.input`
  border: none;
  margin-bottom: 5px;
  background-color: var(--secondary-color);
  color: var(--button-font-color);

  &:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid var(--line-color);
  }
`;

const TipButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TipButton = styled.button`
  margin-left: 5px;
`;
