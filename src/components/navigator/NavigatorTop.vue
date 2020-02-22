<template>
  <header id="header" class="h-auto bg-white relative" role="banner">
    <div class="max-w-5lg mx-auto">
      <div class="md:hidden">
        <SubNavigator mobile />
      </div>
      <!-- Main NavigatorTop -->
      <div class="flex items-center relative h-16">
        <div class="w-1/2 md:w-1/5 px-3">
          <div class="flex items-center">
            <router-link to="/" class="block">
              <img
                alt="Travel"
                src="@/assets/svg/logo-desktop.svg"
                class="w-32 md:w-40 mr-5"
              />
            </router-link>
          </div>
        </div>
        <div class="hidden md:flex w-full md:w-1/2">
          <SubNavigator />
        </div>

        <div
          class="flex flex-grow items-center justify-end md:w-1/4 h-full lg:px-3 overflow-hidden md:overflow-visible"
        >
          <a
            class="hidden md:flex items-center ml-4 mr-1 opacity-75 border border-gray-0 rounded-full hover:text-red-0 hover:opacity-100 hover:border-red-0"
            href="https://github.com/minhnguyen1505"
            target="_blank"
          >
            <i
              class="faf fa-github-alt flex items-center justify-center w-6 h-6 "
            ></i>
          </a>

          <div class="md:hidden flex items-center">
            <MenuMobileHandle @toggle="toggle()" />
            <MenuMobile :isActive="isActive" @close="close()"
              >MenuList</MenuMobile
            >
          </div>
          <LoginRibbon />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SubNavigator from "./SubNavigator";
import LoginRibbon from "./LoginRibbon";
import MenuMobileHandle from "../menu/MenuMobileHandle";
import MenuMobile from "../menu/MenuMobile";

export default {
  name: "NavigatorTop",
  components: {
    SubNavigator,
    LoginRibbon,
    MenuMobileHandle,
    MenuMobile
  },
  data() {
    return {
      isActive: false,
      top: 0
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.update();
    },
    close() {
      this.isActive = false;
      this.update();
    },
    update() {
      if (this.isActive) {
        this.top = window.pageYOffset;
        // document.documentElement.setAttribute("drawer-active", "");
        document.body.style.top = -this.top + "px";
      } else {
        // document.documentElement.removeAttribute("drawer-active");
        window.scrollTo(0, this.top);
        document.body.style.top = 0;
      }
    }
  }
};
</script>
