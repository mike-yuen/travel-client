<template>
  <div class="chatbox" v-show="isChatboxOpened">
    <div class="chatbox__outer">
      <div class="chatbox__inner">
        <div class="chat-titlebar">
          <div class="chat-titlebar__outer">
            <div class="chat-titlebar__inner">
              <Avatar
                :size="40"
                :userName="detailRoom.roomName"
                :imageUrl="detailRoom.roomPhotoUrl"
              />
              <div class="chat-titlebar__wrapper">
                <div class="user-info">
                  <div class="username">
                    <a href="javascript:void(0)">
                      <span>{{ detailRoom.roomName }}</span>
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
                        <li><a href="javascript:void(0)">Clear chat</a></li>
                        <li>
                          <a
                            href="javascript:void(0)"
                            v-on:click="toggleBlockModal(true)"
                          >
                            Block
                          </a>
                        </li>
                        <li><a href="javascript:void(0)">Report</a></li>
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
          <div class="chatframe__overlay" v-if="isBlockModalOpen">
            <div class="block-modal" v-show="isBlockModalOpen">
              <div class="block-modal__outer">
                <div class="block-modal__warning">
                  <div>Are you sure you want to block</div>
                  <div>{{ userInformation.displayName }}?</div>
                </div>
                <div class="block-modal__description">
                  <div>
                    Blocked members will no longer be able to send you a
                    message.
                  </div>
                </div>
                <div class="block-modal__action">
                  <a
                    role="button"
                    class="block-modal__btn"
                    v-on:click="toggleBlockModal(false)"
                  >
                    Cancel
                  </a>
                  <a
                    role="button"
                    class="block-modal__btn"
                    v-on:click="toggleBlockChat"
                  >
                    Block
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="chatframe__wrapper">
            <div
              class="chatframe__overscroll"
              id="scroll-container"
              style="max-height: inherit"
            >
              <div class="chatframe__content">
                <div class="chatframe__init" v-show="isInitDataShowed">
                  <Avatar
                    :size="50"
                    radius="5px"
                    :userName="userInformation.displayName"
                    :imageUrl="userInformation.userPhotoUrl"
                  />
                  <div class="chatframe__info">
                    <div class="quote">
                      {{ userInformation.shortBio }}
                    </div>
                    <div class="member">
                      <div class="member__since">Member since:</div>
                      <div>
                        {{
                          userInformation.memberSince | moment("MMM DD YYYY")
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="chatframe__chat">
                  <Spinner ref="spinner" :size="30" v-show="isSpinnerShowed" />
                  <Message
                    v-for="(message, index) in detailRoom.messages"
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
import {
  isJSONString,
  userInformationDTO,
  roomDetailDTO
} from "../utils/helpers";
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
      // data for calculating internal component
      selfUser: "",
      localMessage: "",
      isChatboxOpened: false,
      isSpinnerShowed: false,
      isToolsOpen: false,
      isBlockModalOpen: false,
      isInitDataShowed: false,
      currentScrollContainerHeight: 0,
      currentPage: 0,

      // data object of user information - should only user userId & roomId
      userInformation: {
        userId: 0,
        roomId: 0,
        displayName: "",
        userPhotoUrl: "",
        shortBio: "",
        memberSince: "",
        locationName: ""
      },

      // data object of detail room
      detailRoom: {
        roomId: 0,
        roomName: "",
        roomPhotoUrl: "",
        messages: [],
        limit: 0,
        totalPages: 0,
        totalElements: 0,
        isBlocked: false,
        isReported: false,
        isMyBlock: false
      }
    };
  },

  async created() {
    this.selfUser = await storage.get("user");
  },
  async mounted() {
    window.addEventListener("message", this.receiveDataRegisterRoomChat, false);

    this.$nextTick(async () => {
      const container = await this.$el.querySelector("#scroll-container");
      let lastScrollTop = 0;
      container.addEventListener(
        "scroll",
        (e) => {
          if (this.canLoadMoreChatHistories) {
            let st = e.target.scrollTop;
            // check lastScrollTop for already render component case - just scrolling up fires event
            if (st < lastScrollTop && e.target.scrollTop === 0) {
              this.isSpinnerShowed = true;
              const pageNroomId = {
                page: this.currentPage + 1,
                roomId: this.userInformation.roomId
              };
              this.getListMessageHistories(
                pageNroomId,
                this.currentScrollContainerHeight
              );
            }
            // For Mobile or negative scrolling
            lastScrollTop = st <= 0 ? 0 : st;
          }
        },
        false
      );
    });
  },
  computed: {
    canLoadMoreChatHistories() {
      return this.currentPage <= this.detailRoom.totalPages;
    }
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
      this.resetInternalData();
    },
    checkSelfID(id) {
      return this.selfUser.userId === id;
    },
    resetInternalData() {
      this.localMessage = "";
      this.isChatboxOpened = false;
      this.isSpinnerShowed = false;
      this.isToolsOpen = false;
      this.isInitDataShowed = false;
      this.currentScrollContainerHeight = 0;
      this.currentPage = 0;

      this.detailRoom.roomId = 0;
      this.detailRoom.roomName = "";
      this.detailRoom.roomPhotoUrl = "";
      this.detailRoom.messages = [];
    },
    async autoFocus() {
      if (this.isChatboxOpened) {
        const composer = await this.$refs.composer;
        composer.focus();
      }
    },
    async updateScrollContainerHeight() {
      const container = await this.$el.querySelector("#scroll-container");
      // console.log("update", container.scrollHeight);
      this.currentScrollContainerHeight = container.scrollHeight;
    },
    async scrollToEnd() {
      if (this.isChatboxOpened) {
        const container = await this.$el.querySelector("#scroll-container");
        container.scrollTop = container.scrollHeight;
      }
    },
    async receiveDataRegisterRoomChat(event) {
      const isJSON = isJSONString(event.data);
      if (event.origin !== process.env.VUE_APP_BASE_URL || !isJSON) return;
      const response = JSON.parse(event.data);
      if (response.type === "sendDataRegisterRoomChat") {
        const data = userInformationDTO(response.data);
        if (data.roomId !== this.detailRoom.roomId) {
          this.closeChatbox();
        }
        this.getInformationUserAndRoom(data);
      }
    },
    getInformationUserAndRoom(data) {
      apiServices.getInformationUserAndRoom(data.userId).then((response) => {
        if (response && response.data) {
          const data = userInformationDTO(response.data);
          this.userInformation = data;
          const dataId = {
            userId: this.userInformation.userId,
            roomId: this.userInformation.roomId
          };
          this.isChatboxOpened = true;
          this.isSpinnerShowed = true;
          this.getDetailRoom(dataId);
        }
      });
    },
    getDetailRoom(dataId) {
      apiServices.getDetailRoom(dataId).then(async (response) => {
        if (response && response.data) {
          const data = roomDetailDTO(response.data);
          this.detailRoom = data;
          // this.currentPage = this.currentPage + 1;
          if (this.detailRoom.messages.length < 10) {
            const pageNroomId = {
              page: this.currentPage + 1,
              roomId: this.detailRoom.roomId
            };
            this.getListMessageHistories(
              pageNroomId,
              this.currentScrollContainerHeight
            );
          }
          this.isSpinnerShowed = false;
          this.scrollToEnd();
          this.autoFocus();
          this.updateScrollContainerHeight();
        } else {
          this.isInitDataShowed = true;
        }
      });
    },
    async getListMessageHistories(pageNroomId, lastPosition) {
      this.currentPage = pageNroomId.page;
      const container = await this.$el.querySelector("#scroll-container");
      apiServices
        .getListMessageHistories(pageNroomId)
        .then(async (response) => {
          if (response && response.data) {
            this.isSpinnerShowed = false;
            const data = response.data;
            this.detailRoom.messages = await data
              .reverse()
              .concat(this.detailRoom.messages);
            if (this.currentPage === 0) {
              this.isInitDataShowed = true;
            }
            await this.updateScrollContainerHeight();
            const scrollPosition =
              this.currentScrollContainerHeight - lastPosition - 39;
            container.scrollTo(0, scrollPosition);
          }
        });
    },
    submitMessage(text) {
      if (text) {
        const newMessage = {
          roomId: this.detailRoom.roomId,
          message: text
        };
        const mockMessage = {
          user: {
            userId: this.selfUser.userId,
            displayName: this.selfUser.displayName,
            userPhotoUrl: this.selfUser.userPhotoUrl
          },
          roomId: this.detailRoom.roomId,
          message: text,
          createdDate: new Date()
        };
        this.detailRoom.messages.push(mockMessage);
        this.scrollToEnd();
        this.localMessage = "";
        apiServices.sendMessage(newMessage).then((response) => {
          if (response && response.data) {
            this.detailRoom.messages.pop();
            this.detailRoom.messages.push(response.data);
          }
        });
      }
    },
    toggleBlockModal(isToggled) {
      if (isToggled) {
        this.isBlockModalOpen = true;
        this.isToolsOpen = false;
      } else {
        this.isBlockModalOpen = false;
      }
    },
    toggleBlockChat() {
      const dataBlock = {
        roomId: this.detailRoom.roomId,
        isBlock: false
      };
      apiServices.toggleBlockUser(dataBlock).then((response) => {
        if (response && response.data) {
          const data = response.data;
          this.isBlock = data.isBlock;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./ChatBox.scss";
</style>
