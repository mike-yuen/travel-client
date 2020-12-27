const ClientTemplate = () => import("@/templates/ClientTemplate.vue");
// view import
const Home = () => import("@/views/Home.vue");
const Hotels = () => import("@/views/Hotels.vue");
const HotelProperties = () => import("@/views/HotelProperties.vue");
const CheckOut = () => import("@/views/CheckOut.vue");

const children = [
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
    path: "/hotel-properties/:hotelId",
    name: "hotel-properties",
    component: HotelProperties
  },
  {
    path: "/checkout/:hotelId",
    name: "checkout",
    component: CheckOut
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
