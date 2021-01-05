import { GETTERS } from "./const";

export const getters = {
  [GETTERS.GET_TOKEN]: (state) => {
    return state.token;
  }
};
