"use strict";
const chatBox = document.querySelector(".chat-box");
const logoOwl = document.getElementById("owl");
let isDragging = false;
let offsetX, offsetY;

// Grab chat box (move around the screen)

logoOwl.addEventListener("mousedown", function (e) {
  isDragging = true;
  const boundingBox = chatBox.getBoundingClientRect();

  offsetX = e.clientX - boundingBox.left;
  offsetY = e.clientY - boundingBox.top;
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    const boundingBox = chatBox.getBoundingClientRect();
    const newX = e.clientX - offsetX - boundingBox.width / 2;
    const newY = e.clientY - offsetY - boundingBox.height / 2;

    chatBox.style.left = newX + "px";
    chatBox.style.top = newY + "px";
  }
});
//
