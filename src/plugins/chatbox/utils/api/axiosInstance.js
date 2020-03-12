import axios from "axios";
import { registerIntercepters } from "./intercepters";

const API_URL = process.env.VUE_APP_CHAT_API;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    post: {
      "Content-Type": "multipart/form-data; application/json"
    },
    patch: {
      "Content-Type": "multipart/form-data; application/json"
    },
    delete: {
      "Content-Type": "application/json"
    }
  }
});

registerIntercepters(axiosInstance);

export default axiosInstance;
