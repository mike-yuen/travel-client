const ClientTemplate = () => import("@/templates/ClientTemplate.vue");
// view import
const Home = () => import("@/views/Home.vue");
const Hotels = () => import("@/views/Hotels.vue");
const HotelProperties = () => import("@/views/HotelProperties.vue");
const ChatOrderedList = () =>
  import("@/plugins/chatbox/components/ChatOrderedList.vue");

const children = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatOrderedList
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
