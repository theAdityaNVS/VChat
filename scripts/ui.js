class ChatUI {
    constructor(list) {
        this.list = list;
    }
    clear() {
        this.list.innerHTML = '';
    }
    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(), {
                addSuffix: true
            }
        )
        
        // Create elements safely to prevent XSS
        const li = document.createElement('li');
        li.className = 'list-group-item chat';
        
        const usernameSpan = document.createElement('span');
        usernameSpan.className = 'username btn';
        usernameSpan.textContent = data.username; // Use textContent instead of innerHTML
        
        const messageSpan = document.createElement('span');
        messageSpan.className = 'message';
        messageSpan.textContent = data.message; // Use textContent instead of innerHTML
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'time';
        timeSpan.textContent = when;
        
        li.appendChild(usernameSpan);
        li.appendChild(messageSpan);
        li.appendChild(timeSpan);
        
        this.list.appendChild(li);
    }
};