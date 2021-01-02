import { GETTERS } from "./const";

export const getters = {
  [GETTERS.GET_CITIES]: (state) => {
    return state.cities;
  },
  [GETTERS.GET_HOTEL]: (state) => {
    return state.hotel;
  }
};
