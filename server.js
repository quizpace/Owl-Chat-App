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
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

// Audio

async function sendAudioInfoToServer(userName, fileInfo) {
  try {
    console.log("Sending data to the server...");
    const response = await fetch("https://db-vkyv.onrender.com/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName, // Assuming userName is globally available
        text: `${fileInfo}`, // Place the fileInfo in the text field
        time: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error sending data: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

function extractFileName(text) {
  const words = text.split(" ");
  for (const word of words) {
    if (word.includes(".wav")) {
      return word;
    }
  }
  return "";
}

// Photo

async function sendImageToServer(userName, imageUrl) {
  try {
    console.log("Sending image data to the server...");
    const response = await fetch("https://db-vkyv.onrender.com/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName, // Assuming userName is globally available
        imageUrl: imageUrl,
        time: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error sending image data: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error sending image data:", error);
  }
}

// handle massages from server (photo, audio, stickers....)
async function getTextFromServer() {
  try {
    const response = await fetch("https://db-vkyv.onrender.com/chats");
    const data = await response.json();
    if (data && data.length > 0) {
      data.forEach((message) => {
        const messageId = message.id;

        if (!processedMessageIds.has(messageId)) {
          const username = message.user;
          const time = parseMessageTime(message.time, username);
          // const textWithLinks = convertURLsToLinks(message.text);

          if (username !== myUserName) {
            const messageDiv = document.createElement("div");
            messageDiv.id = `message-${messageId}`;

            const clientChatDiv = document.createElement("div");
            clientChatDiv.classList.add("client-chat");

            const messageContent = document.createElement("div");
            // messageContent.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;

            if (message.text && message.text.includes(".wav")) {
              const audioFileURL = `https://audio-api-5-quizpace.onrender.com/uploads/${extractFileName(
                message.text
              )}`;

              messageContent.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> `;
              const audioDiv = document.createElement("div");
              audioDiv.classList.add("audio-message2");

              const audioPlayer = new Audio(audioFileURL);
              audioPlayer.controls = false;

              const playButton = document.createElement("button2");
              playButton.classList.add("play-pause-button2");
              playButton.textContent = "🎶";
              playButton.addEventListener("click", () => {
                if (audioPlayer.paused) {
                  audioPlayer.play();
                  playButton.textContent = "🟰";
                } else {
                  audioPlayer.pause();
                  playButton.textContent = "🎶";
                }
              });
              audioPlayer.addEventListener("ended", () => {
                playButton.textContent = "🎶";
              });

              const progressBarContainer = document.createElement("div");
              progressBarContainer.classList.add("progress-bar-container2");

              const progressBar = document.createElement("progress");
              progressBar.max = 100;
              progressBar.value = 0;

              const progressDot = document.createElement("div");
              progressDot.classList.add("progress-dot2");

              progressBarContainer.appendChild(progressBar);
              progressBarContainer.appendChild(progressDot);
              progressBarContainer.appendChild(playButton);

              audioPlayer.addEventListener("loadedmetadata", () => {
                progressBar.max = audioPlayer.duration;
              });

              audioPlayer.addEventListener("timeupdate", () => {
                progressBar.value = audioPlayer.currentTime;
              });

              audioDiv.appendChild(audioPlayer);
              audioDiv.appendChild(progressBarContainer);
              messageContent.appendChild(audioDiv);
            } else {
              const textWithLinks = convertURLsToLinks(message.text);
              messageContent.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;
              //   if (message.imageUrl) {
              //     const imageElement = document.createElement("img");
              //     imageElement.src = message.imageUrl;
              //     imageElement.width = 110;
              //     imageElement.height = 100;
              //     messageContent.appendChild(imageElement);

              //     clientChatDiv.style.background =
              //       "linear-gradient(to right, #584460, #e0fbfc)";
              //   }
              // }
              if (message.imageUrl) {
                const serverUrl = "https://photos-api-mzpl.onrender.com/photos";
                const imageExtensionsRegex = /\.(png|jpe?g|gif|bmp|webp)$/i;

                if (
                  message.imageUrl.startsWith(serverUrl) &&
                  imageExtensionsRegex.test(message.imageUrl)
                ) {
                  const blueImage = document.createElement("img");
                  blueImage.src = "/img/blueberry.png";
                  blueImage.classList.add("blue");
                  messageContent.appendChild(blueImage);
                  clientChatDiv.style.background =
                    "linear-gradient(to right, #584460, #b9fbc0)";
                } else {
                  const imageElement = document.createElement("img");
                  imageElement.src = message.imageUrl;
                  imageElement.width = 110;
                  imageElement.height = 100;
                  messageContent.appendChild(imageElement);

                  clientChatDiv.style.background =
                    "linear-gradient(to right, #584460, #e0fbfc)";
                }
              }
            }
            clientChatDiv.appendChild(messageContent);
            messageDiv.appendChild(clientChatDiv);
            chatsDiv.appendChild(messageDiv);

            clientChatDiv.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
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
  setInterval(getTextFromServer, 5000);
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
