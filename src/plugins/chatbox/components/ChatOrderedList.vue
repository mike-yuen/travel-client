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
      <ul>
        <li
          class="mainlist__outer"
          v-for="(account, index) in chatList.data"
          :key="`account-${index}`"
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
              </div>
              <div class="mainlist__seperate">
                <div class="mainlist__username">
                  <span>{{ account.roomName }}</span>
                </div>
                <div class="mainlist__last-message">
                  <span>{{ account.latestMessage.message }}</span>
                </div>
                <div class="mainlist__timestamp">
                  <div>
                    {{ account.latestMessage.createdDate | moment("MM/DD/YY") }}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as apiServices from "../services";
import { chatListDTO } from "../utils/helpers";
import firebase from "../utils/firebase-sdk";
import Avatar from "./core/Avatar";

export default {
  name: "ChatOrderedList",
  components: {
    Avatar
  },
  data() {
    return {
      isListExpanded: false,
      mockUserID: "70000",
      paramsChatList: {
        page: 0,
        limit: 1
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
  methods: {
    toggleList() {
      this.isListExpanded = !this.isListExpanded;
    },
    getTokenLoginFirebase() {
      apiServices.getTokenLoginFirebase().then((response) => {
        if (response && response.data) {
          firebase.auth().signInWithCustomToken(response.data);
          // .catch(function(error) {
          //   console.log("error.message", error.code, error.message);
          // });
        }
      });
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
    getChatListForRendering() {
      apiServices.getChatList(this.paramsChatList).then(async (response) => {
        if (response && response.data) {
          await this.getTokenLoginFirebase();
          this.chatList = chatListDTO(response);
        }
      });
    },
    listenNewMessagesInRoom(lastMessageId) {
      firebase
        .firestore()
        .collection("rooms")
        .doc(this.detailRoom.roomId.toString())
        .collection("messages")
        .where("messageId", ">", lastMessageId)
        .onSnapshot(function(querySnapshot) {
          var messagesFirebase = [];
          querySnapshot.forEach(function(doc) {
            messagesFirebase.push(doc.data());
          });
          // console.log("Current cities in CA: ", messagesFirebase);
        });
    }
    // this.listenNewMessagesInRoom(this.lastMessageId);
  },
  created() {
    this.getChatListForRendering();
  },
  destroyed() {
    firebase.auth().signOut();
  }
};
</script>

<style lang="scss" scoped>
@import "./ChatOrderedList.scss";
</style>
