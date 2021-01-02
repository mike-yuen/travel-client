<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
    <div class="text-center text-2xl font-bold pt-6">
      <router-link
        :to="{
          name: 'hotel-properties',
          params: { hotelId: 'fa089516-6f8a-4be8-a90e-2f19d8fc6f0f' }
        }"
      >
        Detail Room Demo
      </router-link>
    </div>
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
