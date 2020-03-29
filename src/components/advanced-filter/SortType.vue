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
    <div class="w-1/3 mr-2 justify-end flex">
      <label
        :for="radio.value"
        class="border-2 border-blue-200 hover:border-gray-300 bg-transparent hover:bg-gray-300 self-center py-3 px-4 cursor-pointer"
        :class="{ 'border-gray-300 bg-gray-300': radioSort == radio.value }"
        v-for="(radio, index) in optionsRadio"
        :key="index"
      >
        {{ radio.label }}
        <input
          type="radio"
          class="hidden"
          :value="radio.value"
          :id="radio.value"
          name="radio_sort"
          v-model="radioSort"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "SortType",

  data() {
    return {
      selectSort: "",
      radioSort: ""
    };
  },

  props: {
    optionsSelect: {
      Type: Object
    },
    optionsRadio: {
      Type: Object
    }
  },

  methods: {
    clickSelectSort() {
      this.valueBack(this.selectSort, this.radioSort);
    },

    valueBack(...value) {
      this.$emit("sortValue", ...value);
    }
  }
};
</script>
