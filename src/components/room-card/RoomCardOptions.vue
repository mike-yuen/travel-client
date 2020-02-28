<template>
  <div class="mt-6 w-full">
    <div
      class="relative bg-white rounded"
      style="box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;"
    >
      <div class="mb-4">
        <div class="md:flex">
          <div class="w-full md:w-1/3 px-6 border-r border-gray-200">
            <div class="">
              <div class="">
                <span class="block mt-4 text-gray-20 text-md">
                  OPTION 1
                </span>
                <h3 class="block text-lg font-bold m-0">
                  Internet Included - Non-refundable
                </h3>
              </div>
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
          </div>
          <div class="w-full md:w-1/3 py-8 px-6 border-r border-gray-200">
            <div class="text-gray-30">
              <div class="flex">
                <div class="mr-2">
                  <i class="faf fa-wifi" />
                </div>
                <div class="css-nemgot-Box e1g8un1k0">
                  <span class="css-dfndua-Text e7qkkfc0"
                    >Earn
                    <span class="css-o3ntze-Text e1hhwecv0">93</span> Qantas
                    Points^</span
                  ><span class="css-dfndua-Text e7qkkfc0"
                    >Plus
                    <span class="css-o3ntze-Text e1hhwecv0">31</span> Qantas
                    Points
                    <button
                      type="button"
                      color="inherit"
                      class="css-w7t6m5-NakedButton e1tmcgay0"
                    >
                      <span
                        text-decoration="underline"
                        class="css-bxnvms-Text e1ucyleq0"
                        >for your business</span
                      >
                    </button></span
                  >
                </div>
              </div>
            </div>
            <div class="css-klomge-Box e5f71i10">
              <div class="css-1jkw7ad-Box-Flex e6hqxet0">
                <div class="css-nr506m-Box e5f71i10">
                  <svg
                    class="e16d2er41 css-1jo6fyk-StyledSvg-Icon e16d2er40"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    title="wifi"
                    fill="currentcolor"
                  >
                    <path
                      d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
                    ></path>
                  </svg>
                </div>
                <div class="css-nemgot-Box e1g8un1k0">
                  <span data-testid="inclusion" class="css-iqqwsk-Text e7qkkfc0"
                    >Free WiFi</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-6">
            <div class="css-1r2qlxu-Box e5f71i10">
              <div class="css-klomge-Box e5f71i10">
                <span class="css-to1grl-Text e7qkkfc0">Total price for </span
                ><span
                  data-testid="numberOfNights"
                  class="css-to1grl-Text e7qkkfc0"
                  >1 night</span
                ><span
                  data-testid="total-currency"
                  class="css-to1grl-Text e7qkkfc0"
                >
                  (AUD)</span
                >
              </div>
              <div class="css-1ornwkn-Box-Flex e6hqxet0">
                <div class="css-1ik6xa2-Box-Flex e6hqxet0">
                  <div
                    data-testid="total-to-pay"
                    class="css-bpniuh-Box e14b982a0"
                  >
                    <div class="css-1mn2okd-Box e5f71i10">
                      <span
                        data-testid="currency-symbol"
                        class="css-uchpwd-Text e7qkkfc0"
                        >$</span
                      ><span
                        text-decoration="none"
                        data-testid="amount"
                        class="css-3yzdbw e14b982a1"
                        >32</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="css-yv2v4c-Box-Flex e6hqxet0">
                <a
                  href="/hotels/properties/370639/offers/eyJlcHNfcHJvcGVydHlfaWQiOiIxOTQ3MzYzOCIsIm9mZmVyX2lkIjoiMjEwODEwNzQ4Iiwib2ZmZXJfdHlwZSI6InN0YW5kYXJkIiwib3RhX3Jvb21fdHlwZV9jb2RlIjoiMjAyMTA5NTI0In0/booking?adults=2&amp;checkIn=2020-02-27&amp;checkOut=2020-02-28&amp;children=0&amp;infants=0&amp;payWith=cash&amp;roomTypeId=2026197"
                  data-testid="offer-checkout-link"
                  display="inline-block"
                  class="css-1wl9di2-Button ekpi4gp0"
                  >Select</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomCardOptions",
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
  }
};
</script>
