<template>
  <login-widget class="absolute top-100 right-0 md:mr-3 z-20">
    <h4 class="text-lg font-bold m-0 p-4 pb-0">
      Frequent Customer login
    </h4>
    <ValidationObserver ref="observer" v-slot="{ validate }">
      <form
        autocomplete="off"
        class="relative w-full mt-4"
        @submit.prevent="validate(handleSubmit())"
      >
        <div class="my-4 px-4">
          <ValidationProvider
            name="membership account"
            mode="eager"
            rules="required"
            v-slot="{ errors }"
          >
            <Input
              id="username"
              type="text"
              label="Membership account"
              v-model="username"
              :errors="errors"
            />
            <ErrorMessage v-if="errors.length > 0">
              {{ errors[0] }}
            </ErrorMessage>
          </ValidationProvider>
        </div>
        <div class="mb-4 px-4">
          <ValidationProvider
            name="password"
            mode="eager"
            rules="required"
            v-slot="{ errors }"
          >
            <Input
              id="password"
              type="password"
              label="Password"
              v-model="password"
              :errors="errors"
              :action="forgotPassword"
            />
            <ErrorMessage v-if="errors.length > 0">
              {{ errors[0] }}
            </ErrorMessage>
          </ValidationProvider>
        </div>
        <div class="mb-4 px-4">
          <!-- <div class="mb-4">
            <Checkbox :data="rememberState" :value="rememberValue" />
            {{ rememberValue }}
          </div> -->
          <Button type="submit" class="font-bold">LOG IN</Button>
        </div>
        <div class="mb-4 px-4">
          <div class="text-base">
            Not a member? You can&nbsp;
            <router-link class="text-red-0" to="#">
              join here.
            </router-link>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </login-widget>
</template>

<script>
import styled from "vue-styled-components";
const Input = () => import("../core-ui/field/Input");
const ErrorMessage = () => import("../core-ui/field/ErrorMessage");
const Button = () => import("../core-ui/button/Button");
// const Checkbox = () => import("../core-ui/checkbox/Checkbox");
import { mapGetters, mapActions } from "vuex";
import { GETTERS, ACTIONS } from "@/store/modules/user/const";

const LoginWidget = styled.div`
  box-shadow: 0 0.5rem 0 #e40000 inset, 0 0.85rem 3rem rgba(0, 0, 0, 0.2);
  max-height: 65rem;
  width: 16.875rem;
  background: #f4f5f6;
  transform: translate3d(0, 0, 0);
`;

export default {
  name: "LoginWidget",
  components: {
    "login-widget": LoginWidget,
    Input,
    ErrorMessage,
    // Checkbox,
    Button
  },
  data() {
    return {
      username: "",
      password: "",
      forgotPassword: {
        name: "Forgot Password?",
        onClick: this.handleForgotPassword
      },
      rememberState: {
        label: "Remember Me",
        checked: false,
        value: "remember"
      },
      rememberValue: ""
    };
  },
  computed: {
    ...mapGetters("user", {
      token: GETTERS.GET_TOKEN
    })
  },
  methods: {
    ...mapActions("user", {
      login: ACTIONS.LOGIN
    }),
    handleSubmit() {
      const authInfo = {
        email: this.username,
        password: this.password
      };
      this.login(authInfo);
    },
    handleForgotPassword() {
      // console.log("forgot password");
    }
  }
};
</script>
