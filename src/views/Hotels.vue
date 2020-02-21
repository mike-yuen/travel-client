<template>
  <div>
    <NavigatorTop />
    <MenuDesktop />
    <!-- <HotelCard v-bind:hotels="hotels" /> -->
    <DataFrame>
      <div slot-scope="{ data: hotels, error, loading }">
        <p v-if="error" class="text-danger">
          There was an error! Please try again.
        </p>
        <div v-else>
          <div v-if="loading">
            <div v-for="n in 2" :key="n">
              <HotelCard loading />
            </div>
          </div>
          <div v-else>
            <div v-for="(hotel, index) in hotels" :key="index">
              <HotelCard>
                <img slot="figure" :src="hotel.hotelImage" alt class="w-full" />
                <h3 slot="title" class="uppercase font-bold text-2xl mb-2">
                  {{ hotel.title }}
                </h3>
                <p slot="country" class="text-gray-500 capitalize mb-3">
                  {{ hotel.country }}
                </p>
                <div
                  slot="numberOfRank"
                  v-for="index in hotel.numberOfRank"
                  :key="index"
                >
                  <div class="rounded-full bg-yellow-500 h-4 w-4 mr-1"></div>
                </div>
                <img
                  slot="tripadvisorImage"
                  :src="hotel.tripadvisorImage"
                  alt
                  class="w-100 mr-1"
                />
                <span slot="numberOfReviews" class="text-gray-500 self-center"
                  >{{ hotel.numberOfReviews }} reviews</span
                >
                <div
                  slot="icon"
                  v-for="(icon, index) in hotel.icons"
                  :key="index"
                >
                  <div
                    class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 mr-2 mt-10"
                  >
                    <i :class="'fa fa-' + icon"></i>
                  </div>
                </div>
                <p slot="numberOfNights">
                  <span class>{{ hotel.numberOfNights }} night</span>
                  from (AUD)
                </p>
                <p slot="discount" class="line-through text-gray-500">
                  ${{ hotel.discount }}
                </p>
                <p slot="price" class="text-red-600 text-4xl font-bold">
                  ${{ hotel.price }}
                </p>
                <p slot="points">
                  Earn
                  <span class="font-semibold">{{ hotel.points }}</span> Quatas
                  Points^
                </p>
              </HotelCard>
            </div>
          </div>
        </div>
        <HotelCard />
      </div>
    </DataFrame>
  </div>
</template>

<script>
import NavigatorTop from "@/components/navigator/NavigatorTop";
import MenuDesktop from "@/components/menu/MenuDesktop";
import HotelCard from "@/components/hotel-card/HotelCard";
import DataFrame from "@/components/hotel-card/DataFrame";
export default {
  name: "hotels",
  components: {
    NavigatorTop,
    MenuDesktop,
    HotelCard,
    DataFrame
  }
};
</script>
