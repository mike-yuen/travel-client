<template>
  <div class="max-w-full mx-auto p-2">
    <div v-for="(hotel, index) in hotels" :key="index">
      <a :href="hotel.url">
        <div class="border-solid border-2 shadow-lg rounded mt-6">
          <div class="lg:flex">
            <div class="lg:w-1/4">
              <skeleton-box v-if="loading" width="100%" height="100%" />
              <img v-else :src="hotel.hotelImage" alt class="w-full" />
            </div>
            <div class="lg:w-3/4 relative">
              <div class="absolute top-0 right-0 mr-20" v-if="hotel.isDeal">
                <div class="bg-blue-500 px-5">
                  <span class="text-white font-bold">Top Deal</span>
                </div>
              </div>
              <div class="p-6">
                <div class="float-left">
                  <skeleton-box v-if="loading" width="100px" height="10px" />
                  <h3 v-else class="uppercase font-bold text-2xl mb-2">
                    {{ hotel.title }}
                  </h3>
                  <p class="text-gray-500 capitalize mb-3">
                    {{ hotel.country }}
                  </p>
                  <div class="lg:flex">
                    <div class="lg:flex self-center">
                      <div v-for="index in hotel.numberOfRank" :key="index">
                        <div
                          class="rounded-full bg-yellow-500 h-4 w-4 mr-1"
                        ></div>
                      </div>
                    </div>
                    <div class="self-center mr-1">
                      <img :src="hotel.tripadvisorImage" alt class="w-100" />
                    </div>
                    <span class="text-gray-500 self-center"
                      >{{ hotel.numberOfReviews }} reviews</span
                    >
                  </div>
                  <div class="lg:flex">
                    <div v-for="(icon, index) in hotel.icons" :key="index">
                      <div
                        class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 mr-2 mt-10"
                      >
                        <i :class="'fa fa-' + icon"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="float-right text-right">
                  <p class>
                    <span class>{{ hotel.numberOfNights }} night</span>
                    from (AUD)
                  </p>
                  <p class="line-through text-gray-500">
                    ${{ hotel.discount }}
                  </p>
                  <p class="text-red-600 text-4xl font-bold">
                    ${{ hotel.price }}
                  </p>
                  <p>
                    Earn
                    <span class="font-semibold">{{ hotel.points }}</span> Quatas
                    Points^
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import SkeletonBox from "@/components/skeleton/SkeletonBox.vue";

export default {
  name: "HotelCard",
  components: {
    SkeletonBox
  },
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    hotels: Array
  }
};
</script>
