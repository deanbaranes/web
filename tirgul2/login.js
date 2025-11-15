// Constants - references to HTML elements
const html = document.documentElement;
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

// Event listener for form submission
loginForm.addEventListener("submit", function (event) {
  // Prevent default form submission (stop page refresh)
  event.preventDefault();

  // Get user input values
  const usernameOrEmail = document.getElementById("userInput").value.trim();
  const password = document.getElementById("passInput").value;

  // Retrieve users from local storage (or create empty array if none)
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user by username or email (case-insensitive)
  const user = users.find(
    (u) =>
      u.username?.toLowerCase() === usernameOrEmail.toLowerCase() ||
      u.email?.toLowerCase() === usernameOrEmail.toLowerCase()
  );

  // Validate credentials
  if (!user || user.password !== password) {
    loginMessage.textContent = "Invalid username/email or password.";
    loginMessage.classList.remove("text-green-500");
    loginMessage.classList.add("text-red-500");
    return;
  }

  // Save the logged-in user (without password)
  const currentUser = {
    username: user.username,
    email: user.email,
    dob: user.dob,
    role: user.role,
  };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  // Show success message
  loginMessage.textContent = "Login successful!";
  loginMessage.classList.remove("text-red-500");
  loginMessage.classList.add("text-green-500");

  // If admin -> redirect to user management page
  if (user.role === "admin") {
    window.location.href = "userManagement.html";
    return;
  }
});
