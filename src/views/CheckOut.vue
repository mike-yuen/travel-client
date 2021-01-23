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
          <PersonalForm v-model="user" @submit="handleBooking" />
          <Stripe />
        </div>
        <!-- Summary -->
        <div class="w-full lg:w-3/10">
          <CheckoutSummary :bookingData="bookingDetail" />
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
const Stripe = () => import("@/components/checkout-form/Stripe");

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/hotel/const";
import {
  GETTERS as GETTERS_USER,
  MUTATORS as MUTATORS_USER
} from "@/store/modules/user/const";

export default {
  name: "CheckOut",
  components: {
    CheckoutSummary,
    PersonalForm,
    Stripe
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
        name: "",
        email: "",
        phone: ""
      }
    };
  },
  async created() {
    // @handle get booking detail
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

  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === `user/${MUTATORS_USER.SET_CURRENT_USER}`) {
        this.setUser();
      }
    });
    this.$nextTick(() => {
      this.setUser();
    });
  },

  computed: {
    ...mapGetters("hotel", {
      bookingDetail: GETTERS.GET_BOOKING_DETAIL,
      payment: GETTERS.GET_PAYMENT
    }),
    ...mapGetters("user", {
      currentUser: GETTERS_USER.GET_CURRENT_USER
    })
  },
  methods: {
    ...mapActions("hotel", {
      getBookingDetail: ACTIONS.GET_BOOKING_DETAIL,
      booking: ACTIONS.BOOKING
    }),

    setUser() {
      this.user.title = this.currentUser.male ? "Mr." : "Mrs.";
      this.user.name = this.currentUser.displayName || "";
      this.user.email = this.currentUser.email || "";
      this.user.phone = this.currentUser.phone || "";
    },

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
