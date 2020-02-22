<template>
  <div id="hotels">
    <HotelCard
      v-for="(hotel, index) in hotels"
      :key="index"
      :hotel="hotel"
      :loading="loading"
    />
  </div>
</template>

<script>
import HotelCard from "@/components/hotel-card/HotelCard";
export default {
  name: "Hotels",
  components: {
    HotelCard
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
          hotelImage:
            "https://i.travelapi.com/hotels/3000000/2060000/2057700/2057692/d1374aea_b.jpg",
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
          hotelImage:
            "https://i.travelapi.com/hotels/3000000/2060000/2057700/2057692/d1374aea_b.jpg",
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
