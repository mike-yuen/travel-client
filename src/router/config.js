import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Hotels from "@/views/Hotels.vue";

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
    path: "/hotels",
    name: "hotels",
    component: Hotels
  },
  {
    path: "*",
    redirect: "/"
  }
];

export default routes;
