const RecipeCard = ({ recipeData }) => {
  const { thumbnailUrl: videoThumbnail, like, dislike } = recipeData;
  const { thumbnailUrl: userThumbnail, nickname } = recipeData.postedBy;
  const menuName = recipeData.belongsToMenu.name;

  return (
    <div>
      <img src={videoThumbnail} alt="recipe video thumbnail" />
      <div>
        <div>{menuName}</div>
      </div>
      <div>
        <img src={userThumbnail} alt="user thumbnail" />
        <div>{nickname}</div>
      </div>
      <div>
        <div>👍 {like}</div>
        <div>👎 {dislike}</div>
      </div>
    </div>
  );
};

export default RecipeCard;
