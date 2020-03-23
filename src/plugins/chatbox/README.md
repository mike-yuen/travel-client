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
    type: "sendDataRegisterRoomChat", ------------------- Don't change type of message please
    data: << { userId: ???, roomId: ??? } >>
  }),
  process.env.VUE_BASE_URL
);
