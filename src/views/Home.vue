<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as apiServices from "@/services";
import MainSlider from "@/components/slider/MainSlider";
import SearchTabs from "@/components/search-tabs/SearchTabs";

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
