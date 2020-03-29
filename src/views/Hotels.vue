<template>
  <div>
    <!-- <NavigatorTop /> -->
    <!-- <MenuDesktop /> -->
    <div class="lg:flex container mx-auto px-2">
      <div class="w-full lg:w-1/4 p-2 lg:p-0">
        <div class="lg:hidden" @click="showFilter">show filter</div>
        <div :class="{ 'hidden lg:block': !filter }">
          <PriceRangeSlider
            :hotels="hotels"
            :step="5"
            v-on:priceReceive="(...price) => this.priceReceive(...price)"
          />
          <HotelRatingFilter />
          <TripAdvisorRating />
          <HotelPropertyFilter />
          <Facilities />
        </div>
      </div>
      <div class="w-full lg:w-3/4">
        <SortType
          :optionsSelect="optionsSelectSort"
          :optionsRadio="optionsRadioSort"
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
</template>

<script>
// import NavigatorTop from "@/components/navigator/NavigatorTop";
// import MenuDesktop from "@/components/menu/MenuDesktop";
const HotelCard = () => import("@/components/hotel-card/HotelCard");
const HotelRatingFilter = () =>
  import("@/components/advanced-filter/HotelRating");
const TripAdvisorRating = () =>
  import("@/components/advanced-filter/TripAdvisorRating");
const HotelPropertyFilter = () =>
  import("@/components/advanced-filter/PropertyType");
const Facilities = () => import("@/components/advanced-filter/Facilities");
const SortType = () => import("@/components/advanced-filter/SortType");
const PriceRangeSlider = () =>
  import("@/components/price-range-slider/PriceRangeSlider");
const Pagination = () => import("@/components/pagination/Pagination");

export default {
  name: "Hotels",
  components: {
    // NavigatorTop,
    // MenuDesktop,
    HotelCard,
    Pagination,
    PriceRangeSlider,
    HotelRatingFilter,
    TripAdvisorRating,
    HotelPropertyFilter,
    Facilities,
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
      optionsRadioSort: [
        { label: "Use Cash", value: "cash" },
        { label: "Use Points", value: "points" }
      ],
      page: 1,
      loading: true,
      filter: false,
      priceRange: null,
      hotels: [
        {
          title: "Hotel",
          country: "VietNam",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage: require("@/assets/images/room-test.jpg"),
          url: "void:javascript(0)",
          discount: 300,
          price: 100,
          numberOfNights: 1,
          numberOfReviews: 3000,
          numberOfRank: 4.5,
          points: 90,
          isDeal: true,
          icons: ["phone", "car"]
        },
        {
          title: "Hotel 2",
          country: "US",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage: require("@/assets/images/room-test.jpg"),
          url: "void:javascript(0)",
          discount: 300,
          price: 800,
          numberOfNights: 2,
          numberOfReviews: 4000,
          numberOfRank: 5,
          points: 100,
          isDeal: false,
          icons: ["book", "car"]
        },
        {
          title: "Hotel 3",
          country: "US",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage: require("@/assets/images/room-test.jpg"),
          url: "void:javascript(0)",
          discount: 300,
          price: 2800,
          numberOfNights: 2,
          numberOfReviews: 4000,
          numberOfRank: 5,
          points: 100,
          isDeal: false,
          icons: ["book", "car"]
        }
      ]
    };
  },

  methods: {
    skeletonLoading() {
      setTimeout(() => {
        this.loading = !this.loading;
      }, 2000);
    },

    priceReceive(...price) {
      this.priceRange = price;
    },

    sortValue(...value) {
      this.SortArray = value;
    },

    showFilter() {
      this.filter = !this.filter;
    }
  },

  mounted() {
    this.skeletonLoading();
  }
};
</script>
