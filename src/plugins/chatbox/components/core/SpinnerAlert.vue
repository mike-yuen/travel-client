<template>
  <div class="spinner-alert" :style="[styleSize, stylePosition]">
    <div class="spinner-alert__core"></div>
    <div class="spinner-alert__outer"></div>
  </div>
</template>

<script>
export default {
  name: "SpinnerAlert",
  props: {
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: "#e0557d"
    },
    position: {
      type: Object,
      default: () => {
        return { top: "-20px", right: "-20px" };
      }
    }
  },
  data() {
    return {
      styleSize: {
        width: this.size + "px",
        height: this.size + "px"
      },
      stylePosition: {
        top: this.position.top || null,
        right: this.position.right || null,
        bottom: this.position.bottom || null,
        left: this.position.left || null
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.spinner-alert {
  position: absolute;
  z-index: 2;
  &__core {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgb(33, 150, 243);
    border-radius: 100%;
    animation: 1.6s ease-in-out 0s infinite normal none running zoomSpinner;

    @keyframes zoomSpinner {
      0% {
        transform: scale(0);
      }
      60%,
      100% {
        transform: scale(0.8);
        opacity: 0;
      }
    }
  }
  &__outer {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 13px;
    left: 13px;
    background-color: rgb(33, 150, 243);
    border-radius: 100%;
    animation: 1.6s ease-in-out 0s infinite normal none running zoomOuter;

    @keyframes zoomOuter {
      0%,
      100% {
        transform: scale(0.5);
      }
      50% {
        transform: scale(0.8);
      }
    }
  }
}
</style>
