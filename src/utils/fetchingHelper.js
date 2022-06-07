import axios from "axios";

export const fetcher = {
  get: async (url, token = "") => {
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  post: async (url, body = {}, token = "") => {
    return await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
