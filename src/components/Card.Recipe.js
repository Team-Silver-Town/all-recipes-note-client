import styled from "styled-components";

const RecipeCard = ({ recipeData }) => {
  const { thumbnailUrl: videoThumbnail, liked, disliked } = recipeData;
  const { thumbnailUrl: userThumbnail, nickname } = recipeData.postedBy;
  const menuName = recipeData.belongsToMenu.name;

  return (
    <Container>
      <VideoThumbnail src={videoThumbnail} alt="recipe video thumbnail" />
      <RecipeInfoBox>
        <MenuName>{menuName}</MenuName>
        <PostingOwner>{nickname}</PostingOwner>
        <RecipePreference>
          <div>👍 {liked.length}</div>
          <div>👎 {disliked.length}</div>
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
  border-radius: 10px 10px 0px 0px;
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
  font-size: medium;
  font-weight: bold;
`;

const RecipePreference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
  width: 40%;

  div {
    margin: 0px 5px;
  }
`;

const PostingOwner = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
`;
