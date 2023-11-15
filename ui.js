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