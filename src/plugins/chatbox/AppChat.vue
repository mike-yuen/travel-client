<template>
  <div id="appchat">
    <ChatBox />
    <ChatOrderedList />
  </div>
</template>

<script>
import ChatBox from "./components/ChatBox";
import ChatOrderedList from "./components/ChatOrderedList";

export default {
  name: "AppChat",
  components: {
    ChatBox,
    ChatOrderedList
  }
};
</script>
