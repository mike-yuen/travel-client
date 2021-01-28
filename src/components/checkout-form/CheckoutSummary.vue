<template>
  <div class="mb-10">
    <div class="flex flex-col relative overflow-hidden rounded-t-md">
      <div class="flex items-center justify-center w-full h-50 overflow-hidden">
        <img
          src="https://images-cdn.qantashotels.com/insecure/desktop_search/plain/media/d0fbdc42-a505-4783-a5ba-94d757f6de23.jpg"
          alt="Featured Image"
          class="block w-full h-full object-cover"
        />
      </div>
      <div class="bg-white px-8">
        <div class="py-6 border-b">
          <div class="flex">
            <div class="flex flex-col w-full">
              <span class="text-lg font-bold">
                {{ bookingData.hotelName }} Hotel
              </span>
              <div class="flex mt-2">
                <StarRating :rating="4" class="mr-3" />
                <span class="ml-1 text-md underline"> 5660 reviews </span>
              </div>
            </div>
          </div>
          <div class="mt-2" v-if="bookingData.selectedRoom">
            <button type="button" class="cursor-pointer">
              <span class="font-bold text-lg underline">
                {{ bookingData.selectedRoom.name }}
              </span>
            </button>
            -
            <button type="button" cclass="cursor-pointer">
              <span class="font-bold text-lg underline">
                {{ bookingData.selectedRoom.roomType }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="overflow-hidden rounded-b-md"
      style="box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2);"
    >
      <div class="bg-white px-8">
        <div class="py-6 border-b">
          <span class="text-lg">{{ bookingData.guestCount }} guests</span>
          <div class="flex flex-col">
            <div class="flex justify-between mb-1">
              <span class="text-lg">Check-in</span>
              <span class="text-lg font-bold">{{ dateFrom }}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-lg">Check-out</span>
              <span class="text-lg font-bold">{{ dateTo }}</span>
            </div>
          </div>
          <div class="mb-1">
            <button type="button" class="cursor-pointer">
              <span class="text-green-0 underline font-bold">
                Free cancellation
              </span>
            </button>
          </div>
        </div>
        <div class="py-6 border-b">
          <span class="block mb-2 text-md">Free WiFi</span>
          <span class="block text-md">
            Earn
            <span class="font-bold">150</span>
            Lux Points^ plus
            <span class="font-bold">50</span>
            Lux Points for your business*.
          </span>
        </div>
      </div>
      <div class="bg-blue-100 p-8">
        <div class="flex items-center justify-between mt-1">
          <div>
            <span class="text-lg font-bold">Total due now</span>
          </div>
          <div class="flex text-lg">
            <div>
              <span class="font-bold">$</span>
              <span class="font-bold">{{ bookingData.totals }}</span>
            </div>
            <div class="ml-1">
              <span class="font-bold">USD</span>
            </div>
          </div>
        </div>
        <button type="button" class="cursor-pointer">
          <span class="underline">Price breakdown</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import fecha from "fecha";
const StarRating = () => import("@/components/core-ui/rating/StarRating");

export default {
  name: "CheckoutSummary",
  components: {
    StarRating
  },
  props: {
    bookingData: {}
  },
  computed: {
    dateFrom() {
      return fecha.format(
        new Date(this.bookingData.dateFrom),
        "ddd DD MMM, YYYY"
      );
    },
    dateTo() {
      return fecha.format(
        new Date(this.bookingData.dateTo),
        "ddd DD MMM, YYYY"
      );
    }
  }
};
</script>
