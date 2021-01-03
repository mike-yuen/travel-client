<template>
  <div class="relative w-full">
    <div class="flex justify-between" v-if="label">
      <label class="block text-base pb-1" :for="id" v-show="showLabel">
        <slot name="label">{{ label }}</slot>
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
    <styled-select
      :id="id"
      :name="id"
      :ref="id"
      :placeholder="placeholder"
      class="w-full text-lg rounded-0 placeholder-gray-600"
      autocomplete="off"
      v-model="dataValue"
      :errors="errors"
      v-if="useAs === 'select'"
    >
      <option
        v-for="(option, index) in selectOptions"
        :key="`option-${index}`"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </styled-select>
    <styled-textarea
      :id="id"
      :name="id"
      :ref="id"
      :placeholder="placeholder"
      :rows="5"
      class="w-full text-lg rounded-0 placeholder-gray-600"
      autocomplete="off"
      v-model="dataValue"
      :errors="errors"
      :useAs="useAs"
      v-if="useAs === 'textarea'"
    >
    </styled-textarea>
    <styled-input
      :id="id"
      :name="id"
      :ref="id"
      :type="type"
      :placeholder="placeholder"
      class="w-full text-lg rounded-0 placeholder-gray-600"
      autocomplete="off"
      v-model="dataValue"
      :errors="errors"
      @click="$emit('click', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      @change="$emit('change', $event.target.value)"
      @keyup="$emit('keyup', $event.target.value)"
      @keydown="onKeyDown($event)"
      @keypress="onKeyPress($event)"
      @keyup.enter.stop.prevent="$emit('enter')"
      :readonly="readonly"
      v-if="useAs === 'input'"
    />
    <styled-icon
      :class="'fa fa-' + icon.code"
      v-if="icon.code"
      v-show="icon.isShown"
      @click="actionOnIcon"
    />
  </div>
</template>

<script>
import styled from "vue-styled-components";
const inputProps = { errors: Array, useAs: String };
const StyledInput = styled("input", inputProps)`
  ${(props) => (props.useAs === "textarea" ? `height: auto;` : `height: 48px;`)}
  color: #323232;
  line-height: 25.5px;
  padding: 10.5px 14px 12px;
  border: 2px solid #dadada;
  &:focus {
    outline: none;
    border-color: #90e2df;
    box-shadow: inset 0 0 0 1px #8de2e0;
  }
  ${(props) =>
    props.errors &&
    props.errors.length > 0 &&
    `border-color: #ed710b!important;
    box-shadow: none!important;`}
`;

const StyledSelect = StyledInput.withComponent("select");
const StyledTextarea = StyledInput.withComponent("textarea");

const StyledIcon = styled.i`
  position: absolute;
  right: 20px;
  color: #323232;
  font-weight: bold !important;
  margin-top: 16px;
  cursor: pointer;
  &:hover {
    color: #8de2e0;
  }
`;

export default {
  name: "Input",
  components: {
    "styled-input": StyledInput,
    "styled-select": StyledSelect,
    "styled-textarea": StyledTextarea,
    "styled-icon": StyledIcon
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
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    value: {},
    errors: { type: Array },
    action: { type: Object },
    disableKeyPress: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default() {
        return {
          code: String,
          isShown: Boolean
        };
      }
    },
    readonly: { type: Boolean, default: false },
    useAs: { type: String, default: "input" },
    selectOptions: {
      type: Array,
      default: () => []
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
  },
  methods: {
    onKeyDown(e) {
      this.$emit("keydown", e.target.value);
    },
    onKeyPress(e) {
      this.$emit("keypress", e.target.value);
    },
    async actionOnIcon() {
      await this.$emit("actionOnIcon");
      this.$refs[this.$props.id].$el.focus();
    }
  }
};
</script>
