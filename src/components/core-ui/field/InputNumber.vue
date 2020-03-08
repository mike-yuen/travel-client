<template>
  <div class="relative pt-4">
    <label
      class="text-gray-0 text-base pb-1"
      for="number-picker-input-16wai50gn6z"
    >
      {{ label }}
    </label>
    <styled-input
      :id="'number-picker-input-' + id"
      type="number"
      class="w-full text-lg rounded-0 text-center cursor-pointer"
      v-model="dataValue"
    />
    <minus-icon
      @click="decreaseValue()"
      :class="{ 'opacity-25': disabledMinus }"
    >
      <icon
        class="fa fa-minus flex items-center justify-center text-gray-0 font-bold"
      />
    </minus-icon>
    <plus-icon @click="increaseValue()" :class="{ 'opacity-25': disabledPlus }">
      <icon
        class="fa fa-plus flex items-center justify-center text-gray-0 font-bold"
      />
    </plus-icon>
  </div>
</template>

<script>
import styled from "vue-styled-components";
const StyledInput = styled.input`
  height: 48px;
  color: #323232;
  line-height: 25.5px;
  padding: 10.5px 14px 12px;
  border: 2px solid #dadada;
  &:focus {
    outline: none;
    border-color: #90e2df;
    box-shadow: inset 0 0 0 1px #8de2e0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;
const MinusIcon = styled.div`
  position: absolute;
  bottom: 8px;
  left: 10px;
  cursor: pointer;
`;
const PlusIcon = styled.div`
  position: absolute;
  bottom: 8px;
  right: 10px;
  cursor: pointer;
`;
const Icon = styled.i`
  width: 30px;
  height: 30px;
`;

export default {
  name: "InputNumber",
  components: {
    "styled-input": StyledInput,
    "minus-icon": MinusIcon,
    "plus-icon": PlusIcon,
    "icon": Icon
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    value: {}
  },
  data() {
    return {
      // disabledMinus: Boolean,
      // disabledPlus: Boolean
    };
  },
  computed: {
    dataValue: {
      get() {
        return this.$props.value;
      },
      set(val) {
        const value = parseInt(val);
        this.$emit("input", value);
        this.$nextTick(() => {
          !this.checkMinValue(value)
            ? this.$emit("input", this.$props.min)
            : !this.checkMaxValue(value)
            ? this.$emit("input", this.$props.max)
            : value;
        });
      }
    },
    disabledMinus() {
      return this.dataValue === this.$props.min;
    },
    disabledPlus() {
      return this.dataValue === this.$props.max;
    }
  },
  methods: {
    checkMinValue(value) {
      return value >= this.$props.min;
    },
    checkMaxValue(value) {
      return value <= this.$props.max;
    },
    decreaseValue() {
      if (this.checkMinValue(this.dataValue + 1)) this.dataValue -= 1;
    },
    increaseValue() {
      if (this.checkMaxValue(this.dataValue - 1)) this.dataValue += 1;
    }
    // input(val) {
    //   console.log("aaaaaaaaaaaaaaaaaaaa", val);
    //   if (!this.checkMinValue(val) || !this.checkMaxValue(val)) {
    //     console.log("false min", !this.checkMinValue(val));
    //     console.log("false max", !this.checkMaxValue(val));
    //     return;
    //   }
    // }
  }
};
</script>
