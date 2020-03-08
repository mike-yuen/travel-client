import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import VueAgile from "vue-agile";
import "@/utils/directive";
import "@/assets/css/tailwind.scss";
import "@/plugins/chatbox";

Vue.config.productionTip = false;
Vue.use(VueAgile);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
// Install rules
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule] // copies rule configuration
  });
});
localize({
  en: {
    messages: {
      required: "Please enter a {_field_}"
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
