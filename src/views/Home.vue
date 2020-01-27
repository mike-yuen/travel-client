<template>
  <div id="home">
    <NavigatorTop />
    <MenuDesktop />
    <main
      class="block relative bg-white min-h-screen pb-20 outline-none"
      role="main"
    >
      <MainSlider />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as apiServices from "@/services";
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";
import MainSlider from "@/components/slider/MainSlider";

export default {
  name: "home",
  components: {
    NavigatorTop,
    MenuDesktop,
    MainSlider
  },
  computed: {
    ...mapGetters({
      user: "user/userState",
      hotel: "hotel/hotelState"
    })
  },
  methods: {
    testApi() {
      apiServices.authenticate().then(resp => {
        console.log(resp);
      });
    }
  }
};
</script>
