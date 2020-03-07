<template>
  <div id="homepage">
    <MainSlider />
    <SearchTabs />
    <div class="text-center text-2xl font-bold pt-6">
      <router-link :to="{ name: 'hotel-properties', params: { hotelId: '1' } }">
        Detail Room Demo
      </router-link>
    </div>
<<<<<<< HEAD
    <div class="max-w-xs mx-auto"></div>
=======
    <div class="max-w-xs mx-auto">
      <!-- <PriceRangeSlider
        v-model="value"
        :min="min"
        :max="max"
        :enable-cross="enableCross"
      /> -->
    </div>
>>>>>>> filter-advanced
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as apiServices from "@/services";
import MainSlider from "@/components/slider/MainSlider";
const SearchTabs = () => import("@/components/search-tabs/SearchTabs");
<<<<<<< HEAD
=======
// const PriceRangeSlider = () => import("@/components/price-range-slider/PriceRangeSlider");
>>>>>>> filter-advanced

export default {
  name: "home",
  components: {
    MainSlider,
    SearchTabs
<<<<<<< HEAD
=======
    // PriceRangeSlider
>>>>>>> filter-advanced
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
