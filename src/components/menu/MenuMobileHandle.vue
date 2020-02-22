<template>
  <div
    class="text-base text-gray-0 cursor-pointer"
    :isActive="isActive"
    @click="toggle"
  >
    <i class="faf fa-bars  mr-1" />
    <span>Menu</span>
  </div>
</template>

<script>
export default {
  name: "MenuMobileHandle",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    }
  }
};
</script>
