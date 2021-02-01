<template>
  <div
    class="login-ribbon flex items-center justify-center w-20 h-20 ml-5 md:-mb-1 z-10"
    v-click-outside="closeLoginWidget"
  >
    <div
      class="flex items-center justify-center w-20 h-16 md:h-20 text-white border-0 bg-red-0 text-base md:rounded-b-md cursor-pointer overflow-hidden"
      @click="toggleLoginWidget()"
      v-if="!Object.keys(currentUser).length"
    >
      <span class="font-bold" v-if="!stateLoginWidget">Log in</span>
      <span class="font-bold text-center" v-else>
        <i class="fa fa-times block"></i>Close
      </span>
    </div>

    <div
      class="flex items-center justify-center w-20 h-16 md:h-20 text-white border-0 bg-red-0 text-base md:rounded-b-md cursor-pointer overflow-hidden"
      @click="logout()"
      v-else
    >
      <span class="font-bold text-center"> Logout </span>
    </div>

    <LoginWidget v-show="stateLoginWidget" />
  </div>
</template>

<script>
const LoginWidget = () => import("../login-form/LoginWidget");
import { mapGetters, mapActions } from "vuex";
import { GETTERS, ACTIONS, MUTATORS } from "@/store/modules/user/const";

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
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === `user/${MUTATORS.SET_CURRENT_USER}`) {
        this.closeLoginWidget();
      }
    });
  },
  computed: {
    ...mapGetters("user", {
      currentUser: GETTERS.GET_CURRENT_USER
    })
  },
  methods: {
    ...mapActions("user", {
      logout: ACTIONS.LOGOUT
    }),
    toggleLoginWidget() {
      this.stateLoginWidget = !this.stateLoginWidget;
    },
    closeLoginWidget() {
      this.stateLoginWidget = false;
    }
  }
};
</script>
