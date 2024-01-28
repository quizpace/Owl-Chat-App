"use strict";
// Declare a set to store processed message IDs
const processedMessageIds = new Set();
// used to creat childes for .chats (div).
const chatsDiv = document.querySelector(".chats");
// Get the text from the input field with class .msg
const inputText = document.querySelector(".msg").value;
// Dummy data for username and time
const options = { hour: "numeric", minute: "numeric" };
const time = new Date().toLocaleTimeString([], options);

// Chat box section
// Creat chat box for the using user
// Function to create my-chat div and append it to the chats div
function createMyChat(chatsDiv, text, userName, time) {
  const myChatDiv = document.createElement("div");
  myChatDiv.classList.add("my-chat");
  // Convert URLs in the text to clickable links
  const textWithLinks = convertURLsToLinks(text);
  // Set the background gradient style
  myChatDiv.style.background = "linear-gradient(to right, #584460, #0f0c29)";
  myChatDiv.innerHTML = `<span class="username-style">${userName}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;
  chatsDiv.appendChild(myChatDiv);
  // Scroll the new message into view
  myChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
}

// IMG section
// For Links With IMG
function createMyChat2(chatsDiv, userName, time, imageUrl) {
  const myChatDiv = document.createElement("div");
  myChatDiv.classList.add("my-chat-sticker");
  // Create an image element with the provided PNG URL
  const imageElement = document.createElement("img");
  imageElement.src = imageUrl;
  imageElement.classList.add("chat-image");
  // Set the width and height of the image
  imageElement.style.width = "110px";
  imageElement.style.height = "100px";
  imageElement.addEventListener("click", function (event) {
    console.log("Clicked Image Source:", event.target.src);
    // Perform actions with the image source when clicked
  });
  // Set the background gradient style
  // myChatDiv.style.background = "linear-gradient(to right, #584460, #0f0c29)";
  myChatDiv.innerHTML = `<span class="username-style">${userName}</span> <br> <span class="message-time">${time}</span>`;
  // Append the image element to the chat container
  myChatDiv.appendChild(imageElement);
  chatsDiv.appendChild(myChatDiv);
  // Scroll the new message into view
  myChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Creat chat for sending IMG
async function createMyChatWithBlueImage(chatsDiv, userName, time, imageUrl) {
  const myChatDiv = document.createElement("div");
  myChatDiv.classList.add("my-chat-sticker");
  const blueImage = document.createElement("img");
  blueImage.src = "/img/blueberry.png";
  blueImage.classList.add("blue");
  blueImage.dataset.imageUrl = imageUrl;
  myChatDiv.innerHTML = `<span class="username-style">${userName}</span> <br> <span class="message-time">${time}</span>`;
  myChatDiv.appendChild(blueImage);
  myChatDiv.style.background = "linear-gradient(to right, #584460, #ecf39e)";
  chatsDiv.appendChild(myChatDiv);
  myChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Audio section
// Creat Audio Chat Box
function createAudioBox(chatsDiv, audioFileURL, userName, time) {
  const myChatDiv = document.createElement("div");
  myChatDiv.classList.add("my-chat");
  // Set the background gradient style
  myChatDiv.style.background = "linear-gradient(to right, #584460, #0f0c29)";
  const audioDiv = document.createElement("div");
  audioDiv.classList.add("audio-message");
  // Create an audio element
  const audioPlayer = new Audio(audioFileURL);
  audioPlayer.controls = false; // Hide default controls
  // Create a play/pause button
  const playButton = document.createElement("button");
  playButton.classList.add("play-pause-button");
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

  // Create a progress bar container
  const progressBarContainer = document.createElement("div");
  progressBarContainer.classList.add("progress-bar-container");
  // Create the progress bar
  const progressBar = document.createElement("progress");
  progressBar.max = 100;
  progressBar.value = 0;
  // Create a black dot for visualizing progress
  const progressDot = document.createElement("div");
  progressDot.classList.add("progress-dot");
  // Append elements to the container
  progressBarContainer.appendChild(progressBar);
  progressBarContainer.appendChild(progressDot);
  progressBarContainer.appendChild(playButton);
  // Wait for audio metadata to be loaded to get duration for the progress bar
  audioPlayer.addEventListener("loadedmetadata", () => {
    progressBar.max = audioPlayer.duration;
  });
  // Update progress bar as the audio plays
  audioPlayer.addEventListener("timeupdate", () => {
    progressBar.value = audioPlayer.currentTime;
  });

  //---
  //---
  // Create the username and time elements
  const usernameElement = document.createElement("span");
  usernameElement.classList.add("username-style");
  usernameElement.textContent = userName;
  const timeElement = document.createElement("span");
  timeElement.classList.add("message-time");
  timeElement.textContent = time;
  // Append elements to myChatDiv
  myChatDiv.appendChild(usernameElement);
  myChatDiv.appendChild(document.createElement("br")); // Line break
  myChatDiv.appendChild(timeElement);
  myChatDiv.appendChild(document.createElement("br")); // Line break
  audioDiv.appendChild(audioPlayer); // Append the audio player to the audioDiv
  audioDiv.appendChild(playButton); // Append the play/pause button
  audioDiv.appendChild(progressBar); // Append the progress bar
  myChatDiv.appendChild(audioDiv); // Append the audioDiv to myChatDiv
  // Append the chat div to the chats container
  chatsDiv.appendChild(myChatDiv);
  // Scroll the new message into view
  myChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
}

// FullScreen Button!
const fullscreenButton = document.getElementById("fullscreen");
fullscreenButton.addEventListener("click", () => {
  if (document.fullscreenElement) {
    // Exit fullscreen mode
    document.exitFullscreen().catch((err) => {
      console.error("Error exiting fullscreen:", err);
    });
  } else {
    // Enter fullscreen mode
    document.documentElement.requestFullscreen().catch((err) => {
      console.error("Error entering fullscreen:", err);
    });
  }
});
