const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

newChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message).then(() => {
        newChatForm.reset();
    }).catch((er) => {
        console.log(er);
    })
})

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'shaun');

chatroom.getChats((data) => {
    // console.log(data);
    chatUI.render(data);
})