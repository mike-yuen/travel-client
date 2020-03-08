import { GETTERS } from "./const";

export const getters = {
  [GETTERS.GET_AUTH]: (state) => {
    return state.authInfo;
  }
};
