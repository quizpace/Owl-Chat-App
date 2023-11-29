// Declare global variables
let userName = "";
let myUserName = "";
let globalUserId = null;
let lastUpdateTime = {}; // Define lastUpdateTime as an empty object

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
      createBubble(`Welcome ${userName} have fun!`);
    } else {
      alert("Please enter a valid name.");
    }
  });
});

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

const usersList = {};

function createUsersList(userName, userId) {
  const existingUsers = document.querySelectorAll(".uList");
  let userExists = false;

  existingUsers.forEach((user) => {
    if (user.textContent.trim() === userName) {
      userExists = true;
      return; // Exit loop if a user with the same name is found
    }
  });

  if (!userExists) {
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
      const existingUsers = document.querySelectorAll(".users .uList");
      const existingUsernames = Array.from(existingUsers).map((user) =>
        user.textContent.trim()
      );

      data.forEach((user) => {
        if (!existingUsernames.includes(user.user)) {
          createUsersList(user.user, user.id);
        }
      });

      existingUsers.forEach((userElement) => {
        const userId = userElement.id.split("_")[1]; // Extract user ID
        const found = data.some((user) => user.id === parseInt(userId));
        if (!found) {
          // Delay the removal by 500 milliseconds
          setTimeout(() => {
            userElement.remove();
          }, 500);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function updateUsernameOnServer(globalUserId, myUserName) {
  // Check if the username already exists
  fetch(`https://web-server-demo1.onrender.com/users?user=${myUserName}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        return;
      }

      // Username doesn't exist, proceed with creating the user
      const userData = {
        user: myUserName,
        time: getCurrentTime(),
      };

      fetch(`https://web-server-demo1.onrender.com/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Username "${myUserName}" posted to the server.`);
            // Assuming the server responds with the created user data including an 'id'
            const userId = response.id; // Extract the ID from the response
            lastUpdateTime[userId] = new Date(); // Update last update time for the new user
            globalUserId = userId; // Update the global user ID if needed
          } else {
            throw new Error(
              `Failed to post username "${myUserName}" to the server.`
            );
          }
        })
        .catch((error) => {
          console.error("Error posting username on the server:", error);
        });
    })
    .catch((error) => {
      console.error("Error checking username on the server:", error);
    });
}

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
          console.log("users deleted");
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Update the user list every 1 second
// setInterval(fetchAndUpdateUsersList, 300);

// deleteAllUsersExceptOne();
// setInterval(deleteAllUsersExceptOne, 10000); // Subsequent calls every 5 seconds (adjust as needed)

// // Call updateUsernameOnServer every 10 seconds
// setInterval(() => {
//   // Replace userId and myUserName with actual values
//   updateUsernameOnServer(globalUserId, myUserName);
// }, 500); // 10 seconds interval
