<template>
  <div class="max-w-full mx-auto p-2 cursor-pointer">
    <div class="border-solid border-1 shadow-lg rounded">
      <div class="lg:flex rounded">
        <div class="rounded" style="flex-basis: 15rem;">
          <img
            :src="hotel.hotelImage"
            class="w-full object-cover rounded"
            :alt="hotel.title"
            style="width: 15rem; height: 14rem"
          />
        </div>
        <div class="flex-grow relative bg-white">
          <div class="pt-8 px-6">
            <div class="lg:float-left lg:w-7/12">
              <h3 class="font-bold text-2xl mb-0">
                {{ hotel.title }}
              </h3>
              <p class="text-gray-500 capitalize mb-1 hidden lg:block">
                {{ hotel.country }}
              </p>
              <div class="flex">
                <div class="flex self-center">
                  <RatingStar :value="hotel.numberOfRank" :disabled="true" />
                </div>
                <div class="ml-3 lg:ml-0  lg:mt-0 self-center">
                  <img :src="hotel.tripadvisorImage" alt class="w-100 mr-1" />
                </div>
                <span class="hidden lg:block text-gray-500 self-center"
                  >{{ hotel.numberOfReviews }} reviews</span
                >
              </div>
              <div class="hidden lg:flex mt-10">
                <div v-for="(icon, index) in hotel.icons" :key="index">
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
const RatingStar = () => import("@/components/hotel-card/RatingStar.vue");

export default {
  name: "HotelCard",
  components: {
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
