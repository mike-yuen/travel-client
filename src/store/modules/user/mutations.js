import { MUTATORS } from "./const";

export const mutations = {
  [MUTATORS.SET_AUTH]: (state, authInfo) => {
    state.authInfo = authInfo;
  }
};
