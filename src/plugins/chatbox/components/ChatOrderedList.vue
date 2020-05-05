<template>
  <div :class="[isListExpanded ? 'chatlist--expand' : '', 'chatlist']">
    <div class="chatlist__heading" v-on:click="toggleList">
      <a href="javascript:void(0)">
        <span class="heading">Messages</span>
        <img
          :src="require('../assets/images/icon-chevron-up.svg')"
          alt="Expand List Chat"
          v-if="!isListExpanded"
        />
        <img
          :src="require('../assets/images/icon-chevron-down.svg')"
          alt="Collapse List Chat"
          v-else
        />
      </a>
    </div>
    <div class="mainlist" v-show="isListExpanded">
      <div v-if="chatList.data[0].roomId > 0">
        <transition-group
          class="mainlist__wrapper"
          name="mainlist__outer"
          tag="ul"
        >
          <li
            class="mainlist__outer"
            v-for="account in chatList.data"
            :key="account.roomId"
          >
            <a
              class="mainlist__inner"
              href="javascript:void(0)"
              v-on:click="
                selectChatAccount(
                  account.latestMessage.user.userId,
                  account.roomId
                )
              "
            >
              <div class="mainlist__container">
                <div class="mainlist__avatar">
                  <Avatar
                    :size="32"
                    :userName="account.roomName"
                    :imageUrl="account.roomPhotoUrl"
                  />
                  <!-- The below component I intended to use for indicating this user has a new message that still unread yet -->
                  <!-- Can be used with <isRead> in chatList.data -->
                  <!-- <SpinnerAlert :position="{ top: '7px', right: '-20px' }" /> -->
                </div>
                <div class="mainlist__seperate">
                  <div class="mainlist__username">
                    <span>{{ account.roomName }}</span>
                  </div>
                  <div class="mainlist__last-message">
                    <span v-if="account.latestMessage">
                      {{ account.latestMessage.message }}
                    </span>
                  </div>
                  <div class="mainlist__timestamp">
                    <div v-if="account.latestMessage">
                      {{
                        account.latestMessage.createdDate | moment("MM/DD/YY")
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </transition-group>
        <a
          v-if="canLoadMoreChatList"
          v-on:click="loadMoreChatList"
          class="mainlist__loadmore"
        >
          Load more
        </a>
      </div>
      <div class="mainlist__placeholder" v-else>
        <div>You haven't had any conversation yet.</div>
        <div>Let's start a new chat on social wall.</div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from "../utils/storage";
import * as apiServices from "../services";
import EventBus from "../utils/event-bus";
import { chatListDTO, roomDetailDTO } from "../utils/helpers";
import firebase from "../utils/firebase-sdk";
import Avatar from "./core/Avatar";
// import SpinnerAlert from "./core/SpinnerAlert";

export default {
  name: "ChatOrderedList",
  components: {
    Avatar
    // SpinnerAlert
  },
  data() {
    return {
      selfUser: "",
      isListExpanded: false,
      paramsChatList: {
        page: 0,
        limit: 10
      },
      chatList: {
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
            isBlocked: false
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
    }
  },
  methods: {
    toggleList() {
      this.isListExpanded = !this.isListExpanded;
    },
    selectChatAccount(userId, roomId) {
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
          }
          chatListData.map((userChatData) => {
            // console.log("data", userChatData);
            this.listenNewMessagesInRoom(
              userChatData.roomId,
              userChatData.latestMessage.user.userId,
              userChatData.latestMessage.messageId
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
      array.sort((first) => first[`${property}`] === value && -1);
    },
    listenNewMessagesInRoom(roomId, userId, lastMessageId) {
      const self = this;
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
          // console.log("Current cities in CA: ", roomId, messagesFirebase);
          EventBus.$emit("newMessageInRoom", {
            roomId,
            userId,
            messagesFirebase
          });
          if (messagesFirebase.length > 0) {
            self.orderToTop(self.chatList.data, "roomId", roomId);
          }
        });
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
              }
            }

            // Case Modified Room: Listen all rooms registered and has message
            if (change.type === "modified") {
              const newChat = await change.doc.data();
              const foundExistChat = await self.findExistChat(newChat.roomId);
              const friendId = await self.findFriendId(
                newChat.participants,
                userId
              );
              const payloadDetailRoom = {
                userId: friendId,
                roomId: newChat.roomId
              };
              if (!foundExistChat) {
                self.listenNewMessagesInRoom(
                  newChat.roomId,
                  friendId,
                  newChat.latestMessageId
                );
                await self.createItemInChatList(payloadDetailRoom);
                EventBus.$emit("openRoomWithoutPushMessage", {
                  ...payloadDetailRoom
                });
                // console.log("Modified", newChat);
              }
            }
          });
        });
    },
    createItemInChatList(data) {
      apiServices.getDetailRoom(data).then((response) => {
        if (response && response.data) {
          const data = roomDetailDTO(response.data);
          const latestMessage = data.messages[0];
          const newItem = Object.assign({}, data);
          newItem.latestMessage = latestMessage;
          delete newItem.messages;
          this.chatList.data.unshift(newItem);
        }
      });
    }
  },
  async created() {
    this.selfUser = await storage.get("user");
    await this.getChatListForRendering(this.paramsChatList);
    this.listenNewChatInChatlist();
  }
};
</script>

<style lang="scss" scoped>
@import "./ChatOrderedList.scss";
</style>
