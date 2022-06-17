import axios from "axios";
import envKeys from "../config/config";

const fetchApi = axios.create({
  baseURL: envKeys.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

fetchApi.interceptors.request.use(function (config) {
  const localStorageInfo = JSON.parse(
    localStorage.getItem("allRecipesNoteLoginInfo")
  );

  const token = localStorageInfo ? localStorageInfo.token : null;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default fetchApi;
