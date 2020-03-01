<template>
  <div>
    <!-- <div v-for="(checkbox, index) in checkboxs" :key="index">
      <Checkbox  :checkbox="checkbox" v-model="checkboxValue" />
      {{ checkboxValue }}
    </div> -->
    <!-- <Checkbox /> -->

    <div v-for="(rate, index) in rates" :key="index">
      <Radio :rate="rate" v-model="value" />
      {{ value }}
    </div>

    <!-- <Radio /> -->
  </div>
</template>

<script>
// import Checkbox from "@/components/core-ui/checkbox/Checkbox";
import Radio from "@/components/core-ui/checkbox/Radio";

export default {
  name: "HotelRating",
  data() {
    return {
      checkboxValue: [],
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
        }
      ],
      checkboxs: [
        {
          label: "checkbox 1",
          checked: true,
          value: 1
        },
        {
          label: "checkbox 2",
          checked: false,
          value: 2
        }
      ]
    };
  },
  components: {
    // Checkbox,
    Radio
  }
};
</script>
