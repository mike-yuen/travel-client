import Vue from "vue";
import Router from "vue-router";
import routes from "./config";
import storage from "../utils/storage";
import { AUTH_INFO } from "../utils/constants";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await storage.get(AUTH_INFO);
  if (to.meta.requireAuth) {
    if (!isLoggedIn) {
      next({
        path: "/about"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
