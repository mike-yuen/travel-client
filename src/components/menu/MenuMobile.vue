<template>
  <div>
    <div v-if="isEnabled" class="nav-drawer">
      <transition name="cover">
        <cover v-if="isOpen" @click="close" />
      </transition>
      <transition name="nav-drawer-menu">
        <drawer :isOpen="isOpen">
          <slot />
          <div
            v-if="!disableCloseButton && isOpen"
            style="z-index: 1001"
            class="flex fixed bg-white text-2xl overflow-hidden top-0 left-100 px-2 py-1"
            @keyup.13="close"
            @click="close"
          >
            <i class="fa fa-times" />
          </div>
        </drawer>
      </transition>
    </div>
    <div v-else class="nav-drawer--disabled">
      <slot />
    </div>
  </div>
</template>

<script>
import styled from "vue-styled-components";
const Cover = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.75);
  left: 0;
  width: 100%;
  height: 100vh;
`;
const drawerProps = { isOpen: Boolean };
const Drawer = styled("div", drawerProps)`
  position: fixed;
  top: 0;
  right: auto;
  left: 0;
  width: 80vw;
  height: 100%;
  z-index: 1001;
  overflow: visible;
  transition: transform 0.3s ease-out 0s;
  transform: translateX(-100vw);
  ${(props) => props.isOpen && `transform: translateX(0);`}
`;
const queryMatch = (mediaQuery) => {
  return window.matchMedia(mediaQuery).matches;
};

export default {
  name: "MenuMobile",
  components: {
    cover: Cover,
    drawer: Drawer
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    disableCloseButton: {
      type: Boolean,
      default: false
    },
    mediaQuery: {
      type: String,
      default: "(max-width: 768px)"
    }
  },
  data() {
    return {
      isEnabled: false
    };
  },
  computed: {
    isOpen() {
      return this.isActive;
    }
  },
  created() {
    this.checkQueryMatch();
    window.addEventListener("resize", this.checkQueryMatch);
  },
  beforeDestory() {
    window.removeEventListener("resize", this.checkQueryMatch);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    checkQueryMatch() {
      this.isEnabled = queryMatch(this.mediaQuery);
    }
  }
};
</script>

<style lang="scss">
.cover-enter-active,
.cover-leave-active {
  transition: opacity 0.5s;
}
.cover-enter,
.cover-leave-to {
  opacity: 0;
}
</style>
