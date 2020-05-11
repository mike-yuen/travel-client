<template>
  <div id="appchat">
    <ChatBox v-if="hasFirebaseToken" />
    <ChatOrderedList
      :mobileVersion="false"
      :hasFirebaseToken="hasFirebaseToken"
    />
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
  data() {
    return {
      hasFirebaseToken: false
    };
  },
  async created() {
    await this.getTokenLoginFirebase();
  },
  methods: {
    getTokenLoginFirebase() {
      apiServices.getTokenLoginFirebase().then((response) => {
        if (response && response.data) {
          firebase
            .auth()
            .signInWithCustomToken(response.data)
            .then(() => {
              this.hasFirebaseToken = true;
            });
        }
      });
    }
  },
  destroyed() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.hasFirebaseToken = false;
      });
  }
};
</script>
