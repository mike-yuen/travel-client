export const setTokenHeader = async (config) => {
  // Get token from storage
  // set token to requests's header before sending to REST api
  const token = await localStorage.getItem("userToken");

  if (token) {
    const newConfig = {
      ...config,
      validateStatus(status) {
        return status >= 200 && status < 500;
      },
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
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
