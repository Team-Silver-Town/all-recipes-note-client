import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export const RankItemListWithNoteOrTip = (props) => {
  const navigate = useNavigate();
  const { currentRankList, currentRankType } = props;

  const rankListNaivigateHandler = (id) => {
    if (currentRankType === "note") {
      console.log("navigate note");
      console.log(id);
      navigate(`/recipes/${id}`);
    }

    if (currentRankType === "tip") {
      console.log("navigate tip");
      console.log(id);
      navigate(`/recipes/${id}`);
    }
  };

  return currentRankList.map((item, index) => {
    const id = item.relatedRecipe._id;
    const { nickname } = item.creator;
    const { name: menuName } = item.relatedRecipe.belongsToMenu;
    const content = item.content;

    return (
      <RankItem
        key={`${item}${index}`}
        onClick={() => rankListNaivigateHandler(id)}
      >
        <RankNumber>{index + 1}위</RankNumber>
        <RankContent>
          <div>메뉴명 : {menuName}</div>
          <div>작성자 : {nickname}</div>
          {content && <div>내용 : {content}</div>}
        </RankContent>
      </RankItem>
    );
  });
};

export const RankItemListWithMenu = (props) => {
  const navigate = useNavigate();
  const { currentRankList, currentRankType, currentMenu } = props;

  const rankListNaivigateHandler = (id) => {
    if (currentRankType === "menu") {
      console.log("navigate note");
      console.log(id);
      navigate(`/recipes/${id}`);
    }
  };

  return currentRankList.map((item, index) => {
    const menuName = currentMenu;
    const recipeId = item._id;
    const numberOfLikes = item.liked.length;
    const numberOfDislikes = item.disliked.length;
    const numberOfNotes = item.notes.length;
    const numberOfTips = item.tips.length;
    const thumbnailUrl = item.thumbnailUrl;

    return (
      <RankItem
        key={`${recipeId}`}
        onClick={() => rankListNaivigateHandler(recipeId)}
      >
        <RankNumber>
          {menuName}&nbsp;
          {index + 1}위
        </RankNumber>
        <RankMenuContent>
          <img src={thumbnailUrl} alt="screen-shot" />
          <div>👍 {numberOfLikes}</div>
          <div>👎 {numberOfDislikes}</div>
          <div>노트수 : {numberOfNotes}</div>
          <div>꿀팁수 : {numberOfTips}</div>
        </RankMenuContent>
      </RankItem>
    );
  });
};

const RankItem = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: 2px solid black;
    font-weight: bold;
    font-size: large;
  }
`;

const RankNumber = styled.div`
  height: 100%;
  width: 180px;
  font-size: large;
  font-weight: bold;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const RankContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  align-items: center;

  div:nth-child(1) {
    width: 25%;
  }

  div:nth-child(2) {
    width: 25%;
  }

  div:nth-child(3) {
    width: 50%;
  }
`;

const RankMenuContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  align-items: center;

  img {
    display: block;
    width: 100px;
    height: 60px;
    margin-right: 100px;
  }

  div {
    width: 20%;
  }
`;
