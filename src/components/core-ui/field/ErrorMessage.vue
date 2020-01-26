<template>
  <div class="relative pt-5">
    <styled-triangle />
    <styled-content><slot /></styled-content>
  </div>
</template>

<script>
import styled from "vue-styled-components";
const StyledContent = styled.span`
  background-color: #fcebcd;
  border: 0.5px solid hsla(0, 0%, 59%, 0);
  font-size: 14px;
  color: #323232;
  padding: 10px 13px;
`;
const StyledTriangle = styled.span`
  border-bottom: 11px solid rgb(252, 235, 205);
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  position: absolute;
  top: 3px;
  left: 20px;
  margin-left: -11px;
`;

export default {
  name: "ErrorMessage",
  components: {
    "styled-content": StyledContent,
    "styled-triangle": StyledTriangle
  }
};
</script>
