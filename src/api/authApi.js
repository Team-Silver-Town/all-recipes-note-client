import fetchApi from "./apiConfig";

export const getUser = async (email) => {
  const response = await fetchApi.get("api/auth", {
    params: {
      email,
    },
  });
  return response;
};

export const createUser = async (newUserInfo) => {
  const response = await fetchApi.post("api/auth", newUserInfo);
  return response;
};

export const patchUser = async ({ nickname, email }) => {
  const response = await fetchApi.patch("api/auth", { nickname, email });
  return response;
};
