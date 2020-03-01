<template>
  <div :id="'hotel-properties' + hotelId">
    <p class="text-center my-6">This is hotel #{{ hotelId }}</p>
    <div class="bg-gray-200 py-6">
      <div class="relative w-full max-w-7xl mx-auto">
        <RoomCardGeneral :data="dataRoom" />
      </div>
    </div>
  </div>
</template>

<script>
import RoomCardGeneral from "@/components/room-card/RoomCardGeneral";
export default {
  name: "HotelProperties",
  components: {
    RoomCardGeneral
  },
  data() {
    return {
      hotelId: "",
      dataRoom: {
        name: "No More F*cking Mock, 1 King Bed",
        image_url:
          "https://i.travelapi.com/hotels/20000000/19480000/19473700/19473638/a07ad6ed_z.jpg",
        adults: 2,
        description: {
          "0": "1 Queen Bed",
          "1": "269-sq-foot (25-sq-meter) room with courtyard views",
          "2": "",
          "3": "Internet - Free WiFi ",
          "4": "Entertainment - Flat-screen TV with cable channels",
          "5":
            "Food & Drink - Kitchenette with refrigerator, stovetop, and cookware/dishware",
          "6":
            "Bathroom - Shower, free toiletries, and a hair dryer (on request)",
          "7": "Practical - Desk",
          "8": "Comfort - Air conditioning",
          "9": "Need to Know - Limited housekeeping",
          "10": "Non-Smoking"
        },
        features: {
          "0": "Non-Smoking",
          "1": "Free toiletries",
          "2": "Free WiFi",
          "3": "Shower only",
          "4": "Hair dryer (on request)",
          "5": "Stovetop",
          "6": "Cookware, dishware, and utensils",
          "7": "Room service",
          "8": "Limited housekeeping",
          "9": "Flat-panel TV",
          "10": "Cable TV service",
          "11": "Air conditioning",
          "12": "Desk",
          "13": "Kitchenette",
          "14": "Refrigerator"
        },
        prices: 234
      }
    };
  },
  created() {
    const params = this.$route.params;
    this.hotelId = params.hotelId;
    // then fetch api...
  }
};
</script>
