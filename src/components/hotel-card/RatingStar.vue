<template>
  <RatingStyledContainer>
    <div class="star-rating">
      <label
        class="star-rating__star"
        v-for="rating in ratings"
        :key="rating"
        :class="{
          'is-selected': value >= rating && value != null,
          'is-disabled': disabled
        }"
        v-on:click="set(rating)"
        v-on:mouseover="star_over(rating)"
        v-on:mouseout="star_out"
      >
        <input
          class="star-rating star-rating__checkbox"
          type="radio"
          :value="rating"
          :name="name"
          v-model="value"
          :disabled="disabled"
        />
        ★
      </label>
    </div>
  </RatingStyledContainer>
</template>

<script>
import styled from "vue-styled-components";

const RatingStyledContainer = styled.div`
  .star-rating {
    &__star {
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
      font-size: 1.5em;
      color: #ababab;
      transition: color 0.2s ease-out;

      &:hover {
        cursor: pointer;
      }

      &.is-selected {
        color: #ffd700;
      }

      &.is-disabled:hover {
        cursor: default;
      }
    }

    &__checkbox {
      position: absolute;
      overflow: hidden;
      clip: rect(0 0 0 0);
      height: 1px;
      width: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
    }
  }
`;

export default {
  name: "RatingStar",
  components: {
    RatingStyledContainer
  },
  props: {
    name: String,
    value: null,
    id: String,
    disabled: Boolean,
    required: Boolean
  },

  /*
   * Initial state of the component's data.
   */
  data: function() {
    return {
      temp_value: null,
      ratings: [1, 2, 3, 4, 5]
    };
  },

  methods: {
    /*
     * Behaviour of the stars on mouseover.
     */
    star_over: function(index) {
      if (!this.disabled) {
        this.temp_value = this.value;
        return (this.value = index);
      }
    },

    /*
     * Behaviour of the stars on mouseout.
     */
    star_out: function() {
      if (!this.disabled) {
        return (this.value = this.temp_value);
      }
    },

    /*
     * Set the rating.
     */
    set: function(value) {
      if (!this.disabled) {
        this.temp_value = value;
        return (this.value = value);
      }
    }
  }
};
</script>
