# VChat

A real-time multi-channel chat application powered by Firebase Firestore.

![Screenshot (21)](https://user-images.githubusercontent.com/46414203/126826535-3dfee40d-aa1a-45f3-a661-46cdff6531f9.png)

## 🚀 Features

- ✅ Real-time messaging across 4 channels (General, Gaming, Music, Coding)
- ✅ Persistent username via localStorage
- ✅ Live timestamp updates ("5 minutes ago")
- ✅ XSS protection (safe HTML rendering)
- ✅ Firestore security rules (spam prevention, validation)

## 🛠️ Tech Stack

- **Backend**: Firebase Firestore
- **Frontend**: Vanilla JavaScript (ES6 Classes)
- **Styling**: Bootstrap 5, Custom CSS
- **Utilities**: date-fns
- **Deployment**: Vercel

## 📦 Quick Start

### Local Development

1. Clone the repository
2. Open `index.html` in a browser, OR
3. Run a local server:
   ```powershell
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

### Deployment

See [docs/DEPLOY.md](docs/DEPLOY.md) for detailed Vercel deployment instructions.

**TL;DR:**
```powershell
npm install -g vercel
vercel --prod
```

## 🔒 Security

- Firebase API keys are **safe to expose** in client-side code
- Real security enforced by Firestore Security Rules (see [config/firestore.rules](config/firestore.rules))
- XSS protection implemented via safe DOM manipulation
- Message/username length validation
- No delete/update permissions on messages

## 📚 Documentation

All documentation is in the [`docs/`](docs/) folder:

- **[PRD.md](docs/PRD.md)** - Product Requirements Document
- **[SPEC.md](docs/SPEC.md)** - Technical Specification
- **[CODE_AUDIT.md](docs/CODE_AUDIT.md)** - Code Health & Security Audit
- **[DEPLOY.md](docs/DEPLOY.md)** - Deployment Guide
- **[UPGRADE_STACK.md](docs/UPGRADE_STACK.md)** - V2 Migration Guide (React + TypeScript)
- **[V2_ROADMAP.md](docs/V2_ROADMAP.md)** - V2 Vision & Feature Roadmap

## 📁 Project Structure

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
│   ├── PRD.md             # Product requirements
│   ├── SPEC.md            # Technical specification
│   ├── CODE_AUDIT.md      # Code health check
│   ├── DEPLOY.md          # Deployment guide
│   ├── UPGRADE_STACK.md   # Migration to V2 guide
│   └── V2_ROADMAP.md      # V2 vision and roadmap
└── README.md          # This file
```

## 🏗️ Architecture

Three-layer separation of concerns:
- **Data Layer** (`Chatroom`): Firebase operations
- **Presentation Layer** (`ChatUI`): DOM rendering
- **Application Layer** (`app.js`): Event handling & initialization

See [SPEC.md](docs/SPEC.md) for detailed technical specifications.

## 🔮 Roadmap

### Current Version (V1)
- [x] Real-time multi-channel chat
- [x] XSS protection
- [x] Firestore security rules
- [x] Vercel deployment
- [x] Comprehensive documentation

### Future Version (V2)
See [docs/V2_ROADMAP.md](docs/V2_ROADMAP.md) for complete roadmap.

**Planned Features:**
- [ ] React + TypeScript migration
- [ ] Firebase Authentication (Google, GitHub, Email)
- [ ] Video chat functionality (WebRTC)
- [ ] Message reactions/emojis
- [ ] User avatars
- [ ] Typing indicators
- [ ] Private messaging
- [ ] File/image uploads

**Migration Guide:** [docs/UPGRADE_STACK.md](docs/UPGRADE_STACK.md)
