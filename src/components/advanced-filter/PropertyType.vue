<template>
  <div>
    <p class="font-bold my-3">Hotel rating</p>
    <div class="border-2 lg:border-0">
      <div
        v-for="(checkbox, index) in checkboxs"
        :key="index"
        :class="
        index == checkboxs.length - 1
          ? 'px-4 py-2 lg:p-0'
          : 'border-b-2 px-4 py-2 lg:p-0 lg:border-0'
      "
      >
        <Checkbox :data="checkbox" v-model="checkboxValue" />
      </div>
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
          label: "Hotels",
          checked: true,
          value: 1
        },
        {
          label: "Apartments",
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
