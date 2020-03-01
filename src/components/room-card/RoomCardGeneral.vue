<template>
  <div class="room-wrapper">
    <div class="md:flex w-full md:px-3 px-4">
      <div class="relative cursor-pointer w-full h-35 md:w-50">
        <div
          class="relative bg-grey-300 rounded overflow-hidden w-full h-35 md:w-50"
          data-loaded=""
        >
          <img
            :src="data.image_url"
            :alt="data.name"
            class="block absolute top-0 left-0 w-full h-full object-cover"
          />
          <!-- opacity-0 transition: opacity 200ms ease 0s opacity-100 -->
        </div>
        <div class="absolute left-2 bottom-2">
          <div class="text-white font-bold rounded px-2 bg-gray-0 opacity-75">
            <div class="flex items-center">
              <i class="faf fa-image mr-2" />
              <div class="text-white font-bold">1</div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:pl-5">
        <div class="">
          <h2 class="text-2xl font-bold mb-2">
            {{ data.name }}
          </h2>
          <div class="flex items-center">
            <i
              class="fa fa-user mr-1"
              v-for="(item, index) in data.adults"
              :key="index"
            />
            <span class="ml-1 text-lg text-gray-600">
              Sleeps {{ data.adults }} guests
            </span>
          </div>
          <a class="text-lg text-red-0 underline cursor-pointer">
            View room details
          </a>
        </div>
      </div>
    </div>
    <div class="md:flex w-full px-3">
      <RoomCardOptions :data="data" />
    </div>
  </div>
</template>

<script>
import RoomCardOptions from "./RoomCardOptions";

export default {
  name: "RoomCardGeneral",
  components: {
    RoomCardOptions
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          id: "",
          name: "",
          image_url: "",
          adults: 0,
          description: {},
          features: {},
          prices: 0
        };
      }
    }
  }
};
</script>
