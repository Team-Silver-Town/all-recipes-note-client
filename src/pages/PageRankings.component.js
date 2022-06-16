import styled from "styled-components";
import { Link } from "react-router-dom";

export const RankItemListWithNoteOrTip = (props) => {
  const { currentRankList } = props;

  return currentRankList.map((item, index) => {
    const recipeId = item.relatedRecipe._id;
    const { nickname } = item.creator;
    const { name: menuName } = item.relatedRecipe.belongsToMenu;
    const content = item.content;

    return (
      <RankItem
        tabIndex="0"
        key={`${item}${index}`}
        to={`/recipes/${recipeId}`}
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
  const { currentRankList, currentMenu } = props;

  return currentRankList.map((item, index) => {
    const menuName = currentMenu;
    const recipeId = item._id;
    const numberOfLikes = item.liked.length;
    const numberOfDislikes = item.disliked.length;
    const numberOfNotes = item.notes.length;
    const numberOfTips = item.tips.length;
    const thumbnailUrl = item.thumbnailUrl;

    return (
      <RankItem tabIndex="0" key={`${recipeId}`} to={`/recipes/${recipeId}`}>
        <RankNumber>
          {menuName}&nbsp;
          {index + 1}위
        </RankNumber>
        <RankMenuContent>
          <img src={thumbnailUrl} alt={`${menuName} 사진`} />
          <div>👍 {numberOfLikes}</div>
          <div>👎 {numberOfDislikes}</div>
          <div>노트수 : {numberOfNotes}</div>
          <div>꿀팁수 : {numberOfTips}</div>
        </RankMenuContent>
      </RankItem>
    );
  });
};

export const RankItemListWithRecipe = (props) => {
  const { currentRankList } = props;

  return currentRankList.map((item, index) => {
    const {
      _id: recipeId,
      numberOfLikes,
      numberOfDislikes,
      rankScore,
      thumbnailUrl,
    } = item;

    const menuName = item.belongsToMenu.name;

    return (
      <RankItem tabIndex="0" key={`${recipeId}`} to={`/recipes/${recipeId}`}>
        <RankNumber>{index + 1}위</RankNumber>
        <RankMenuContent>
          <img src={thumbnailUrl} alt={`${menuName} 사진`} />
          <div>{menuName}</div>
          <div>👍 {numberOfLikes}</div>
          <div>👎 {numberOfDislikes}</div>
          <div>랭킹점수 : {rankScore}점</div>
        </RankMenuContent>
      </RankItem>
    );
  });
};

export const RankItemListWithCategory = (props) => {
  const { currentRankList } = props;

  const categoryName = currentRankList.name;
  const categoryMenus = currentRankList.menus;

  return categoryMenus.map((item, index) => {
    const menuName = item.name;
    const menuId = item._id;
    const number1RecipeIdInMenu = item.recipes[0]._id;
    const numberOfRecipes = item.recipes.length;

    return (
      <RankItem
        tabIndex="0"
        key={`${menuId}`}
        to={`/recipes/${number1RecipeIdInMenu}`}
      >
        <RankNumber>
          {categoryName}&nbsp;
          {index + 1}위
        </RankNumber>
        <RankCategoryContent>
          <div>메뉴명 : {menuName}</div>
          <div>등록된 레시피 개수 : {numberOfRecipes}</div>
          <div>클릭하고 1등 레시피로 이동</div>
        </RankCategoryContent>
      </RankItem>
    );
  });
};

const RankItem = styled(Link)`
  height: 10%;
  width: 100%;
  display: flex;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--secondary-color);
    border: 2px solid var(--line-color);
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

const RankCategoryContent = styled.div`
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
