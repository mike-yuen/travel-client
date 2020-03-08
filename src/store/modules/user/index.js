import { STATE as state } from "./const";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
