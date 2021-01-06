import api from "@/utils/api";
import { API_URL } from "@/utils/api/constants";

export const login = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.post(`${API_URL.LOGIN}`, payload);
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const getCurrentUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.get(`${API_URL.CURRENT_USER}`);
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};
