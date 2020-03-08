import { ACTIONS, MUTATORS } from "./const";
import * as apiServices from "@/services";
import storage from "@/utils/storage";
import { LUX_AUTH_INFO } from "@/utils/constants";

export const actions = {
  [ACTIONS.SET_AUTH]: ({ commit }, authInfo) => {
    return new Promise((resolve) => {
      apiServices
        .authenticate(authInfo)
        .then((resp) => {
          commit(MUTATORS.SET_AUTH, resp);
          storage.save(LUX_AUTH_INFO, resp);
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
