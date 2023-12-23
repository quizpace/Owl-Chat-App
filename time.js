"use strict";
// Format time
const username = myUserName;
// Function to parse the time string based on the user
function parseMessageTime(timeString, username) {
  if (username == myUserName) {
    // Parse time for Avi using 12-hour format
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    // Parse time for other users using 12-hour format
    const time = new Date(timeString);
    const hours = (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}

// night - day mode

function toggleMode() {
  const body = document.querySelector("body");
  const chatBox = document.querySelector(".chat-box");
  const chatInput = document.querySelector(".chat-input");
  const emojiBox = document.querySelector(".emoji-box");
  const usersBox = document.querySelector(".users-box");
  const modeToggle = document.querySelector(".mode-toggle");

  body.classList.toggle("night");
  chatBox.classList.toggle("night");
  chatInput.classList.toggle("night");
  emojiBox.classList.toggle("night");
  usersBox.classList.toggle("night");

  // Toggle the image between moon and sun based on night mode
  if (body.classList.contains("night")) {
    modeToggle.src = "/img/mooon.png";
  } else {
    modeToggle.src = "/img/psun.png";
  }
}

// input longer

const chatTextarea = document.querySelector(".chat-input .msg");
const chatInputContainer = document.querySelector(".chat-input");
const minChars = 40; // Minimum characters required before adjusting heights

// Getting the default styles for textarea and its container
const textareaDefaultStyles = window.getComputedStyle(chatTextarea);
const containerDefaultStyles = window.getComputedStyle(chatInputContainer);

// Save the original size
const originalWidth = textareaDefaultStyles.getPropertyValue("width");
const originalHeight = textareaDefaultStyles.getPropertyValue("height");
const originalContainerHeight =
  containerDefaultStyles.getPropertyValue("height");

chatTextarea.addEventListener("input", function () {
  if (this.value.length >= minChars) {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";

    // Adjust container height based on textarea height
    chatInputContainer.style.height = this.scrollHeight + "px";
  } else {
    if (this.value.length === 0) {
      // Revert both textarea and container to original size if there are 0 characters
      this.style.width = originalWidth;
      this.style.height = originalHeight;
      chatInputContainer.style.height = originalContainerHeight;
      // Add other default styles as needed (e.g., padding, margin, etc.)
    }
  }
});

// Bigger Chat-Box
document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.querySelector(".chat-box");
  const clientImg = document.querySelector(".logowl");
  const inputT = document.querySelector(".msg");
  const scrollButton = document.getElementById("scroll-button"); // Assuming you have an element with ID "scroll-button"

  let isExpanded = false;

  clientImg.addEventListener("click", function () {
    if (!isExpanded) {
      chatBox.style.width = "600px";
      chatBox.style.height = "650px";
      chatBox.style.bottom = "40px";
      inputT.style.width = "400px";
      isExpanded = true;
    } else {
      chatBox.style.width = "400px";
      chatBox.style.height = "450px";
      chatBox.style.bottom = "10px";
      inputT.style.width = "250px";
      isExpanded = false;
    }
  });
});
