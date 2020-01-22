import Vue from "vue";
import Vuex from "vuex";
import hotelModule from "./modules/hotel";
import userModule from "./modules/user";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    user: userModule,
    hotel: hotelModule
  },
  plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== "production"
});
