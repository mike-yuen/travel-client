<template>
  <div class="relative">
    <div class="flex justify-between">
      <label class="text-sm" :for="id">
        {{ label }}
      </label>
      <a
        v-if="action && action.name"
        class="text-sm text-red-0"
        href="#"
        @click="action.onClick()"
      >
        {{ action.name }}
      </a>
    </div>
    <styled-input
      :id="id"
      :name="id"
      :type="type"
      class="w-full text-xl rounded-0"
      autocomplete="off"
      v-model="dataValue"
      :errors="errors"
    />
  </div>
</template>

<script>
import styled from "vue-styled-components";
const inputProps = { errors: Array };
const StyledInput = styled("input", inputProps)`
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
  ${props =>
    props.errors &&
    props.errors.length > 0 &&
    `border-color: #ed710b!important;
    box-shadow: none!important;`}
`;

export default {
  name: "Input",
  components: {
    "styled-input": StyledInput
  },
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    value: {},
    errors: {
      type: Array
    },
    action: {
      type: Object
    }
  },
  computed: {
    dataValue: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
