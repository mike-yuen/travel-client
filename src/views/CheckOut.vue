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
const CheckoutSummary = () =>
  import("@/components/checkout-form/CheckoutSummary");
const PersonalForm = () => import("@/components/checkout-form/PersonalForm");

export default {
  name: "CheckOut",
  components: {
    CheckoutSummary,
    PersonalForm
  },
  data() {
    return {
      hotelId: "",
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
    const params = this.$route.params;
    this.hotelId = params.hotelId;
    // then fetch api...
  }
};
</script>
