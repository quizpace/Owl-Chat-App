$(document).ready(() => {
  $(".chat-btn").click(() => {
    $(".chat-box").slideToggle("slow");
  });
});

$(document).ready(() => {
  $(".users-btn").click(() => {
    $(".users-box").slideToggle("slow");
  });
});

// Call the function when the page loads
window.onload = async () => {
  await getTextFromServer();
  // await deleteAllExceptFirst();
  // Start the interval after loading all messages
  setInterval(() => {
    getTextFromServer();
    const chatBox = document.querySelector(".chat-box");
    if (!chatBox.classList.contains("expanded")) {
      scrollChatBoxDown();
    }
  }, 10); // Set the interval to 1000 milliseconds (1 second)
};
