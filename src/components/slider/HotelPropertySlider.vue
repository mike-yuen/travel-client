<template>
  <div>
    <agile
      v-if="slides.length"
      class="main"
      ref="main"
      :options="options1"
      :as-nav-for="asNavFor1"
    >
      <div
        class="slide"
        v-for="(slide, index) in slides"
        :key="index"
        :class="`slide--${index}`"
      >
        <img :src="slide" />
      </div>
    </agile>
    <agile
      v-if="slides.length"
      class="thumbnails"
      ref="thumbnails"
      :options="options2"
      :as-nav-for="asNavFor2"
    >
      <div
        class="slide slide--thumbnail"
        v-for="(slide, index) in slides"
        :key="index"
        :class="`slide--${index}`"
        @click="$refs.thumbnails.goTo(index)"
      >
        <img :src="slide" />
      </div>

      <template slot="prevButton">
        <i class="fas fa-chevron-left" />
      </template>
      <template slot="nextButton">
        <i class="fas fa-chevron-right" />
      </template>
    </agile>
  </div>
</template>

<script>
import { VueAgile } from "vue-agile";

export default {
  name: "HotelPropertySlider",
  components: {
    agile: VueAgile
  },
  props: {
    slides: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: false
      },

      options2: {
        autoplay: true,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5
            }
          },

          {
            breakpoint: 1000,
            settings: {
              navButtons: true
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
  }
};
</script>

<style>
.thumbnails {
  padding-top: 5px;
  margin: 0 0 0 -2px;
  width: calc(100% + 2px);
}
</style>

<style lang="scss" scoped>
/deep/ .agile {
  &__nav-button {
    display: none;
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 24px;
    transition-duration: 0.3s;

    .thumbnails {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &--prev {
        left: -45px;
      }
      &--next {
        right: -45px;
      }
    }
    &:hover {
      color: #888;
    }
    &__dot {
      margin: 0 10px;

      button {
        background-color: #eee;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: block;
        height: 10px;
        font-size: 0;
        line-height: 0;
        margin: 0;
        padding: 0;
        transition-duration: 0.3s;
        width: 10px;
      }
      &--current,
      &:hover {
        button {
          background-color: #888;
        }
      }
    }
  }
}
.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  width: 100%;
  height: 400px;
  justify-content: center;

  &--thumbnail {
    cursor: pointer;
    height: 100px;
    padding: 0 5px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.75;
    }
  }
  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
    width: 100%;
  }
}
</style>
