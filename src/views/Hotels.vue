<template>
  <div id="hotels" class="pb-8" style="background-color: #f4f5f6">
    <div class="relative w-full max-w-7xl mx-auto">
      <div class="block py-8 min-h-20">
        <h1 class="text-3xl font-bold m-0 mb-2">
          Hotels in {{ city.name }}, VietNam
        </h1>
        <div class="css-d785tk-Box e5f71i10">
          <div class="css-l6j7gi-Box-Flex em8yo161">
            <div data-testid="result-count" class="css-bx7fxa-Box e5f71i10">
              Showing all available properties
            </div>
          </div>
          <div class="css-1ev36eu-Box e5f71i10">
            <div class="css-72bb8v-Box-Flex em8yo160">
              <div class="css-18aidf3-Box e1sqdzo10"></div>
              <div class="css-iczpqk-Box e1sqdzo10"></div>
              <div class="css-c4dzg2-Box e1sqdzo10"></div>
              <div class="css-wiinfk-Box e1sqdzo10"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:flex">
        <div class="w-full lg:w-3/10 p-0 lg:pr-8 lg:mr-12">
          <div class="hidden lg:block">
            <div class="p-0 mb-4 border-b border-gray-50">
              <div class="mb-4">
                <div class="flex justify-between">
                  <div>
                    <h2 class="font-bold m-0 p-0">
                      Filter properties
                    </h2>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="focus:outline-none"
                      @click="resetFilter"
                    >
                      <span class="underline">Reset all filters</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-0 mb-4 border-b border-gray-50">
              <p class="font-bold mb-3">Price per night [USD]</p>
              <PriceRangeSlider
                :priceMin="query.priceFrom"
                :priceMax="query.priceTo"
                :step="10"
                @priceReceive="(...price) => this.priceReceive(...price)"
              />
            </div>
            <div class="p-0 pb-4 mb-4 border-b border-gray-50">
              <HotelRatingFilter v-model="query.rating" />
            </div>
            <div class="p-0 pb-4 mb-4">
              <HotelPropertyFilter v-model="query.roomTypeIds" />
            </div>
          </div>
        </div>
        <div class="w-full lg:w-7/10">
          <HotelCard
            v-for="(hotel, index) in hotels"
            :key="index"
            :hotel="hotel"
            :loading="loading"
          />
          <!-- <Pagination
            v-model="page"
            :page-count="hotels.length"
            :margin-pages="2"
            :page-range="5"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const HotelCard = () => import("@/components/hotel-card/HotelCard");
const HotelRatingFilter = () =>
  import("@/components/advanced-filter/HotelRating");
const HotelPropertyFilter = () =>
  import("@/components/advanced-filter/PropertyType");
const PriceRangeSlider = () =>
  import("@/components/price-range-slider/PriceRangeSlider");
// const Pagination = () => import("@/components/pagination/Pagination");

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/hotel/const";

export default {
  name: "Hotels",
  components: {
    HotelCard,
    // Pagination,
    PriceRangeSlider,
    HotelRatingFilter,
    HotelPropertyFilter
  },
  data() {
    return {
      SortArray: null,
      page: 1,
      loading: true,
      priceRange: null,
      query: {
        priceFrom: 0,
        priceTo: 200,
        roomTypeIds: [],
        rating: 0,
        pageSize: 10,
        pageIndex: 1,
        sort: ""
      },
      autoUpdate: false
    };
  },

  computed: {
    ...mapGetters("hotel", {
      hotels: GETTERS.GET_HOTELS,
      baseQuery: GETTERS.GET_BASE_QUERY,
      defaultFilterQuery: GETTERS.GET_DEFAULT_FILTER_QUERY,
      filterQuery: GETTERS.GET_FILTER_QUERY,
      cityList: GETTERS.GET_CITIES
    }),

    city() {
      return (
        this.cityList.find((city) => city.id === this.baseQuery.cityId) || ""
      );
    }
  },

  methods: {
    ...mapActions("hotel", {
      getHotels: ACTIONS.GET_HOTELS,
      setBaseQuery: ACTIONS.SET_BASE_QUERY,
      setFilterQuery: ACTIONS.SET_FILTER_QUERY,
      resetFilterQuery: ACTIONS.RESET_FILTER_QUERY
    }),

    priceReceive(...price) {
      this.priceRange = price;
      this.$set(this.query, "priceFrom", this.priceRange[0]);
      this.$set(this.query, "priceTo", this.priceRange[1]);
    },

    showFilter() {
      this.filter = !this.filter;
    },

    async getHotelsQuery(query) {
      const routeQuery = this.$route.query;
      let cloneBaseQuery = Object.assign({}, this.baseQuery);
      cloneBaseQuery.cityId =
        routeQuery.cityId || this.baseQuery.cityId || this.cityList[0].id;
      cloneBaseQuery.date = routeQuery.date || this.baseQuery.date;
      cloneBaseQuery.guestCount =
        routeQuery.guestCount || this.baseQuery.guestCount;

      await this.setBaseQuery(cloneBaseQuery);

      const baseQueryAPI = { ...this.baseQuery };
      if (this.baseQuery.guestCount) {
        const guestData = JSON.parse(this.baseQuery.guestCount);
        baseQueryAPI.guestCount =
          guestData.adults + guestData.children + guestData.infants;
      }
      this.setFilterQuery(query);
      this.getHotels({ ...baseQueryAPI, ...query });
      this.$router.replace({
        path: "/hotels",
        query: { ...this.baseQuery, ...query }
      });
    },

    resetFilter() {
      this.resetFilterQuery();
      this.query = { ...this.baseQuery, ...this.defaultFilterQuery };
    }
  },

  async created() {
    const routeQuery = this.$route.query;
    this.query.roomTypeIds = routeQuery.roomTypeIds
      ? typeof routeQuery.roomTypeIds === "string"
        ? [routeQuery.roomTypeIds]
        : routeQuery.roomTypeIds
      : [];
    this.query.rating = routeQuery.rating || 0;
    this.query.pageSize = routeQuery.pageSize || 10;
    this.query.pageIndex = routeQuery.pageIndex || 1;
    this.query.sort = routeQuery.sort || "";
    this.autoUpdate = true;
    await this.getHotelsQuery(this.query);
  },

  watch: {
    query: {
      deep: true,
      handler(val) {
        if (this.autoUpdate) this.getHotelsQuery(val);
      }
    }
  }
};
</script>
