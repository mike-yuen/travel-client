<template>
  <div :class="[self ? 'message--self' : '', 'message']">
    <div class="message__wrapper">
      <Avatar
        :userName="data.user.displayName"
        :imageUrl="data.user.userPhotoUrl"
      />
      <div class="message__outer">
        <div class="message__content">{{ data.message }}</div>
        <div class="message__timestamp">
          <img
            class="clock--desktop"
            :src="require('../../assets/images/icon-clock.svg')"
            alt="Time"
          />
          <img
            class="clock--mobile"
            :src="require('../../assets/images/icon-clock-mobile.svg')"
            alt="Time"
          />
          <div>{{ data.createdDate | moment("MMM DD, h:mm A") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Avatar = () => import("./Avatar");
export default {
  name: "Message",
  props: {
    self: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          conversationId: 0,
          roomId: 0,
          user: {
            displayName: "",
            userId: 0,
            userPhotoUrl: ""
          },
          message: "",
          createdDate: ""
        };
      }
    }
  },
  components: {
    Avatar
  }
};
</script>

<style lang="scss" scoped>
$mobiles: 780px;
.message {
  &__wrapper {
    display: flex;
    align-items: flex-start;
  }
  &__outer {
    margin-left: 10px;
    margin-right: 0;
    margin-bottom: 17px;
  }
  &__content {
    max-width: 185px;
    overflow-wrap: break-word;
    font-size: 13px;
    color: #333;
    margin-bottom: 10px;
  }
  &__timestamp {
    display: flex;
    color: #7d8b9a;
    img {
      margin-right: 5px;
    }
    .clock--mobile {
      display: none;
    }
  }
  &--self {
    .message__wrapper {
      flex-direction: row-reverse;
    }
    .message__outer {
      margin-left: 0;
      margin-right: 10px;
    }
    .message__content {
      text-align: right;
    }
    .message__timestamp {
      justify-content: flex-end;
    }
  }
}
@media only screen and (max-width: $mobiles) {
  .message {
    display: flex;
    width: 100%;
    margin-top: 10px;
    &--self {
      justify-content: flex-end;
      .message__wrapper {
        padding: 20px 10px 5px 15px;
      }
      .message__content {
        text-align: left;
      }
    }
    &__wrapper {
      max-width: 90%;
      background-color: #fff;
      padding: 20px 15px 5px 10px;
    }
    &__content {
      max-width: 100%;
      font-size: 14px;
    }
    &__timestamp {
      .clock--mobile {
        display: block;
      }
      .clock--desktop {
        display: none;
      }
    }
  }
}
</style>
