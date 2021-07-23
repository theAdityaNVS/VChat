const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message).then(() => {
        newChatForm.reset();
    }).catch((er) => {
        console.log(er);
    })
})

newNameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    updateMsg.innerHTML = `Name has been updated to ${newName}`;
    setTimeout(() => {
        updateMsg.innerHTML = '';
    }, 3000);
});

rooms.addEventListener('click', (e) => {
    // console.log(e);
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

const username = localStorage.username ? localStorage.username : 'Anonymous';

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

chatroom.getChats((data) => {
    // console.log(data);
    chatUI.render(data);
})