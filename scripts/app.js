const chatList = document.querySelector('.chat-list');

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'shaun');

chatroom.getChats((data) => {
    // console.log(data);
    chatUI.render(data);
})