<template>
  <div :id="'hotel-properties-' + hotelId">
    <div class="relative w-full max-w-7xl mx-auto">
      <div class="pt-6 px-4">
        <div class="flex justify-center p-4 bg-cyan-150">
          <span class="text-base md:text-lg uppercase font-bold">
            SAVE 10% ON POINTS PLUS PAY
          </span>
          <div class="hidden md:block">
            <span class="text-base mx-1">-</span>
            <span class="text-lg uppercase font-bold">
              on hotels worldwide, hurry ends 2nd March.
            </span>
          </div>
        </div>
      </div>

      <div class="hotel-intro px-4">
        <div class="hidden md:block pt-10 pb-6">
          <h1 class="text-2xl md:text-2rem font-bold leading-none m-0 mb-4">
            {{ hotel.hotelName }} Hotel
          </h1>
          <div class="flex items-center md:mb-3">
            <div class="mr-3">
              <StarRating :rating="rating" />
            </div>

            <button>
              <div class="flex">
                <img
                  src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg"
                  width="110px"
                  alt="Trip-Advisor 4.5 Rating"
                  class="block max-w-full"
                />
                <span class="ml-1 text-md underline">
                  5660 reviews
                </span>
              </div>
            </button>
          </div>
          <div class="address leading-normal">
            <div class="flex">
              <span class="text-base cursor-pointer">
                <i class="fa fa-map-marker-alt mr-2" />
                <span class="text-lg mr-2 text-gray-30">
                  1 Davey Street, Hobart Tasmania Australia
                </span>
                <span class="text-red-0 underline">
                  View on map
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="md:flex">
          <div class="w-full md:w-2/3">
            <HotelPropertySlider />

            <div class="md:hidden">
              <h1 class="text-2xl md:text-2rem font-bold leading-none m-0 mb-4">
                Hotel Grand Chancellor Hobart
              </h1>
            </div>
          </div>
          <div class="w-full md:w-1/3 md:pl-6">
            <div class="block">
              <div class="mb-6 pb-6 border-b border-gray-50">
                <h2 class="text-lg font-bold text-gray-0 m-0 mb-3">
                  Popular features
                </h2>
                <div class="overflow-hidden">
                  <div class="w-1/2 float-left mb-4">
                    <div class="flex items-center w-full">
                      <div class="text-left pr-3">
                        <img alt="Pool" src="@/assets/svg/features-pool.svg" />
                      </div>
                      <span class="text-lg text-left">
                        Swimming Pool
                      </span>
                    </div>
                  </div>
                  <div class="flex w-1/2 float-left mb-4">
                    <div class="flex items-center w-full">
                      <div class="text-left pr-3">
                        <img
                          alt="Restaurant"
                          src="@/assets/svg/features-restaurant.svg"
                        />
                      </div>
                      <span class="text-lg text-left">
                        Restaurant
                      </span>
                    </div>
                  </div>
                  <div class="flex w-1/2 float-left mb-4">
                    <div class="flex items-center w-full">
                      <div class="text-left pr-3">
                        <img
                          alt="Parking"
                          src="@/assets/svg/features-parking.svg"
                        />
                      </div>
                      <span class="text-lg text-left">
                        Parking
                      </span>
                    </div>
                  </div>
                  <div class="flex w-1/2 float-left mb-4">
                    <div class="flex items-center w-full">
                      <div class="text-left pr-3">
                        <img
                          alt="Smoking"
                          src="@/assets/svg/features-smoking.svg"
                        />
                      </div>
                      <span class="css-1skbx3q-Text e7qkkfc0">
                        Smoke Free
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <a class="py-2 text-lg text-red-0 underline cursor-pointer">
                    View 22 property features
                  </a>
                </div>
              </div>
              <div class="md:flex mb-4">
                <div class="w-full md:w-1/2">
                  <span class="text-base ml-1 mb-1">Check-in time</span>
                  <div class="flex items-center text-lg">
                    <img alt="Check-in" src="@/assets/svg/check-in.svg" />
                    From 15:00
                  </div>
                </div>
                <div class="w-full md:w-1/2">
                  <span class="text-base ml-1 mb-1">Check-out time</span>
                  <div class="flex items-center text-lg">
                    <img alt="Check-in" src="@/assets/svg/check-in.svg" />
                    Until 11:00
                  </div>
                </div>
              </div>
              <div class="flex">
                <a class="py-2 text-lg text-red-0 underline cursor-pointer">
                  About this property
                </a>
              </div>
            </div>

            <div class="css-96pr0p-Box-Flex e6hqxet0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5315527332596!2d106.6922063141164!3d10.770540262249103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3e8eddf565%3A0x2ab6e5fe92c2e5d7!2sNew%20World%20Saigon%20Hotel!5e0!3m2!1svi!2s!4v1583578018837!5m2!1svi!2s"
                width="100%"
                height="100%"
                frameborder="0"
                style="border:0;"
                allowfullscreen=""
              ></iframe>
              <span class="css-g7b1el-Text e7qkkfc0">
                1 Davey Street, Hobart Tasmania Australia
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative w-full max-w-7xl mx-auto">
      <hr class="my-10 mx-4" />
    </div>
    <div class="relative w-full max-w-7xl mx-auto">
      <div class="text-center">
        <span class="font-normal text-xl"> {{ hotel.hotelName }} Hotel </span>
        <h2 class="font-bold text-3xl">
          Choose your room
        </h2>
        <div class="text-sm">
          Showing {{ hotel.availableRooms.length }} available out of
          {{ hotel.availableRooms.length }} rooms for your stay
        </div>
      </div>
      <div class="relative w-full max-w-4xl mx-auto mt-4 mb-8">
        <div class="md:flex flex-wrap">
          <div class="md:w-2/3">
            <DatePicker
              showYear
              isExpanded
              smallSize
              :hoveringTooltip="false"
              :maxNights="21"
              v-model="dateData"
            />
          </div>
          <div class="md:w-1/3">
            <GuestInput
              id="guest-input"
              label="Guests"
              isExpanded
              v-model="guestData"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 py-6">
      <div class="relative w-full max-w-7xl mx-auto">
        <div class="mb-4 mx-4 text-center">
          <span class="font-bold text-2xl">
            There are {{ hotel.availableRooms.length }} rooms available for your
            stay
          </span>
        </div>
        <div
          v-for="(room, index) in hotel.availableRooms"
          :key="`room-${index}`"
        >
          <hr class="my-8 mx-4" />
          <RoomCardGeneral
            :roomData="room"
            @select="handleSelectRoom(room)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotelPropertySlider from "@/components/slider/HotelPropertySlider";
const StarRating = () => import("@/components/core-ui/rating/StarRating");
const DatePicker = () => import("@/components/core-ui/datepicker/DatePicker");
const GuestInput = () => import("@/components/search-tabs/GuestInput");
const RoomCardGeneral = () => import("@/components/room-card/RoomCardGeneral");

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/hotel/const";

export default {
  name: "HotelProperties",
  components: {
    DatePicker,
    HotelPropertySlider,
    GuestInput,
    StarRating,
    RoomCardGeneral
  },
  data() {
    return {
      hotelId: "",
      rating: 3.5,
      dateData: {
        checkIn: new Date(),
        checkOut: new Date(new Date().valueOf() + 1000 * 3600 * 24)
      },
      guestData: {
        adults: 2,
        children: 0,
        infants: 0
      }
    };
  },

  created() {
    const params = this.$route.params;
    const query = this.$route.query;
    this.hotelId = params.hotelId;
    if (query.date && query.date.length)
      this.dateData = {
        checkIn: new Date(JSON.parse(query.date).checkIn),
        checkOut: new Date(JSON.parse(query.date).checkOut)
      };
    if (query.guestCount) this.guestData = JSON.parse(query.guestCount);
    this.getHotel(this.hotelId);
  },

  computed: {
    ...mapGetters("hotel", {
      hotel: GETTERS.GET_HOTEL
    })
  },

  methods: {
    ...mapActions("hotel", {
      getHotel: ACTIONS.GET_HOTEL
    }),
    handleSelectRoom(room) {
      const payload = {
        hotelId: this.hotelId,
        dateData: JSON.stringify(this.dateData),
        guestData: JSON.stringify(this.guestData),
        room: JSON.stringify(room)
      };
      this.$router.push({
        path: `/checkout/${room.roomId}`,
        query: payload
      });
    }
  }
};
</script>
