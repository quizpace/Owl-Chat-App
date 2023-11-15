// Modal for username
// Declare userName globally
let userName = "";
let myUserName = "";

document.addEventListener("DOMContentLoaded", function () {
  // Display the modal on page load
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Handle the submission of the user's name
  const submitNameBtn = document.getElementById("submitNameBtn");
  const userNameInput = document.getElementById("userNameInput");

  submitNameBtn.addEventListener("click", function () {
    userName = userNameInput.value;
    myUserName = userNameInput.value;
    if (userName.trim() !== "") {
      modal.style.display = "none";
      // Now you can use the userName when sending messages
      createUsersList(userName);
      sendchatInputToServer(`${userName} joined the chat!`);
    } else {
      alert("Please enter a valid name.");
    }
  });
});

const usersList = document.querySelector(".users");
function createUsersList(userName) {
  const myUsersList = document.createElement("li");
  myUsersList.classList.add("uList");
  myUsersList.innerHTML = `${userName}`;
  usersList.appendChild(myUsersList);
}
