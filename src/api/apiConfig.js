import axios from "axios";

const fetchApi = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export default fetchApi;
