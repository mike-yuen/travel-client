<template>
  <div>
    <p class="font-bold my-3">TripAdvisor rating</p>
    <div class="border-2 lg:border-0">
      <div
        v-for="(rate, index) in rates"
        :key="index"
        class="px-4 py-2 lg:p-0"
        :class="{
          'border-b-2 px-4 py-2 lg:p-0 lg:border-0': !(
            index ==
            rates.length - 1
          )
        }"
      >
        <Radio :data="rate" v-model="value" />
      </div>
    </div>
  </div>
</template>

<script>
const Radio = () => import("@/components/core-ui/checkbox/Radio");

export default {
  name: "TripAdvisorRating",
  data() {
    return {
      value: 4,
      rates: [
        {
          label: "Excellent 5.0",
          checked: false,
          value: 1
        },
        {
          label: "Very good 4.0 & up",
          checked: false,
          value: 2
        },
        {
          label: "Average 3.0 & up",
          checked: false,
          value: 3
        },
        {
          label: "All ratings",
          checked: true,
          value: 4
        }
      ]
    };
  },
  components: {
    Radio
  }
};
</script>
