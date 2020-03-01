<template>
  <div class="mt-6 w-full">
    <div
      class="relative bg-white rounded"
      style="box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;"
    >
      <div class="mb-4">
        <div class="md:flex">
          <div
            class="w-full p-4 md:w-3/10 md:px-8 border-b md:border-r border-gray-200"
          >
            <span class="hidden md:block mt-4 text-gray-20 text-md">
              OPTION 1
            </span>
            <h3 class="block text-lg font-bold m-0">
              Internet Included - Non-refundable
            </h3>
            <div class="mt-4">
              <a
                class="block text-lg font-bold underline text-gray-30 cursor-pointer"
              >
                Non-refundable
              </a>
              <a class="block text-lg text-red-0 underline cursor-pointer">
                Show details
              </a>
            </div>
          </div>
          <div
            class="w-full md:w-7/20 p-4 md:p-8 md:pt-10 border-b md:border-r border-gray-200"
          >
            <div class="text-gray-30">
              <div class="flex">
                <div class="text-xl text-gray-0 mr-2">
                  <i class="fa fa-fingerprint font-bold" />
                </div>
                <div class="text-lg">
                  <p>Earn <strong>93</strong> Lux Points^</p>
                  <p class="css-dfndua-Text e7qkkfc0">
                    Plus
                    <strong>31</strong> Lux Points
                    <a class="underline">for your business</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="text-gray-30 mt-4">
              <div class="flex">
                <div class="text-xl text-gray-0 mr-2">
                  <i class="faf fa-wifi" />
                </div>
                <div class="text-lg">
                  Free WiFi
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-7/20 p-4 md:p-8">
            <div class="md:text-right">
              <div class="text-gray-30">
                <span class="css-to1grl-Text e7qkkfc0">Total price for </span>
                <span
                  data-testid="numberOfNights"
                  class="css-to1grl-Text e7qkkfc0"
                >
                  1 night
                </span>
                <span
                  data-testid="total-currency"
                  class="css-to1grl-Text e7qkkfc0"
                >
                  (USD)
                </span>
              </div>
              <div class="text-black text-4xl font-bold">
                <span class="css-uchpwd-Text e7qkkfc0">
                  $
                </span>
                <span text-decoration="none" class="css-3yzdbw e14b982a1">
                  32
                </span>
              </div>
              <Button
                className="w-full md:w-auto bg-red-0 uppercase font-bold px-8"
                @onClick="selectRoom"
                >Select</Button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Button = () => import("@/components/core-ui/button/Button");

export default {
  name: "RoomCardOptions",
  components: {
    Button
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          id: "",
          name: "",
          image_url: "",
          adults: 0,
          description: {},
          features: {},
          prices: 0
        };
      }
    }
  },
  methods: {
    selectRoom() {
      // console.log("Selected babe !");
      // Storage in state
      this.$router.push("/");
    }
  }
};
</script>
