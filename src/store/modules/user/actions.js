import { ACTIONS, MUTATORS } from "./const";
import * as apiServices from "@/services";
import storage from "@/utils/storage";
import { LUX_AUTH_INFO } from "@/utils/constants";

export const actions = {
  [ACTIONS.LOGIN]: ({ commit }, authInfo) => {
    return new Promise((resolve) => {
      apiServices
        .login(authInfo)
        .then((resp) => {
          commit(MUTATORS.SET_TOKEN, resp.data);
          storage.save(LUX_AUTH_INFO, resp.data);
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

  [ACTIONS.GET_CURRENT_USER]: ({ commit }) => {
    return new Promise((resolve) => {
      apiServices
        .getCurrentUser()
        .then((resp) => {
          commit(MUTATORS.SET_CURRENT_USER, resp);
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

  [ACTIONS.LOGOUT]: async ({ commit }) => {
    await localStorage.removeItem("userToken");
    commit(MUTATORS.SET_CURRENT_USER, {});
  }
};
