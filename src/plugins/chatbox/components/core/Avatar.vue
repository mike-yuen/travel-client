<template>
  <div class="avatar">
    <a href="javascript:void(0)" class="avatar__link">
      <div class="avatar__image" :style="[styleSize, styleRadius]">
        <img :src="imageUrl" :alt="userName" @error="onLoadFailed" />
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
.avatar {
  position: relative;
  &__image {
    overflow: hidden;
    position: relative;
    border: 1px solid #ddd;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
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
  }
}
</style>
