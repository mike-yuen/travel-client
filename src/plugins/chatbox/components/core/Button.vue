<template>
  <a role="button" class="button" v-on:click="$emit('onClick')">
    <slot />
  </a>
</template>

<script>
export default {
  name: "Button"
};
</script>

<style lang="scss" scoped>
.button {
  padding: 5px 20px;
  color: #e0557d;
  cursor: pointer;
}
</style>
