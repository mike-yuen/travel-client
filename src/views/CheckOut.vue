<template>
  <div :id="'checkout' + hotelId">
    <div class="relative w-full max-w-7xl mx-auto">
      <button type="button" class="css-1c13gu2-NakedButton e1tmcgay0">
        <div class="css-1ic10s4-Box-Flex e6hqxet0">
          <i class="fa fa-chevron-left" />
          Change your selection
        </div>
      </button>

      <div class="lg:flex">
        <div class="w-full lg:w-7/10 p-0 lg:mr-12">
          <h1 class="css-7090fq-Heading-Heading-Text e1cffud31">
            Let's review your booking and pay
          </h1>
          <!-- Personal Form -->
          <div
            data-testid="personal-details-form"
            class="css-danewj-Box e5f71i10"
          >
            <div class="css-6lf2e8-Box-Flex e6hqxet0">
              <div class="css-ccsq3f-Box e5f71i10">
                <span data-testid="step-number" class="css-u1fwj7-Text e7qkkfc0"
                  >1</span
                >
              </div>
              <div class="css-13tos4r-Box-Flex e6hqxet0">
                <h3
                  data-testid="title"
                  class="css-1py6syt-Heading-Heading-Text e1cffud33"
                >
                  Your details
                </h3>
              </div>
            </div>
            <div class="css-jwm255-Box e5f71i10">
              <form>
                <div class="css-yct5cw-Box e5f71i10">
                  <div class="css-mjjrmw-Box e5f71i10">
                    <div class="css-2vk0u1-Box-Flex e6hqxet0">
                      <div class="css-p3zpzr-Box e5f71i10">
                        <label for="title" class="css-ytunkh-Label e5ih0g80"
                          >Title
                          <div class="css-g8g379-Wrapper e34r40v1">
                            <select
                              id="title"
                              name="title"
                              class="e1sbvhxr0 css-z74jmr-StyledSelect-Input-Input-Select e34r40v0"
                              ><option value="">Select</option
                              ><option value="Mr">Mr</option
                              ><option value="Mrs">Mrs</option
                              ><option value="Ms">Ms</option
                              ><option value="Miss">Miss</option
                              ><option value="Dr">Dr</option
                              ><option value="Capt">Capt</option
                              ><option value="Rev">Rev</option></select
                            >
                            <div class="css-1qqla08-IconWrapper e34r40v2">
                              <svg
                                class="e16d2er41 css-1cf2q05-StyledSvg-Icon e16d2er40"
                                viewBox="0 0 24 24"
                                title="expandMore"
                                fill="currentcolor"
                              >
                                <path
                                  d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div
                            data-testid="title-error"
                            class="css-ynz9bv-Box e5f71i10"
                          >
                            Please select title
                          </div></label
                        >
                      </div>
                      <div class="css-1g3x4bl-Box e5f71i10">
                        <label for="firstName" class="css-ytunkh-Label e5ih0g80"
                          >First name<input
                            id="firstName"
                            name="firstName"
                            class="css-p1smkt-Input enrhg9k0"
                            value=""
                        /></label>
                      </div>
                      <div class="css-3rsl9i-Box e5f71i10">
                        <label for="lastName" class="css-1wke096-Label e5ih0g80"
                          >Last name<input
                            id="lastName"
                            name="lastName"
                            class="css-p1smkt-Input enrhg9k0"
                            value=""
                        /></label>
                      </div>
                    </div>
                    <span class="css-1axny9w-Text e7qkkfc0"
                      >You'll need to show ID that matches this name when you
                      check in.</span
                    >
                  </div>
                  <div class="css-kbh327-Box-Flex e6hqxet0">
                    <div class="css-1bevzxp-Box e5f71i10">
                      <label
                        for="emailAddress"
                        class="css-ytunkh-Label e5ih0g80"
                        >Email address<input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          class="css-kh8hcd-Input enrhg9k0"
                          value=""
                        /><span class="css-1axny9w-Text e7qkkfc0"
                          >We'll send important information about your booking
                          to this email address</span
                        ></label
                      >
                    </div>
                    <div class="css-3rsl9i-Box e5f71i10">
                      <label
                        for="phoneNumber"
                        class="css-1yop5tt-Label e5ih0g80"
                        >Phone number<input
                          id="phoneNumber"
                          name="phoneNumber"
                          class="css-kh8hcd-Input enrhg9k0"
                          value=""
                        /><span class="css-1axny9w-Text e7qkkfc0"
                          >In case we need to contact you</span
                        ></label
                      >
                    </div>
                  </div>
                  <div class="css-bx7fxa-Box e5f71i10">
                    <div class="css-bx7fxa-Box e5f71i10">
                      <label
                        for="specialRequests"
                        class="css-ytunkh-Label e5ih0g80"
                        >Special requests for your stay
                        <span class="css-1axny9w-Text e7qkkfc0">(optional)</span
                        ><textarea
                          rows="5"
                          id="specialRequests"
                          name="specialRequests"
                          maxlength="130"
                          class="css-qzcz6x-Input-Textarea e1u9xy6c0"
                        ></textarea
                        ><span
                          data-testid="remaining-characters"
                          class="css-1axny9w-Text e7qkkfc0"
                          >130 characters remaining</span
                        ></label
                      >
                    </div>
                    <span class="css-1axny9w-Text e7qkkfc0"
                      >Eg. Non-smoking room, baby cot. Bed types are requests
                      only and may not be honoured at the hotel if availability
                      does not permit. Your hotel will try to fullfil these
                      requests. Fees may apply.</span
                    >
                  </div>
                </div>
                <button
                  type="submit"
                  width="100%,auto"
                  data-testid="next-step-button"
                  display="inline-block"
                  class="css-ksbil1-Button e11hw6qg0"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- Summary -->
        <div class="w-full lg:w-3/10">
          <div class="css-4w8ji6-Box e5f71i10">
            <div class="css-w36d82-Box-Flex e6hqxet0">
              <div class="css-198r94m-Box e1oiga0p0">
                <div class="css-1ic10s4-Box-Flex e6hqxet0">
                  <span class="e1k8nk994 css-37yfc4-Text-Box-Box e1k8nk990"
                    ><div class="css-1xhc2v2-Box-Flex e6hqxet0">
                      <span class="css-g3nzbe-Text e1nfxojn0">Top Deal</span>
                    </div></span
                  >
                </div>
              </div>
              <div class="css-1khjniu-Box euojt4k0">
                <img
                  src="https://i.travelapi.com/hotels/17000000/16110000/16102200/16102114/f8bbfdeb_b.jpg"
                  srcset="
                    https://i.travelapi.com/hotels/17000000/16110000/16102200/16102114/f8bbfdeb_z.jpg 2x,
                    https://i.travelapi.com/hotels/17000000/16110000/16102200/16102114/f8bbfdeb_b.jpg 1x
                  "
                  alt="Featured Image"
                  class="css-zhrkk2 euojt4k1"
                />
              </div>
              <div class="css-p960dc-Box e5f71i10">
                <div class="css-11wh3ir-Box e5f71i10">
                  <div class="css-1ic10s4-Box-Flex e6hqxet0">
                    <div class="css-1o2ymbk-Box-Flex e6hqxet0">
                      <span class="css-1lotpa4-Text e7qkkfc0"
                        >Pa'Xa Mama Hotel Boutique</span
                      >
                      <div class="css-1sfoopo-Box-Flex e6hqxet0">
                        <div
                          itemtype="http://schema.org/AggregateRating"
                          aria-label="3 out of 5 rating"
                          title="3 out of 5 rating"
                          class="css-1ic10s4-Box-Flex e6hqxet0"
                        >
                          <svg
                            class="e16d2er41 css-bmjqzr-StyledSvg-Icon e16d2er40"
                            viewBox="0 0 24 24"
                            title="circle"
                            fill="currentcolor"
                          >
                            <path
                              d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Z"
                            ></path></svg
                          ><svg
                            class="e16d2er41 css-bmjqzr-StyledSvg-Icon e16d2er40"
                            viewBox="0 0 24 24"
                            title="circle"
                            fill="currentcolor"
                          >
                            <path
                              d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Z"
                            ></path></svg
                          ><svg
                            class="e16d2er41 css-bmjqzr-StyledSvg-Icon e16d2er40"
                            viewBox="0 0 24 24"
                            title="circle"
                            fill="currentcolor"
                          >
                            <path
                              d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Z"
                            ></path></svg
                          ><svg
                            class="e16d2er41 css-bmjqzr-StyledSvg-Icon e16d2er40"
                            viewBox="0 0 24 24"
                            title="circleBorder"
                            fill="currentcolor"
                          >
                            <path
                              d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm0,16.2A7.2,7.2,0,1,1,19.2,12,7.21,7.21,0,0,1,12,19.2Z"
                            ></path></svg
                          ><svg
                            class="e16d2er41 css-bmjqzr-StyledSvg-Icon e16d2er40"
                            viewBox="0 0 24 24"
                            title="circleBorder"
                            fill="currentcolor"
                          >
                            <path
                              d="M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm0,16.2A7.2,7.2,0,1,1,19.2,12,7.21,7.21,0,0,1,12,19.2Z"
                            ></path>
                          </svg>
                        </div>
                        <div
                          data-testid="rating"
                          class="css-be5rig-Box-Flex e6hqxet0"
                        >
                          <img
                            src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.5-15969-4.svg"
                            width="110px"
                            alt="Trip-Advisor 3.8 Rating"
                            role="img"
                            aria-label="Trip-Advisor 3.8 Rating"
                            class="css-pvmqlp-Image evqvlce0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="css-zsfv9x-Box e5f71i10">
                    <button
                      type="button"
                      color="inherit"
                      class="css-w7t6m5-NakedButton e1tmcgay0"
                    >
                      <span
                        data-testid="room-name"
                        text-decoration="underline"
                        class="css-1vhh8az-Text e1ucyleq0"
                        >Standard Room 2 double beds</span
                      >
                    </button>
                    -
                    <button
                      type="button"
                      color="inherit"
                      class="css-w7t6m5-NakedButton e1tmcgay0"
                    >
                      <span
                        data-testid="offer-name"
                        text-decoration="underline"
                        class="css-1vhh8az-Text e1ucyleq0"
                        >Internet Included - Non-refundable</span
                      >
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="css-1m8wlrn-Box e5f71i10">
              <div class="css-p960dc-Box e5f71i10">
                <div class="css-11wh3ir-Box e5f71i10">
                  <span
                    data-testid="occupants-summary"
                    class="css-lzcrvh-Text e7qkkfc0"
                    >2 adults</span
                  >
                  <div class="css-1hck2o6-Box-Flex e6hqxet0">
                    <div class="css-fq1nvt-Box-Flex e6hqxet0">
                      <div class="css-1y4au1a-Box-Flex e6hqxet0">
                        <span class="css-1kv7xe7-Text e7qkkfc0">Check-in</span
                        ><span
                          data-testid="check-in"
                          class="css-5av0u4-Text e7qkkfc0"
                          >Sun 27 Dec, 2020</span
                        >
                      </div>
                      <div class="css-o2tmsm-Box-Flex e6hqxet0">
                        <span class="css-1kv7xe7-Text e7qkkfc0">Check-out</span
                        ><span
                          data-testid="check-out"
                          class="css-5av0u4-Text e7qkkfc0"
                          >Mon 28 Dec, 2020</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="css-3908pi-Box e5f71i10">
                    <button
                      type="button"
                      color="inherit"
                      class="css-w7t6m5-NakedButton e1tmcgay0"
                    >
                      <span
                        data-testid="cancellation-policy-message"
                        text-decoration="underline"
                        class="css-gzwbuv-Text e1ucyleq0"
                        >Non-refundable</span
                      >
                    </button>
                  </div>
                </div>
                <div class="css-n103ym-Box e5f71i10">
                  <span
                    data-testid="inclusion-descriptions"
                    class="css-27spiq-Text e7qkkfc0"
                    >Free WiFi</span
                  ><span class="css-rmpa7-Text e7qkkfc0"
                    >Earn
                    <span
                      data-testid="total-points-displayed"
                      class="css-6ll9ak-Text e1j8vfmv0"
                      >150</span
                    >
                    Qantas Points^ plus
                    <span
                      data-testid="total-points-displayed"
                      class="css-6ll9ak-Text e1j8vfmv0"
                      >50</span
                    >
                    Qantas Points for your business*.</span
                  >
                </div>
              </div>
              <div class="css-q9hmyg-Box e5f71i10">
                <div class="css-bx7fxa-Box e5f71i10">
                  <div
                    data-testid="cash-payable-now-amount"
                    class="css-uticpj-Box-Flex e6hqxet0"
                  >
                    <div class="css-bx7fxa-Box e5f71i10">
                      <span
                        data-testid="total-to-pay-now-label"
                        class="css-1spjkwn-Text e7qkkfc0"
                        >Total due now</span
                      >
                    </div>
                    <div
                      data-testid="currency"
                      class="css-1ibxso3-Box e14b982a0"
                    >
                      <div class="css-bx7fxa-Box e5f71i10">
                        <span
                          data-testid="currency-symbol"
                          class="css-n7xf8g-Text e7qkkfc0"
                          >$</span
                        ><span
                          text-decoration="none"
                          data-testid="amount"
                          class="css-3yzdbw e14b982a1"
                          >50.80</span
                        >
                      </div>
                      <div class="css-1d6gta5-Box e5f71i10">
                        <span
                          data-testid="currency-text"
                          class="css-1bj39qz e14b982a2"
                          >AUD</span
                        >
                      </div>
                    </div>
                  </div>
                  <div
                    data-testid="payable-at-property-amount"
                    class="css-lnfyhc-Box-Flex e6hqxet0"
                  >
                    <div class="css-bx7fxa-Box e5f71i10">
                      <span class="css-1kv7xe7-Text e7qkkfc0"
                        >Pay later at property</span
                      >
                    </div>
                    <div
                      data-testid="currency"
                      class="css-1ibxso3-Box e14b982a0"
                    >
                      <div class="css-bx7fxa-Box e5f71i10">
                        <span
                          data-testid="currency-symbol"
                          class="css-n7xf8g-Text e7qkkfc0"
                          >$</span
                        ><span
                          text-decoration="none"
                          data-testid="amount"
                          class="css-3yzdbw e14b982a1"
                          >1.72</span
                        >
                      </div>
                      <div class="css-1d6gta5-Box e5f71i10">
                        <span
                          data-testid="currency-text"
                          class="css-1bj39qz e14b982a2"
                          >AUD</span
                        >
                      </div>
                    </div>
                  </div>
                  <span
                    data-testid="price-label-subtext"
                    class="css-1swlrid-Text e7qkkfc0"
                    >Payable in local currency at check-in</span
                  >
                </div>
                <div class="css-1hck2o6-Box-Flex e6hqxet0">
                  <button
                    type="button"
                    color="inherit"
                    class="css-w7t6m5-NakedButton e1tmcgay0"
                  >
                    <span
                      data-testid="price-breakdown-button"
                      text-decoration="underline"
                      class="css-f1pp7-Text e1ucyleq0"
                      >Price breakdown</span
                    >
                  </button>
                </div>
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
  name: "CheckOut",
  data() {
    return {
      hotelId: ""
    };
  },
  created() {
    const params = this.$route.params;
    this.hotelId = params.hotelId;
    // then fetch api...
  }
};
</script>
