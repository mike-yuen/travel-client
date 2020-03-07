<template>
  <div>
    <div v-for="(checkbox, index) in checkboxs" :key="index">
      <Checkbox :data="checkbox" v-model="checkboxValue" />
      <!-- {{ checkboxValue }} -->
    </div>
  </div>
</template>

<script>
import Checkbox from "@/components/core-ui/checkbox/Checkbox";

export default {
  name: "HotelRating",
  data() {
    return {
      checkboxValue: [],
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
    Checkbox
  }
};
</script>
