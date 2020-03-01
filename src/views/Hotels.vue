<template>
  <div>
    <!-- <NavigatorTop /> -->
    <!-- <MenuDesktop /> -->
    <div class="lg:flex container mx-auto">
      <div class="w-3/12">
        <HotelRatingFilter />
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
import HotelCard from "@/components/hotel-card/HotelCard";
import HotelRatingFilter from "@/components/advanced-filter/HotelRating";

export default {
  name: "Hotels",
  components: {
    // NavigatorTop,
    // MenuDesktop,
    HotelCard,
    HotelRatingFilter
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
          price: 200,
          numberOfNights: 1,
          numberOfReviews: 3000,
          numberOfRank: 4,
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
          price: 200,
          numberOfNights: 2,
          numberOfReviews: 4000,
          numberOfRank: 5,
          points: 100,
          isDeal: false,
          icons: ["book", "car"]
        }
      ]
      // rates: [
      //   {
      //       id: '1',
      //       lable: 'checkbox1'
      //   },
      //   {
      //       id: '2',
      //       lable: 'checkbox2'
      //   }
      // ]
    };
  },
  methods: {
    skeletonLoading() {
      setTimeout(() => {
        this.loading = !this.loading;
        // this.loading = true;
      }, 2000);
    }
  },

  mounted() {
    this.skeletonLoading();
  }
};
</script>
