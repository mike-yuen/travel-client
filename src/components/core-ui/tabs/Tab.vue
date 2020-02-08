<template>
  <div :class="{ 'is-active': isActive }">
    <a
      class="rs-tabs__tab__accordion-title"
      @click="selectAccordion($event)"
      v-show="typeAccordion"
    >
      <span
        :class="[
          'rs-tabs__navigation__icon',
          `rs-tabs__navigation__icon--${icon}`
        ]"
        v-show="icon"
      ></span>
      {{ name }}
    </a>
    <div class="text-white" v-show="isActive">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: {
    name: { required: true },
    selected: { default: false },
    icon: { default: false }
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    href() {
      return `#${this.name.toLowerCase().replace(/ /g, "_")}`;
    },
    typeAccordion() {
      return this.$parent.currentType === "accordion";
    }
  },
  mounted() {
    this.isActive = this.selected;
  },
  methods: {
    selectAccordion($event) {
      this.$parent.onSelect(this.index, $event);
    }
  }
};
</script>

<style lang="scss"></style>
