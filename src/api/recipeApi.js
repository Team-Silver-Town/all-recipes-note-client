import fetchApi from "./apiConfig";

export const getRecipes = async () => {
  const response = await fetchApi.get("/recipes");
  return response.data;
};

export const getRecipe = async (recipe_id) => {
  const response = await fetchApi.get(`/recipes/${recipe_id}`);
  return response.data;
};

export const createRecipe = async (recipe) => {
  const response = await fetchApi.post("/recipes", recipe);
  return response.data;
};
