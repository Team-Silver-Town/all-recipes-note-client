import fetchApi from "./apiConfig";

export const getCategories = async () => {
  console.log("GET CATEGORIES");
  const response = await fetchApi.get("/api/categories");
  return response.data;
};

export const getCategory = async (category_id) => {
  const response = await fetchApi.get(`/api/categories/${category_id}`);
  return response.data;
};

export const getMenus = async () => {
  const response = await fetchApi.get("/api/menus");
  return response.data;
};

export const getMenu = async (menu_id) => {
  const response = await fetchApi.get(`/api/menus/${menu_id}`);
  return response.data;
};

export const getIngredients = async () => {
  const response = await fetchApi.get("/api/ingredients");
  return response.data;
};

export const createIngredient = async (ingredient) => {
  const response = await fetchApi.post("/api/ingredients", ingredient);
  return response.data;
};

export const getUnits = async () => {
  const response = await fetchApi.get("/api/units");
  return response.data;
};

export const createUnit = async (unit) => {
  const response = await fetchApi.post("/api/units", unit);
  return response.data;
};
