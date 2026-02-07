# VChat - AI Coding Agent Instructions

## Project Overview

VChat is a real-time multi-channel chat application using Firebase Firestore as the backend. Despite the folder name "MERN", this is a **Firebase + vanilla JavaScript** project (not MERN stack).

## Architecture Pattern

### Three-Layer Separation of Concerns

The codebase follows a class-based OOP pattern with clear layer boundaries:

- **Data Layer** ([scripts/chat.js](../scripts/chat.js)): `Chatroom` class handles all Firebase Firestore operations
- **Presentation Layer** ([scripts/ui.js](../scripts/ui.js)): `ChatUI` class manages DOM rendering and updates
- **Application Layer** ([scripts/app.js](../scripts/app.js)): Event handlers, initialization, and glue code

**Critical**: Always maintain this separation. Never mix Firebase calls into `ui.js` or DOM manipulation into `chat.js`.

## Firebase Integration

### Global Database Reference

The Firebase `db` object is initialized in [index.html](../index.html) as a **global variable** and referenced directly in `chat.js`:

```javascript
// Available globally from index.html
const db = firebase.firestore();
this.chats = db.collection("chats");
```

### Real-time Listener Pattern

The app uses Firebase snapshot listeners with a critical unsubscribe pattern:

```javascript
getChats(callback) {
    this.unsub = this.chats.where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data());
                }
            })
        });
}
```

**Why**: The `unsub` property stores the unsubscribe function to prevent memory leaks when switching rooms. Always call `this.unsub()` in `updateRoom()` before creating new listeners.

## Data Conventions

### Message Schema

Firestore documents follow this exact structure:

```javascript
{
    message: string,      // The chat message text
    username: string,     // From localStorage or 'Anonymous'
    room: string,         // Channel ID: 'general', 'gaming', 'music', 'coding'
    created_at: Timestamp // Firebase Timestamp, NOT Date object
}
```

### Username Persistence

Username is stored in `localStorage` with key `'username'`. The app checks this on load:

```javascript
const username = localStorage.username ? localStorage.username : "Anonymous";
```

When updating names, always sync both the `Chatroom` instance and localStorage.

## HTML/CSS Integration

### Fixed Room IDs

Room buttons in [index.html](../index.html) use specific IDs that must match Firestore query values:

```html
<button class="btn" id="general">#General</button>
<button class="btn" id="gaming">#Gaming</button>
```

The `id` attribute (lowercase) is used for Firebase queries, not the display text.

### External Dependencies

The app relies on CDN-loaded libraries in this specific order:

1. `date-fns` - for timestamp formatting in `ChatUI.render()`
2. Firebase SDK modules (app, firestore, analytics)
3. Local scripts: chat.js → ui.js → app.js

**Never** change the script load order or move Firebase initialization.

## Development Workflow

### No Build Process

This is a static site with no build step. Changes to JS/CSS files are immediately effective on page reload.

### Deployment (Heroku)

[composer.json](../composer.json) and [index.php](../index.php) exist solely for Heroku deployment using the PHP buildpack. They serve no functional purpose in the application logic.

## Common Patterns

### Adding Features to Rooms

To add a new chat room:

1. Add button to [index.html](../index.html) with lowercase `id` matching the room name
2. No backend changes needed - Firestore will auto-create the room on first message

### Timestamp Formatting

Use `date-fns` library (already loaded) with this exact pattern from `ui.js`:

```javascript
dateFns.distanceInWordsToNow(data.created_at.toDate(), { addSuffix: true });
```

Must call `.toDate()` on Firebase Timestamps before passing to date-fns.

## Security Notes

Firebase credentials are **hardcoded in [index.html](../index.html)**. This is typical for client-side Firebase apps but requires Firestore security rules to be properly configured in the Firebase Console (not in this codebase).
