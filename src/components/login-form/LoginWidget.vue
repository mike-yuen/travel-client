<template>
  <login-widget class="absolute top-100 right-0 mr-3">
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
          <div class="mb-4">
            <Checkbox />
          </div>
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
import Input from "../core-ui/field/Input";
import ErrorMessage from "../core-ui/field/ErrorMessage";
import Button from "../core-ui/button/Button";
import Checkbox from "../core-ui/checkbox/Checkbox";

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
    Checkbox,
    Button
  },
  data() {
    return {
      username: "",
      password: "",
      forgotPassword: {
        name: "Forgot Password?",
        onClick: this.handleForgotPassword
      }
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      console.log("aaaaaaaaaaaaaaa");
    },
    handleForgotPassword() {
      console.log("bbbbbbbbbbbbbbb");
    }
  }
};
</script>
