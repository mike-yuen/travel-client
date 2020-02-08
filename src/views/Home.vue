<template>
  <div id="home">
    <NavigatorTop class="z-20" />
    <MenuDesktop class="z-10" />
    <main class="block relative bg-white min-h-screen pb-20 outline-none">
      <MainSlider />
      <SearchTabs />
    </main>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as apiServices from "@/services";
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";
import MainSlider from "@/components/slider/MainSlider";
import SearchTabs from "@/components/search-tabs/SearchTabs";
import Footer from "@/components/footer/Footer";

export default {
  name: "home",
  components: {
    NavigatorTop,
    MenuDesktop,
    MainSlider,
    SearchTabs,
    Footer
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
