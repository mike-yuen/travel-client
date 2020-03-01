<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
    <div class="text-center text-2xl font-bold pt-6">
      <router-link :to="{ name: 'hotel-properties', params: { hotelId: '1' } }">
        Detail Room Demo
      </router-link>
    </div>
    <div class="max-w-xs mx-auto"></div>
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
  data() {
    return {
      value: [0, 100]
    };
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
  },
  created() {
    this.min = 0;
    this.max = 250;
    this.enableCross = false;
  }
};
</script>
