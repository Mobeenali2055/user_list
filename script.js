// =============================================
// COMMIT 4: Refresh Functionality
// The Refresh button re-calls fetchUsers(),
// resetting all state and re-fetching from API.
// =============================================

// ------ DOM References ------
const refreshBtn   = document.getElementById("refreshBtn");
const loadingState = document.getElementById("loadingState");
const errorState   = document.getElementById("errorState");
const emptyState   = document.getElementById("emptyState");
const userList     = document.getElementById("userList");

// ------ API URL ------
const API_URL = "https://jsonplaceholder.typicode.com/users";

// =============================================
// STATE MANAGEMENT
// =============================================

function showLoading() {
  loadingState.hidden = false;
  errorState.hidden   = true;
  emptyState.hidden   = true;
  userList.hidden     = true;
  refreshBtn.disabled = true;
  refreshBtn.classList.add("loading");
}

function showError() {
  loadingState.hidden = true;
  errorState.hidden   = false;
  emptyState.hidden   = true;
  userList.hidden     = true;
  refreshBtn.disabled = false;
  refreshBtn.classList.remove("loading");
}

function showSuccess(users) {
  userList.innerHTML = "";
  users.forEach(function(user, index) {
    const li = document.createElement("li");
    li.className = "user-item";
    li.style.animationDelay = index * 40 + "ms";
    const initials = user.name.charAt(0).toUpperCase();
    li.innerHTML =
      "<div class=\"user-avatar\" aria-hidden=\"true\">" + initials + "</div>" +
      "<div class=\"user-info\">" +
        "<span class=\"user-name\">" + user.name + "</span>" +
        "<span class=\"user-email\">" + user.email + "</span>" +
      "</div>";
    userList.appendChild(li);
  });
  loadingState.hidden = true;
  errorState.hidden   = true;
  emptyState.hidden   = true;
  userList.hidden     = false;
  refreshBtn.disabled = false;
  refreshBtn.classList.remove("loading");
}

// =============================================
// ASYNC FETCH FUNCTION
// =============================================

function fetchUsers() {
  showLoading();

  fetch(API_URL)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("HTTP error: " + response.status);
      }
      return response.json();
    })
    .then(function(users) {
      showSuccess(users);
    })
    .catch(function(err) {
      console.error("Fetch failed:", err);
      showError();
    });
}

// =============================================
// REFRESH BUTTON
// Clicking Refresh calls the same fetchUsers()
// which resets state and re-fetches fresh data.
// =============================================
refreshBtn.addEventListener("click", function() {
  fetchUsers();
});

// Initial load on page open
fetchUsers();