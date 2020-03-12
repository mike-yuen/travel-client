import { setTokenHeader } from "./token";

export const registerHandler = async (request) => {
  request.use((config) => {
    let newConfig = { ...config };
    newConfig = setTokenHeader(config);
    return newConfig;
  });
};

export default {
  registerHandler
};
