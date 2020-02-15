<template>
  <div class="relative w-full">
    <div class="flex justify-between" v-if="label">
      <label class="block text-base pb-1" :for="id" v-show="showLabel">
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
      @keypress="onKeyPress($event)"
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
    errors: {
      type: Array
    },
    action: {
      type: Object
    },
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
    onKeyPress(e) {
      if (this.$props.disableKeyPress) {
        if (e.keyCode !== 13 && e.keyCode !== 27) {
          e.preventDefault();
        } else {
          this.$emit("keypress", e.target.value);
        }
      } else {
        this.$emit("keypress", e.target.value);
      }
    },
    async actionOnIcon() {
      await this.$emit("actionOnIcon");
      this.$refs[this.$props.id].$el.focus();
    }
  }
};
</script>
