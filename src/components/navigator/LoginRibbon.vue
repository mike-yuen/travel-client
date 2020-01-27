<template>
  <div
    class="login-ribbon flex items-center justify-center w-20 h-20 ml-5 -mb-2 z-10"
  >
    <a
      class="flex items-center justify-center w-20 h-20 text-white border-0 bg-red-0 text-base rounded-b-md cursor-pointer overflow-hidden"
      @click="toggleLoginWidget()"
    >
      <span class="font-bold" v-if="stateLoginWidget">Log in</span>
      <span v-else>Close</span>
    </a>
    <LoginWidget v-show="!stateLoginWidget" />
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
      stateLoginWidget: true
    };
  },
  methods: {
    toggleLoginWidget() {
      this.stateLoginWidget = !this.stateLoginWidget;
    }
  }
};
</script>
