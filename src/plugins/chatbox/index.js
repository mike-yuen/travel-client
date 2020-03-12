import Vue from "vue";
import AppChat from "./AppChat";

Vue.use(require("vue-moment"));

new Vue({
  render: (h) => h(AppChat)
}).$mount("#appchat");
