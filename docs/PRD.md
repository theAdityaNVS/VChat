# Product Requirements Document (PRD) - VChat

## 1. Product Overview
VChat is a real-time, multi-channel chat application designed to facilitate instant communication across specific topic-based rooms. It leverages Firebase Firestore for backend services and vanilla JavaScript for frontend logic, providing a lightweight and responsive user experience without complex build steps.

## 2. Objectives
- Provide a seamless real-time chat experience.
- Allow users to switch between different topic channels (rooms).
- Persist user identity (username) across sessions locally.
- Maintain a clean separation of concerns in the codebase (Data vs. UI).

## 3. Technical Architecture
The application follows a class-based Object-Oriented Programming (OOP) pattern with a three-layer separation of concerns:
1.  **Data Layer (`Chatroom` class)**: Handles Firebase Firestore interactions, managing chat room subscriptions and message additions.
2.  **Presentation Layer (`ChatUI` class)**: Manages DOM manipulation, rendering messages, and formatting timestamps.
3.  **Application Layer (`app.js`)**: Acts as the controller, handling event listeners, initialization, and bridging the Data and Presentation layers.

### Tech Stack
-   **Backend**: Firebase Firestore (NoSQL Database).
-   **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3.
-   **Styling**: Bootstrap 5 framework.
-   **Utilities**: `date-fns` for timestamp formatting.
-   **Deployment**: Vercel (modern static hosting).
-   **Security**: XSS-protected DOM rendering (February 2026 update).

## 4. Functional Requirements

### 4.1 User Identification
-   **Username Storage**: Usernames are stored in the browser's `localStorage`.
-   **Default State**: If no username is set, the user defaults to "Anonymous".
-   **Update Capability**: Users can update their username, which syncs with `localStorage` and the active chat instance.

### 4.2 Chat Rooms
-   **Multi-channel Support**: Users can switch between predefined rooms.
-   **Supported Rooms**: `#general`, `#gaming`, `#music`, `#coding`.
-   **Room Switching**: Clicking a room button updates the current chat stream. The application must unsubscribe from the previous room's listener before subscribing to the new one to prevent memory leaks.

### 4.3 Messaging
-   **Real-time Updates**: Messages appear instantly for all users in the same room using Firestore snapshot listeners.
-   **Message Composition**: Users can type and submit text messages.
-   **Data Structure**:
    -   `message`: String content.
    -   `username`: Sender's display name.
    -   `room`: Target channel ID.
    -   `created_at`: Firebase Timestamp.

### 4.4 User Interface
-   **Message List**: Displays a scrolling list of messages.
-   **Timestamp**: Shows relative time (e.g., "5 minutes ago") using `date-fns`.
-   **Responsiveness**: UI adapts to different screen sizes via Bootstrap.

## 5. Data Model
**Collection**: `chats`
**Document Schema**:
```json
{
  "message": "string",
  "username": "string",
  "room": "string",
  "created_at": "Timestamp"
}
```

## 6. Non-Functional Requirements
-   **Performance**: Real-time latency should be minimal, relying on Firestore's efficient socket connections.
-   **Security**: 
    -   Firebase credentials are client-side (safe by design - security via Firestore Rules).
    -   XSS protection via safe DOM element creation (no innerHTML).
    -   Firestore Security Rules enforce message validation (see `config/firestore.rules`).
-   **Maintainability**: Code must strictly adhere to the separation of concerns (no DOM logic in `chat.js`, no Firebase logic in `ui.js`).

## 7. Project Structure
```
VChat/
├── index.html          # Main HTML + Firebase config
├── scripts/
│   ├── chat.js        # Data layer (Chatroom class)
│   ├── ui.js          # Presentation layer (ChatUI class)
│   └── app.js         # Application layer (event handlers)
├── styles/
│   └── style.css      # Custom styles
├── config/
│   ├── firestore.rules    # Firestore security rules
│   └── vercel.json        # Vercel deployment config
├── docs/
│   ├── PRD.md             # Product requirements (this file)
│   ├── SPEC.md            # Technical specification
│   ├── CODE_AUDIT.md      # Code health check
│   ├── DEPLOY.md          # Deployment guide
│   ├── UPGRADE_STACK.md   # Migration to V2 guide
│   └── V2_ROADMAP.md      # V2 vision and roadmap
└── README.md          # Project overview
```

## 8. Future Roadmap

### V1 Enhancements (Current)
-   ✅ **XSS Protection**: Implemented safe DOM rendering (February 2026).
-   ✅ **Deployment**: Migrated to Vercel for better performance.
-   ✅ **Documentation**: Comprehensive docs in `/docs` folder.

### V2 Vision (Planned - See docs/V2_ROADMAP.md)
-   **Video Chat**: Integration of WebRTC video calling capabilities.
-   **Enhanced Authentication**: Firebase Auth (Google, GitHub, Email).
-   **Modern Stack**: React + TypeScript + Tailwind CSS.
-   **Rich Features**: Message reactions, editing, file uploads, typing indicators.

For detailed V2 plans, see [V2_ROADMAP.md](V2_ROADMAP.md) and [UPGRADE_STACK.md](UPGRADE_STACK.md).