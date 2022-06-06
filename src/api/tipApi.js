import fetchApi from "./apiConfig";

export const getTips = async () => {
  const response = await fetchApi.get("/tips");
  return response.data;
};

export const createTip = async (tip) => {
  const response = await fetchApi.post("/tips", tip);
  return response.data;
};

export const updateTip = async (tip) => {
  const response = await fetchApi.patch(`/tip/${tip.id}`, tip);
  return response.data;
};

export const deleteTip = async (tip_id) => {
  const response = await fetchApi.delete(`/tip/${tip_id}`);
  return response.data;
};
