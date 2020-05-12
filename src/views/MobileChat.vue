<template>
  <ChatList />
</template>

<script>
import ChatList from "@/plugins/chatbox/components/ChatOrderedList";
export default {
  name: "MobileChat",
  components: {
    ChatList
  },
  data() {
    return {
      width: 0
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
    }
  },
  watch: {
    width() {
      if (this.width > 780) {
        // Using router to redirect to homepage
        // this.$router.push({ name: '/' });
        window.location.pathname = "/";
      }
    }
  }
};
</script>
