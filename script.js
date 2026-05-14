// Commit 2: API Integration + Loading State
// Fetches users and shows loading while waiting.
// Error handling will be added in Commit 3.

const refreshBtn   = document.getElementById("refreshBtn");
const loadingState = document.getElementById("loadingState");
const emptyState   = document.getElementById("emptyState");
const userList     = document.getElementById("userList");

const API_URL = "https://jsonplaceholder.typicode.com/users";

function showLoading() {
  loadingState.hidden = false;
  emptyState.hidden   = true;
  userList.hidden     = true;
  refreshBtn.disabled = true;
  refreshBtn.classList.add("loading");
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
  emptyState.hidden   = true;
  userList.hidden     = false;
  refreshBtn.disabled = false;
  refreshBtn.classList.remove("loading");
}

function fetchUsers() {
  showLoading();
  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(users) {
      showSuccess(users);
    });
  // Note: .catch() for error handling comes in Commit 3
}

refreshBtn.addEventListener("click", function() {
  fetchUsers();
});

fetchUsers();