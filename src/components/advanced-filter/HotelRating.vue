<template>
  <div>
    <p class="font-bold mb-3">Hotel rating</p>
    <div v-for="(rate, index) in rates" :key="index">
      <Radio :data="rate" v-model="value" />
    </div>
  </div>
</template>

<script>
import Radio from "@/components/core-ui/checkbox/Radio";

export default {
  name: "HotelRating",
  data() {
    return {
      value: null,
      rates: [
        {
          label: "1 Star",
          checked: true,
          value: 1
        },
        {
          label: "2 Star",
          checked: false,
          value: 2
        },
        {
          label: "3 Star",
          checked: false,
          value: 3
        },
        {
          label: "4 Star",
          checked: false,
          value: 4
        },
        {
          label: "5 Star",
          checked: false,
          value: 5
        }
      ]
    };
  },
  components: {
    Radio
  }
};
</script>
