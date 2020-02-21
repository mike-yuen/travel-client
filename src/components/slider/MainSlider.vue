<template>
  <div class="carousel relative w-full overflow-hidden md:h-40rem">
    <Loader class="hidden" />
    <div
      id="slide-placeholder"
      class="block absolute top-0 left-0 w-full h-0 opacity-0"
    >
      <div
        class="bg-no-repeat bg-100-100 absolute w-full h-full opacity-100"
        :style="{
          'background-image':
            'url(' + require('@/assets/images/placeholder-slider.jpg') + ')'
        }"
      ></div>
      <bubble-wrapper>
        <placeholder-bubble
          :style="{
            'background-image':
              'url(' + require('@/assets/images/bubble-slider-1.png') + ')'
          }"
        >
          <placeholder-bubble-inner>
            <div
              class="animation-pulse animation-2s animation-ease-in-out opacity-25 mb-5"
            >
              <div
                class="inline-block h-5 mt-3 w-full bg-white opacity-50"
              ></div>
              <div
                class="inline-block h-3 mt-2 w-full bg-white opacity-50"
              ></div>
              <div
                class="inline-block h-3 mt-2 w-full bg-white opacity-50"
              ></div>
              <div
                class="inline-block h-3 mt-2 w-2/5 bg-white opacity-50"
              ></div>
            </div>
            <a
              class="flex items-center justify-center cursor-pointer border border-white rounded-2 
              h-10 w-32 animation-pulse animation-2s animation-ease-in-out opacity-25"
            >
              <div class="w-3/4 h-4 bg-white opacity-50"></div>
            </a>
          </placeholder-bubble-inner>
        </placeholder-bubble>
      </bubble-wrapper>
    </div>

    <agile ref="main" :options="options1">
      <div v-for="(slide, index) in slides" :key="index" :id="`slide-${index}`">
        <div class="w-full h-full" role="tabpanel">
          <div class="relative w-full md:h-40rem">
            <picture-wrapper>
              <picture>
                <source :srcset="slide.path" media="(min-width: 60em)" />
                <source :srcset="slide.path" media="(min-width: 48em)" />
                <img
                  :src="slide.path"
                  :alt="slide.title"
                  class="absolute top-0 right-0 w-auto block min-w-full min-h-full h-auto object-cover"
                />
              </picture>
            </picture-wrapper>
            <bubble-wrapper>
              <placeholder-bubble
                :style="{
                  'background-image':
                    'url(' +
                    require('@/assets/images/bubble-slider-1.png') +
                    ')'
                }"
              >
                <placeholder-bubble-inner>
                  <h2 class="mb-1 text-4xl text-white hover:underline">
                    <a :href="slide.link">
                      {{ slide.title }}
                    </a>
                  </h2>
                  <div class="homepage-promotion__rich-text">
                    <p class="mb-5 text-white text-lg">
                      {{ slide.content }}
                    </p>
                  </div>
                  <a
                    :href="slide.link"
                    class="inline-block text-center cursor-pointer 
                        border border-white rounded-2 py-2 px-8 text-white uppercase"
                  >
                    {{ slide.button }}
                  </a>
                </placeholder-bubble-inner>
              </placeholder-bubble>
            </bubble-wrapper>
          </div>
        </div>
      </div>
    </agile>
  </div>
</template>

<script>
import Loader from "../core-ui/loader/Loader";
import { VueAgile } from "vue-agile";
import styled from "vue-styled-components";

const PictureWrapper = styled.div`
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    height: 16.5rem;
  }
  @media (min-width: 769px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
const BubbleWrapper = styled.div`
  @media (max-width: 768px) {
    position: relative;
    padding: 1.5rem 1rem 2rem;
    background: #e40000;
    text-align: center;
    overflow-x: hidden;
  }
  @media (min-width: 769px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 -5rem 4rem -2rem rgba(0, 0, 0, 0.6);
  }
`;
const PlaceholderBubble = styled.div`
  @media (max-width: 768px) {
    background: none !important;
  }
  @media (min-width: 769px) {
    width: 62.5rem;
    height: 21rem;
    padding: 1.625rem 0 3rem;
    background-position: 0 0;
    margin: 0 auto;
    background-repeat: no-repeat;
    transform: translateX(-18rem);
    padding-left: 18rem;
  }
`;
const PlaceholderBubbleInner = styled.div`
  @media (max-width: 768px) {
    margin: auto;
    max-width: 100%;
  }
  width: 24rem;
  height: 100%;
`;

export default {
  name: "MainSlider",
  components: {
    Loader,
    agile: VueAgile,
    "picture-wrapper": PictureWrapper,
    "bubble-wrapper": BubbleWrapper,
    "placeholder-bubble": PlaceholderBubble,
    "placeholder-bubble-inner": PlaceholderBubbleInner
  },
  data() {
    return {
      options1: {
        dots: true,
        fade: true,
        navButtons: false,
        speed: "2000",
        autoplay: true,
        autoplaySpeed: "10000",
        pauseOnHover: false
      },
      slides: [
        {
          title: "Where can I go?",
          content:
            "Need travel inspiration? Compare a range of Travel and partner flight prices using our interactive map and see where you can go.",
          button: "Search Hotels",
          path: require("@/assets/images/homepagepromotion.4.png"),
          link: "https://github.com/minhnguyen1505"
        },
        {
          title: "Where can I go?",
          content:
            "Need travel inspiration? Compare a range of Travel and partner flight prices using our interactive map and see where you can go.",
          button: "Search Hotels",
          path: require("@/assets/images/homepagepromotion.2.png"),
          link: "https://github.com/minhnguyen1505"
        },
        {
          title: "Where can I go?",
          content:
            "Need travel inspiration? Compare a range of Travel and partner flight prices using our interactive map and see where you can go.",
          button: "Search Hotels",
          path: require("@/assets/images/homepagepromotion.1.png"),
          link: "https://github.com/minhnguyen1505"
        }
      ]
    };
  }
};
</script>
