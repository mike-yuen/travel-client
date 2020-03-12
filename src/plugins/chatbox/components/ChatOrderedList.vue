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
          v-for="(account, index) in chatList"
          :key="`account-${index}`"
        >
          <a
            class="mainlist__inner"
            href="javascript:void(0)"
            v-on:click="selectChatAccount(70915, account.roomId)"
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
                  <div>{{ account.latestMessage.messageId }}</div>
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
        limit: 10
      },
      chatList: {}
    };
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
        process.env.VUE_BASE_URL
      );
    },
    getChatListForRendering() {
      const self = this;
      apiServices.getChatList(this.paramsChatList).then((response) => {
        self.chatList = response.data;
      });
    }
  },
  created() {
    this.getChatListForRendering();
  }
};
</script>

<style lang="scss" scoped>
@import "./ChatOrderedList.scss";
</style>
