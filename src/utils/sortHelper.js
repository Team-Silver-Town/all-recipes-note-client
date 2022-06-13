exports.sortDescendingByUpdatedAt = (arrayData) => {
  const arrayDataCopy = arrayData.slice();

  arrayDataCopy.sort((a, b) => {
    const updatedAtA = new Date(a.updatedAt).getTime();
    const updatedAtB = new Date(b.updatedAt).getTime();

    return updatedAtB - updatedAtA;
  });

  return arrayDataCopy;
};

exports.sortDescendingByCreatedAt = (arrayData) => {
  const arrayDataCopy = arrayData.slice();

  arrayDataCopy.sort((a, b) => {
    const createdAtA = new Date(a.createdAt).getTime();
    const createdAtB = new Date(b.createdAt).getTime();

    return createdAtB - createdAtA;
  });

  return arrayDataCopy;
};


exports.sortTopRecipesInMenuByNumber = (menu, num) => {
  const { recipes } = menu;

  recipes.sort((a, b) => {
    const aNumberOfLikes = a.liked.length + 1;
    const bNumberOfLikes = b.liked.length + 1;
    const aNumberOfDislikes = a.disliked.length + 1;
    const bNumberOfDislikes = b.disliked.length + 1;
    const aNumberOfNotes = a.notes.length + 1;
    const bNumberOfNotes = b.notes.length + 1;
    const aNumberOfTips = a.tips.length + 1;
    const bNumberOfTips = b.tips.length + 1;

    return (
      (bNumberOfLikes - bNumberOfDislikes) * bNumberOfNotes * bNumberOfTips -
      (aNumberOfLikes - aNumberOfDislikes) * aNumberOfNotes * aNumberOfTips
    );
  });

  return recipes.splice(0, num);
};
