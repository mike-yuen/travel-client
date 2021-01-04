<template>
  <div id="hotels" class="pb-8" style="background-color: #f4f5f6">
    <div class="relative w-full max-w-7xl mx-auto">
      <div class="block py-8 min-h-20">
        <h1 class="text-3xl font-bold m-0 mb-2">
          Hotels in Saint-Aunes, France
        </h1>
        <div class="css-d785tk-Box e5f71i10">
          <div class="css-l6j7gi-Box-Flex em8yo161">
            <div data-testid="result-count" class="css-bx7fxa-Box e5f71i10">
              Showing 1 available out of 3 properties
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
                :priceMin="90"
                :priceMax="400"
                :step="10"
                v-on:priceReceive="(...price) => this.priceReceive(...price)"
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
          <SortType
            :optionsSelect="optionsSelectSort"
            v-on:sortValue="(...value) => this.sortValue(...value)"
          />
          <HotelCard
            v-for="(hotel, index) in hotels"
            :key="index"
            :hotel="hotel"
            :loading="loading"
          />
          <Pagination
            v-model="page"
            :page-count="hotels.length"
            :margin-pages="2"
            :page-range="5"
          />
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
const SortType = () => import("@/components/advanced-filter/SortType");
const PriceRangeSlider = () =>
  import("@/components/price-range-slider/PriceRangeSlider");
const Pagination = () => import("@/components/pagination/Pagination");

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/hotel/const";

export default {
  name: "Hotels",
  components: {
    HotelCard,
    Pagination,
    PriceRangeSlider,
    HotelRatingFilter,
    HotelPropertyFilter,
    SortType
  },
  data() {
    return {
      SortArray: null,
      optionsSelectSort: [
        { label: "Best Deal", value: "promotion" },
        { label: "Popularity", value: "popularity" },
        { label: "Highest Price", value: "price_desc" },
        { label: "Lowest Price", value: "price_asc" },
        { label: "TripAdvisor Rating", value: "tripadvisor" }
      ],
      page: 1,
      loading: true,
      priceRange: null,
      query: {
        cityId: "",
        guestCount: 0,
        roomTypeIds: [],
        rating: 0,
        pageSize: 10,
        pageIndex: 1,
        sort: ""
      }
    };
  },

  computed: {
    ...mapGetters("hotel", {
      hotels: GETTERS.GET_HOTELS,
      baseQuery: GETTERS.GET_BASE_QUERY,
      defaultFilterQuery: GETTERS.GET_DEFAULT_FILTER_QUERY,
      filterQuery: GETTERS.GET_FILTER_QUERY
    })
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
    },

    sortValue(...value) {
      this.SortArray = value;
    },

    showFilter() {
      this.filter = !this.filter;
    },

    resetFilter() {
      this.resetFilterQuery();
      this.query = { ...this.baseQuery, ...this.defaultFilterQuery };
    }
  },

  created() {
    this.getHotels(this.filterQuery);
  },

  watch: {
    query: {
      deep: true,
      handler(val) {
        this.getHotels(val);
        this.setFilterQuery(val);
        this.$router.replace({
          path: "/hotels",
          query: val
        });
      }
    }
  }
};
</script>
