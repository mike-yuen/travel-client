<template>
  <div class="rs-tabs__container" style="height: 13rem">
    <nav class="rs-tabs__navigation" v-show="typeTabs">
      <ul class="rs-tabs__navigation__list flex m-0 p-0">
        <li
          v-for="(tab, index) in tabs"
          class="flex-grow text-center"
          :index="index"
          :key="index"
        >
          <a
            @click="onSelect(index, $event)"
            :class="{ 'border-red-0 opacity-100 font-bold': tab.isActive }"
            class="
              block relative text-white bg-gray-0 opacity-75 p-4 pt-3 text-lg border-t-4 border-transparent cursor-pointer
              hover:border-red-0 hover:opacity-100 hover:font-bold 
            "
          >
            <span
              :class="[
                'rs-tabs__navigation__icon',
                `rs-tabs__navigation__icon--${tab.icon}`
              ]"
              v-show="tab.icon"
            ></span>
            {{ tab.name }}
          </a>
        </li>
      </ul>
    </nav>
    <div
      class="relative bg-gray-0 px-3 pt-6 overflow-hidden border-b-8 border-transparent h-9.5"
      :class="{ 'overflow-visible expanded': isExpanded }"
      @click="$emit('onExpandTabs')"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import throttle from "lodash.throttle";
// import styled from "vue-styled-components";

export default {
  name: "tabs",
  props: {
    name: { default: false },
    responsive: { default: true, type: Boolean },
    type: { default: "tabs", type: String },
    breakpoint: { default: 768, type: [String, Number] },
    collapsible: { default: false },
    keepOpen: { default: false },
    isExpanded: { default: false }
  },
  data() {
    return {
      tabs: [],
      currentType: this.type
    };
  },
  computed: {
    typeTabs() {
      return this.currentType === "tabs";
    },
    isResponsive() {
      return !!this.responsive;
    }
  },
  watch: {
    breakpoint() {
      this.checkType();
    }
  },
  created() {
    this.tabs = this.$children;
  },
  mounted() {
    if (this.isResponsive) {
      this.currentType = this.findType();

      this.resizeListener = throttle(this.checkType.bind(this), 200);
      window.addEventListener("resize", this.resizeListener);
    }

    this.updateTabIndexes();
    // this.$tabs.bus.$on("open", this.onApiOpen);
    // this.$tabs.bus.$on("switchType", this.onApiSwitchType);
  },
  beforeDestroy() {
    if (this.isResponsive) {
      window.removeEventListener("resize", this.resizeListener);
    }
  },
  methods: {
    onSelect(selectedIndex) {
      if (this.tabs[selectedIndex] === "undefined") {
        return;
      }

      const selectedTab = this.tabs[selectedIndex];

      if (
        (this.currentType === "tabs" && selectedTab.isActive) ||
        (this.currentType === "accordion" &&
          selectedTab.isActive &&
          !this.collapsible)
      ) {
        return;
      }

      this.emitBeforeChange(selectedTab, selectedIndex);
      this.change(selectedTab);
      this.emitAfterChange(selectedTab, selectedIndex);
    },
    emitBeforeChange(tab, index) {
      this.$emit("beforeChange", this, tab, index);
      //   this.$tabs.bus.$emit("beforeChange", this, tab, index);
    },
    emitAfterChange(tab, index) {
      this.$emit("afterChange", this, tab, index);
      //   this.$tabs.bus.$emit("afterChange", this, tab, index);
    },
    emitTypeChange(typeFrom, typeTo) {
      this.$emit("typeChange", this, typeFrom, typeTo);
      //   this.$tabs.bus.$emit("typeChange", this, typeFrom, typeTo);
    },
    change(toTab) {
      if (this.currentType === "tabs") {
        this.tabs.forEach(tab => {
          tab.isActive = tab.href == toTab.href;
        });
      } else if (this.currentType === "accordion") {
        if (toTab.isActive && this.collapsible) {
          toTab.isActive = false;
        } else if (this.keepOpen) {
          toTab.isActive = true;
        } else {
          this.tabs.forEach(tab => {
            tab.isActive = tab.href == toTab.href;
          });
        }
      }
    },
    checkType() {
      const oldType = this.currentType,
        newType = this.findType();

      if (oldType === newType) {
        return;
      }

      this.typeChanged(oldType, newType);
    },
    typeChanged(oldType, newType) {
      this.currentType = newType;

      switch (newType) {
        case "tabs":
          if (this.tabs.every(tab => !tab.isActive)) {
            this.onSelect(0);
          }
          if (this.tabs.filter(tab => tab.isActive).length > 1) {
            this.change(this.tabs[0]);
          }
          break;
        case "accordion":
          break;
        default:
          break;
      }

      this.emitTypeChange(oldType, newType);
    },
    findType() {
      return window.innerWidth > parseInt(this.breakpoint)
        ? "tabs"
        : "accordion";
    },
    updateTabIndexes() {
      this.tabs.forEach((tab, index) => (tab.index = index));
    },
    onApiOpen(componentName, index) {
      if (this.name !== componentName) {
        return;
      }

      this.onSelect(index);
    },
    onApiSwitchType(componentName, newType) {
      if (this.name !== componentName || this.currentType === newType) {
        return;
      }

      this.typeChanged(this.type, newType);
    }
  }
};
</script>

<style lang="scss" scoped>
.rs-tabs__container {
  &--tabs {
    .rs-tabs__tab__accordion-title {
      display: none;
    }
  }

  /* &--accordion {
    .rs-tabs__navigation {
      display: none;
    }
  } */
}
.h-9\.5 {
  max-height: 9.5rem;
  min-height: 9.5rem;
}
.expanded {
  max-height: 65rem;
  transition: max-height 0.45s 0.05s;
  padding-top: 1.5rem;
}
</style>
