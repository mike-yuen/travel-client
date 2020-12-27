<template>
  <div class="typing-indicator">
    <div class="typing-indicator__dot"></div>
    <div class="typing-indicator__dot"></div>
    <div class="typing-indicator__dot"></div>
  </div>
</template>

<script>
export default {
  name: "TypingIndicator"
};
</script>

<style lang="scss" scoped>
.typing-indicator {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 17px;
  padding: 10px;
  &__dot {
    display: inline-block;
    height: 4px;
    width: 4px;
    margin-right: 2px;
    border-radius: 2px;
    animation: typingAnimation 1.5s infinite ease-in-out;
    background-color: #8d949e;
    &:first-child {
      animation-delay: 200ms;
    }
    &:nth-child(2) {
      animation-delay: 300ms;
    }
    &:last-child {
      animation-delay: 400ms;
    }
  }
}
@keyframes typingAnimation {
  0% {
    transform: translateY(0px);
  }
  28% {
    transform: translateY(-5px);
  }
  44% {
    transform: translateY(0px);
  }
}
</style>
