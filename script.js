// Commit 1: UI Shell — empty list + Refresh button
// No API call yet. fetchUsers() will be wired in Commit 2.

const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", function() {
  // API integration coming in Commit 2
  console.log("Refresh clicked – API not wired yet.");
});