import { GETTERS } from "./const";

export const getters = {
  [GETTERS.GET_TOKEN]: (state) => {
    return state.token;
  },
  [GETTERS.GET_CURRENT_USER]: (state) => {
    return state.currentUser;
  }
};
