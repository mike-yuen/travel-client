<template>
  <div id="appchat">
    <button @click="testApi()">Init Man</button>
    <ChatBox />
    <ChatOrderedList />
  </div>
</template>

<script>
import ChatBox from "./components/ChatBox";
import ChatOrderedList from "./components/ChatOrderedList";
import storage from "./utils/storage";
import * as apiServices from "./services";
const firebase = require("./utils/firebase-sdk");

export default {
  name: "AppChat",
  components: {
    ChatBox,
    ChatOrderedList
  },
  data() {
    return {
      selfUser: ""
      // dataTest: {
      //   page: 0,
      //   limit: 10
      // }
    };
  },
  methods: {
    init() {
      // console.log("running", firebase.db);
    },
    testApi() {
      apiServices.getInformationUserAndRoom(70915).then(() => {
        // console.log("resp", resp);
      });
    }
  },
  async created() {
    this.selfUser = await storage.get("user");
    const userId = this.selfUser.userId;
    firebase.db
      .collection("rooms")
      .where(`participants.${userId}.userId`, "==", userId)
      .orderBy("messages", "desc")
      .limit(5)
      // .collection("rooms", (ref) =>
      //   ref
      //     .where(`participants.${userId}.userId`, "==", userId)
      //     .where(firebase.firestore.FieldPath.documentId(), ">", 33)
      // )
      .onSnapshot(function(querySnapshot) {
        var cities = [];
        querySnapshot.forEach(function(doc) {
          cities.push(doc.data());
        });
        // console.log("Current cities in CA: ", cities);
      });
  }
};
</script>
