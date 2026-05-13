const apiUrl = "https://jsonplaceholder.typicode.com/users";

// Elements
const userList = document.getElementById("userList");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");
const refreshBtn = document.getElementById("refreshBtn");

// Function to fetch users
function fetchUsers() {
  // Reset UI
  userList.innerHTML = "";
  errorText.textContent = "";
  loadingText.style.display = "block";

  fetch(apiUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then(function(users) {
      // Hide loading
      loadingText.style.display = "none";

      // Show users
      users.forEach(function(user) {
        const li = document.createElement("li");
        li.textContent = user.name;
        userList.appendChild(li);
      });
    })
    .catch(function(error) {
      // Hide loading
      loadingText.style.display = "none";

      // Show error message
      errorText.textContent = "Failed to load users. Please try again.";
      console.log(error);
    });
}

// Refresh button click
refreshBtn.addEventListener("click", function() {
  fetchUsers();
});

// Initial call
fetchUsers();