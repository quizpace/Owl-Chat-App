// Declare a set to store processed message IDs
const processedMessageIds = new Set();
// used to creat childes for .chats (div).
const chatsDiv = document.querySelector(".chats");
// Get the text from the input field with class .msg
const inputText = document.querySelector(".msg").value;
// Dummy data for username and time (replace this with your actual data)
// const userName = "User123";
const options = { hour: "numeric", minute: "numeric" };
const time = new Date().toLocaleTimeString([], options);

// Creat chat box for the using user
// Function to create my-chat div and append it to the chats div
function createMyChat(chatsDiv, text, userName, time) {
  const myChatDiv = document.createElement("div");
  myChatDiv.classList.add("my-chat");

  // Convert URLs in the text to clickable links
  const textWithLinks = convertURLsToLinks(text);

  myChatDiv.innerHTML = `<span class="username-style">${userName}</span> <br> <span class="message-time">${time}</span> ${textWithLinks}`;
  chatsDiv.appendChild(myChatDiv);

  // Scroll the new message into view
  myChatDiv.scrollIntoView({ behavior: "smooth", block: "end" });
}

document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.querySelector(".chat-box");
  const clientImg = document.querySelector(".client img");
  const scrollButton = document.getElementById("scroll-button"); // Assuming you have an element with ID "scroll-button"

  let isExpanded = false;

  clientImg.addEventListener("click", function () {
    if (!isExpanded) {
      chatBox.style.width = "600px";
      chatBox.style.height = "600px";
      clientImg.style.top = "-350%";
      clientImg.style.width = "184%";
      scrollButton.style.left = "25%"; 
      scrollButton.style.top = "20%"; 
      isExpanded = true;
    } else {
      chatBox.style.width = "400px";
      chatBox.style.height = "450px";
      clientImg.style.top = "-225%";
      clientImg.style.width = "190%";
      scrollButton.style.left = "36%"; 
      scrollButton.style.top = "25%"; 
      isExpanded = false;
    }
  });
});


