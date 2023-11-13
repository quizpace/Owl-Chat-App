$(document).ready(() => {
  $(".chat-btn").click(() => {
    $(".chat-box").slideToggle("slow");
  });
});

$(document).ready(() => {
  $(".users-btn").click(() => {
    $(".users-box").slideToggle("slow");
  });
});

// Modal for username
// Declare userName globally
let userName = "";
let myUserName = "";

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
      sendchatInputToServer(`${userName} joined the chat!`);
    } else {
      alert("Please enter a valid name.");
    }
  });
});

// Add an event listener to the "button2" (now a button element) for sending the user's input
// Add an event listener to the "button2" (now a button element) for sending the user's input
document.querySelector(".msg").addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent the default behavior of the Enter key (e.g., newline in textarea)
    document.querySelector(".send-btn").click(); // Trigger the click event of the send button
  }
});

document
  .querySelector(".send-btn")
  .addEventListener("click", async function () {
    const chatInput = document.querySelector(".msg").value;

    // Send the chat input to the server
    await sendchatInputToServer(chatInput);

    // Now that the data is sent, create and append the my-chat div
    createMyChat(chatsDiv, chatInput, userName, time);

    // Clear the input field
    document.querySelector(".msg").value = "";
  });

async function sendchatInputToServer(chatInput) {
  try {
    console.log("Sending data to the server...");
    const response = await fetch("https://db-vkyv.onrender.com/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName, // Assuming userName is globally available
        text: chatInput,
        time: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error sending data: ${response.statusText}`);
    }

    // Assuming you want to do something else after a successful response
    // ...
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

// Declare a set to store processed message IDs
const processedMessageIds = new Set();

// Function to fetch all messages from the server and create chat divs for each message ID
async function getTextFromServer() {
  try {
    const response = await fetch("https://db-vkyv.onrender.com/chats");
    const data = await response.json();
    if (data && data.length > 0) {
      data.forEach((message) => {
        const messageId = message.id;

        if (!processedMessageIds.has(messageId)) {
          const username = message.user;

          // Parse the time string to create a Date object
          const time = parseMessageTime(message.time, username);

          if (username !== myUserName) {
            // Create a message format with line breaks
            const clientChatDiv = document.createElement("div");
            clientChatDiv.classList.add("client-chat");
            clientChatDiv.innerHTML = `<span class="username-style">${username}:</span> <br> <span class="message-time">${time}</span> ${message.text}`;

            // Create a separate div for each message ID
            const messageDiv = document.createElement("div");
            messageDiv.id = `message-${messageId}`;
            messageDiv.appendChild(clientChatDiv);
            chatsDiv.appendChild(messageDiv);

            // Scroll the new message into view
            clientChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });

            // Add the message ID to the set
            processedMessageIds.add(messageId);
          }
        }
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
// setInterval(getTextFromServer, 100);
// Call the function when the page loads
window.onload = async () => {
  await getTextFromServer();
  // Start the interval after loading all messages
  setInterval(getTextFromServer, 200);
};

// Replace "myUsername" with the actual username in the "my-chat" div

// Creat Chat Divs (main user and other users)

// Function to create client-chat div and append it to the chats div
// function createClientChat(chatsDiv, text, userName, time) {
//   const clientChatDiv = document.createElement("div");
//   clientChatDiv.classList.add("client-chat");
//   clientChatDiv.innerHTML = `<span class="username-style">${userName}:</span> <br> <span class="message-time">${time}</span> ${text}`;
//   chatsDiv.appendChild(clientChatDiv);

//   // Scroll the new message into view
//   clientChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
// }

// Function to create my-chat div and append it to the chats div
function createMyChat(chatsDiv, text, userName, time) {
  const myChatDiv = document.createElement("div");
  myChatDiv.classList.add("my-chat");
  myChatDiv.innerHTML = `<span class="username-style">${userName}:</span> <br> <span class="message-time">${time}</span> ${text}`;
  chatsDiv.appendChild(myChatDiv);

  // Scroll the new message into view
  myChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Example usage:
const chatsDiv = document.querySelector(".chats");

// Get the text from the input field with class .msg
const inputText = document.querySelector(".msg").value;

// Dummy data for username and time (replace this with your actual data)
// const userName = "User123";
const options = { hour: "numeric", minute: "numeric" };
const time = new Date().toLocaleTimeString([], options);

// // Create and append client-chat div
// createClientChat(chatsDiv, inputText, userName, time);

// // Create and append my-chat div
// createMyChat(chatsDiv, inputText, userName, time);

// Creat list of users

const usersList = document.querySelector(".users");
function createUsersList(userName) {
  const myUsersList = document.createElement("li");
  myUsersList.classList.add("uList");
  myUsersList.innerHTML = `${userName}`;
  usersList.appendChild(myUsersList);
}

/* scroll section */

function toggleChatBoxSize() {
  const scroll = document.querySelector(".chat-box");
  scroll.classList.toggle("expanded");
}

//scroll down

function scrollChatBoxDown() {
  const chatBox = document.querySelector(".chat-box");
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add an event listener to the button or element that triggers the toggle
document
  .querySelector(".scroll-btn")
  .addEventListener("click", toggleChatBoxSize);

// Format time

// Function to parse the time string based on the user
// Function to parse the time string based on the user
function parseMessageTime(timeString, username) {
  if (username === "Avi") {
    // Parse time for Avi using ISO 8601 format
    return new Date(timeString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
  } else {
    // Parse time for other users using "HH:mm:ss:SSS" format
    const timeParts = timeString.split(":");
    const hours = timeParts[0];
    const minutes = timeParts[1];
    // const seconds = timeParts[2];
    // const milliseconds = timeParts[3];
    return `${hours}:${minutes}`;
  }
}

//delete all json

async function deleteAllExceptFirst() {
  try {
    const response = await fetch("https://db-vkyv.onrender.com/chats");
    const data = await response.json();

    if (data && data.length > 1) {
      // Extract the IDs of all records except the first one
      const idsToDelete = data.slice(1).map((record) => record.id);

      // Send delete requests for each ID
      const deletePromises = idsToDelete.map(async (id) => {
        const deleteResponse = await fetch(
          `https://db-vkyv.onrender.com/chats/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!deleteResponse.ok) {
          throw new Error(
            `Error deleting record with ID ${id}: ${deleteResponse.statusText}`
          );
        }
      });

      // Wait for all delete requests to complete
      await Promise.all(deletePromises);

      console.log("Records deleted successfully, except the first one.");
    } else {
      console.log("No records to delete or only one record exists.");
    }
  } catch (error) {
    console.error("Error deleting records:", error);
  }
}

// Call the function when the page loads
window.onload = async () => {
  await getTextFromServer();

  // Start the interval after loading all messages
  setInterval(() => {
    getTextFromServer();
    scrollChatBoxDown();
  }, 10); // Set the interval to 1000 milliseconds (1 second)
};
