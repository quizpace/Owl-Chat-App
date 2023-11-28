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
      createBubble(`Welcome ${userName} have fun!`);
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
      const existingUsers = document.querySelectorAll(".users .uList");
      const existingUsernames = Array.from(existingUsers).map((user) =>
        user.textContent.trim()
      );

      data.forEach((user) => {
        if (!existingUsernames.includes(user.user)) {
          createUsersList(user.user, user.id);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}


// Call fetchAndUpdateUsersList initially and then every 5 seconds
// fetchAndUpdateUsersList(); // Initial call
setInterval(fetchAndUpdateUsersList, 100); // Subsequent calls every 5 seconds (in milliseconds)

setInterval(deleteAllUsersExceptOne, 5000); // Subsequent calls every 5 seconds (adjust as needed)

// Call updateUsernameOnServer every 10 seconds
setInterval(() => {
  // Replace userId and myUserName with actual values
  updateUsernameOnServer(globalUserId, myUserName);
}, 600); // 10 seconds interval

// Delete user from list when leave the chat

// Store the last update time for each user
// const lastUpdateTime = {};

function updateUsernameOnServer(globalUserId, myUserName) {
  // Check if the username already exists
  fetch(`https://web-server-demo1.onrender.com/users?user=${myUserName}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        // console.log(`Username "${myUserName}" already exists.`);
        // Add logic here if the username already exists
        // For example, you might want to handle this case or notify the user
        // Here, I'll just log a message and exit the function
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

// function updateUsernameOnServer(globalUserId, myUserName) {
//   const userData = {
//     user: myUserName,
//     time: getCurrentTime(),
//   };

//   fetch(`https://web-server-demo1.onrender.com/users/${globalUserId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   })
//     .then((response) => {
//       if (response.ok) {
//         console.log(
//           `Username for user with ID "${globalUserId}" updated on the server.`
//         );
//         lastUpdateTime[globalUserId] = new Date(); // Update last update time
//       } else {
//         throw new Error(
//           `Failed to update username for user with ID "${globalUserId}".`
//         );
//       }
//     })
//     .catch((error) => {
//       console.error("Error updating username on the server:", error);
//     });
// }

// Function to delete user if not updated in the last 15 seconds
// function deleteInactiveUsers() {
//   fetch("https://web-server-demo1.onrender.com/users")
//     .then((response) => response.json())
//     .then((data) => {
//       const currentTime = Date.now();
//       console.log("Sync Users...");
//       data.forEach((user) => {
//         let userLastUpdateTime;

//         console.log(`User ID: ${user.id}, Time: ${user.time}`); // Log user ID and time

//         const timeParts = user.time.split(" ");
//         if (timeParts.length === 3 && timeParts[1].startsWith("GMT")) {
//           const time = timeParts[0];
//           const timeWithoutGMT = time.split(":");
//           if (timeWithoutGMT.length === 3) {
//             const hours = parseInt(timeWithoutGMT[0]);
//             const minutes = parseInt(timeWithoutGMT[1]);
//             const seconds = parseInt(timeWithoutGMT[2]);

//             // Remove parentheses and extract timezone offset
//             const timezoneInfo = timeParts[2].replace("(", "").replace(")", "");
//             const [gmtSign, gmtOffset] = timezoneInfo.split(" ");
//             const timezoneOffset =
//               parseInt(gmtOffset) * (gmtSign === "-" ? -1 : 1); // Convert offset to number

//             const currentTimeObject = new Date(
//               Date.UTC(0, 0, 0, hours, minutes, seconds)
//             );
//             currentTimeObject.setHours(
//               currentTimeObject.getHours() + timezoneOffset
//             ); // Adjust time with timezone offset
//             userLastUpdateTime = currentTimeObject.getTime();
//           } else {
//             console.error(`Invalid time format for user ID "${user.id}"`);
//             return; // Skip this user due to invalid time format
//           }
//         } else {
//           console.error(`Invalid time format for user ID "${user.id}"`);
//           return; // Skip this user due to invalid time format
//         }

//         const timeDiffMilliseconds = currentTime - userLastUpdateTime;
//         const timeDiffSeconds = timeDiffMilliseconds / 1000;

//         if (isNaN(timeDiffSeconds)) {
//           console.error(`Invalid time difference for user ID "${user.id}"`);
//           return; // Skip this user due to invalid time difference
//         }

//         if (timeDiffSeconds > 15) {
//           console.log(`Deleting user with ID "${user.id}"`);
//           deleteUserFromServer(user.id);
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }
// function deleteInactiveUsers() {
//   fetch("https://web-server-demo1.onrender.com/users")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Deleting inactive users...");

//       data.forEach((user) => {
//         if (user.id !== 1) {
//           deleteUserFromServer(user.id);
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }

// Call deleteInactiveUsers initially and then at regular intervals
// deleteAllUsersExceptOne();

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
