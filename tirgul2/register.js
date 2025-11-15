// Constants - references to HTML elements
const html = document.documentElement;
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

// Event listener for form submission
registerForm.addEventListener("submit", async (event) => {
  // Prevent default form behavior (page reload)
  event.preventDefault();

  // Get user input values
  const username = document.getElementById("userInput").value;
  const email = document.getElementById("mailInput").value;
  const password = document.getElementById("passInput").value;
  const confirmPassword = document.getElementById("confirmInput").value;
  const dob = document.getElementById("dateInput").value;

  // Reset message text
  registerMessage.textContent = "";

  // Password match validation
  if (password !== confirmPassword) {
    registerMessage.textContent = "Passwords do not match.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
    return;
  }

  // Try-catch block to handle localStorage write errors
  try {
    // Retrieve existing users or create an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username or email already exists
    if (
      users.some((user) => user.username === username || user.email === email)
    ) {
      registerMessage.textContent = "Username or email already exists.";
      registerMessage.classList.remove("text-green-500");
      registerMessage.classList.add("text-red-500");
      return;
    }
    // Determine role for the new user: first user becomes 'admin'
    const role = users.length === 0 ? "admin" : "user";

    // Add new user to the array
    users.push({ username, email, password, dob, role });

    // Save updated users array to local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Display success message
    registerMessage.textContent =
      "Registration successful! (Data stored in local storage)";
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");
  } catch (error) {
    // Display error message if something went wrong
    registerMessage.textContent = "An error occurred during registration.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
  }
});
