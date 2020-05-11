<template>
  <div id="appchat">
    <ChatBox />
    <ChatOrderedList :mobileVersion="false" />
  </div>
</template>

<script>
import firebase from "./utils/firebase-sdk";
import * as apiServices from "./services";
import ChatBox from "./components/ChatBox";
import ChatOrderedList from "./components/ChatOrderedList";

export default {
  name: "AppChat",
  components: {
    ChatBox,
    ChatOrderedList
  },
  async created() {
    await this.getTokenLoginFirebase();
  },
  methods: {
    getTokenLoginFirebase() {
      apiServices.getTokenLoginFirebase().then((response) => {
        if (response && response.data) {
          firebase.auth().signInWithCustomToken(response.data);
        }
      });
    }
  },
  destroyed() {
    firebase.auth().signOut();
  }
};
</script>
