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
  }
};
