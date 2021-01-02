<template>
  <div class="flex" v-on="clickSelectSort()">
    <div class="w-2/3 text-left ml-2">
      <select
        class="border-2 pl-2 pr-8 py-3 rounded-md outline-none appearance-none bg-transparent border-blue-200 bg-right bg-no-repeat"
        style="background-image: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png); background-position-x: 130px"
        v-model="selectSort"
      >
        <option disabled value="">Please select one</option>
        <option
          v-for="(option, index) in optionsSelect"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortType",

  data() {
    return {
      selectSort: ""
    };
  },

  props: {
    optionsSelect: {
      Type: Object
    }
  },

  methods: {
    clickSelectSort() {
      this.valueBack(this.selectSort);
    },

    valueBack(...value) {
      this.$emit("sortValue", ...value);
    }
  }
};
</script>
