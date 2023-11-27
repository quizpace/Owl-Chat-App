//   async function getTextFromServer() {
//     try {
//       const response = await fetch("https://db-vkyv.onrender.com/chats");
//       const data = await response.json();
//       if (data && data.length > 0) {
//         data.forEach((message) => {
//           const messageId = message.id;

//           if (!processedMessageIds.has(messageId)) {
//             const username = message.user;
//             const time = parseMessageTime(message.time, username);
//             const textWithLinks = convertURLsToLinks(message.text);

//             if (username !== myUserName) {
//               // Check username condition here
//               const messageDiv = document.createElement("div");
//               messageDiv.id = `message-${messageId}`;

//               const clientChatDiv = document.createElement("div");
//               clientChatDiv.classList.add("client-chat");

//               const messageContent = document.createElement("div");
//               messageContent.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;

//               if (message.imageUrl) {
//                 const imageElement = document.createElement("img");
//                 imageElement.src = message.imageUrl;
//                 imageElement.width = 100;
//                 imageElement.height = 100;
//                 messageContent.appendChild(imageElement);

//                 clientChatDiv.style.background =
//                   "linear-gradient(to right, #584460, white)";
//               }

//               if (message.text && message.text.includes(".wav")) {
//                 const audioFileURL = `https://audio-api-5-quizpace.onrender.com/uploads/${extractFileName(message.text)}`;

//                 // Create audio player
//                 const audioPlayer = new Audio(audioFileURL);
//                 audioPlayer.controls = false; // Hide default controls

//                 // Create a play/pause button
//                 const playButton = document.createElement("button");
//                 playButton.classList.add("play-pause-button");
//                 playButton.textContent = "🎶";
//                 playButton.addEventListener("click", () => {
//                     if (audioPlayer.paused) {
//                         audioPlayer.play();
//                         playButton.textContent = "🟰";
//                     } else {
//                         audioPlayer.pause();
//                         playButton.textContent = "🎶";
//                     }
//                 });
//                 audioPlayer.addEventListener("ended", () => {
//                     playButton.textContent = "🎶";
//                 });

//                 // Create a progress bar container
//                 const progressBarContainer = document.createElement("div");
//                 progressBarContainer.classList.add("progress-bar-container");

//                 // Create the progress bar
//                 const progressBar = document.createElement("progress");
//                 progressBar.max = 100;
//                 progressBar.value = 0;

//                 // Create a black dot for visualizing progress
//                 const progressDot = document.createElement("div");
//                 progressDot.classList.add("progress-dot");

//                 // Append elements to the container
//                 progressBarContainer.appendChild(progressBar);
//                 progressBarContainer.appendChild(progressDot);
//                 progressBarContainer.appendChild(playButton);

//                 // Wait for audio metadata to be loaded to get duration for the progress bar
//                 audioPlayer.addEventListener("loadedmetadata", () => {
//                     progressBar.max = audioPlayer.duration;
//                 });

//                 // Update progress bar as the audio plays
//                 audioPlayer.addEventListener("timeupdate", () => {
//                     progressBar.value = audioPlayer.currentTime;
//                 });

//                 // Append progress bar container to the message content
//                 messageContent.appendChild(progressBarContainer);
//             }

//               clientChatDiv.appendChild(messageContent);
//               messageDiv.appendChild(clientChatDiv);
//               chatsDiv.appendChild(messageDiv);

//               clientChatDiv.scrollIntoView({
//                 behavior: "smooth",
//                 block: "end",
//               });
//               processedMessageIds.add(messageId);
//             }
//           }
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

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
          const textWithLinks = convertURLsToLinks(message.text);

          if (username !== myUserName) {
            const messageDiv = document.createElement("div");
            messageDiv.id = `message-${messageId}`;

            const clientChatDiv = document.createElement("div");
            clientChatDiv.classList.add("client-chat");

            const messageContent = document.createElement("div");

            if (message.imageUrl) {
              const imageElement = document.createElement("img");
              imageElement.src = message.imageUrl;
              imageElement.width = 100;
              imageElement.height = 100;
              clientChatDiv.style.background =
                "linear-gradient(to right, #584460, white)";
              clientChatDiv.appendChild(imageElement);
            }

            if (message.text.includes(".wav")) {
              const audioFileURL = `https://audio-api-5-quizpace.onrender.com/uploads/${extractFileName(
                message.text
              )}`;
              messageContent.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span>`;
              const audioDiv2 = document.createElement("div");
              audioDiv2.classList.add("audio-message2");

              const audioPlayer2 = new Audio(audioFileURL);
              audioPlayer2.controls = false; // Hide default controls

              const playButton2 = document.createElement("button");
              playButton2.classList.add("play-pause-button2");
              playButton2.textContent = "🎶";
              playButton2.addEventListener("click", () => {
                if (audioPlayer2.paused) {
                  audioPlayer2.play();
                  playButton2.textContent = "🟰";
                } else {
                  audioPlayer2.pause();
                  playButton2.textContent = "🎶";
                }
              });
              audioPlayer2.addEventListener("ended", () => {
                playButton2.textContent = "🎶";
              });

              const progressBarContainer2 = document.createElement("div");
              progressBarContainer2.classList.add("progress-bar-container2");

              const progressBar2 = document.createElement("progress");
              progressBar2.max = 100;
              progressBar2.value = 0;
              progressBar2.id = "custom-progress";

              const progressDot2 = document.createElement("div");
              progressDot2.classList.add("progress-dot2");

              progressBarContainer2.appendChild(progressBar2);
              progressBarContainer2.appendChild(progressDot2);
              progressBarContainer2.appendChild(playButton2);

              audioPlayer2.addEventListener("loadedmetadata", () => {
                progressBar2.max = audioPlayer2.duration;
              });

              audioPlayer2.addEventListener("timeupdate", () => {
                progressBar2.value = audioPlayer2.currentTime;
              });

              audioDiv2.appendChild(progressBarContainer2);
              clientChatDiv.appendChild(messageContent);
              clientChatDiv.appendChild(audioDiv2);
            } else {
              messageContent.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;
              clientChatDiv.appendChild(messageContent);
            }

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
//             if (message.imageUrl) {
//               clientChatDiv.style.background =
//                 "linear-gradient(to right, #584460, white)";
//             }
//             clientChatDiv.innerHTML = `<span class="username-style">${username}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;

//             // Check if there's an imageUrl in the message
//             if (message.imageUrl) {
//               const imageElement = document.createElement("img");
//               imageElement.src = message.imageUrl;
//               imageElement.width = 100;
//               imageElement.height = 100;
//               clientChatDiv.appendChild(imageElement);
//             }

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
