<template>
  <div class="loader bg-white absolute h-full w-full">
    <div
      class="absolute left-0 right-0 top-0 bottom-0 m-auto z-100 text-center"
      style="height: 1.5rem; width: 3rem"
    >
      <styled-bounce
        class="animation-three-bounce animation-1.4s animation-delay-.32s"
      ></styled-bounce>
      <styled-bounce
        class="animation-three-bounce animation-1.4s animation-delay-.16s"
      ></styled-bounce>
      <styled-bounce
        class="animation-three-bounce animation-1.4s animation-delay-0s"
      ></styled-bounce>
    </div>
  </div>
</template>

<script>
import styled from "vue-styled-components";
const StyledBounce = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background-color: #767676;
  border-radius: 100%;
  display: inline-block;
  margin: 2px;
`;

export default {
  name: "Loader",
  components: {
    "styled-bounce": StyledBounce
  }
};
</script>
