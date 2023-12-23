"use strict";
function createBubble(message) {
  const containerDiv = document.querySelector(".container");
  const bubbleDiv = document.createElement("div");
  const bubbleSpan = document.createElement("span");

  bubbleDiv.id = "bubble";
  bubbleDiv.classList.add("gradientBubble");
  bubbleSpan.classList.add("bubbleText");
  bubbleSpan.innerText = message; // Set the message inside the bubble

  bubbleDiv.appendChild(bubbleSpan);

  if (containerDiv) {
    // Check if the container has at least 6 children
    if (containerDiv.children.length >= 7) {
      // Insert the new bubble before the sixth child
      containerDiv.insertBefore(
        bubbleDiv,
        containerDiv.children[5].nextSibling
      );
    } else {
      // If there are less than 6 children, append the new bubble as the last child
      containerDiv.appendChild(bubbleDiv);
    }
  }
}

// fullscreen hover
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".fullscreen").forEach((item) => {
    item.addEventListener("mouseover", () => {
      const textElement = item.querySelector(".fullscreen-text");
      if (textElement) {
        textElement.style.display = "block";
      }
    });

    item.addEventListener("mouseout", () => {
      const textElement = item.querySelector(".fullscreen-text");
      if (textElement) {
        textElement.style.display = "none";
      }
    });
  });
});
