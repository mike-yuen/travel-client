<template>
  <div
    class="relative mb-6 bg-white rounded-md overflow-hidden"
    style="box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;"
  >
    <div class="login" v-if="!dataValue.name">
      <div role="dialog" class="login-dialog">
        <div class="mb-4">
          <svg
            class="login-dialog__icon"
            viewBox="0 0 24 24"
            title="warning"
            fill="currentcolor"
          >
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
          </svg>
          <h3 class="login-dialog__title">
            Sorry, we couldn't make your booking at this time
          </h3>
        </div>
        <span class="login-dialog__subtitle">
          Your selection is no longer available. Please choose a different offer
        </span>
        <Button
          type="btn"
          className="w-auto font-bold bg-red-0 px-6"
          @click="goToLogin"
        >
          Login
        </Button>
      </div>
    </div>
    <div class="flex items-center py-4 px-8 border-b">
      <div class="w-8 h-8 border border-gray-700 rounded-full text-center mr-5">
        <span class="text-lg">1</span>
      </div>
      <div class="css-13tos4r-Box-Flex e6hqxet0">
        <h3 class="text-xl font-bold m-0">
          Your details
        </h3>
      </div>
    </div>
    <div class="p-8">
      <form @submit="onSubmit">
        <div class="mb-8 border-b">
          <div class="mb-8">
            <div class="flex">
              <div class="w-full md:w-1/5 md:pr-4">
                <InputField
                  id="title"
                  type="text"
                  label="Title"
                  v-model="dataValue.title"
                  :selectOptions="titleOptions"
                  readonly
                >
                  <template v-slot:label>
                    <strong class="text-lg">Title</strong>
                  </template>
                </InputField>
              </div>
              <div class="w-full md:w-4/5 md:pr-4">
                <InputField
                  id="full-name"
                  type="text"
                  label="Full Name"
                  v-model="dataValue.name"
                  readonly
                >
                  <template v-slot:label>
                    <strong class="text-lg">Full Name</strong>
                  </template>
                </InputField>
              </div>
            </div>
            <span class="block mt-3 text-sm text-gray-500">
              You'll need to show ID that matches this name when you check in.
            </span>
          </div>
          <div class="mb-8">
            <div class="flex">
              <div class="w-full md:w-1/2 md:pr-4">
                <InputField
                  id="email"
                  type="text"
                  label="Email Address"
                  v-model="dataValue.email"
                  readonly
                >
                  <template v-slot:label>
                    <strong class="text-lg">Email Address</strong>
                  </template>
                </InputField>
                <span class="block mt-3 text-sm text-gray-500">
                  We'll send important information about your booking to this
                  email address
                </span>
              </div>
              <div class="w-full md:w-1/2 md:pr-4">
                <InputField
                  id="phone"
                  type="text"
                  label="Phone Number"
                  v-model="dataValue.phone"
                  readonly
                >
                  <template v-slot:label>
                    <strong class="text-lg">Phone Number</strong>
                  </template>
                </InputField>
                <span class="block mt-3 text-sm text-gray-500">
                  In case we need to contact you
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-auto font-bold bg-red-0 px-6">
          Continue
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
const Input = () => import("@/components/core-ui/field/Input");
const Button = () => import("@/components/core-ui/button/Button");

export default {
  name: "PersonalForm",
  components: {
    InputField: Input,
    Button
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          title: "Mr",
          name: "",
          email: "",
          phone: ""
        };
      }
    }
  },
  data() {
    return {
      titleOptions: [
        { value: "Mr", label: "Mr" },
        { value: "Mrs", label: "Mrs" },
        { value: "Ms", label: "Ms" },
        { value: "Miss", label: "Miss" }
      ]
    };
  },
  computed: {
    dataValue: {
      get() {
        return this.$props.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$emit("submit");
    },
    goToLogin() {}
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(34, 34, 34, 0.2);
  z-index: 1;
}
.login-dialog {
  padding: 2rem 2.5rem;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  overflow-y: auto;
  width: calc(100% - 1.25rem);
  max-width: 41.25rem;
  max-height: 90%;
  &__icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    flex: 0 0 auto;
    margin-right: 0.25rem;
    color: rgb(237, 113, 11);
  }
  &__title {
    font-size: 1.375rem;
    font-weight: 600;
    margin: 0rem 0rem 0.5rem;
    display: inline;
    vertical-align: middle;
    line-height: 1.3;
  }
  &__subtitle {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 500;
    margin-bottom: 1.5rem;
    display: block;
  }
}
</style>
