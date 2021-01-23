<template>
  <div
    class="mb-6 bg-white rounded-md"
    style="box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;"
  >
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
    }
  }
};
</script>
