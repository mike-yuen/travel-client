<template>
  <styled-button
    :type="type"
    :class="className"
    :aria-lable="type"
    @click="$emit('onClick')"
  >
    <slot></slot>
  </styled-button>
</template>

<script>
import styled from "vue-styled-components";
const StyledButton = styled.button`
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 1.5px;
  color: #fff;
  height: 48px;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:focus {
    outline: none;
  }
`;

export default {
  name: "Button",
  props: {
    type: String,
    className: {
      type: String,
      default: "w-full bg-red-0"
    }
  },
  components: {
    "styled-button": StyledButton
  }
};
</script>
