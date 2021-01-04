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

  [ACTIONS.GET_ROOM_TYPES]: ({ commit }) => {
    return new Promise((resolve) => {
      apiServices
        .getRoomTypes()
        .then((resp) => {
          commit(MUTATORS.SET_ROOM_TYPES, resp);
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

  [ACTIONS.SET_BASE_QUERY]: ({ commit }, query) => {
    return commit(MUTATORS.SET_BASE_QUERY, query);
  },

  [ACTIONS.SET_FILTER_QUERY]: ({ commit }, query) => {
    return commit(MUTATORS.SET_FILTER_QUERY, query);
  },

  [ACTIONS.RESET_FILTER_QUERY]: ({ commit, state }) => {
    return commit(MUTATORS.SET_FILTER_QUERY, state.defaultFilterQuery);
  },

  [ACTIONS.GET_HOTELS]: ({ commit }, payload) => {
    return new Promise((resolve) => {
      apiServices
        .getHotels(payload)
        .then((resp) => {
          commit(MUTATORS.SET_HOTELS, resp);
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
