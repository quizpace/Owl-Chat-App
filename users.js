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
        console.log(`User data (${username}, ${time}) sent to the server.`);
      } else {
        throw new Error("Failed to send user data to the server.");
      }
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
// Fetch data from the JSON server
fetch("https://web-server-demo1.onrender.com/users")
  .then((response) => response.json())
  .then((data) => {
    // Assuming the data is an array of user objects with a 'user' property
    data.forEach((user) => {
      createUsersList(user.user);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Delete user from list when leave the chat

let lastPutTimestamp = Date.now(); // Store the timestamp of the last PUT request

// Function to send a PUT request to update the username
function updateUser(username) {
  const userData = {
    user: username,
    time: getCurrentTime(),
  };

  fetch(`https://web-server-demo1.onrender.com/users/${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        console.log(`User data (${username}) updated on the server.`);
        lastPutTimestamp = Date.now(); // Update the timestamp for the last PUT request
      } else {
        throw new Error("Failed to update user data on the server.");
      }
    })
    .catch((error) => {
      console.error("Error updating user data on the server:", error);
    });
}

// Function to handle automatic deletion if there's no PUT request for more than 10 seconds
function checkAndDeleteIfInactive(username) {
  const currentTime = Date.now();
  const inactiveTime = currentTime - lastPutTimestamp;

  if (inactiveTime > 10000) {
    deleteUserFromServer(username);
  }
}

// Function to delete the user from the server
function deleteUserFromServer(username) {
  fetch(`https://web-server-demo1.onrender.com/users/${username}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log(
          `User "${username}" removed from the server due to inactivity.`
        );
      } else {
        throw new Error("Failed to remove user from the server.");
      }
    })
    .catch((error) => {
      console.error("Error removing user from the server:", error);
    });
}

// Execute updateUser every 10 seconds
setInterval(() => {
  updateUser(myUserName); // Replace myUserName with the actual username
}, 10000);

// Check for inactivity and trigger deletion if necessary every 10 seconds
setInterval(() => {
  checkAndDeleteIfInactive(myUserName); // Replace myUserName with the actual username
}, 10000);

// Rest of your code...
// function deleteAllUsersExceptOne() {
//   fetch("https://web-server-demo1.onrender.com/users")
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((user) => {
//         if (user.id !== "1") {
//           deleteUserFromServer(user.user);
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }

// function initializePage() {
//   // Perform necessary operations
//   // ...

//   // Delete all users except the one with ID "1"
//   deleteAllUsersExceptOne();
// }

// document.addEventListener("DOMContentLoaded", initializePage);
