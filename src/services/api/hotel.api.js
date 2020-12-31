import api from "@/utils/api";
import { API_URL } from "@/utils/api/constants";

export const getCities = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await api.get(`${API_URL.CITIES}`);
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};
