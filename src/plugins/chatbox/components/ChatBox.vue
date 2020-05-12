<template>
  <div class="chatbox" v-show="isChatboxOpened" v-on:click="onfocusChatbox()">
    <div class="chatbox__outer">
      <div class="chatbox__inner">
        <div class="chat-titlebar">
          <div
            class="chat-titlebar__outer"
            :class="{ 'new-message': hasNewMessage }"
          >
            <div class="chat-titlebar__inner">
              <Avatar
                :size="35"
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
                        <li>
                          <a
                            href="javascript:void(0)"
                            v-on:click="toggleClearChatModal(true)"
                          >
                            Clear chat
                          </a>
                        </li>
                        <li
                          v-if="!detailRoom.isMyBlock && !detailRoom.isBlocked"
                        >
                          <a
                            href="javascript:void(0)"
                            v-on:click="toggleBlockModal(true)"
                          >
                            Block
                          </a>
                        </li>
                        <li v-if="detailRoom.isMyBlock">
                          <a
                            href="javascript:void(0)"
                            v-on:click="toggleBlockChat('unblock')"
                          >
                            Unblock
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
          <div class="chatframe__overlay" v-if="isClearChatModalOpen">
            <ConfirmationModal v-if="isClearChatModalOpen">
              <template v-slot:warning>
                <div>Are you sure you want to clear</div>
                <div>messages in this chat?</div>
              </template>
              <template v-slot:description>
                <div class="chatframe__text-center">
                  This action can't be undone.
                </div>
              </template>
              <template v-slot:action>
                <Button v-on:onClick="toggleClearChatModal(false)">
                  Cancel
                </Button>
                <Button v-on:onClick="clearChat(detailRoom.roomId)">
                  Clear
                </Button>
              </template>
            </ConfirmationModal>
          </div>

          <div
            class="chatframe__overlay"
            v-if="isBlockModalOpen || isBlockMessageOpen || isBlockedWarning"
          >
            <ConfirmationModal v-if="isBlockModalOpen">
              <template v-slot:warning>
                <div>Are you sure you want to block</div>
                <div>{{ userInformation.displayName }}?</div>
              </template>
              <template v-slot:description>
                <div>
                  Blocked members will no longer be able to send you a message.
                </div>
              </template>
              <template v-slot:action>
                <Button v-on:onClick="toggleBlockModal(false)">Cancel</Button>
                <Button v-on:onClick="toggleBlockChat('block')">Block</Button>
              </template>
            </ConfirmationModal>

            <InformationModal v-if="isBlockMessageOpen">
              <template v-slot:heading>
                <div>Confirmed!</div>
              </template>
              <template v-slot:description>
                <div>
                  {{ userInformation.displayName }} has been
                  {{
                    detailRoom.isMyBlock && detailRoom.isBlocked
                      ? "blocked"
                      : "unblocked"
                  }}.
                </div>
              </template>
            </InformationModal>

            <InformationModal v-if="isBlockedWarning">
              <template v-slot:heading>
                <div>Unable to send this message.</div>
              </template>
              <template v-slot:description>
                <div>
                  Please try later or <a href="#">contact us</a> for details.
                </div>
              </template>
              <template v-slot:action>
                <Button v-on:onClick="toggleBlockWarning('close')">Ok</Button>
              </template>
            </InformationModal>
          </div>
          <div class="chatframe__wrapper">
            <div
              class="chatframe__overscroll"
              id="scroll-container"
              style="max-height: inherit"
            >
              <div class="chatframe__content">
                <!-- v-show="isInitDataShowed" -->
                <div class="chatframe__init">
                  <Avatar
                    :size="50"
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
                  <TypingIndicator v-if="isSendingMessage" />
                </div>
              </div>
            </div>
          </div>
          <div class="composer" :class="{ 'composer--disabled': isMyBlock }">
            <form @submit.prevent="submitMessage(localMessage)">
              <div class="composer__outer">
                <div class="composer__input">
                  <input
                    ref="composer"
                    placeholder="Type your message here..."
                    v-model="localMessage"
                    :disabled="isMyBlock"
                  />
                </div>
                <div class="composer__btn">
                  <button type="submit" :disabled="isMyBlock">
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
import EventBus from "../utils/event-bus";
import * as apiServices from "../services";

import Spinner from "./core/Spinner";
import Avatar from "./core/Avatar";
import Message from "./core/Message";
import Button from "./core/Button";
import ConfirmationModal from "./core/ConfirmationModal";
import InformationModal from "./core/InformationModal";
import TypingIndicator from "./core/TypingIndicator";

export default {
  name: "Chatbox",
  components: {
    Spinner,
    Avatar,
    Message,
    Button,
    ConfirmationModal,
    InformationModal,
    TypingIndicator
  },
  data() {
    return {
      // data for calculating internal component, when add new one you should add it to <resetInternalData> function
      selfUser: "",
      localMessage: "",
      hasNewMessage: false,
      isChatboxOpened: false,
      isSpinnerShowed: false,
      isToolsOpen: false,
      isClearChatModalOpen: false,
      isBlockModalOpen: false,
      isBlockMessageOpen: false,
      isBlockedWarning: false,
      isInitDataShowed: false,
      isSendingMessage: false,
      currentScrollContainerHeight: 0,
      currentPage: 0,

      // data object of user information - should only use userId & roomId
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

    EventBus.$on("newMessageInRoom", async (data) => {
      if (data.messagesFirebase.length > 0) {
        // if (!this.isChatboxOpened) {
        //   const userId = { userId: data.userId };
        //   await this.getInformationUserAndRoom(userId);
        // }

        // Check listening to the correct room then add to chatlog
        if (data.roomId === this.detailRoom.roomId) {
          let newMessage =
            data.messagesFirebase[data.messagesFirebase.length - 1];
          if (!this.checkSelfID(newMessage.user.userId)) {
            // const composer = await this.$refs.composer;
            this.hasNewMessage = true;
          }
          this.detailRoom.messages.push(newMessage);
          this.scrollToEnd();
        }
      }
    });

    // EventBus.$on("openRoomWithoutPushMessage", async (data) => {
    //   if (!this.isChatboxOpened) {
    //     const userId = { userId: data.userId };
    //     await this.getInformationUserAndRoom(userId);
    //   }
    // });
  },
  async mounted() {
    window.addEventListener("message", this.receiveDataRegisterRoomChat, false);

    this.$nextTick(async () => {
      const container = await this.$el.querySelector("#scroll-container");
      let lastScrollTop = 0;
      container.addEventListener(
        "scroll",
        (e) => {
          if (this.detailRoom.messages.length > 0) {
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
          }
        },
        false
      );
    });
  },
  computed: {
    isBlocked() {
      return !this.detailRoom.isMyBlock && this.detailRoom.isBlocked;
    },
    isMyBlock() {
      return this.detailRoom.isMyBlock && this.detailRoom.isBlocked;
    },
    canLoadMoreChatHistories() {
      return this.currentPage < this.detailRoom.totalPages - 1; //page index from 0
    }
  },
  methods: {
    onfocusChatbox() {
      this.autoFocus();
      this.hasNewMessage = false;
    },
    toggleTools() {
      this.isToolsOpen = !this.isToolsOpen;
      this.isClearChatModalOpen = false;
      this.isBlockModalOpen = false;
      this.isBlockMessageOpen = false;
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
      this.hasNewMessage = false;
      this.isChatboxOpened = false;
      this.isSpinnerShowed = false;
      this.isToolsOpen = false;
      this.isClearChatModalOpen = false;
      this.isBlockModalOpen = false;
      this.isBlockMessageOpen = false;
      this.isBlockedWarning = false;
      this.isInitDataShowed = false;
      this.isSendingMessage = false;
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
        if (composer) {
          composer.focus();
        }
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
      // data included {userId: <>, roomId: <>}
      apiServices.getInformationUserAndRoom(data.userId).then((response) => {
        if (response && response.data) {
          const data = userInformationDTO(response.data);
          this.userInformation = data;
          let dataId = {
            userId: this.userInformation.userId
          };
          if (data.roomId) {
            dataId.roomId = this.userInformation.roomId;
          }
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
          if (!this.canLoadMoreChatHistories) {
            this.isInitDataShowed = true;
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
            const amountNewPage =
              response.totalPages - this.detailRoom.totalPages;
            if (amountNewPage === 0) {
              if (!this.canLoadMoreChatHistories) {
                this.isInitDataShowed = true;
              }
              this.isSpinnerShowed = false;
              const data = response.data;
              this.detailRoom.messages = await data
                .reverse()
                .concat(this.detailRoom.messages)
                .filter(function(item) {
                  return this[item.messageId]
                    ? false
                    : (this[item.messageId] = true);
                }, {});

              await this.updateScrollContainerHeight();
              const scrollPosition =
                this.currentScrollContainerHeight - lastPosition - 39; // 39px is the size of spinner
              container.scrollTo(0, scrollPosition);
            } else {
              this.detailRoom.totalPages = response.totalPages;
              this.currentPage += amountNewPage;
              if (this.canLoadMoreChatHistories) {
                const pageNroomId = {
                  page: this.currentPage,
                  roomId: this.detailRoom.roomId
                };
                this.getListMessageHistories(
                  pageNroomId,
                  this.currentScrollContainerHeight
                );
              }
            }
          }
        });
    },
    async submitMessage(text) {
      if (!this.isBlocked) {
        if (text) {
          const newMessage = {
            roomId: this.detailRoom.roomId,
            message: text
          };
          // const mockMessage = {
          //   user: {
          //     userId: this.selfUser.userId,
          //     displayName: this.selfUser.displayName,
          //     userPhotoUrl: this.selfUser.userPhotoUrl
          //   },
          //   roomId: this.detailRoom.roomId,
          //   message: text,
          //   createdDate: new Date()
          // };
          // this.detailRoom.messages.push(mockMessage);
          this.localMessage = "";
          this.isSendingMessage = await true;
          this.scrollToEnd();
          apiServices
            .sendMessage(newMessage)
            .then((response) => {
              if (response && response.data) {
                this.isSendingMessage = false;
              }
            })
            .catch(() => {
              this.isSendingMessage = false;
            });
        }
      } else {
        this.toggleBlockWarning("open");
      }
    },
    toggleClearChatModal(isOpened) {
      if (isOpened) {
        this.isClearChatModalOpen = true;
        this.isToolsOpen = false;
      } else {
        this.isClearChatModalOpen = false;
      }
    },
    toggleBlockModal(isOpened) {
      if (isOpened) {
        this.isBlockModalOpen = true;
        this.isToolsOpen = false;
      } else {
        this.isBlockModalOpen = false;
      }
    },
    toggleBlockWarning(state) {
      // state should be <open> || <close>
      if (state === "open") {
        this.isBlockedWarning = true;
        this.isToolsOpen = false;
      } else if (state === "close") {
        this.isBlockedWarning = false;
      }
    },
    clearChat(roomId) {
      apiServices.clearChat(roomId).then((response) => {
        if (response && response.status === "OK") {
          this.detailRoom.messages = [];
          this.isClearChatModalOpen = false;
        }
      });
    },
    toggleBlockChat(state) {
      // state should be <block> || <unblock>
      if (state === "block") {
        const dataBlock = {
          roomId: this.detailRoom.roomId,
          isBlock: true
        };
        apiServices.toggleBlockUser(dataBlock).then((response) => {
          if (response && response.data) {
            const data = response.data;
            this.detailRoom.isMyBlock = data.isMyBlock;
            this.detailRoom.isBlocked = data.isBlocked;

            this.localMessage = "";
            this.isBlockModalOpen = false;
            this.isBlockMessageOpen = true;
            setTimeout(() => {
              this.isBlockMessageOpen = false;
            }, 2000);
          }
        });
      } else if (state === "unblock") {
        const dataBlock = {
          roomId: this.detailRoom.roomId,
          isBlock: false
        };
        apiServices.toggleBlockUser(dataBlock).then((response) => {
          if (response && response.data) {
            const data = response.data;
            this.detailRoom.isMyBlock = data.isMyBlock;
            this.detailRoom.isBlocked = data.isBlocked;

            this.isToolsOpen = false;
            this.isBlockMessageOpen = true;
            setTimeout(() => {
              this.isBlockMessageOpen = false;
            }, 2000);
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
