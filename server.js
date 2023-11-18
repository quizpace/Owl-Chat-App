// send msgs to server

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

// Function to fetch all messages from the server and create chat divs for each message ID
// async function getTextFromServer() {
//   try {
//     const response = await fetch("https://db-vkyv.onrender.com/chats");
//     const data = await response.json();
//     if (data && data.length > 0) {
//       data.forEach((message) => {
//         const messageId = message.id;

//         if (!processedMessageIds.has(messageId)) {
//           const username = message.user;

//           // Parse the time string to create a Date object
//           const time = parseMessageTime(message.time, username);

//           if (username !== myUserName) {
//             // Convert URLs in the text to clickable links
//             const textWithLinks = convertURLsToLinks(message.text);

//             // Create a message format with line breaks
//             const clientChatDiv = document.createElement("div");
//             clientChatDiv.classList.add("client-chat");
//             clientChatDiv.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;

//             // Create a separate div for each message ID
//             const messageDiv = document.createElement("div");
//             messageDiv.id = `message-${messageId}`;
//             messageDiv.appendChild(clientChatDiv);
//             chatsDiv.appendChild(messageDiv);

//             // Scroll the new message into view
//             clientChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });

//             // Add the message ID to the set
//             processedMessageIds.add(messageId);
//           }
//         }
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

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
            // Convert URLs in the text to clickable links
            const textWithLinks = convertURLsToLinks(message.text);

            // Create a message format with line breaks
            const clientChatDiv = document.createElement("div");
            clientChatDiv.classList.add("client-chat");
            if (message.imageUrl) {
              clientChatDiv.style.background =
                "linear-gradient(to right, #584460, white)";
            }
            clientChatDiv.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;

            // Check if there's an imageUrl in the message
            if (message.imageUrl) {
              const imageElement = document.createElement("img");
              imageElement.src = message.imageUrl;
              imageElement.width = 100;
              imageElement.height = 100;
              clientChatDiv.appendChild(imageElement);
            }

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

// Call the function when the page loads
window.onload = async () => {
  await getTextFromServer();
  // Start the interval after loading all messages
  setInterval(getTextFromServer, 200);
};

// delete msgs from server

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
