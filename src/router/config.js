import ClientTemplate from "@/templates/ClientTemplate.vue";
// view import
import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Hotels from "@/views/Hotels.vue";

const children = [
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

const routes = [
  {
    path: "/",
    component: ClientTemplate,
    redirect: "/",
    meta: {
      label: "ClientTemplate"
    },
    children: children
  },
  {
    path: "*",
    redirect: "/404-not-found"
  }
];
export default routes;
