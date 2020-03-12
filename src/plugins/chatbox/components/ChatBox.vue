<template>
  <div class="chatbox" v-show="isChatboxOpened">
    <div class="chatbox__outer">
      <div class="chatbox__inner">
        <div class="chat-titlebar">
          <div class="chat-titlebar__outer">
            <div class="chat-titlebar__inner">
              <Avatar
                :size="40"
                :userName="displayName"
                :imageUrl="userPhotoUrl"
              />
              <div class="chat-titlebar__wrapper">
                <div class="user-info">
                  <div class="username">
                    <a href="javascript:void(0)">
                      <span>{{ displayName }}</span>
                    </a>
                  </div>
                </div>
                <div class="tools">
                  <div class="tool" v-click-outside="closeTools">
                    <a
                      id="chatMoreOptionButton"
                      href="javascript:void(0)"
                      class="tool__link"
                      v-on:click="toggleTools"
                    >
                      <img
                        :src="require('../assets/images/icon-more.svg')"
                        alt="More Options"
                      />
                    </a>
                    <div v-if="isToolsOpen" class="tool__more-option">
                      <ul>
                        <li>Clear chat</li>
                        <li>Block</li>
                        <li>Report</li>
                      </ul>
                    </div>
                  </div>

                  <div class="tool">
                    <a
                      id="chatCloseButton"
                      href="javascript:void(0)"
                      class="tool__link"
                      v-on:click="closeChatbox"
                    >
                      <img
                        :src="require('../assets/images/icon-close.svg')"
                        alt="Close Chat"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chatframe">
          <div class="chatframe__wrapper">
            <div
              class="chatframe__overscroll"
              id="scroll-container"
              style="max-height: inherit"
            >
              <div class="chatframe__content">
                <div class="chatframe__init">
                  <Avatar
                    :size="50"
                    radius="5px"
                    :userName="displayName"
                    :imageUrl="userPhotoUrl"
                  />
                  <div class="chatframe__info">
                    <div class="quote">
                      {{ shortBio }}
                    </div>
                    <div class="member">
                      <div class="member__since">Member since:</div>
                      <div>{{ memberSince | moment("MMM DD YYYY") }}</div>
                    </div>
                  </div>
                </div>

                <div class="chatframe__chat">
                  <Spinner :size="30" v-show="isSpinnerShowed" />
                  <Message
                    v-for="(message, index) in messages"
                    :key="`message-${index}`"
                    :data="message"
                    :self="checkSelfID(message.user.userId)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="composer">
            <form @submit.prevent="submitMessage(localMessage)">
              <div class="composer__outer">
                <div class="composer__input">
                  <input
                    ref="composer"
                    placeholder="Type your message here..."
                    v-model="localMessage"
                  />
                </div>
                <div class="composer__btn">
                  <button type="submit">
                    <img
                      :src="require('../assets/images/icon-send.svg')"
                      alt="Send"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "../utils/storage";
import { isJSONString } from "../utils/helpers";
import * as apiServices from "../services";

import Spinner from "./core/Spinner";
import Avatar from "./core/Avatar";
import Message from "./core/Message";

export default {
  name: "Chatbox",
  components: {
    Spinner,
    Avatar,
    Message
  },
  data() {
    return {
      selfUser: "",
      localMessage: "",
      isChatboxOpened: false,
      isSpinnerShowed: false,
      isToolsOpen: false,
      scrollContainer: "",
      currentScrollContainerHeightHeight: 0,

      userId: 0,
      roomId: 0,
      displayName: "",
      userPhotoUrl: "",
      shortBio: "",
      memberSince: "",
      messages: []
    };
  },
  async created() {
    this.selfUser = await storage.get("user");
  },
  mounted() {
    window.addEventListener("message", this.receiveDataRegisterRoomChat, false);

    this.$nextTick(async () => {
      const container = await this.$el.querySelector("#scroll-container");
      let lastScrollTop = 0;
      container.addEventListener(
        "scroll",
        (e) => {
          this.currentScrollContainerHeight = container.scrollHeight;
          let st = e.target.scrollTop;
          // check lastScrollTop for already render component case - just scrolling up fires event
          if (st < lastScrollTop && e.target.scrollTop === 0) {
            this.isSpinnerShowed = true;
            const pageNroomId = { page: 1, roomId: this.roomId };
            this.getListMessageHistories(
              pageNroomId,
              this.currentScrollContainerHeight
            );
            // console.log("st", st);
          }
          lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        },
        false
      );
    });
  },
  methods: {
    toggleTools() {
      this.isToolsOpen = !this.isToolsOpen;
    },
    closeTools() {
      this.isToolsOpen = false;
    },
    closeChatbox() {
      this.isChatboxOpened = false;
    },
    checkSelfID(id) {
      return this.selfUser.userId === id;
    },
    async autoFocus() {
      if (this.isChatboxOpened) {
        const composer = await this.$refs.composer;
        composer.focus();
      }
    },
    async updateScrollContainerHeight() {
      const container = await this.$el.querySelector("#scroll-container");
      this.currentScrollContainerHeight = container.scrollHeight;
    },
    async scrollToEnd() {
      if (this.isChatboxOpened) {
        const container = await this.$el.querySelector("#scroll-container");
        container.scrollTop = container.scrollHeight;
      }
    },
    receiveDataRegisterRoomChat(event) {
      const isJSON = isJSONString(event.data);
      if (!isJSON) return;
      const response = JSON.parse(event.data);
      if (response.type === "sendDataRegisterRoomChat") {
        this.messages = [];
        const data = response.data;
        this.userId = data.userId;
        this.roomId = data.roomId;
        this.getInformationUserAndRoom(data);
      }
    },
    getInformationUserAndRoom(data) {
      apiServices.getInformationUserAndRoom(data.userId).then((response) => {
        if (response && response.data) {
          const data = response.data;
          this.displayName = data.displayName;
          this.userPhotoUrl = data.userPhotoUrl;
          this.shortBio = data.shortBio;
          this.memberSince = data.memberSince;
          this.isChatboxOpened = true;
          this.isSpinnerShowed = true;
          this.registerRoomChat(data);
        }
      });
    },
    registerRoomChat(data) {
      apiServices.registerRoomChat(data).then(async (response) => {
        if (response && response.data) {
          const data = response.data;
          this.messages = data.messages.slice();
          this.isSpinnerShowed = false;
          this.scrollToEnd();
          this.autoFocus();
        }
      });
    },
    async getListMessageHistories(pageNroomId, lastPosition) {
      const container = await this.$el.querySelector("#scroll-container");
      // console.log("last", lastPosition);
      apiServices.getListMessageHistories(pageNroomId).then((response) => {
        if (response && response.data) {
          this.isSpinnerShowed = false;
          this.messages = response.data.concat(this.messages);
          container.scrollTo(0, lastPosition);
          // console.log("resp", response.data);
        }
      });
    },
    submitMessage(text) {
      if (text) {
        const newMessage = {
          roomId: this.roomId,
          message: text
        };
        const mockMessage = {
          user: {
            userId: this.selfUser.userId,
            displayName: this.selfUser.displayName,
            userPhotoUrl: this.selfUser.userPhotoUrl
          },
          roomId: this.roomId,
          message: text,
          createdDate: new Date()
        };
        this.messages.push(mockMessage);
        this.scrollToEnd();
        this.localMessage = "";
        apiServices.sendMessage(newMessage).then((response) => {
          if (response && response.data) {
            this.messages.pop().push(response.data);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./ChatBox.scss";
</style>
