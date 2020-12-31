import { ACTIONS, MUTATORS } from "./const";
import * as apiServices from "@/services";

export const actions = {
  [ACTIONS.GET_CITIES]: ({ commit }) => {
    return new Promise((resolve) => {
      apiServices
        .getCities()
        .then((resp) => {
          console.log("_____________", resp);
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
  }
};
