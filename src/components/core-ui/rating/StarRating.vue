<template>
  <div
    itemtype="http://schema.org/AggregateRating"
    :title="`${rating} out of 5 rating`"
    class="star-rating flex"
  >
    <svg
      :key="`fs${i}`"
      v-for="(fs, i) in fullStars"
      class="text-yellow-0"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      title="star"
      fill="currentcolor"
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      ></path>
    </svg>

    <svg
      v-for="(hs, i) in halfStars"
      :key="`hs${i}`"
      class="text-yellow-0"
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

    <svg
      v-for="(es, i) in emptyStars"
      :key="`es${i}`"
      class="text-yellow-0"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      title="starBorder"
      fill="currentcolor"
    >
      <path
        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
      ></path>
    </svg>
  </div>
</template>

<script>
// import {
//   FontAwesomeIcon,
//   FontAwesomeLayers
// } from '@fortawesome/vue-fontawesome'
export default {
  name: "StarRating",
  //   beforeMount () {
  //     let {rating, minRating, maxRating, starRatio, limit} = this
  //     if (!ratingIsValid(rating, minRating, maxRating, starRatio, limit)) {
  //       throw new Error(
  //         `Illegal rating values detected. You should check your initial App state. (rating: ${rating}, minRating: ${minRating}, maxRating: ${maxRating}, starRatio: ${starRatio}, limit: ${limit})`
  //       )
  //     }
  //   },
  //   components: {
  //     FontAwesomeIcon,
  //     FontAwesomeLayers
  //   },
  computed: {
    fullStars() {
      let { rating, starRatio } = this;
      return Math.floor(rating / starRatio);
    },
    halfStars() {
      let { rating, starRatio } = this;
      let x = rating % starRatio;
      let i = (1 / 2) * starRatio;
      return x >= i ? 1 : 0;
    },
    emptyStars() {
      return this.maxStars - this.fullStars - this.halfStars;
    },
    maxStars() {
      let { maxRating, starRatio } = this;
      return Math.ceil(maxRating / starRatio);
    }
  },
  props: {
    minRating: {
      type: Number,
      default: 0
    },
    maxRating: {
      type: Number,
      default: 5
    },
    rating: {
      type: Number,
      default: 4
    },
    starRatio: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 1000
    }
  }
};
</script>
