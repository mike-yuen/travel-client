import About from "@/views/About.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "*",
    redirect: "/"
  }
];

export default routes;
