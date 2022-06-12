export const isLikedCheck = (email, likedArray) => {
  if (likedArray.includes(email)) {
    return true;
  }
  return false;
};
