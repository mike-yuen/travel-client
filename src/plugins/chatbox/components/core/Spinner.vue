<template>
  <div id="spinner">
    <span
      class="spinner"
      aria-busy="true"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuetext="Loading..."
      :style="{
        'background-image':
          'url(' + require('../../assets/images/spinner.png') + ')'
      }"
    ></span>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: "#e0557d"
    }
  }
};
</script>

<style lang="scss" scoped>
#spinner {
  text-align: center;
  padding-bottom: 15px;
  .spinner {
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    width: 24px;
    animation: rotateSpinner 1.2s steps(20, end) infinite;

    @keyframes rotateSpinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
