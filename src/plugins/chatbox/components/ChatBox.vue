<template>
  <div class="chatbox" v-show="isChatboxOpened" v-on:click="onfocusChatbox()">
    <div class="chatbox__outer">
      <div class="chatbox__inner">
        <div id="chat-titlebar" class="chat-titlebar">
          <div
            class="chat-titlebar__outer"
            :class="{ 'new-message': hasNewMessage }"
          >
            <div class="chat-titlebar__inner">
              <Avatar
                :size="35"
                :userName="detailRoom.roomName"
                :imageUrl="detailRoom.roomPhotoUrl"
                :isAdvisoryCouncil="detailRoom.isAdvisoryCouncil"
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
                            v-bind:class="{
                              'none-action-link':
                                detailRoom.messages.length <= 0
                            }"
                            >Clear chat</a
                          >
                        </li>
                        <li
                          v-if="!detailRoom.isMyBlock && !detailRoom.isBlocked"
                        >
                          <a
                            href="javascript:void(0)"
                            v-on:click="toggleBlockModal(true)"
                            >Block</a
                          >
                        </li>
                        <li v-if="detailRoom.isMyBlock">
                          <a
                            href="javascript:void(0)"
                            v-on:click="toggleBlockChat('unblock')"
                            >Unblock</a
                          >
                        </li>
                        <li>
                          <a href="javascript:void(0)">Report</a>
                        </li>
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
                <Button v-on:onClick="toggleClearChatModal(false)"
                  >Cancel</Button
                >
                <Button
                  v-on:onClick="clearChat(detailRoom.roomId)"
                  v-bind:class="{
                    'none-action-link': isRemovingActionHrefLink
                  }"
                  >Clear</Button
                >
                <Spinner ref="spinner" :size="30" v-show="isSpinnerShowed" />
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
                  Please try later or
                  <a href="#">contact us</a> for details.
                </div>
              </template>
              <template v-slot:action>
                <Button v-on:onClick="toggleBlockWarning('close')">Ok</Button>
              </template>
            </InformationModal>
          </div>
          <div
            id="chatframe__wrapper"
            class="chatframe__wrapper"
            :class="{ iphoneX: isIphoneX }"
          >
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
                    :isAdvisoryCouncil="userInformation.isAdvisoryCouncil"
                  />
                  <div class="chatframe__info">
                    <div class="quote">{{ userInformation.shortBio }}</div>
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
                    v-on:handleResend="submitMessage"
                  />
                  <TypingIndicator v-if="isSendingMessage" />
                  <InlineErrorMessage
                    v-show="isErrorMessage && errorMessages.length > 0"
                    v-html="errorMessages"
                  ></InlineErrorMessage>
                </div>
              </div>
            </div>
          </div>
          <div class="composer" :class="{ 'composer--disabled': isMyBlock }">
            <form @submit.prevent="submitMessage(localMessage)">
              <div class="composer__outer">
                <div class="composer__input">
                  <textarea
                    ref="composer"
                    rows="1"
                    placeholder="Type your message here..."
                    v-model="localMessage"
                    :disabled="isMyBlock"
                    @focus="focusText()"
                    @blur="blurText()"
                    @keyup.enter.exact.prevent="submitMessage(localMessage)"
                    @keypress.ctrl.enter.exact="appendNewLine()"
                    v-if="!isMobile"
                  ></textarea>
                  <textarea
                    ref="composer"
                    rows="1"
                    placeholder="Type your message here..."
                    v-model="localMessage"
                    :disabled="isMyBlock"
                    @focus="focusText()"
                    @blur="blurText()"
                    @keyup.enter.exact="appendNewLine()"
                    v-if="isMobile"
                  ></textarea>
                </div>
                <div class="composer__btn">
                  <button type="submit" :disabled="isMyBlock || !localMessage">
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
  roomDetailDTO,
  iphoneXDetection,
  isMobile
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
import ClickOutside from "vue-click-outside";
import InlineErrorMessage from "./core/InlineErrorMessage";

export default {
  name: "Chatbox",
  components: {
    Spinner,
    Avatar,
    Message,
    Button,
    ConfirmationModal,
    InformationModal,
    TypingIndicator,
    InlineErrorMessage
  },
  data() {
    return {
      // data for calculating internal component, when add new one you should add it to <resetInternalData> function
      selfUser: "",
      windowHeightDefault: 0,
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
      isMobile: false,
      width: 0,
      isAppDiv: false,
      isDisplayContentDiv: false,
      isErrorMessage: false,
      errorMessages: "",
      isRemovingActionHrefLink: false,

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
        limit: 10,
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
        // Check listening to the correct room then add to chatlog
        if (data.roomId === this.detailRoom.roomId) {
          if (this.isChatboxOpened) {
            EventBus.$emit("isRoomOpened", this.detailRoom.roomId);
          }
          let newMessage =
            data.messagesFirebase[data.messagesFirebase.length - 1];
          if (!this.checkSelfID(newMessage.user.userId)) {
            // const composer = await this.$refs.composer;
            this.hasNewMessage = true;
          }
          this.isSendingMessage = false;
          this.detailRoom.messages.push(newMessage);
          this.scrollToEnd();
        }
      }
    });
    this.isMobile = isMobile();
    if (document.getElementById("app")) {
      this.isAppDiv = true;
    }
    if (
      document.getElementsByClassName("display-content") &&
      document.getElementsByClassName("display-content")[0]
    ) {
      this.isDisplayContentDiv = true;
    }
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

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
                this.ceilPage();
                const pageNroomId = {
                  page: this.currentPage,
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
      //listen 'Changing Profile' event
      EventBus.$on("newChangeProfileDetailRoom", async (data) => {
        //update room name and avatar
        this.detailRoom.roomName = data.displayName;
        this.detailRoom.roomPhotoUrl = data.userPhotoUrl;

        //update room name and avatar in the history messages
        this.detailRoom.messages.forEach((element, index) => {
          if (element.user.userId == data.userUpdateProfileId) {
            this.detailRoom.messages[index].user.displayName = data.displayName;
            this.detailRoom.messages[index].user.userPhotoUrl =
              data.userPhotoUrl;
          }
        });
      });
    });
  },
  computed: {
    isIphoneX() {
      return iphoneXDetection();
    },
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
    isIOS() {
      return (
        (/iPad|iPhone|iPod/.test(navigator.platform) ||
          (navigator.platform === "MacIntel" &&
            navigator.maxTouchPoints > 1)) &&
        !window.MSStream
      );
    },
    setHeaderResize() {
      if (this.isIOS()) {
        setTimeout(() => {
          this.windowHeightDefault = window.innerHeight;
          this.removeHeaderFixed();
          this.$refs.composer.blur();
        }, 300);
      }
    },
    setHeaderFixed() {
      var interval = setInterval(() => {
        if (this.windowHeightDefault < window.innerHeight) {
          this.windowHeightDefault = window.innerHeight;
        }
        if (this.windowHeightDefault !== window.innerHeight) {
          let titlebar = document.getElementById("chat-titlebar");
          titlebar.style.top = pageYOffset + "px";
          document.getElementById("chatframe__wrapper").style.marginTop =
            pageYOffset + "px";
          let scrollContainer = document.getElementById("scroll-container");
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
          this.$refs.composer.ontouchmove = (event) => {
            event.preventDefault();
          };
          titlebar.ontouchmove = (event) => {
            event.preventDefault();
          };
          clearInterval(interval);
        }
      }, 300);
      interval;
    },
    removeHeaderFixed() {
      document.getElementById("chat-titlebar").style.top = "0px";
      document.getElementById("chatframe__wrapper").style.marginTop = "0px";
    },
    focusText() {
      if (this.isIOS() && window.innerWidth <= 780) {
        this.setHeaderFixed();
      }
    },
    blurText() {
      if (this.isIOS() && window.innerWidth <= 780) {
        setTimeout(() => {
          if (
            this.windowHeightDefault > window.innerHeight - 150 &&
            this.windowHeightDefault < window.innerHeight + 150
          ) {
            this.removeHeaderFixed();
          }
        }, 300);
      }
    },
    onfocusChatbox() {
      this.autoFocus();
      this.hasNewMessage = false;
    },
    toggleTools() {
      if (!this.isSpinnerShowed) {
        this.isToolsOpen = !this.isToolsOpen;
        this.isClearChatModalOpen = false;
        this.isBlockModalOpen = false;
        this.isBlockMessageOpen = false;
      }
    },
    closeTools() {
      this.isToolsOpen = false;
    },
    async closeChatbox() {
      EventBus.$emit("isRoomOpened", 0);
      this.markRead();
      this.isChatboxOpened = false;
      this.resetInternalData();
      document.getElementsByName("viewport")[0].content =
        "width=device-width, initial-scale=1";
      this.handleDisplayParentContent("remove", "d-none");
      document
        .getElementsByClassName("maincontainer")[0]
        .classList.remove("articleoverlay");
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
        if (
          data.roomId !== this.detailRoom.roomId &&
          this.detailRoom.roomId > 0
        ) {
          this.closeChatbox();
        }
        this.getInformationUserAndRoom(data);
      }
    },
    getInformationUserAndRoom(data) {
      this.isChatboxOpened = true;
      this.isSpinnerShowed = true;
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
          this.getDetailRoom(dataId);
        } else {
          this.isErrorMessage = true;
          this.errorMessages =
            "<span>User isn't existed.<br/>Please refresh page to reload the list chat.</span>";
          this.isSpinnerShowed = false;
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
          this.scrollToEnd();
          this.autoFocus();
          setTimeout(() => {
            this.updateScrollContainerHeight();
          });
        } else {
          this.isInitDataShowed = true;
          this.isErrorMessage = true;
          this.errorMessages = "Room isn't existed";
        }
        this.isSpinnerShowed = false;
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
              //Retrieving data list and reversing data to show the lastest ones first
              //And merging old records to new records
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
        if (text.trim()) {
          const newMessage = {
            roomId: this.detailRoom.roomId,
            message: text
          };
          this.localMessage = await "";
          this.isSendingMessage = await true;
          apiServices
            .sendMessage(newMessage)
            .then((response) => {
              if (response && response.data) {
                this.isSendingMessage = false;
              }
            })
            .catch(() => {
              this.isSendingMessage = false;
              let sendFailed = {
                message: newMessage.message,
                user: this.selfUser ? this.selfUser : storage.get("user"),
                isFail: true
              };
              this.detailRoom.messages.push(sendFailed);
            });
        }
      } else {
        this.toggleBlockWarning("open");
      }
    },
    appendNewLine() {
      this.localMessage = `${this.localMessage}\n`;
    },
    async autoSizeComposer() {
      const el = await this.$refs.composer;
      el.style.cssText = "height:auto";
      el.style.cssText = "height:" + el.scrollHeight + "px";
    },
    toggleClearChatModal(isOpened) {
      const composer = this.$refs.composer;
      if (isOpened) {
        composer.setAttribute("disabled", "");
        this.isClearChatModalOpen = true;
        this.isToolsOpen = false;
      } else {
        composer.removeAttribute("disabled");
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
      this.isRemovingActionHrefLink = true;
      apiServices.clearChat(roomId).then((response) => {
        if (response && response.status === "OK") {
          this.detailRoom.messages = [];
          this.detailRoom.totalElements = 0;
          this.detailRoom.totalPages = 0;
          this.currentPage = 0;
          EventBus.$emit("isClearedRoom", roomId);
          this.isClearChatModalOpen = false;
          this.isRemovingActionHrefLink = false;
          this.$refs.composer.removeAttribute("disabled");
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
    },
    markRead() {
      apiServices.markRead(this.detailRoom.roomId);
    },
    handleResize() {
      this.width = window.innerWidth;
    },
    handleDisplayParentContent(action, className) {
      action = action ? action : this.width <= 780 ? "add" : "remove";
      className = !className ? "d-none" : className;

      if (this.isAppDiv) {
        document.getElementById("app").classList[action](className);
      }

      if (this.isDisplayContentDiv) {
        document
          .getElementsByClassName("display-content")[0]
          .classList[action](className);
      }
    },
    ceilPage() {
      if (this.currentPage <= 0) {
        const ceilPage =
          this.detailRoom.messages.length / this.detailRoom.limit;
        this.currentPage = Math.ceil(ceilPage);
      } else {
        this.currentPage += 1;
      }
    }
  },
  watch: {
    localMessage() {
      this.autoSizeComposer();
    },
    width: {
      handler() {
        this.setHeaderResize();
        if (this.isChatboxOpened) {
          this.handleDisplayParentContent(null, "d-none");
        }
      },
      immediate: true
    },
    isChatboxOpened() {
      if (this.isChatboxOpened) {
        this.handleResize();
        document.getElementsByName("viewport")[0].content =
          "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1";
        this.handleDisplayParentContent(null, "d-none");
      }
    }
  },
  detroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="scss" scoped>
@import "./ChatBox.scss";
</style>
