export const generateSuggestions = (searchData, input) => {
  if (searchData && input.length > 0) {
    const matchArray = searchData.filter(
      (data) => data.indexOf(input.trim()) > -1
    );

    if (matchArray.length > 0) {
      return matchArray;
    }
  }

  return [];
};
