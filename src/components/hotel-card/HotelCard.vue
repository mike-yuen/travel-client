<template>
  <div class="max-w-full mx-auto p-2">
    <div class="border-solid border-1 shadow-lg rounded" v-if="loading">
      <div class="lg:flex">
        <div class="lg:w-4/12">
          <skeleton-box width="100%" height="200px" />
        </div>
        <div class="lg:w-8/12 relative">
          <div class="p-6 flex">
            <div class="lg:float-left w-2/4">
              <div>
                <skeleton-box width="100%" height="20px" borderRadius="10px" />
              </div>
              <div>
                <skeleton-box width="25%" height="12px" borderRadius="10px" />
              </div>
              <div class="lg:flex">
                <div class="lg:flex self-center">
                  <skeleton-box
                    borderRadius="10px"
                    width="100px"
                    class="mr-2"
                  />
                </div>
                <skeleton-box borderRadius="10px" width="100px" class="mr-2" />
                <skeleton-box borderRadius="10px" width="100px" class="mr-2" />
              </div>
              <div class="lg:flex"></div>
            </div>
            <div class="lg:float-right text-right w-2/4 hidden lg:block">
              <div class="text-right block">
                <skeleton-box width="50%" height="20px" borderRadius="10px" />
              </div>
              <div class="text-right block">
                <skeleton-box width="30%" height="12px" borderRadius="10px" />
              </div>
              <div class="text-right block">
                <skeleton-box width="40%" borderRadius="10px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-solid border-1 shadow-lg rounded" v-else>
      <div class="lg:flex">
        <div class="lg:w-4/12">
          <img :src="hotel.hotelImage" alt class="w-full" />
        </div>
        <div class="lg:w-8/12 relative">
          <div class="px-4 py-2 lg:py-0">
            <div class="lg:float-left lg:w-7/12">
              <h3 class="uppercase font-bold text-2xl mb-2">
                {{ hotel.title }}
              </h3>
              <p class="text-gray-500 capitalize mb-1 hidden lg:block">
                {{ hotel.country }}
              </p>
              <div class="flex">
                <div class="flex self-center">
                  <!-- <div v-for="index in hotel.numberOfRank" :key="index">
                    <div class="rounded-full bg-yellow-500 h-4 w-4 mr-1"></div>
                  </div> -->
                  <RatingStar :value="hotel.numberOfRank" :disabled="true" />
                </div>
                <div class="ml-3 lg:ml-0  lg:mt-0 self-center">
                  <img :src="hotel.tripadvisorImage" alt class="w-100 mr-1" />
                </div>
                <span class="hidden lg:block text-gray-500 self-center"
                  >{{ hotel.numberOfReviews }} reviews</span
                >
              </div>
              <div class="hidden lg:flex mt-2">
                <div v-for="(icon, index) in hotel.icons" :key="index">
                  <div
                    class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 mr-2"
                  >
                    <i :class="'fa fa-' + icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:float-right lg:text-right lg:w-5/12 mt-3 lg:mt-0">
              <p class="">
                <span class>{{ hotel.numberOfNights }} night</span>
                from (AUD)
              </p>

              <p class="line-through text-gray-500 ">${{ hotel.discount }}</p>
              <p class="text-red-600 text-4xl font-bold t">
                ${{ hotel.price }}
              </p>
              <p class="">
                Earn
                <span class="font-semibold">{{ hotel.points }}</span> Quatas
                Points^
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonBox from "@/components/skeleton/SkeletonBox.vue";
const RatingStar = () => import("@/components/hotel-card/RatingStar.vue");

export default {
  name: "HotelCard",
  components: {
    SkeletonBox,
    RatingStar
  },
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    hotel: {
      type: Object
    }
  }
};
</script>
