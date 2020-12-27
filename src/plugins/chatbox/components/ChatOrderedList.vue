<template>
  <div
    :class="[
      isListExpanded || mobileVersion ? 'chatlist--expand' : '',
      !mobileVersion ? 'chatlist--desktop' : 'chatlist--mobile',
      hasUnreadUser ? 'chatlist--unread' : '',
      'chatlist'
    ]"
  >
    <div class="chatlist__heading" v-on:click="toggleList">
      <a href="javascript:void(0)">
        <div class="chatlist__header">
          Messages
          <span
            class="chatlist__header--unread"
            v-if="chatList.countAllUnreadMessage > 0"
            >{{
              chatList.countAllUnreadMessage > 99
                ? "99+"
                : chatList.countAllUnreadMessage
            }}</span
          >
        </div>
        <img
          :src="require('../assets/images/icon-chevron-up-cyan.svg')"
          alt="Expand List Chat"
          v-if="!isListExpanded && !hasUnreadUser"
        />
        <img
          :src="require('../assets/images/icon-chevron-up.svg')"
          alt="Expand List Chat"
          v-if="!isListExpanded && hasUnreadUser"
        />
        <img
          :src="require('../assets/images/icon-chevron-down.svg')"
          alt="Collapse List Chat"
          v-if="isListExpanded"
        />
      </a>
    </div>
    <div class="mainlist" v-show="isListExpanded || mobileVersion">
      <div v-if="chatList.data[0] && chatList.data[0].roomId > 0">
        <ul class="mainlist__wrapper">
          <li
            class="mainlist__outer"
            v-for="account in chatList.data"
            :key="account.roomId"
            :id="account.roomId"
          >
            <a
              class="mainlist__inner"
              :class="[
                isUnread(account, account.roomId)
                  ? 'mainlist__inner--unread'
                  : '',
                account.isHidden == true ? 'd-none' : ''
              ]"
              href="javascript:void(0)"
              v-on:click.prevent="
                selectChatAccount(account.userId, account.roomId)
              "
            >
              <div class="mainlist__container">
                <div class="mainlist__avatar">
                  <Avatar
                    :size="32"
                    :userName="account.roomName"
                    :imageUrl="account.roomPhotoUrl"
                    :isAdvisoryCouncil="account.isAdvisoryCouncil"
                  />
                  <!-- The below component I intended to use for indicating this user has a new message that still unread yet -->
                  <!-- Can be used with <isRead> in chatList.data -->
                  <!-- <SpinnerAlert :position="{ top: '7px', right: '-20px' }" /> -->
                </div>
                <div class="mainlist__seperate">
                  <div class="mainlist__user">
                    <div class="mainlist__username">
                      <span>{{ account.roomName }}</span>
                    </div>
                    <div class="mainlist__last-message">
                      <span
                        v-if="account.latestMessage"
                        v-bind:class="{
                          'font-weight-bold': account.countUnreadMessage > 0
                        }"
                        >{{ account.latestMessage.message }}</span
                      >
                    </div>
                  </div>
                  <div class="mainlist__timestamp">
                    <div class="mainlist__count-message">
                      <div
                        class="mainlist__timestamp-day"
                        v-if="account.latestMessage"
                      >
                        <span>{{
                          formatDateString(account.latestMessage.createdDate)
                        }}</span>
                      </div>
                      <div
                        class="mainlist__timestamp-count"
                        v-show="account.countUnreadMessage > 0"
                      >
                        <span
                          class="mainlist__span-count"
                          v-show="isUnread(account, account.roomId)"
                          >{{
                            account.countUnreadMessage > 99
                              ? "99+"
                              : account.countUnreadMessage
                          }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <a
          v-if="canLoadMoreChatList"
          v-on:click="loadMoreChatList"
          class="mainlist__loadmore"
          >Load more</a
        >
      </div>
      <div class="mainlist__placeholder" v-else>
        <div>No messages yet. Select a community</div>
        <div>member and start a conversation!</div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "../utils/storage";
import * as apiServices from "../services";
import EventBus from "../utils/event-bus";
import { chatListDTO, getDurationDate } from "../utils/helpers";
import firebase from "../utils/firebase-sdk";
import Avatar from "./core/Avatar";

export default {
  name: "ChatOrderedList",
  components: {
    Avatar
    // SpinnerAlert
  },
  props: {
    mobileVersion: {
      type: Boolean,
      default: true
    },
    hasFirebaseToken: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selfUser: "",
      isListExpanded: false,
      roomIsOpened: 0,
      roomsRegisteredNewCase: [],
      paramsChatList: {
        page: 0,
        limit: 60
      },
      chatList: {
        countAllUnreadMessage: 0,
        countUserUnreadMessage: 0,
        data: [
          {
            roomId: 0,
            roomName: "",
            roomPhotoUrl: "",
            latestMessage: {
              messageId: 0,
              roomId: 0,
              user: {
                userId: 0,
                displayName: "",
                userPhotoUrl: ""
              },
              message: "",
              createdDate: "",
              isRead: false
            },
            isBlocked: false,
            isHidden: false
          }
        ],
        page: 0,
        limit: 0,
        totalPages: 0,
        totalElements: 0
      }
    };
  },
  computed: {
    canLoadMoreChatList() {
      return (
        this.chatList.data.length < this.chatList.totalElements &&
        this.paramsChatList.page < this.chatList.totalPages - 1 //page index from 0
      );
    },
    hasUnreadUser() {
      return this.chatList.countAllUnreadMessage > 0;
    }
  },
  mounted() {
    EventBus.$on("isRoomOpened", (data) => {
      this.roomIsOpened = data;
    });
    EventBus.$on("newMessageInRoom", async (dataFirebase) => {
      // console.log('dataFirebase', dataFirebase);
      const indexUser = await this.chatList.data.findIndex(
        (data) => data.roomId === dataFirebase.roomId
      );
      if (indexUser > -1) {
        const newMessage = await dataFirebase.messagesFirebase[
          dataFirebase.messagesFirebase.length - 1
        ];
        this.chatList.data[indexUser].latestMessage = newMessage;

        if (newMessage.countUnreadMessage > 0) {
          const newCountUserUnreadMessage = newMessage.countUnreadMessage;
          //update new the total of unread messages by user
          //will plus the total number of new messages (in 'latestMessage' group)
          //and will minus the total number of new messages
          const isRoomAvailable = this.checkRoomIsAvailable(
            dataFirebase.roomId
          );

          if (isRoomAvailable) {
            this.chatList.countAllUnreadMessage +=
              newCountUserUnreadMessage -
              this.chatList.data[indexUser].countUnreadMessage;

            //update the last total of the unread messages by user
            this.chatList.data[
              indexUser
            ].countUnreadMessage = newCountUserUnreadMessage;
          }

          //if the selected room was hidden before, it will be set to display again
          this.setHiddenRoomInList(dataFirebase.roomId, false);
        }
      }
      this.orderToTop(this.chatList.data, "roomId", dataFirebase.roomId);
    });
    EventBus.$on("isClearedRoom", (data) => {
      this.setHiddenRoomInList(data, true);
    });
    EventBus.$on("newChangeProfileData", (data) => {
      if (this.chatList.data.length > 0) {
        const indexChatList = this.chatList.data.findIndex((value) => {
          return value.userId == data.userUpdateProfileId;
        });
        if (indexChatList > -1) {
          this.chatList.data[indexChatList].roomName = data.displayName;
          this.chatList.data[indexChatList].roomPhotoUrl = data.userPhotoUrl;
          if (this.roomIsOpened > 0) {
            data.detailUserRoomId = this.chatList.data[indexChatList].roomId;
            EventBus.$emit("newChangeProfileDetailRoom", data);
          }
        }
      }
    });
  },
  methods: {
    formatDateString(date) {
      return getDurationDate(this, date);
    },
    checkRoomIsAvailable(roomId) {
      if (
        this.roomIsOpened <= 0 ||
        (this.roomIsOpened > 0 && roomId > 0 && roomId !== this.roomIsOpened)
      ) {
        return true;
      } else {
        return false;
      }
    },
    isUnread(user, roomId) {
      const isRoomAvailable = this.checkRoomIsAvailable(roomId);
      return isRoomAvailable ? user.countUnreadMessage > 0 : false;
    },
    toggleList() {
      this.isListExpanded = !this.isListExpanded;
    },
    selectChatAccount(userId, roomId) {
      this.roomIsOpened = roomId;
      const indexUser = this.chatList.data.findIndex(
        (data) => data.roomId === roomId
      );
      //select room to chat by room id
      //find an index of user on list
      if (indexUser !== -1) {
        //update the total of the unread messages on list chat
        this.chatList.countAllUnreadMessage -= this.chatList.data[
          indexUser
        ].countUnreadMessage;
        //reset the total of the unread messages of selected user by user id and room id
        this.chatList.data[indexUser].countUnreadMessage = 0;
      }
      //config to send and register room chat by user id and room id
      //if it don't display, it will be displayed
      const dataRegisterChat = { userId: userId, roomId: roomId };
      window.postMessage(
        JSON.stringify({
          type: "sendDataRegisterRoomChat",
          data: dataRegisterChat
        }),
        process.env.VUE_APP_BASE_URL
      );
    },
    getChatListForRendering(payload) {
      // payload included {page: <>, limit: 10}
      apiServices.getChatList(payload).then(async (response) => {
        if (response && response.data) {
          const chatList = await chatListDTO(response);
          const chatListData = await chatList.data;

          if (this.chatList.data[0].roomId === 0) {
            this.chatList = await chatList;
          } else {
            Object.keys(this.chatList).forEach((key) => {
              if (key !== "data") {
                this.chatList[key] = chatList[key];
              }
            });
            this.chatList.data = await this.chatList.data
              .concat(chatListData)
              .filter(function(item) {
                return this[item.roomId] ? false : (this[item.roomId] = true);
              }, {});
            //console.log("room", this.chatList);
          }
          chatListData.map((userChatData) => {
            //console.log("data", userChatData);
            this.listenNewMessagesInRoom(
              userChatData.roomId,
              userChatData.userId,
              userChatData.latestMessageId
            );
          });
        }
      });
    },
    loadMoreChatList() {
      if (this.canLoadMoreChatList) {
        this.paramsChatList.page++;
        this.getChatListForRendering(this.paramsChatList);
      }
    },
    findExistChat(newRoomId) {
      return this.chatList.data.some((data) => data.roomId === newRoomId);
    },
    findFriendId(arrayId, selfId) {
      return Object.keys(arrayId).find((data) => data != selfId);
    },
    orderToTop(array, property, value) {
      array.sort((first, second) => {
        return first[property] === value
          ? -1
          : second[property] === value
          ? 1
          : 0;
      });
    },
    listenNewMessagesInRoom(roomId, userId, lastMessageId) {
      if (!this.mobileVersion) {
        firebase
          .firestore()
          .collection("rooms")
          .doc(roomId.toString())
          .collection("messages")
          .where("messageId", ">", lastMessageId)
          .onSnapshot(function(querySnapshot) {
            let messagesFirebase = [];
            querySnapshot.forEach(function(doc) {
              messagesFirebase.push(doc.data());
            });
            // console.log('messagesFirebase',messagesFirebase)
            if (messagesFirebase.length > 0) {
              EventBus.$emit("newMessageInRoom", {
                roomId,
                userId,
                messagesFirebase
              });
            }
          });
      }
    },
    async listenNewChatInChatlist() {
      const self = this,
        userId = await this.selfUser.userId;
      firebase
        .firestore()
        .collection("rooms")
        .where(`participants.${userId}.userId`, "==", userId)
        .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(async function(change) {
            // Case New Room: Listen new room registered but has no message
            if (change.type === "added") {
              const newChat = await change.doc.data();
              const foundExistChat = await self.findExistChat(newChat.roomId);
              const friendId = await self.findFriendId(
                newChat.participants,
                userId
              );
              if (!foundExistChat && !newChat.latestMessageId) {
                // console.log("register new", newChat);
                self.listenNewMessagesInRoom(newChat.roomId, friendId, 0);
                if (
                  self.roomsRegisteredNewCase.indexOf(newChat.roomId) === -1
                ) {
                  self.roomsRegisteredNewCase.push(newChat.roomId);
                }
              }
            }

            // Case Modified Room: Listen all rooms registered and has message
            if (change.type === "modified") {
              const newChat = await change.doc.data();
              // console.log("register modified", newChat);
              const foundExistChat = await self.findExistChat(newChat.roomId);
              const friendId = await self.findFriendId(
                newChat.participants,
                userId
              );
              if (!foundExistChat) {
                const latestMessageId = newChat.latestMessageId || 0;
                const isNotRegisteredRoom =
                  self.roomsRegisteredNewCase.indexOf(newChat.roomId) === -1;
                await self.createItemInChatList(newChat.roomId);
                if (latestMessageId && isNotRegisteredRoom) {
                  await self.listenNewMessagesInRoom(
                    newChat.roomId,
                    friendId,
                    latestMessageId
                  );
                }
              }
            }
          });
        });
    },
    //create new listening for new user which don't exit in list chat
    createItemInChatList(roomId) {
      apiServices.getRoomInChatList(roomId).then(async (response) => {
        if (response && response.data) {
          const data = await response.data;
          const foundExistChat = await this.findExistChat(roomId);
          if (!foundExistChat) {
            this.chatList.data.unshift(data);
            if (data.countUnreadMessage > 0) {
              this.chatList.countAllUnreadMessage += data.countUnreadMessage;
            }
          }
        }
      });
    },
    setHiddenRoomInList(roomId, isHidden) {
      this.chatList.data.forEach((current, index) => {
        if (current.roomId == roomId) {
          current.isHidden = isHidden ? isHidden : false;
          return this.$set(this.chatList.data, index, current);
        }
      });
    },
    async listenNewChangeProfile() {
      firebase
        .firestore()
        .collection("events")
        .where("eventType", "==", "eventUpdateProfile")
        .onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            if (Object.keys(data).length > 0 && data.constructor === Object) {
              EventBus.$emit("newChangeProfileData", data);
            }
          });
        });
    },
    async listenNewCounterInCommunity() {
      const userId = await this.selfUser.userId;
      firebase
        .firestore()
        .collection("posts")
        .doc(userId.toString())
        .onSnapshot(function(querySnapshot) {
          const data = querySnapshot.data();
          if (data) {
            const countNewPost = data.countNewPost;
            const isDisplay = countNewPost > 0 ? "inline-block" : "none";

            if (document.getElementById("counter-community-desktop")) {
              const swDesktop = document.getElementById(
                "counter-community-desktop"
              );
              swDesktop.innerHTML = countNewPost;
              swDesktop.style.display = isDisplay;
            }

            if (document.getElementById("counter-community-mobile")) {
              const swMobile = document.getElementById(
                "counter-community-mobile"
              );
              swMobile.innerHTML = countNewPost;
              swMobile.style.display = isDisplay;
            }
          }
        });
    }
  },
  async created() {
    this.selfUser = await storage.get("user");
    if (this.mobileVersion) {
      this.getChatListForRendering(this.paramsChatList);
      this.listenNewChatInChatlist();
    }
  },
  watch: {
    hasFirebaseToken(newVal) {
      if (newVal) {
        this.getChatListForRendering(this.paramsChatList);
        this.listenNewChatInChatlist();
        this.listenNewChangeProfile();
        this.listenNewCounterInCommunity();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./ChatOrderedList.scss";
</style>
