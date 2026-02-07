# Deployment Guide - VChat to Vercel

## Prerequisites
- Firebase project set up
- Vercel account (free tier is fine)

## Step 1: Update Firestore Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new one)
3. Navigate to **Firestore Database** → **Rules**
4. Copy the contents from `config/firestore.rules` in this repo
5. Paste into the Firebase console
6. Click **Publish**

## Step 2: Deploy to Vercel

### Option A: Vercel CLI (Recommended)

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (choose your account)
# - Link to existing project? N
# - Project name: vchat (or your choice)
# - In which directory is your code? ./
# - Want to override settings? N

# Deploy to production
vercel --prod
```

### Option B: Vercel Web UI

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your Git repository (push to GitHub first)
4. Or use **Deploy from Local Directory**
5. Settings:
   - Framework Preset: **Other**
   - Build Command: (leave empty)
   - Output Directory: `./`
6. Click **Deploy**

## Step 3: Update Firebase Config (If Needed)

If you created a NEW Firebase project:

1. Get your Firebase config from Firebase Console
2. Update `index.html` with the new config
3. Redeploy: `vercel --prod`

## Step 4: Test Your Deployment

1. Open the Vercel URL
2. Press F12 → Console
3. Check for the ✅ diagnostic messages
4. Send a test message
5. Open in another browser/tab to verify real-time sync

## Security Checklist

✅ Firestore Security Rules deployed (Step 1)  
✅ API key is public (this is normal for Firebase)  
✅ Security comes from server-side rules  
✅ XSS vulnerability fixed in ui.js  
✅ Message length limited (500 chars)  
✅ Username length limited (50 chars)  
✅ Only valid rooms allowed  
✅ No delete/update permissions  

## Monitoring

- **Firebase Console** → **Firestore** → View data
- **Vercel Dashboard** → **Analytics** → View traffic
- **Browser Console** → Check for errors

## Updating the App

```powershell
# Make your changes, then:
vercel --prod
```

## Project Organization

The project follows this structure:

```
VChat/
├── index.html         # Entry point
├── scripts/           # JavaScript files (chat.js, ui.js, app.js)
├── styles/            # CSS files
├── config/            # Configuration files
│   ├── firestore.rules
│   └── vercel.json
└── docs/              # All documentation
    ├── DEPLOY.md
    ├── UPGRADE_STACK.md
    └── V2_ROADMAP.md
```

## Migration Notes

**Heroku → Vercel**: Old Heroku files (`composer.json`, `index.php`) have been removed.
**V2 Development**: See `docs/UPGRADE_STACK.md` for React + TypeScript migration guide.
