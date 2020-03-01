<template>
  <div :id="'hotel-properties' + hotelId">
    <div class="relative w-full max-w-7xl mx-auto">
      <div class="pt-6 px-4">
        <div class="flex justify-center p-4 bg-cyan-150">
          <span class="text-base md:text-lg uppercase font-bold">
            SAVE 10% ON POINTS PLUS PAY
          </span>
          <div class="hidden md:block">
            <span class="text-base mx-1">-</span>
            <span class="text-lg uppercase font-bold">
              on hotels worldwide, hurry ends 2nd March.
            </span>
          </div>
        </div>
      </div>

      <div class="hotel-intro px-4">
        <div class="hidden md:block pt-10 pb-6">
          <h1 class="text-2xl md:text-2rem font-bold leading-none m-0 mb-4">
            Hotel Grand Chancellor Hobart
          </h1>
          <div class="flex items-center md:mb-3">
            <div class="mr-3">
              <StarRating :rating="rating" />
            </div>

            <!-- <iframe style="margin: 0; padding: 0; border: 0; width: 100%; height: 1600px;" src="//www.tripadvisor.com/WidgetEmbed-cdspropertydetail?locationId=424268&partnerId=fcdfe76073dc436aad9244439bac88be&display=true"/> -->

            <button>
              <div class="flex">
                <img
                  src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg"
                  width="110px"
                  alt="Trip-Advisor 4.5 Rating"
                  class="block max-w-full"
                />
                <span class="ml-1 text-md underline">
                  5660 reviews
                </span>
              </div>
            </button>
          </div>
          <div class="address leading-normal">
            <div class="flex">
              <span class="text-base cursor-pointer">
                <i class="fa fa-map-marker-alt mr-2" />
                <span class="text-lg mr-2 text-gray-30">
                  1 Davey Street, Hobart Tasmania Australia
                </span>
                <span class="text-red-0 underline">
                  View on map
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="md:flex">
          <div class="css-1w0om4m-Box-Flex e1x0udlv0 w-2/3">
            <div class="css-t0bljt-Box exfkhm60">
              <!-- <HotelPropertySlider /> -->
              <div class="image-gallery ">
                <img
                  src="https://images-cdn.qantashotels.com/insecure/xlarge/plain/k/images/000/073/751/original.jpg"
                  alt="Floor Lobby"
                />
              </div>
            </div>

            <div class="md:hidden">
              <h1
                data-testid="property-name"
                class="css-tbqkzr-Heading-Heading-Text e1cffud31"
              >
                Hotel Grand Chancellor Hobart
              </h1>
              <div class="css-iny6n2-Box-Flex e6hqxet0">
                <div class="css-1y6hlbl-Box e5f71i10">
                  <div
                    itemtype="http://schema.org/AggregateRating"
                    aria-label="4.5 out of 5 rating"
                    title="4.5 out of 5 rating"
                    class="css-1gcgfnk-Box-Flex e6hqxet0"
                  >
                    <svg
                      color="brightSun"
                      class="e16d2er41 css-1jszo85-StyledSvg-Icon e16d2er40"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      title="star"
                      fill="currentcolor"
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      ></path></svg
                    ><svg
                      color="brightSun"
                      class="e16d2er41 css-1jszo85-StyledSvg-Icon e16d2er40"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      title="star"
                      fill="currentcolor"
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      ></path></svg
                    ><svg
                      color="brightSun"
                      class="e16d2er41 css-1jszo85-StyledSvg-Icon e16d2er40"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      title="star"
                      fill="currentcolor"
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      ></path></svg
                    ><svg
                      color="brightSun"
                      class="e16d2er41 css-1jszo85-StyledSvg-Icon e16d2er40"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      title="star"
                      fill="currentcolor"
                    >
                      <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      ></path></svg
                    ><svg
                      color="brightSun"
                      class="e16d2er41 css-1jszo85-StyledSvg-Icon e16d2er40"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      title="starHalf"
                      fill="currentcolor"
                    >
                      <path
                        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <button
                  type="button"
                  color="inherit"
                  class="css-w7t6m5-NakedButton e1tmcgay0"
                >
                  <div
                    data-testid="rating"
                    class="css-17ndlcy-Box-Flex e6hqxet0"
                  >
                    <div class="css-phxg8u-Box-Flex e6hqxet0">
                      <img
                        src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg"
                        width="110px"
                        alt="Trip-Advisor 4.5 Rating"
                        role="img"
                        aria-label="Trip-Advisor 4.5 Rating"
                        class="css-1na2vcf-Image evqvlce0"
                      />
                    </div>
                    <span
                      data-testid="reviews-count"
                      class="css-4f9p2a-Text en0adld0"
                      >5660 reviews</span
                    >
                  </div>
                </button>
              </div>
              <div class="css-1mn2okd-Box e5f71i10">
                <div class="css-x8acf1-Hide eluxabj0">
                  <div class="css-phxg8u-Box-Flex e6hqxet0">
                    <span
                      data-testid="view-on-map-and-address"
                      class="css-1vmv7fd-Text e1afv11l0"
                      ><svg
                        color="greys.steel"
                        class="e16d2er41 css-1oe2cpq-StyledSvg-Icon e16d2er40"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        title="place"
                        fill="currentcolor"
                      >
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                        ></path></svg
                      ><span class="css-1yrd2kw-Text e7qkkfc0"
                        >1 Davey Street, Hobart Tasmania Australia</span
                      ><span
                        text-decoration="underline"
                        class="css-irtj4e-Text e7qkkfc0"
                        >View on map</span
                      ></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="css-1rrdw1g-Box-Flex e1x0udlv1">
            <div class="css-1mn2okd-Box e5f71i10">
              <div class="css-1tfsrrm-Box e5f71i10">
                <h2 class="css-dqh1hu-Heading-Heading-Text e1cffud32">
                  Popular features
                </h2>
                <div class="css-15kmvm1-Box-Flex eu8lwwc0">
                  <div class="css-a4q51c-Box-Flex eu8lwwc1">
                    <div class="css-1j3udpz-Box-Flex e6hqxet0">
                      <div
                        data-testid="facility-icon"
                        class="css-1a8a5sc-Box-Flex e6hqxet0"
                      >
                        <svg
                          color="greys.charcoal"
                          class="e16d2er41 css-6kqemk-StyledSvg-Icon e16d2er40"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          title="pool"
                          fill="currentcolor"
                        >
                          <path
                            d="M22 21c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64-1.11 0-1.73-.37-2.18-.64-.37-.23-.6-.36-1.15-.36s-.78.13-1.15.36c-.46.27-1.08.64-2.19.64v-2c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.23.59.36 1.15.36v2zm0-4.5c-1.11 0-1.73-.37-2.18-.64-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64s-1.73-.37-2.18-.64c-.37-.22-.6-.36-1.15-.36s-.78.13-1.15.36c-.47.27-1.09.64-2.2.64v-2c.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36s.78-.13 1.15-.36c.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.37.22.6.36 1.15.36v2zM8.67 12c.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36s.78-.13 1.15-.36c.12-.07.26-.15.41-.23L10.48 5C8.93 3.45 7.5 2.99 5 3v2.5c1.82-.01 2.89.39 4 1.5l1 1-3.25 3.25c.31.12.56.27.77.39.37.23.59.36 1.15.36zM16.5 3a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5z"
                          ></path>
                        </svg>
                      </div>
                      <span
                        data-testid="facility-text"
                        class="css-1skbx3q-Text e7qkkfc0"
                        >Swimming Pool</span
                      >
                    </div>
                  </div>
                  <div class="css-a4q51c-Box-Flex eu8lwwc1">
                    <div class="css-1j3udpz-Box-Flex e6hqxet0">
                      <div
                        data-testid="facility-icon"
                        class="css-1a8a5sc-Box-Flex e6hqxet0"
                      >
                        <svg
                          color="greys.charcoal"
                          class="e16d2er41 css-6kqemk-StyledSvg-Icon e16d2er40"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          title="restaurant"
                          fill="currentcolor"
                        >
                          <path
                            d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"
                          ></path>
                        </svg>
                      </div>
                      <span
                        data-testid="facility-text"
                        class="css-1skbx3q-Text e7qkkfc0"
                        >Restaurant</span
                      >
                    </div>
                  </div>
                  <div class="css-a4q51c-Box-Flex eu8lwwc1">
                    <div class="css-1j3udpz-Box-Flex e6hqxet0">
                      <div
                        data-testid="facility-icon"
                        class="css-1a8a5sc-Box-Flex e6hqxet0"
                      >
                        <svg
                          color="greys.charcoal"
                          class="e16d2er41 css-6kqemk-StyledSvg-Icon e16d2er40"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          title="localParking"
                          fill="currentcolor"
                        >
                          <path
                            d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"
                          ></path>
                        </svg>
                      </div>
                      <span
                        data-testid="facility-text"
                        class="css-1skbx3q-Text e7qkkfc0"
                        >Parking</span
                      >
                    </div>
                  </div>
                  <div class="css-a4q51c-Box-Flex eu8lwwc1">
                    <div class="css-1j3udpz-Box-Flex e6hqxet0">
                      <div
                        data-testid="facility-icon"
                        class="css-1a8a5sc-Box-Flex e6hqxet0"
                      >
                        <svg
                          color="greys.charcoal"
                          class="e16d2er41 css-6kqemk-StyledSvg-Icon e16d2er40"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          title="smokeFree"
                          fill="currentcolor"
                        >
                          <path
                            d="M2 6l6.99 7H2v3h9.99l7 7 1.26-1.25-17-17zm18.5 7H22v3h-1.5zM18 13h1.5v3H18zm.85-8.12c.62-.61 1-1.45 1-2.38h-1.5c0 1.02-.83 1.85-1.85 1.85v1.5c2.24 0 4 1.83 4 4.07V12H22V9.92c0-2.23-1.28-4.15-3.15-5.04zM14.5 8.7h1.53c1.05 0 1.97.74 1.97 2.05V12h1.5v-1.59c0-1.8-1.6-3.16-3.47-3.16H14.5c-1.02 0-1.85-.98-1.85-2s.83-1.75 1.85-1.75V2a3.35 3.35 0 0 0 0 6.7zm2.5 7.23V13h-2.93z"
                          ></path>
                        </svg>
                      </div>
                      <span
                        data-testid="facility-text"
                        class="css-1skbx3q-Text e7qkkfc0"
                        >Smoke Free</span
                      >
                    </div>
                  </div>
                </div>
                <div class="css-1gcgfnk-Box-Flex e6hqxet0">
                  <button
                    color="ui.link"
                    text-decoration="underline"
                    data-testid="view-all"
                    type="button"
                    class="css-btxq5s-NakedButton e1tmcgay0"
                  >
                    View 22 property features
                  </button>
                </div>
              </div>
              <div class="css-v72m09-Box-Flex e6hqxet0">
                <div class="css-bo1w8j-Box-Flex e6hqxet0">
                  <span class="css-442ynt-Text e7qkkfc0">Check-in time</span>
                  <div class="css-1gcgfnk-Box-Flex e6hqxet0">
                    <svg
                      class="e16d2er41 css-xa1vdf-StyledSvg-Icon e16d2er40"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      title="accessTime"
                      fill="currentcolor"
                    >
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                      ></path></svg
                    >From 15:00
                  </div>
                </div>
                <div class="css-86z4e5-Box-Flex e6hqxet0">
                  <span class="css-442ynt-Text e7qkkfc0">Check-out time</span>
                  <div class="css-1gcgfnk-Box-Flex e6hqxet0">
                    <svg
                      class="e16d2er41 css-xa1vdf-StyledSvg-Icon e16d2er40"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      title="accessTime"
                      fill="currentcolor"
                    >
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                      ></path></svg
                    >Until 11:00
                  </div>
                </div>
              </div>
              <div class="css-sruptq-Box e5f71i10">
                <button
                  color="ui.link"
                  text-decoration="underline"
                  data-testid="about-this-property-btn"
                  type="button"
                  class="css-btxq5s-NakedButton e1tmcgay0"
                >
                  About this property
                </button>
              </div>
            </div>
            <div
              data-testid="property-map-static-desktop-container"
              class="css-96pr0p-Box-Flex e6hqxet0"
            >
              <button
                data-testid="show-map-button"
                type="button"
                color="inherit"
                class="css-q4s2b-NakedButton edgguw80"
              >
                <div class="css-h8ywpc-Box e5f71i10">
                  <picture
                    ><source
                      srcset="
                        https://cdn.qantashotels.com/maps/api/staticmap?center=-42.88076%2C147.33362&amp;format=png8&amp;key=AIzaSyCsC8z8X6VHXKGp7v6McTBvuLxZ-mgbiZs&amp;markers=-42.88076%2C147.33362&amp;size=400x220&amp;style=feature%3Apoi.business%7Cvisibility%3Aoff&amp;zoom=16             1x,
                        https://cdn.qantashotels.com/maps/api/staticmap?center=-42.88076%2C147.33362&amp;format=png8&amp;key=AIzaSyCsC8z8X6VHXKGp7v6McTBvuLxZ-mgbiZs&amp;markers=-42.88076%2C147.33362&amp;size=400x220&amp;style=feature%3Apoi.business%7Cvisibility%3Aoff&amp;zoom=16&amp;scale=2 2x
                      "
                      media="(min-width: 768px)"/>
                    <source
                      srcset="
                        https://cdn.qantashotels.com/maps/api/staticmap?center=-42.88076%2C147.33362&amp;format=png8&amp;key=AIzaSyCsC8z8X6VHXKGp7v6McTBvuLxZ-mgbiZs&amp;markers=-42.88076%2C147.33362&amp;size=640x200&amp;style=feature%3Apoi.business%7Cvisibility%3Aoff&amp;zoom=16             1x,
                        https://cdn.qantashotels.com/maps/api/staticmap?center=-42.88076%2C147.33362&amp;format=png8&amp;key=AIzaSyCsC8z8X6VHXKGp7v6McTBvuLxZ-mgbiZs&amp;markers=-42.88076%2C147.33362&amp;size=640x200&amp;style=feature%3Apoi.business%7Cvisibility%3Aoff&amp;zoom=16&amp;scale=2 2x
                      "
                      media="(min-width: 0px)"/>
                    <img
                      src="https://cdn.qantashotels.com/maps/api/staticmap?center=-42.88076%2C147.33362&amp;format=png8&amp;key=AIzaSyCsC8z8X6VHXKGp7v6McTBvuLxZ-mgbiZs&amp;markers=-42.88076%2C147.33362&amp;size=400x220&amp;style=feature%3Apoi.business%7Cvisibility%3Aoff&amp;zoom=16 1x, https://cdn.qantashotels.com/maps/api/staticmap?center=-42.88076%2C147.33362&amp;format=png8&amp;key=AIzaSyCsC8z8X6VHXKGp7v6McTBvuLxZ-mgbiZs&amp;markers=-42.88076%2C147.33362&amp;size=400x220&amp;style=feature%3Apoi.business%7Cvisibility%3Aoff&amp;zoom=16&amp;scale=2 2x"
                      alt="map of Hotel Grand Chancellor Hobart"
                      data-testid="google-maps-static-image"
                      class="css-1paibui-Image evqvlce0"
                  /></picture>
                </div></button
              ><span class="css-g7b1el-Text e7qkkfc0"
                >1 Davey Street, Hobart Tasmania Australia</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-200 py-6">
      <div class="relative w-full max-w-7xl mx-auto">
        <RoomCardGeneral :data="dataRoom" />
      </div>
    </div>
  </div>
</template>

<script>
// import HotelPropertySlider from "@/components/slider/HotelPropertySlider";
const StarRating = () => import("@/components/core-ui/rating/StarRating");
const RoomCardGeneral = () => import("@/components/room-card/RoomCardGeneral");

export default {
  name: "HotelProperties",
  components: {
    // HotelPropertySlider,
    StarRating,
    RoomCardGeneral
  },
  data() {
    return {
      hotelId: "",
      rating: 3.5,
      dataRoom: {
        name: "No More F*cking Mock, 1 King Bed",
        image_url:
          "https://i.travelapi.com/hotels/20000000/19480000/19473700/19473638/a07ad6ed_z.jpg",
        adults: 2,
        description: {
          "0": "1 Queen Bed",
          "1": "269-sq-foot (25-sq-meter) room with courtyard views",
          "2": "",
          "3": "Internet - Free WiFi ",
          "4": "Entertainment - Flat-screen TV with cable channels",
          "5":
            "Food & Drink - Kitchenette with refrigerator, stovetop, and cookware/dishware",
          "6":
            "Bathroom - Shower, free toiletries, and a hair dryer (on request)",
          "7": "Practical - Desk",
          "8": "Comfort - Air conditioning",
          "9": "Need to Know - Limited housekeeping",
          "10": "Non-Smoking"
        },
        features: {
          "0": "Non-Smoking",
          "1": "Free toiletries",
          "2": "Free WiFi",
          "3": "Shower only",
          "4": "Hair dryer (on request)",
          "5": "Stovetop",
          "6": "Cookware, dishware, and utensils",
          "7": "Room service",
          "8": "Limited housekeeping",
          "9": "Flat-panel TV",
          "10": "Cable TV service",
          "11": "Air conditioning",
          "12": "Desk",
          "13": "Kitchenette",
          "14": "Refrigerator"
        },
        prices: 234
      }
    };
  },

  created() {
    const params = this.$route.params;
    this.hotelId = params.hotelId;
    // then fetch api...
  }
};
</script>
