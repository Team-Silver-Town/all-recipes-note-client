import fetchApi from "./apiConfig";

export const getRecipes = async () => {
  const response = await fetchApi.get("/api/recipes");
  return response.data;
};

export const getRecipe = async (recipe_id) => {
  const response = await fetchApi.get(`/api/recipes/${recipe_id}`);
  return response.data;
};

export const createRecipe = async (newRecipe) => {
  const response = await fetchApi.post("/api/recipes/new", newRecipe);
  return response.data;
};
