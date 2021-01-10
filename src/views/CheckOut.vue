<template>
  <div :id="'checkout' + hotelId" style="background-color: #f4f5f6">
    <div class="relative w-full max-w-7xl mx-auto">
      <button type="button" class="py-4 focus:outline-none">
        <i class="fa fa-chevron-left mr-2" />
        Change your selection
      </button>

      <div class="lg:flex">
        <div class="w-full lg:w-7/10 p-0 lg:mr-12">
          <h1 class="pt-10 mb-8 text-3xl font-bold">
            Let's review your booking and pay
          </h1>
          <PersonalForm v-model="user" />
          <button @click="handleBooking">TEST</button>
        </div>
        <!-- Summary -->
        <div class="w-full lg:w-3/10">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fecha from "fecha";
const CheckoutSummary = () =>
  import("@/components/checkout-form/CheckoutSummary");
const PersonalForm = () => import("@/components/checkout-form/PersonalForm");

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/hotel/const";

export default {
  name: "CheckOut",
  components: {
    CheckoutSummary,
    PersonalForm
  },
  data() {
    return {
      hotelId: "",
      dateData: {
        checkIn: new Date(),
        checkOut: new Date(new Date().valueOf() + 1000 * 3600 * 24)
      },
      guestData: {
        adults: 2,
        children: 0,
        infants: 0
      },
      room: {},
      user: {
        title: "Mr",
        firstName: "",
        lastName: "",
        address: "",
        phone: ""
      }
    };
  },
  created() {
    // const params = this.$route.params;
    const query = this.$route.query;
    this.hotelId = query.hotelId;
    if (query.dateData && query.dateData.length)
      this.dateData = {
        checkIn: new Date(JSON.parse(query.dateData).checkIn),
        checkOut: new Date(JSON.parse(query.dateData).checkOut)
      };
    if (query.guestData) this.guestData = JSON.parse(query.guestData);
    query.room ? (this.room = JSON.parse(query.room)) : this.$router.go(-1);

    this.getBookingDetail({
      hotelId: this.hotelId,
      dateFrom: fecha.format(this.dateData.checkIn, "YYYY-MM-DD"),
      dateTo: fecha.format(this.dateData.checkOut, "YYYY-MM-DD"),
      guestCount:
        this.guestData.adults +
        this.guestData.infants +
        this.guestData.children,
      room: this.room
    });
  },

  computed: {
    ...mapGetters("hotel", {
      bookingDetail: GETTERS.GET_BOOKING_DETAIL
    })
  },
  methods: {
    ...mapActions("hotel", {
      getBookingDetail: ACTIONS.GET_BOOKING_DETAIL,
      booking: ACTIONS.BOOKING
    }),

    handleBooking() {
      const payload = {
        hotelId: this.hotelId,
        dateFrom: fecha.format(this.dateData.checkIn, "YYYY-MM-DD"),
        dateTo: fecha.format(this.dateData.checkOut, "YYYY-MM-DD"),
        guestCount:
          this.guestData.adults +
          this.guestData.infants +
          this.guestData.children,
        selectedRoom: {
          id: this.room.roomId,
          name: this.room.name,
          price: this.room.price,
          capacity: this.room.capacity
        },
        roomCount: this.bookingDetail.roomCount
      };
      this.booking(payload);
    }
  }
};
</script>
