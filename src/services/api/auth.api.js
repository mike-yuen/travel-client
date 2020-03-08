import api from "@/utils/api";
import { API_URL } from "@/utils/api/constants";

export const authenticate = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, email, password } = userInfo;
      const resp = await api.post(`${API_URL.TOKEN}`, {
        username: username.toLowerCase(),
        email,
        password
      });
      if (resp) {
        resolve(resp);
      }
    } catch (err) {
      reject(err);
    }
  });
};
