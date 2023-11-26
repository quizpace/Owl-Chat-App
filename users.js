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
      // Now you can use the userName when sending messages
      createUsersList(userName);
      createBubble(`${userName} joined the chat!`);

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
const usersList = document.querySelector(".users");
function createUsersList(userName) {
  const myUsersList = document.createElement("li");
  myUsersList.classList.add("uList");
  myUsersList.innerHTML = `${userName}`;
  usersList.appendChild(myUsersList);
}

//get users names from server
function fetchUsersData() {
  fetch("https://web-server-demo1.onrender.com/users")
    .then((response) => response.json())
    .then((data) => {
      // Assuming the data is an array of user objects with a 'user' property
      data.forEach((user) => {
        // Check if the user already exists in the user list
        if (!document.getElementById(`user_${user.id}`)) {
          createUsersList(user.user, user.id); // Pass user ID to createUsersList
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call fetchUsersData initially and then every 5 seconds
fetchUsersData(); // Initial call
setInterval(fetchUsersData, 5000); // Subsequent calls every 5 seconds (in milliseconds)

// Update createUsersList function to include user IDs
function createUsersList(userName, userId) {
  const existingUser = document.getElementById(`user_${userId}`);
  if (!existingUser) {
    const myUsersList = document.createElement("li");
    myUsersList.id = `user_${userId}`; // Set an ID for the user list item
    myUsersList.classList.add("uList");
    myUsersList.innerHTML = `${userName}`;
    usersList.appendChild(myUsersList);
  }
}

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
// Fetch data from the JSON server and update users' last update time
function fetchAndUpdateLastUpdateTime() {
  fetch("https://web-server-demo1.onrender.com/users")
    .then((response) => response.json())
    .then((data) => {
      const currentTime = new Date();

      // Iterate through each user data
      data.forEach((user) => {
        const lastUpdate = lastUpdateTime[user.id];
        if (lastUpdate) {
          const timeDiffSeconds = (currentTime - lastUpdate) / 1000; // Difference in seconds

          if (timeDiffSeconds > 15) {
            console.log(
              `User with ID "${user.id}" hasn't updated for 15 seconds.`
            );
            // Call the function to delete the user from the server
            deleteUserFromServer(user.id);
            delete lastUpdateTime[user.id]; // Remove the user from the tracking object
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Call fetchAndUpdateLastUpdateTime initially and then at regular intervals
fetchAndUpdateLastUpdateTime(); // Initial call
setInterval(fetchAndUpdateLastUpdateTime, 1000); // Subsequent calls at intervals

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
