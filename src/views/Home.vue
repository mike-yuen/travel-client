<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as apiServices from "@/services";
const MainSlider = () => import("@/components/slider/MainSlider");
const SearchTabs = () => import("@/components/search-tabs/SearchTabs");

export default {
  name: "home",
  components: {
    MainSlider,
    SearchTabs
  },
  computed: {
    ...mapGetters({
      user: "user/userState",
      hotel: "hotel/hotelState"
    })
  },
  methods: {
    testApi() {
      apiServices.authenticate();
    }
  }
};
</script>
