## Plugin setup

### - Install firebase bundle & some bundles in main source

- npm install --save firebase
- npm install --save axios
- npm install --save vue-moment

### - Intergrate API chat

- update variable in .env.\* file or update in global variable of production server:
  - VUE_APP_BASE_URL: url of current website included protocol and port (for local)
  - VUE_APP_CHAT_API: url of api

### - Import plugin to main JS file

- import "~path/to/plugin/chatbox"

### - Create DOM node to render app chat in main HTML file

- create a div tag with ID is #appchat

### - The way to send message

window.postMessage (
  JSON.stringify({
    type: "sendDataRegisterRoomChat",
    data: { userId: ???, roomId: ??? }
  }),
  process.env.VUE_APP_BASE_URL
);

### - Explaination about Chat scenario
Subjunctive: We call the user that login to web and have the token that A(*) and user B is friend in list chat of A( *).

## - AppChat.vue
To use the app chat, we need signin firebase with the custom token and when destroy we need to logout firebase.

# - Technical explaination:
- In created() function, getTokenLoginFirebase() function will signin firebase.
- In destroy() function, we use signOut() function of firebase to logout.

## - ChatOrderedList.vue
If A(*) user have NO chat with anyone before, this chatlist will empty, else the chatlist of this user will be shown (should be ordered by the lastMessage's createdDate, however it currently sort by ID. So we need to ask for support from BE).

When A(*) click to B user in list chat, the chatbox with B will be opened.

If chatlist have more than 10 friends, Load More button will be show, when A(*) click button, chatlist will load 10 friends.

When new message comes, this friend will be moved to the top of list chat.

# - Technical explaination:
- In created() function, there are 2 main jobs: 
  1. getChatListForRendering() will call API to get chatlist and for each friend of chatlist, listenNewMessagesInRoom() function wil REGISTER new subcribe for him.
  2. listenNewChatInChatlist() will listen to firebase with 2 case: 
    - Case change.type === "added": action when a random user C creates new chat room with A(*) user but not send any message yet. In this case, we simply register this user with listenNewMessagesInRoom().
    - Case change.type === "modified": action when our friend in chatlist (but they are not registered with listenNewMessagesInRoom() function because they are not in first page) chat with us. In this case, we register this user with listenNewMessagesInRoom() too and do some stuffs that makes behavior smooth.

- In each friend in HTML listchat, when we click on it that will trigger selectChatAccount() function. This function is working likes the one we use to register new room from Social Wall. This will help opening chatbox and pass data chatbox needs.

- loadMoreChatList() function works like its name, use getChatListForRendering() with the page++

## - ChatBox.vue
This component will show us chat history between A(*) and his friend, e.g. B user.

When A(*) choose Block on 3dots menu, confirm popup will be opened, and A( *) click "Block", A( *) can NOT send message to B (input message will be disabled).
If B is blocked by A(*), when he try to send message to A( *), he will receive the fail message.

When A(*) choose Clear chat, confirm popup will be opened, and A( *) click "Clear", chat history in A's chatbox will be cleaned. B's chatbox still has chat history.

# - Technical explaination:
- In mounted() function, there are 2 main jobs:
  1. receiveDataRegisterRoomChat() function: receiving the order to register the new room then execute 2 more ASYNC functions:
  - getInformationUserAndRoom(): get user information for rendering the init data of user in tag <div class="chatframe__init">
  - getDetailRoom(): get information of this room (isBlocked, isMyBlock, report, etc...) and chat history (latest message, it means page 0 in databse) between 2 users.
  2. In $nextTick(): we handle the case that A(*) scroll to top of chatbox, this code will load more chat history by getListMessageHistories(), it quite complicate and clumsy, I hope any maintainer can make it better.

- There are 2 EventBus on:
  1. "newMessageInRoom": check condition and push new message
  2. "openRoomWithoutPushMessage": for case change.type === "modified" in Chatlist, just open chatbox and load chat history.

- Block and Clear Chat's just the way we call api and make some practical code to implement it. So I have nothing to explain. 
