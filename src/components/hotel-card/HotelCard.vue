<template>
  <div class="max-w-full mx-auto p-2">
    <div class="border-solid border-1 shadow-lg rounded" v-if="loading">
      <div class="lg:flex">
        <div class="lg:w-1/4">
          <skeleton-box width="100%" height="160px" />
        </div>
        <div class="lg:w-3/4 relative">
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
        <div class="lg:w-1/4">
          <img :src="hotel.hotelImage" alt class="w-full" />
        </div>
        <div class="lg:w-3/4 relative">
          <div class="px-4 py-2 lg:py-0">
            <div class="lg:float-left lg:w-2/4">
              <h3 class="uppercase font-bold text-2xl mb-2">
                {{ hotel.title }}
              </h3>
              <p class="text-gray-500 capitalize mb-1 hidden lg:block">
                {{ hotel.country }}
              </p>
              <div class="flex">
                <div class="flex self-center">
                  <div v-for="index in hotel.numberOfRank" :key="index">
                    <div class="rounded-full bg-yellow-500 h-4 w-4 mr-1"></div>
                  </div>
                  <!-- <div v-for="index in (5 - hotel.numberOfRank)" :key="index">
                    <div class="rounded-full border-2 border-yellow-500 h-4 w-4 mr-1"></div>
                  </div> -->
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
            <div class="lg:float-right lg:text-right lg:w-2/4 mt-3 lg:mt-0">
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
    hotel: {
      type: Object
    }
  }
};
</script>
