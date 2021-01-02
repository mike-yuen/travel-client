import { MUTATORS } from "./const";

export const mutations = {
  [MUTATORS.SET_CITIES]: (state, payload) => {
    state.cities = payload;
  },
  [MUTATORS.SET_HOTEL]: (state, payload) => {
    state.hotel = payload;
  }
};
