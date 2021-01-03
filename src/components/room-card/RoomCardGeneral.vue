<template>
  <div :id="roomData.roomId" class="room-wrapper">
    <div class="md:flex w-full md:px-3 px-4">
      <div class="relative cursor-pointer w-full h-35 md:w-50">
        <div
          class="relative bg-grey-300 rounded overflow-hidden w-full h-35 md:w-50"
        >
          <img
            :src="roomData.image || placeholder"
            :alt="roomData.name"
            class="block absolute top-0 left-0 w-full h-full object-cover"
          />
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
            {{ roomData.name }}
          </h2>
          <div class="flex items-center">
            <i
              class="fa fa-user mr-1"
              v-for="(item, index) in roomData.capacity"
              :key="index"
            />
            <span class="ml-1 text-lg text-gray-600">
              Sleeps {{ roomData.capacity }} guests
            </span>
          </div>
          <a class="text-lg text-red-0 underline cursor-pointer">
            View room details
          </a>
        </div>
      </div>
    </div>
    <div class="md:flex w-full px-3">
      <div class="mt-6 w-full">
        <div
          class="relative bg-white rounded"
          style="box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;"
        >
          <div class="mb-4">
            <div class="md:flex">
              <div
                class="w-full p-4 md:w-3/10 md:px-8 border-b md:border-r border-gray-200"
              >
                <span class="hidden md:block mt-4 text-gray-20 text-md">
                  DETAIL
                </span>
                <h3 class="block text-lg font-bold m-0">
                  Room Type - {{ roomData.roomType }} - {{ roomData.bed }} bed
                </h3>
                <div class="mt-4">
                  <a
                    class="block text-lg font-bold underline text-gray-30 cursor-pointer"
                  >
                    Non-refundable
                  </a>
                  <a class="block text-lg text-red-0 underline cursor-pointer">
                    Show details
                  </a>
                </div>
              </div>
              <div
                class="w-full md:w-7/20 p-4 md:p-8 md:pt-10 border-b md:border-r border-gray-200"
              >
                <div class="text-gray-30">
                  <div class="flex">
                    <div class="text-xl text-gray-0 mr-2">
                      <i class="fa fa-fingerprint font-bold" />
                    </div>
                    <div class="text-lg">
                      <p>
                        Earn <strong>{{ roomData.price }}</strong> Lux Points^
                      </p>
                      <p>
                        Plus
                        <strong>{{ Math.floor(roomData.price / 10) }}</strong>
                        Lux Points
                        <a class="underline">for your business</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="text-gray-30 mt-4">
                  <div class="flex">
                    <div class="text-xl text-gray-0 mr-2">
                      <i class="faf fa-wifi" />
                    </div>
                    <div class="text-lg">
                      Free WiFi
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-7/20 p-4 md:p-8">
                <div class="md:text-right">
                  <div class="text-gray-30">
                    <span>Total price for 1 night (USD)</span>
                  </div>
                  <div class="text-black text-4xl font-bold">
                    <span>$ {{ roomData.price }}</span>
                  </div>
                  <Button
                    className="w-full md:w-auto bg-red-0 uppercase font-bold px-8"
                    @onClick="selectRoom"
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Button = () => import("@/components/core-ui/button/Button");

export default {
  name: "RoomCardGeneral",
  components: {
    Button
  },
  props: {
    roomData: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      placeholder:
        "https://images-cdn.qantashotels.com/insecure/desktop_search/plain/media/7a9e19e0-6c14-419a-9e90-e22dcc8bbd38.jpg"
    };
  },
  methods: {
    selectRoom() {
      this.$emit("select");
    }
  }
};
</script>
