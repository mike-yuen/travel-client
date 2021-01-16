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
      <form>
        <div class="pb-8 mb-8 border-b">
          <div class="mb-8">
            <div class="flex">
              <div class="w-full md:w-1/5 md:pr-4">
                <ValidationProvider
                  name="title"
                  mode="eager"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <InputField
                    id="title"
                    type="text"
                    label="Title"
                    v-model="dataValue.title"
                    :errors="errors"
                    :selectOptions="titleOptions"
                    useAs="select"
                  >
                    <template v-slot:label>
                      <strong class="text-lg">Title</strong>
                    </template>
                  </InputField>
                  <ErrorMessage v-if="errors.length > 0">
                    {{ errors[0] }}
                  </ErrorMessage>
                </ValidationProvider>
              </div>
              <div class="w-full md:w-2/5 md:pr-4">
                <ValidationProvider
                  name="first name"
                  mode="eager"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <InputField
                    id="first-name"
                    type="text"
                    label="First Name"
                    v-model="dataValue.firstName"
                    :errors="errors"
                  >
                    <template v-slot:label>
                      <strong class="text-lg">First Name</strong>
                    </template>
                  </InputField>
                  <ErrorMessage v-if="errors.length > 0">
                    {{ errors[0] }}
                  </ErrorMessage>
                </ValidationProvider>
              </div>
              <div class="w-full md:w-2/5 md:pr-4">
                <ValidationProvider
                  name="last name"
                  mode="eager"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <InputField
                    id="last-name"
                    type="text"
                    label="Last Name"
                    v-model="dataValue.lastName"
                    :errors="errors"
                  >
                    <template v-slot:label>
                      <strong class="text-lg">Last Name</strong>
                    </template>
                  </InputField>
                  <ErrorMessage v-if="errors.length > 0">
                    {{ errors[0] }}
                  </ErrorMessage>
                </ValidationProvider>
              </div>
            </div>
            <span class="block mt-3 text-sm text-gray-500">
              You'll need to show ID that matches this name when you check in.
            </span>
          </div>
          <div class="mb-8">
            <div class="flex">
              <div class="w-full md:w-1/2 md:pr-4">
                <ValidationProvider
                  name="email address"
                  mode="eager"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <InputField
                    id="email"
                    type="text"
                    label="Email Address"
                    v-model="dataValue.address"
                    :errors="errors"
                  >
                    <template v-slot:label>
                      <strong class="text-lg">Email Address</strong>
                    </template>
                  </InputField>
                  <ErrorMessage v-if="errors.length > 0">
                    {{ errors[0] }}
                  </ErrorMessage>
                </ValidationProvider>
                <span class="block mt-3 text-sm text-gray-500">
                  We'll send important information about your booking to this
                  email address
                </span>
              </div>
              <div class="w-full md:w-1/2 md:pr-4">
                <ValidationProvider
                  name="phone number"
                  mode="eager"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <InputField
                    id="phone"
                    type="text"
                    label="Phone Number"
                    v-model="dataValue.phone"
                    :errors="errors"
                  >
                    <template v-slot:label>
                      <strong class="text-lg">Phone Number</strong>
                    </template>
                  </InputField>
                  <ErrorMessage v-if="errors.length > 0">
                    {{ errors[0] }}
                  </ErrorMessage>
                </ValidationProvider>
                <span class="block mt-3 text-sm text-gray-500">
                  In case we need to contact you
                </span>
              </div>
            </div>
          </div>
          <div class="m-0">
            <div class="flex">
              <InputField
                id="note"
                type="text"
                label="Note"
                v-model="dataValue.note"
                :errors="errors"
                useAs="textarea"
              >
                <template v-slot:label>
                  <strong class="text-lg">
                    Special requests for your stay
                  </strong>
                  <span class="">(optional)</span>
                </template>
              </InputField>
            </div>
            <span class="block mt-3 text-sm text-gray-500">
              Eg. Non-smoking room, baby cot. Bed types are requests only and
              may not be honoured at the hotel if availability does not permit.
              Your hotel will try to fullfil these requests. Fees may apply.
            </span>
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
const ErrorMessage = () => import("@/components/core-ui/field/ErrorMessage");
const Button = () => import("@/components/core-ui/button/Button");

export default {
  name: "PersonalForm",
  components: {
    InputField: Input,
    ErrorMessage,
    Button
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          title: "Mr",
          firstName: "",
          lastName: "",
          address: "",
          phone: "",
          note: ""
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
  }
};
</script>
