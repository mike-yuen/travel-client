import { ACTIONS, MUTATORS } from "./const";
import * as apiServices from "@/services";

export const actions = {
  [ACTIONS.GET_CITIES]: ({ commit }) => {
    return new Promise((resolve) => {
      apiServices
        .getCities()
        .then((resp) => {
          commit(MUTATORS.SET_CITIES, resp);
          resolve({
            code: 200,
            data: resp
          });
        })
        .catch((err) => {
          resolve({
            code: err.code,
            err: err
          });
        });
    });
  },

  [ACTIONS.GET_HOTEL]: ({ commit }, hotelId) => {
    return new Promise((resolve) => {
      apiServices
        .getHotel(hotelId)
        .then((resp) => {
          commit(MUTATORS.SET_HOTEL, resp);
          resolve({
            code: 200,
            data: resp
          });
        })
        .catch((err) => {
          resolve({
            code: err.code,
            err: err
          });
        });
    });
  }
};
