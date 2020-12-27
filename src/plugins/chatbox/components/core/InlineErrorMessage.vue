<template>
  <div class="inlineerror">
    <slot />
  </div>
</template>

<script>
export default {
  name: "InlineErrorMessage"
};
</script>

<style lang="scss" scoped>
.inlineerror {
  width: 100%;
  text-align: center;
  color: #f00;
  font-weight: 600;
}
</style>
