import fetchApi from "./apiConfig";

export const getRecipes = async () => {
  const response = await fetchApi.get("/api/recipes");
  return response.data;
};

export const getRecipe = async (recipe_id) => {
  const response = await fetchApi.get(`/api/recipes/${recipe_id}`);
  return response.data;
};

export const getLatestTop10Recipes = async () => {
  const response = await fetchApi.get("/api/recipes/latest-top10");
  return response.data;
};

export const getTop10Recipes = async () => {
  const response = await fetchApi.get("/api/recipes/top10");
  return response.data;
};

export const createRecipe = async (newRecipe) => {
  const response = await fetchApi.post("/api/recipes/new", newRecipe);
  return response.data;
};

export const updateRecipeLike = async (recipe) => {
  const response = await fetchApi.patch(
    `/api/recipes/${recipe.recipe_id}/likes`,
    recipe
  );
  return response.data;
};

export const cancelRecipeLike = async (recipe) => {
  const response = await fetchApi.patch(
    `/api/recipes/${recipe.recipe_id}/unlikes`,
    recipe
  );
  return response.data;
};
