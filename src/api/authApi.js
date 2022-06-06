import fetchApi from "./apiConfig";

export const getUser = async () => {
  const response = await fetchApi.get("/users");
  return response.data;
};

export const createUser = async (newUser) => {
  const response = await fetchApi.post("/users", newUser);
  return response.data;
};
