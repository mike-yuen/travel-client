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
          class="flex flex-grow items-center justify-end md:w-1/4 h-full lg:px-3"
        >
          <a
            class="hidden md:flex items-center ml-4 mr-1 opacity-75 border border-gray-0 rounded-full hover:text-red-0 hover:opacity-100 hover:border-red-0"
            href="https://github.com/minhnguyen1505"
            target="_blank"
          >
            <i
              class="faf fa-github-alt flex items-center justify-center w-6 h-6 "
            />
          </a>

          <div v-if="Object.keys(currentUser).length">
            {{ currentUser.displayName }}
          </div>

          <div class="md:hidden flex items-center">
            <MenuMobileHandle @toggle="toggle()" />
            <MenuMobile :isActive="isActive" @close="close()">
              <div class="w-full h-full bg-gray-10">
                <ul class="w-full" role="menubar">
                  <li v-for="(item, index) in mock" :key="index">
                    <router-link
                      :to="{ path: item.path }"
                      class="flex items-center text-lg pl-4 h-12 bg-gray-0 text-white border-b border-white"
                      @click.native="close()"
                    >
                      {{ item.name }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </MenuMobile>
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
import { mapGetters } from "vuex";
import { GETTERS } from "@/store/modules/user/const";

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
      top: 0,
      mock: [
        { name: "Hotels", path: "/hotels" },
        { name: "Destinations", path: "/destinations" },
        { name: "Hotel Deals", path: "/hotel-deals" },
        { name: "Book", path: "/book" },
        { name: "Frequent Customer", path: "/frequent-customer" },
        { name: "Business Essentials", path: "/business-essentials" },
        { name: "Blog", path: "/blog" },
        { name: "Help", path: "/help" }
      ]
    };
  },
  computed: {
    ...mapGetters("user", {
      currentUser: GETTERS.GET_CURRENT_USER
    })
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
        document.body.style.top = -this.top + "px";
      } else {
        window.scrollTo(0, this.top);
        document.body.style.top = 0;
      }
    }
  }
};
</script>
