<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
    <router-link :to="{ name: 'hotel-properties', params: { hotelId: '1' } }">
      Detail Room Demo
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as apiServices from "@/services";
import MainSlider from "@/components/slider/MainSlider";
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
