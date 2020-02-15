<template>
  <div :id="id" v-click-outside="{ handler: 'onBlurInput' }">
    <Input
      :id="id"
      :label="label"
      :showLabel="isExpanded"
      :placeholder="placeholder"
      type="text"
      :value="value"
      @focus="onFocusInput($event)"
      icon="calendar"
    />
    <DatePicker />
  </div>
</template>

<script>
import Input from "@/components/core-ui/field/Input";
import DatePicker from "@/components/core-ui/datepicker/DatePicker";

export default {
  name: "DateInput",
  components: {
    Input,
    DatePicker
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {},
    errors: {
      type: Array
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueTest: 2,
      isFocusedInput: false
    };
  },
  methods: {
    onFocusInput() {
      this.isFocusedInput = true;
    },
    onBlurInput() {
      this.isFocusedInput = false;
    }
  }
};
</script>
