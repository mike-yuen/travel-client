<template>
  <div class="client">
    <NavigatorTop class="z-30" />
    <MenuDesktop class="hidden lg:block z-20" />
    <main class="block relative bg-white min-h-screen pb-0 outline-none">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";
//lazy-loading components && code split
const Footer = () => import("@/components/footer/Footer");

import { mapActions } from "vuex";
import { ACTIONS } from "@/store/modules/hotel/const";

export default {
  name: "ClientTemplate",
  components: {
    NavigatorTop,
    MenuDesktop,
    Footer
  },
  created() {
    this.getCities();
    this.getRoomTypes();
  },
  methods: {
    ...mapActions("hotel", {
      getCities: ACTIONS.GET_CITIES,
      getRoomTypes: ACTIONS.GET_ROOM_TYPES
    })
  }
};
</script>
