# VChat - Technology Stack Upgrade Proposal

## 1. Executive Summary
This document outlines a modernization strategy for the VChat application. The current implementation uses Vanilla JavaScript and direct DOM manipulation. While lightweight, scaling features like video chat and authentication becomes complex. The proposed stack introduces a component-based architecture, type safety, and a modern build pipeline.

## 2. Proposed Tech Stack

### 2.1 Frontend Framework
- **Current**: Vanilla JavaScript (ES6+)
- **Proposed**: **React.js** (via Vite)
- **Rationale**: React's component-based architecture is ideal for chat applications. It simplifies state management (handling real-time message updates) and renders UI changes efficiently using the Virtual DOM.

### 2.2 Language
- **Current**: JavaScript
- **Proposed**: **TypeScript**
- **Rationale**: TypeScript adds static typing, which is crucial for defining strict interfaces for data models (e.g., `Message`, `User`). It reduces runtime errors and improves developer experience with better IDE autocompletion.

### 2.3 Styling
- **Current**: Bootstrap (CDN)
- **Proposed**: **Tailwind CSS**
- **Rationale**: Tailwind offers a utility-first approach that provides greater flexibility than Bootstrap's pre-built components. It integrates well with React and results in smaller production CSS bundles.

### 2.4 Build Tooling
- **Current**: None (Static files served directly)
- **Proposed**: **Vite**
- **Rationale**: Vite offers extremely fast hot module replacement (HMR) during development and optimized bundling for production.

### 2.5 Backend & Authentication
- **Current**: Firebase Firestore (No Auth, LocalStorage for username)
- **Proposed**: **Firebase Authentication** + **Firestore**
- **Rationale**:
    - **Auth**: Replace the insecure `localStorage` username implementation with Firebase Authentication (Google/GitHub Sign-in).
    - **Database**: Continue using Firestore for its excellent real-time capabilities, but implement Firestore Security Rules based on authenticated user IDs.

### 2.6 Deployment
- **Current**: Heroku (PHP Buildpack workaround)
- **Proposed**: **Vercel** or **Netlify**
- **Rationale**: These platforms are optimized for modern frontend frameworks. They offer zero-configuration CI/CD, automatic HTTPS, and edge caching, removing the need for `composer.json` and `index.php`.

## 3. Architecture Changes

### Component Structure
Instead of the MVC class separation (`Chatroom` vs `ChatUI`), the app will use functional components:
- `App`: Main layout and provider wrapper.
- `ChatRoom`: Handles the subscription to the specific Firestore channel.
- `MessageList`: Renders the list of messages.
- `MessageInput`: Handles form submission.
- `RoomSelector`: Sidebar or tabs for switching rooms.

### State Management
- **Hooks**: Use custom hooks (e.g., `useFirestore`, `useAuth`) to encapsulate logic previously found in `chat.js`.
- **Context API**: To share global state like the `currentUser` and `activeRoom` across components without prop drilling.

## 4. Migration Roadmap
1.  **Setup**: Initialize a new Vite + React + TypeScript project.
2.  **Auth**: Implement Firebase Authentication first to establish user identity.
3.  **Core Logic**: Port `Chatroom` class logic to a `useChat` hook.
4.  **UI Migration**: Rebuild the interface using Tailwind CSS and React components.
5.  **Feature Parity**: Ensure room switching and timestamp formatting (using `date-fns`) work as expected.
6.  **Deployment**: Deploy to Vercel.