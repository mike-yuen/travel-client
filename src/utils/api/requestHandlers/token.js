import { LUX_AUTH_INFO } from "../../constants";

export const setTokenHeader = async (config, appStorage) => {
  // Get token from storage
  // set token to requests's header before sending to REST api
  const token = await appStorage.get(LUX_AUTH_INFO);
  if (token) {
    const newConfig = {
      ...config,
      validateStatus(status) {
        return status >= 200 && status < 500;
      },
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token.access}`
      }
    };
    return newConfig;
  }
  return {
    ...config,
    validateStatus: (status) => status >= 200 && status < 500
  };
};

export default {
  setTokenHeader
};
