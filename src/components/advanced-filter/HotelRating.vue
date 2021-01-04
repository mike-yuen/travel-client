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
        <Radio :data="rate" v-model="dataValue" />
      </div>
    </div>
  </div>
</template>

<script>
const Radio = () => import("@/components/core-ui/checkbox/Radio");

export default {
  name: "HotelRating",
  components: {
    Radio
  },
  props: {
    value: Number
  },
  data() {
    return {
      rates: [
        {
          label: "5 out of 5 rating",
          checked: false,
          value: 5
        },
        {
          label: "4 out of 5 rating & up",
          checked: false,
          value: 4
        },
        {
          label: "3 out of 5 rating & up",
          checked: false,
          value: 3
        },
        {
          label: "All ratings",
          checked: true,
          value: 0
        }
      ]
    };
  },
  computed: {
    dataValue: {
      get() {
        return this.value || 0;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
