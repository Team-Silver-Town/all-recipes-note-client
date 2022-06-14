import axios from "axios";
import envKeys from "../config/config";

const localStorageInfo = JSON.parse(
  localStorage.getItem("allRecipesNoteLoginInfo")
);

const { token } = localStorageInfo;

const fetchApi = axios.create({
  baseURL: envKeys.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default fetchApi;
