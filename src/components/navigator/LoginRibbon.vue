<template>
  <div
    class="login-ribbon flex items-center justify-center w-20 h-20 ml-5 md:-mb-1 z-10"
    v-click-outside="closeLoginWidget"
  >
    <div
      class="flex items-center justify-center w-20 h-16 md:h-20 text-white border-0 bg-red-0 text-base md:rounded-b-md cursor-pointer overflow-hidden"
      @click="toggleLoginWidget()"
    >
      <span class="font-bold" v-if="!stateLoginWidget">Log in</span>
      <span class="font-bold text-center" v-else
        ><i class="fa fa-times block"></i>Close</span
      >
    </div>
    <LoginWidget v-show="stateLoginWidget" />
  </div>
</template>

<script>
import LoginWidget from "../login-form/LoginWidget";

export default {
  name: "LoginRibbon",
  components: {
    LoginWidget
  },
  data() {
    return {
      stateLoginWidget: false
    };
  },
  methods: {
    toggleLoginWidget() {
      this.stateLoginWidget = !this.stateLoginWidget;
    },
    closeLoginWidget() {
      this.stateLoginWidget = false;
    }
  }
};
</script>
