import { MUTATORS } from "./const";

export const mutations = {
  [MUTATORS.SET_TOKEN]: (state, token) => {
    state.token = token;
  },
  [MUTATORS.SET_CURRENT_USER]: (state, user) => {
    state.currentUser = user;
  }
};
