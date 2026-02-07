# Codebase Audit & Health Check

## 1. Status Overview
The application core logic is functional and adheres to the architecture defined in `SPEC.md`. The separation of concerns between `Chatroom` (Data), `ChatUI` (View), and `app.js` (Controller) is well-implemented.

## 2. Critical Issues (What's Not Working)

### 2.1 Security Vulnerability: Cross-Site Scripting (XSS)
**File:** `scripts/ui.js`
**Issue:** The `render` method uses template literals to inject user content directly into the DOM using `innerHTML`.
```javascript
const html = `... <span class="message">${data.message}</span> ...`;
this.list.innerHTML += html;
```
**Risk:** A user could send a message like `<img src=x onerror=alert(1)>` which would execute JavaScript in every other user's browser.
**Fix:** Create elements using `document.createElement` and set `textContent`, or use a sanitization library.

### 2.2 Global Namespace Pollution
The app relies on global variables (`firebase`, `dateFns`, `chatUI`, `chatroom`). While acceptable for a small prototype, this makes the code fragile and hard to test.

## 3. File Analysis (Unnecessary Files)

You asked about unnecessary files. Here is the breakdown:

### `composer.json` & `index.php`
**Status:** **Conditionally Unnecessary**
**Why they exist:** These files are a workaround to deploy a static site to **Heroku**, forcing it to use the PHP buildpack to serve `index.html`.
**Advice:**
- **DELETE** if you are migrating to a modern static host like Vercel, Netlify, or GitHub Pages (Recommended).
- **KEEP** if you intend to stay on Heroku.

### `UPGRADE_STACK.md`
**Status:** **Documentation**
**Why it exists:** Outlines the plan to move to React/TypeScript. Keep this as a reference for the migration.

## 4. Recommendations
1.  **Immediate**: Fix the XSS vulnerability in `scripts/ui.js`.
2.  **Cleanup**: If following the `UPGRADE_STACK.md` plan, delete `composer.json` and `index.php` and deploy to Vercel/Netlify.