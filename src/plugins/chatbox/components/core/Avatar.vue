<template>
  <div class="avatar">
    <a href="javascript:void(0)" class="avatar__link">
      <div
        class="avatar__image"
        :class="isAdvisoryCouncil ? 'isAdvisoryCouncil' : ''"
        :style="[styleSize, styleRadius]"
      >
        <img
          :src="imageUrl || defaultAvatar"
          :alt="userName"
          v-on:error="onLoadFailed"
          :style="styleRadius"
        />
        <img
          class="advisoryIcon"
          v-if="isAdvisoryCouncil"
          :src="require('../../assets/images/advisory-icon.png')"
          alt
        />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    size: {
      type: Number,
      default: 32
    },
    radius: {
      type: String,
      default: "50%"
    },
    userName: {
      type: String
    },
    imageUrl: {
      type: String
    },
    isAdvisoryCouncil: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleSize: {
        width: this.size + "px",
        height: this.size + "px"
      },
      styleRadius: {
        borderRadius: this.radius
      }
    };
  },
  computed: {
    defaultAvatar() {
      return require("../../assets/images/default-avatar.jpg");
    }
  },
  methods: {
    onLoadFailed(e) {
      e.target.src = this.defaultAvatar;
    }
  }
};
</script>

<style lang="scss" scoped>
$mobiles: 780px;
.avatar {
  position: relative;
  height: 55px;
  &__image {
    position: relative;
    border: 1px solid #ddd;
    cursor: default;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      &.advisoryIcon {
        position: absolute;
        width: 10px;
        bottom: -2px;
        right: 1px;
        height: 10px;
        border: none;
        background: transparent;
        margin: 0;
      }
    }
    &::after {
      border-radius: 50%;
      box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
      content: "";
      display: inline-block;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }
    &.isAdvisoryCouncil {
      border: 1.5px solid #e0557d;
    }
  }
}
@media only screen and (max-width: $mobiles) {
  .avatar {
    &__image {
      width: 40px !important;
      height: 40px !important;
    }
  }
}
</style>
