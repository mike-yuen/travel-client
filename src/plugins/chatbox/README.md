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

# Explanation about Chat scenario
Scenario: Let’s call the user that logs in to the web portal and holds the token user A(*). User B is one of A( *)’s friend in the chat list.

## AppChat.vue
To use the chat app, we need to sign in to Firebase using the custom token. When we want to close the app, we need to log out of Firebase.

### - Technical explanation:
- In created() function, getTokenLoginFirebase() function will sign in to Firebase.
- In destroy() function, we use signOut() function of Firebase to log out.

## ChatOrderedList.vue
If user A(*) has had NO chat with anyone before, this chat list will be empty. Otherwise, the chat list for this user will be shown (should be sorted in descending order by the latestMessage's createdDate, however it is currently sorted by ID so we need to ask for support from BE).

When A(*) clicks on user B in chat list, the chat box with B will be opened.

If the chat list has more than 10 friends, Load More button will be show. When A(*) clicks on that button, the chat list will load in 10 more friends.

When a new message comes, this friend will be moved to the top of the chat list.

### - Technical explanation:
- In created() function, there are 2 main jobs: 
  1. getChatListForRendering() will make an API call to get the chat list; and for each friend in the chat list, listenNewMessagesInRoom() function will REGISTER a new subscription for that person.
  2. listenNewChatInChatlist() will listen to Firebase in 2 cases: 
    - Case change.type === "added": when a random user C creates a new chat room with user A(*) but doesn’t send any message. In this case, we simply register this user using listenNewMessagesInRoom().
    - Case change.type === "modified": when a friend in the chat list (who is not yet registered using listenNewMessagesInRoom() function because they are not shown in the first page) chats with user A(*). In this case, we also register this user using listenNewMessagesInRoom() and do some stuff to that make behavior smooth.

- For each friend in the chat list, when we click on their corresponding HTML section, selectChatAccount() function will be triggered. This function also works like the one we use to register a new room from Social Wall. This will open a chat box and pass any data that the chat box needs.

- loadMoreChatList() function works like what its name shows. It uses getChatListForRendering() with “page” value incremented by 1 (page++).

## ChatBox.vue
This component will show us the chat history between A(*) and his friend, E.g. user B.

When A(*) chooses Block on the 3dots menu, a confirmation popup will be opened. If A(*) clicks "Block", A(*) CANNOT send message to B anymore(input message will be disabled).
If B is blocked by A(*), when B tries to send message to A( *), he will receive a fail message.

When A(*) chooses Clear chat, a confirmation popup will be opened. If A( *) clicks "Clear", the chat history in A( *)'s chat box will be cleaned. B's chat box still has the chat history.

### - Technical explanation:
- In mounted() function, there are 2 main jobs:
  1. receiveDataRegisterRoomChat() function: receiving the order to register the new room then executes 2 more ASYNC functions:
  - getInformationUserAndRoom(): get user information for rendering the init data of user in tag <div class="chatframe__init">
  - getDetailRoom(): get information of this room (isBlocked, isMyBlock, report, etc...) and chat history (latest message, corresponding with page 0 in the database) between 2 users.
  2. In $nextTick(): we handle the case where A(*) scrolls to top of the chat box. This code will load more chat history using getListMessageHistories(). It is quite complicated and clumsy; I hope other maintainers could make it better.

- There are 2 EventBus on:
  1. "newMessageInRoom": check condition and push new message
  2. "openRoomWithoutPushMessage": in case of change.type === "modified" in chat list, just open chat box and load chat history.

- Block and Clear Chat are just the way we call the API. I’ve implemented some simple lines of code to make them work so I have nothing to explain.
