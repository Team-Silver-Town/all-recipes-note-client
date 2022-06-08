import fetchApi from "./apiConfig";

export const getCategories = async () => {
  const response = await fetchApi.get("/categories");
  return response.data;
};

export const getCategory = async (category_id) => {
  const response = await fetchApi.get(`/categories/${category_id}`);
  return response.data;
};

export const getMenus = async () => {
  const response = await fetchApi.get("/menus");
  return response.data;
};

export const getMenu = async (menu_id) => {
  const response = await fetchApi.get(`/menus/${menu_id}`);
  return response.data;
};

export const getIngredients = async () => {
  const response = await fetchApi.get("/ingredients");
  return response.data;
};

export const createIngredient = async (ingredient) => {
  const response = await fetchApi.post("/ingredients", ingredient);
  return response.data;
};

export const getUnits = async () => {
  const response = await fetchApi.get("/units");
  return response.data;
};

export const createUnit = async (unit) => {
  const response = await fetchApi.post("/units", unit);
  return response.data;
};
