// Modal for username
// Declare userName globally
let userName = "";
let myUserName = "";

// Choose username
document.addEventListener("DOMContentLoaded", function () {
  // Display the modal on page load
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Handle the submission of the user's name
  const submitNameBtn = document.getElementById("submitNameBtn");
  const userNameInput = document.getElementById("userNameInput");

  submitNameBtn.addEventListener("click", function () {
    userName = userNameInput.value;
    myUserName = userNameInput.value;
    if (userName.trim() !== "") {
      modal.style.display = "none";
      // Send the username and time to the JSON server
      sendUserDataToServer(userName, getCurrentTime());
    } else {
      alert("Please enter a valid name.");
    }
  });
});

// send the user name to server
let globalUserId = null; // Define a global variable to store the userID

function sendUserDataToServer(username, time) {
  const userData = {
    user: username,
    time: time,
  };

  fetch("https://web-server-demo1.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the response to get JSON data
      } else {
        throw new Error("Failed to send user data to the server.");
      }
    })
    .then((data) => {
      // Assuming the server responds with the created user data including an 'id'
      const userId = data.id; // Extract the ID from the response
      globalUserId = userId; // Assign userId to the global variable
      console.log(`User data (${username}, ${time}) sent to the server.`);
      console.log(`User ID on the server is: ${userId}`);
      // You can use userId as needed in your application
    })
    .catch((error) => {
      console.error("Error sending user data to the server:", error);
    });
}

// get the time
function getCurrentTime() {
  const now = new Date();
  return now.toTimeString(); // Adjust the formatting as needed
}

// Creat users list
// const usersList = document.querySelector(".users");
// Create users list based on unique user IDs
// Create users list based on unique user IDs
// Create users list based on unique user IDs
const usersList = {};

function createUsersList(userName, userId) {
  const existingUser = document.getElementById(`user_${userId}`);
  if (!existingUser) {
    const myUsersList = document.createElement("li");
    myUsersList.id = `user_${userId}`;
    myUsersList.classList.add("uList");
    myUsersList.innerHTML = `${userName}`;
    document.querySelector(".users").appendChild(myUsersList);
  }
}

function fetchAndUpdateUsersList() {
  fetch("https://web-server-demo1.onrender.com/users")
    .then((response) => response.json())
    .then((data) => {
      // Clear the current user list
      document.querySelector(".users").innerHTML = "";

      // Create the updated user list
      data.forEach((user) => {
        createUsersList(user.user, user.id);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call fetchAndUpdateUsersList initially and then every 5 seconds
fetchAndUpdateUsersList(); // Initial call
setInterval(fetchAndUpdateUsersList, 5000); // Subsequent calls every 5 seconds (in milliseconds)

// Delete user from list when leave the chat

// Store the last update time for each user
const lastUpdateTime = {};

function updateUsernameOnServer(globalUserId, myUserName) {
  const userData = {
    user: myUserName,
    time: getCurrentTime(),
  };

  fetch(`https://web-server-demo1.onrender.com/users/${globalUserId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        console.log(
          `Username for user with ID "${globalUserId}" updated on the server.`
        );
        lastUpdateTime[globalUserId] = new Date(); // Update last update time
      } else {
        throw new Error(
          `Failed to update username for user with ID "${globalUserId}".`
        );
      }
    })
    .catch((error) => {
      console.error("Error updating username on the server:", error);
    });
}

// Function to delete user if not updated in the last 15 seconds

const lastSeenTime = {}; // Track last seen time for each user

function fetchAndUpdateLastSeenTime() {
  fetch("https://web-server-demo1.onrender.com/users")
    .then((response) => response.json())
    .then((data) => {
      const currentTime = Date.now();
      console.log("Syncing Users...");
      data.forEach((user) => {
        lastSeenTime[user.id] = Date.parse(user.time); // Assuming 'time' is in a parseable format
      });

      // Check and delete users inactive for more than 15 seconds
      Object.keys(lastSeenTime).forEach((userId) => {
        const timeDiffSeconds = (currentTime - lastSeenTime[userId]) / 1000;

        if (timeDiffSeconds > 15) {
          console.log(`Deleting user with ID "${userId}"`);
          deleteUserFromServer(userId);
          delete lastSeenTime[userId];
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call fetchAndUpdateLastSeenTime initially and then at regular intervals
fetchAndUpdateLastSeenTime(); // Initial call
setInterval(fetchAndUpdateLastSeenTime, 5000); // Subsequent calls every 5 seconds (adjust as needed)

// Call updateUsernameOnServer every 10 seconds
setInterval(() => {
  // Replace userId and myUserName with actual values
  updateUsernameOnServer(globalUserId, myUserName);
}, 10000); // 10 seconds interval

// Delete users list

function deleteUserFromServer(userId) {
  fetch(`https://web-server-demo1.onrender.com/users/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log(`User with ID "${userId}" removed from the server.`);
      } else {
        throw new Error(
          `Failed to remove user with ID "${userId}" from the server.`
        );
      }
    })
    .catch((error) => {
      console.error("Error removing user from the server:", error);
    });
}

// Define the deleteUserFromServer function
function deleteAllUsersExceptOne() {
  fetch("https://web-server-demo1.onrender.com/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        if (user.id !== 1) {
          deleteUserFromServer(user.id);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// // Execute the deletion process
// deleteAllUsersExceptOne();
