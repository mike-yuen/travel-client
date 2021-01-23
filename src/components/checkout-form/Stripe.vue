<template>
  <div
    class="mb-6 bg-white rounded-md"
    style="box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;"
  >
    <div class="flex items-center justify-between py-4 px-8 border-b">
      <div class="flex items-center">
        <div
          class="w-8 h-8 border border-gray-700 rounded-full text-center mr-5"
        >
          <span class="text-lg">2</span>
        </div>
        <h3 class="text-xl font-bold m-0">
          Confirm & pay
        </h3>
      </div>
      <img
        src="https://production-qantas-hotels-cdn.qantashotels.com/static/media/mastercard.7334d299.svg"
        alt="mastercard"
        width="34"
        height="24"
      />
    </div>
    <div class="p-8">
      <h4 class="text-2xl font-semi-bold">
        Enter your credit card details.
      </h4>
      <span class="text-xl"> You'll be charged <strong>$9</strong> </span>
      <form @submit="payWithCard" class="pt-8">
        <div class="mb-8 border-b">
          <div class="mb-8">
            <div class="flex">
              <div class="w-full md:w-1/2 md:pr-4">
                <strong class="text-lg">Card number</strong>
                <div id="card-number" class="payment-input"></div>
                <span class="block mt-3 text-sm text-gray-500">
                  We currently accept Mastercard only.
                </span>
              </div>
              <div class="w-full md:w-1/4 md:pr-4">
                <strong class="text-lg">Expiry Date</strong>
                <div id="card-expiry" class="payment-input"></div>
              </div>
              <div class="w-full md:w-1/4 md:pr-4">
                <strong class="text-lg">CVV number</strong>
                <div id="card-cvc" class="payment-input"></div>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-auto font-bold bg-red-0 px-6">
          PAY NOW
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
const Button = () => import("@/components/core-ui/button/Button");
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/hotel/const";

export default {
  name: "Stripe",
  components: {
    Button
  },
  data() {
    return {
      stripe: null,
      elements: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardErrors: null
    };
  },

  async created() {
    this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_KEY);
    this.elements = this.stripe.elements();

    this.cardNumber = this.elements.create("cardNumber");
    this.cardNumber.mount("#card-number");
    this.cardNumber.addEventListener("change", this.onChange);

    this.cardExpiry = this.elements.create("cardExpiry");
    this.cardExpiry.mount("#card-expiry");
    this.cardExpiry.addEventListener("change", this.onChange);

    this.cardCvc = this.elements.create("cardCvc");
    this.cardCvc.mount("#card-cvc");
    this.cardCvc.addEventListener("change", this.onChange);
  },

  computed: {
    ...mapGetters("hotel", {
      payment: GETTERS.GET_PAYMENT
    })
  },

  methods: {
    ...mapActions("hotel", {
      confirmBooking: ACTIONS.CONFIRM_BOOKING
    }),
    onChange({ error }) {
      this.cardErrors = error ? error.message : null;
    },

    payWithCard(e) {
      e.preventDefault();
      if (this.payment.clientSecret)
        this.stripe
          .confirmCardPayment(this.payment.clientSecret, {
            payment_method: {
              card: this.cardNumber,
              billing_details: {
                name: "Minh"
              }
            }
          })
          .then((result) => {
            if (result.error) {
              this.handleConfirmBooking("", result.error.message);
            } else {
              this.handleConfirmBooking(result.paymentIntent.id);
            }
          });
    },

    handleConfirmBooking(paymentIntentID, errorMessage = "") {
      const payload = {
        bookingId: this.payment.bookingId,
        paymentId: paymentIntentID || "",
        error: errorMessage
      };
      this.confirmBooking(payload);
    }
  }
};
</script>

//
<style lang="scss">
.payment-input {
  height: auto;
  color: #323232;
  line-height: 25.5px;
  padding: 10.5px 14px 12px;
  border: 2px solid #dadada;
  &:active {
    outline: none;
    border-color: #90e2df;
    box-shadow: inset 0 0 0 1px #8de2e0;
  }
}
</style>
