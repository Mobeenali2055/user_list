# 👥 Users API Component

A simple web component that fetches and displays a list of users from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) public API.  
Built with plain **HTML**, **CSS**, and **JavaScript** — no frameworks.

---

## 📁 Project Structure

```
user.list/
├── index.html   → Page structure (card, states, user list)
├── styles.css   → All styling (dark mode, spinner, animations)
└── script.js    → All logic (fetch, states, refresh)
```

---

## 🚀 How to Run

1. Open the folder `user.list/`
2. Double-click `index.html`  
3. It opens in your browser and **automatically loads the users**

No install, no server, no setup needed.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔄 Loading state | Spinner shows while data is being fetched |
| ❌ Error state | Red panel shows if the request fails |
| ✅ Success state | User cards render with name + email |
| 🔁 Refresh button | Re-fetches fresh data from the API |

---

## 🧠 How the Code Works

### 1. The HTML (`index.html`)

The page has **4 panels** inside the card — only one is visible at a time:

```
┌─────────────────────────────┐
│  Users               [Refresh] ← always visible
│                              │
│  ┌─ emptyState  ─────────┐  │  shown at start
│  │  No users loaded yet.  │  │
│  └────────────────────────┘  │
│                              │
│  ┌─ loadingState ────────┐  │  shown while fetching
│  │  ⟳ Loading users…     │  │
│  └────────────────────────┘  │
│                              │
│  ┌─ errorState  ─────────┐  │  shown if fetch fails
│  │  ⚠ Failed to fetch.   │  │
│  └────────────────────────┘  │
│                              │
│  ┌─ userList    ─────────┐  │  shown on success
│  │  [L] Leanne Graham    │  │
│  │  [E] Ervin Howell     │  │
│  │  …                    │  │
│  └────────────────────────┘  │
└─────────────────────────────┘
```

---

### 2. The JavaScript (`script.js`)

#### Step 1 — DOM References
```js
const refreshBtn   = document.getElementById("refreshBtn");
const loadingState = document.getElementById("loadingState");
const errorState   = document.getElementById("errorState");
const emptyState   = document.getElementById("emptyState");
const userList     = document.getElementById("userList");
```
> These grab the HTML elements so JavaScript can show/hide them.

---

#### Step 2 — The Three State Functions

Each function controls which panel is visible and whether the button is clickable.

```js
// Called BEFORE the fetch starts
function showLoading() {
  loadingState.hidden = false;  // show spinner
  errorState.hidden   = true;   // hide error
  emptyState.hidden   = true;   // hide empty
  userList.hidden     = true;   // hide list
  refreshBtn.disabled = true;   // disable button (prevent double-click)
}

// Called if the fetch FAILS
function showError() {
  errorState.hidden   = false;  // show red error panel
  loadingState.hidden = true;
  emptyState.hidden   = true;
  userList.hidden     = true;
  refreshBtn.disabled = false;  // re-enable so user can retry
}

// Called when data ARRIVES successfully
function showSuccess(users) {
  // Build a card for each user
  users.forEach(function(user) {
    const li = document.createElement("li");
    li.innerHTML = `<div class="user-avatar">L</div>
                    <div class="user-info">
                      <span class="user-name">${user.name}</span>
                      <span class="user-email">${user.email}</span>
                    </div>`;
    userList.appendChild(li);
  });
  userList.hidden     = false;  // show the list
  loadingState.hidden = true;
  refreshBtn.disabled = false;
}
```

---

#### Step 3 — The Fetch Function (Async Flow)

```js
function fetchUsers() {

  showLoading();           // 1️⃣ Update UI immediately (synchronous)

  fetch(API_URL)           // 2️⃣ Send HTTP GET request → returns a Promise

    .then(function(response) {           // 3️⃣ Runs when server replies
      if (!response.ok) {
        throw new Error("HTTP error");   // 4xx/5xx → jump to .catch()
      }
      return response.json();            // Parse the JSON body → new Promise
    })

    .then(function(users) {              // 4️⃣ Runs when JSON is ready
      showSuccess(users);                // Render the list
    })

    .catch(function(err) {              // 5️⃣ Runs if ANYTHING above fails
      showError();                      // Show error panel
    });
}
```

**In plain English:**
1. Show the spinner right away
2. Ask the server for the users list
3. When the server replies, check if it's OK
4. If OK, read the data and show the cards
5. If anything went wrong at any step, show the error panel

---

#### Step 4 — The Refresh Button

```js
// When clicked → run the same fetchUsers() again
refreshBtn.addEventListener("click", function() {
  fetchUsers();
});

// Also run once automatically when the page first opens
fetchUsers();
```

> The Refresh button reuses the **exact same `fetchUsers()` function**.  
> No duplicate code — it resets state, re-fetches, and updates the UI automatically.

---

### 3. The CSS (`styles.css`)

| Section | What it does |
|---|---|
| `:root` variables | Defines colors, spacing, fonts in one place |
| `.card` | The white/dark box that wraps everything |
| `.spinner` | Animated rotating circle (CSS `@keyframes`) |
| `.loading-panel` | Blue-tinted background while waiting |
| `.error-panel` | Red-tinted background on failure |
| `.user-item` | Each user card with hover animation |
| `.user-avatar` | Coloured circle showing the user's initial |
| `[hidden]` | Makes `hidden` attribute work with `display: none` |

---

## 🔄 State Flow Diagram

```
Page loads
    │
    ▼
[Empty State]          ← "No users loaded yet."
    │
    │  fetchUsers() called automatically
    ▼
[Loading State]        ← Spinner + button disabled
    │
    ├──── success ────► [Success State]   ← User cards shown ✅
    │                          │
    │                          │ Refresh clicked
    │                          └──────────────────► [Loading State] …
    │
    └──── failure ────► [Error State]    ← Error panel shown ❌
                               │
                               │ Refresh clicked
                               └──────────────────► [Loading State] …
```

---

## 📦 Git Commit History

The project was built in **4 incremental commits**:

```
Commit 1  →  UI shell only (HTML + CSS + empty button, no API)
Commit 2  →  fetch() added + loading state
Commit 3  →  Error handling added (.catch + showError)
Commit 4  →  Refresh button wired to re-run fetchUsers()
```

Each commit represents one working milestone you can go back to with `git checkout <hash>`.

---

## 🌐 API Used

**JSONPlaceholder** — free fake REST API for testing

- URL: `https://jsonplaceholder.typicode.com/users`
- Returns: array of 10 user objects
- Each user has: `id`, `name`, `email`, `address`, `phone`, `website`, `company`

We use: `user.name` and `user.email`

---

## 📚 Reference

- [FreeCodeCamp — JavaScript Fetch API for Beginners](https://www.freecodecamp.org/news/javascript-fetch-api-for-beginners/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
