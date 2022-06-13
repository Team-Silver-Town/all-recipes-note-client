import styled from "styled-components";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const NoteCard = ({ noteData }) => {
  const menuName = noteData.relatedRecipe.belongsToMenu.name;
  const {
    thumbnailUrl: videoThumbnail,
    liked,
    disliked,
  } = noteData.relatedRecipe;
  const recipeId = noteData.relatedRecipe._id;

  return (
    <Fragment>
      <StyledLink to={`/recipes/${recipeId}`}>
        <StyledLinkImg src={videoThumbnail} alt="recipe-thumbnail-image" />
        <StyledLinkInfo>
          <MenuName>{menuName}</MenuName>
          <RecipePreference>
            <div>👍 {liked.length}</div>
            <div>👎 {disliked.length}</div>
          </RecipePreference>
        </StyledLinkInfo>
      </StyledLink>
    </Fragment>
  );
};

export default NoteCard;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;

  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;

  &:hover {
    font-weight: bolder;
    background-color: var(--secondary-color);
  }
`;

const StyledLinkImg = styled.img`
  width: 100%;
  height: 75%;
  border-radius: 10px 10px 0px 0px;
  background-color: gold;
`;

const StyledLinkInfo = styled.div`
  height: 25%;
  width: 100%;
  min-height: 20px;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  align-items: center;
`;

const MenuName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
`;

const RecipePreference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  width: 50%;

  div {
    margin: 0px 5px;
  }
`;
