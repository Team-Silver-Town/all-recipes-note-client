import styled from "styled-components";

const RecipeCard = ({ recipeData }) => {
  const { thumbnailUrl: videoThumbnail, like, dislike } = recipeData;
  const { thumbnailUrl: userThumbnail, nickname } = recipeData.postedBy;
  const menuName = recipeData.belongsToMenu.name;

  return (
    <Container>
      <VideoThumbnail src={videoThumbnail} alt="recipe video thumbnail" />
      <RecipeInfoBox>
        <MenuName>{menuName}</MenuName>
        <PostingOwner>{nickname}</PostingOwner>
        <RecipePreference>
          <div>👍 {like}</div>
          <div>👎 {dislike}</div>
        </RecipePreference>
      </RecipeInfoBox>
    </Container>
  );
};

export default RecipeCard;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoThumbnail = styled.img`
  width: 100%;
`;

const RecipeInfoBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const MenuName = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: larger;
  font-weight: bold;
`;

const RecipePreference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  width: 30%;

  div {
    margin: 0px 5px;
  }
`;

const PostingOwner = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
`;
