<template>
  <div id="appchat">
    <ChatBox />
    <ChatOrderedList />
  </div>
</template>

<script>
import storage from "./utils/storage";
import firebase from "./utils/firebase-sdk";
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
      selfUser: ""
    };
  },
  async created() {
    this.selfUser = await storage.get("user");
    this.listenNewRoom();
  },
  methods: {
    async listenNewRoom() {
      const userId = await this.selfUser.userId;
      firebase
        .firestore()
        .collection("rooms")
        .where(`participants.${userId}.userId`, "==", userId)
        .onSnapshot(function(snapshot) {
          snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
              // console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
              // console.log("Modified city: ", change.doc.data());
            }
          });
        });
    }
  }
};
</script>
