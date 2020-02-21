<template>
  <div :class="{ 'is-active': isActive }">
    <mobile-nav @click="selectAccordion($event)" v-if="typeAccordion">
      <div>
        <i :class="'fa fa-' + icon" class="text-base mr-2" v-show="icon" />
        {{ name }}
      </div>
      <i class="fa fa-chevron-right text-base ml-2" />
    </mobile-nav>
    <div
      class="text-white md:block"
      :class="{ hidden: !this.$parent.isExpanded }"
      v-show="isActive"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import styled from "vue-styled-components";

const MobileNav = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 0.8rem 0.67rem;
  cursor: pointer;
  list-style: none;
  font-size: 1.125rem;
  position: relative;
  background-color: rgba(50, 50, 50, 0.8);
  transition: opacity 0.5s;
  &:first-child {
    border-radius: 0.3rem 0.3rem 0 0;
  }
  &:last-child {
    border-radius: 0 0 0.3rem 0.3rem;
  }
`;

export default {
  name: "tab",
  components: {
    "mobile-nav": MobileNav
  },
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
