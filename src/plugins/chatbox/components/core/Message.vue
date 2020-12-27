<template>
  <div v-if="!resend">
    <div class="failed-send" v-if="data.isFail">
      <span v-on:click="handleResend()">
        Resend
        <img
          :src="require('../../assets/images/icon-resend.svg')"
          alt="resend"
        />
      </span>
    </div>
    <div :class="[self ? 'message--self' : '', 'message']">
      <div class="message__wrapper">
        <Avatar
          :userName="data.user.displayName"
          :imageUrl="data.user.userPhotoUrl"
          :isAdvisoryCouncil="data.user.isAdvisoryCouncil"
        />
        <div class="message__outer">
          <div
            class="message__content"
            :inner-html.prop="data.message | linkify"
          ></div>
          <PreviewLink
            v-for="(url, index) in listUrl"
            :key="`url-${index}`"
            :url="url"
          >
          </PreviewLink>
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
            <div>{{ formatDateString(data.createdDate) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDurationDate } from "../../utils/helpers";
import { URL_REGEX } from "@/services/constants";
import PreviewLink from "./PreviewLink";
const Avatar = () => import("./Avatar");
export default {
  name: "Message",
  data() {
    return {
      resend: false,
      listUrl: []
    };
  },
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
  created() {
    this.getValidUrl();
  },
  methods: {
    formatDateString(date) {
      return getDurationDate(this, date);
    },
    handleResend() {
      this.$emit("handleResend", this.data.message);
      const container = document.getElementById("scroll-container");
      container.scrollTop = container.scrollHeight;
      this.resend = true;
    },
    getValidUrl() {
      const self = this;
      self.listUrl = [];
      self.data.message.replace(URL_REGEX, function(url) {
        self.listUrl.push(url);
      });
    }
  },
  components: {
    Avatar,
    PreviewLink
  },
  watch: {
    data: function() {
      this.getValidUrl();
    }
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
    white-space: pre-wrap;
    font-size: 13px;
    color: #333;
    margin-bottom: 10px;
  }
  &__timestamp {
    display: flex;
    color: #7d8b9a;
    font-size: 11px;
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
.failed-send {
  text-align: right;
  margin: 8px 0 11px 40px;
  span {
    padding: 6px 12px;
    border-radius: 5px;
    background-color: #f0f2f5;
    color: #f00;
    cursor: pointer;
  }
  img {
    width: 12px;
    height: 12px;
    margin-left: 3px;
    margin-bottom: 5px;
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
    }
    &__wrapper {
      max-width: 90%;
      background-color: #fff;
      padding: 20px 15px 5px 10px;
    }
    &__content {
      max-width: 260px;
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
  .failed-send {
    margin: 20px 2px 0;
  }
}
</style>
