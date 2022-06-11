import fetchApi from "./apiConfig";

export const getTips = async () => {
  const response = await fetchApi.get("/api/tips");

  return response.data;
};

export const createTip = async (tip) => {
  const response = await fetchApi.post("/api/tips", tip);

  return response.data;
};

export const updateTip = async (tip) => {
  const response = await fetchApi.patch(`/api/tip/${tip.id}`, tip);

  return response.data;
};

export const updateTipLike = async (tip) => {
  const response = await fetchApi.patch(`/api/tip/${tip.id}/likes`, tip);

  return response.data;
};

export const cancelTipLike = async (tip) => {
  const response = await fetchApi.patch(`/api/tip/${tip.id}/unlikes`, tip);

  return response.data;
};

export const deleteTip = async (tip_id) => {
  const response = await fetchApi.delete(`/api/tip/${tip_id}`, tip_id);

  return response.data;
};
