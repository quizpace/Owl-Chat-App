/* Message Handeling */

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
    if (chatInput === "") {
      return; // Stop further execution if the input field is empty
    } else {
      // Send the chat input to the server
      await sendchatInputToServer(chatInput);

      // Now that the data is sent, create and append the my-chat div
      createMyChat(chatsDiv, chatInput, userName, time);

      // Clear the input field
      document.querySelector(".msg").value = "";
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".msg").value = "";
});
