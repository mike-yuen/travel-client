<template>
  <div>
    <p class="font-bold my-3">Hotel rating</p>
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
  name: "HotelRating",
  data() {
    return {
      value: 4,
      rates: [
        {
          label: "5 out of 5 rating",
          checked: false,
          value: 1
        },
        {
          label: "4 out of 5 rating & up",
          checked: false,
          value: 2
        },
        {
          label: "3 out of 5 rating & up",
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
