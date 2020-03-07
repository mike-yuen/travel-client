<template>
  <div>
    <!-- <NavigatorTop /> -->
    <!-- <MenuDesktop /> -->
    <div class="lg:flex container mx-auto">
      <div class="w-12/12 lg:w-3/12 p-2 lg:p-0">
        <PriceRangeSlider :hotels="hotels" :step="5" />
        <HotelRatingFilter />
        <TripAdvisorRating />
        <HotelPropertyFilter />
        <Facilities />
      </div>
      <div class="w-12/12 lg:w-9/12">
        <HotelCard
          v-for="(hotel, index) in hotels"
          :key="index"
          :hotel="hotel"
          :loading="loading"
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
const PriceRangeSlider = () =>
  import("@/components/price-range-slider/PriceRangeSlider");

export default {
  name: "Hotels",
  components: {
    // NavigatorTop,
    // MenuDesktop,
    HotelCard,
    PriceRangeSlider,
    HotelRatingFilter,
    TripAdvisorRating,
    HotelPropertyFilter,
    Facilities
  },
  data() {
    return {
      loading: true,
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
    }
  },

  mounted() {
    this.skeletonLoading();
  }
};
</script>
