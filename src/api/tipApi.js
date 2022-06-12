import fetchApi from "./apiConfig";

export const getTips = async () => {
  const response = await fetchApi.get("/api/tips");

  return response.data;
};

export const getTopTenTips = async () => {
  const response = await fetchApi.get("/api/tips/top10");

  return response.data;
};

export const getTipsByRecipeId = async (recipe_id) => {
  const response = await fetchApi.get(`/api/tips/${recipe_id}`);

  return response.data;
};

export const createTip = async (tip) => {
  const response = await fetchApi.post("/api/tips", tip);

  return response.data;
};

export const updateTip = async (tip) => {
  const response = await fetchApi.patch(`/api/tips/${tip.id}`, tip);

  return response.data;
};

export const updateTipLike = async (tip) => {
  const response = await fetchApi.patch(`/api/tips/${tip.id}/likes`, tip);

  return response.data;
};

export const cancelTipLike = async (tip) => {
  const response = await fetchApi.patch(`/api/tips/${tip.id}/unlikes`, tip);

  return response.data;
};

export const deleteTip = async (tip_id) => {
  const response = await fetchApi.delete(`/api/tips/${tip_id}`, tip_id);

  return response.data;
};
