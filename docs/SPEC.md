# Technical Specification - VChat

## 1. System Overview
VChat is a serverless, single-page application (SPA) relying on Firebase Firestore for persistence and real-time data synchronization. The frontend is built with vanilla JavaScript, utilizing ES6 classes for modularity and separation of concerns.

## 2. Architecture
The application implements a simplified MVC (Model-View-Controller) pattern:
- **Model**: `Chatroom` class (Data logic & Firebase interaction).
- **View**: `ChatUI` class (DOM rendering).
- **Controller**: `app.js` (Event listeners & instantiation).

## 3. Class Definitions

### 3.1 Chatroom (`scripts/chat.js`) - Data Layer
Responsible for all database interactions and state management regarding the chat connection.

**Current Implementation**: Class-based OOP approach with Firebase Firestore integration.

**Properties:**
- `room` (string): Current chat room identifier (e.g., 'general').
- `username` (string): Current user's display name.
- `chats` (object): Firebase Firestore collection reference (`chats`).
- `unsub` (function): Unsubscribe function for the current Firestore listener to prevent memory leaks.

**Methods:**
- `constructor(room, username)`: Initializes room, username, and database reference.
- `addChat(message)`:
  - Constructs a chat object with `message`, `room`, `username`, and `created_at` (Firestore Timestamp).
  - Saves the document to the `chats` collection.
  - Returns a Promise.
- `getChats(callback)`:
  - Establishes a real-time listener (`onSnapshot`) for documents where `room` matches the current room.
  - Orders results by `created_at`.
  - Invokes the `callback` function with document data for every `added` change type.
  - Assigns the listener's unsubscribe function to `this.unsub`.
- `updateName(username)`:
  - Updates `this.username`.
  - Persists the new username to `localStorage`.
- `updateRoom(room)`:
  - Updates `this.room`.
  - Executes `this.unsub()` if it exists to detach the previous listener.

### 3.2 ChatUI (`scripts/ui.js`) - Presentation Layer
Responsible for rendering the chat interface and formatting data.

**Security Note**: V1 now uses safe DOM element creation (not innerHTML) to prevent XSS attacks.

**Properties:**
- `list` (HTMLElement): The DOM element (`<ul>`) where chat messages are appended.

**Methods:**
- `constructor(list)`: Initializes the list element reference.
- `render(data)`:
  - Receives a chat data object.
  - Formats the `created_at` timestamp using `dateFns.distanceInWordsToNow` (requires conversion to JS Date).
  - Generates an HTML template string for the message item.
  - Appends the HTML to `this.list`.
- `clear()`:
  - Clears `this.list.innerHTML` (invoked when switching rooms).

## 4. Data Schema (Firestore)
**Collection**: `chats`

| Field | Type | Description |
| :--- | :--- | :--- |
| `message` | String | The content of the chat message. |
| `username` | String | Display name of the sender. |
| `room` | String | The room identifier (e.g., 'general', 'gaming'). |
| `created_at` | Timestamp | Server timestamp of when the message was created. |

## 5. Application Logic (`scripts/app.js`)
**Initialization:**
1. Retrieves username from `localStorage` (defaults to "Anonymous").
2. Instantiates `ChatUI` and `Chatroom`.
3. Starts the chat stream via `chatroom.getChats()`.

**Event Handling:**
- **Message Submission**: Captures form submit, invokes `addChat`, and resets the form.
- **Username Update**: Captures form submit, invokes `updateName`, and displays feedback.
- **Room Switching**: Listens for clicks on room buttons (using IDs matching room names), clears the UI, updates the room in `Chatroom`, and re-subscribes to the chat stream.

## 6. Deployment
- **Platform**: Vercel (modern static hosting)
- **Configuration**: See `config/vercel.json`
- **Security Rules**: Firestore rules in `config/firestore.rules`
- **Old Method**: Previously Heroku via PHP buildpack (deprecated)