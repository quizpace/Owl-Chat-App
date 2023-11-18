// Animals (search for animal-related terms like "cat," "dog," "elephant," etc.)
// Emotions (try searching for emotions like "happy," "sad," "excited," etc.)
// Activities (search for terms related to hobbies, sports, or activities)
// Seasons (search for terms like "summer," "winter," etc.)

$(document).ready(function () {
  $("#sticker-sp").on("click", function () {
    $(".stickers-search").css("display", "block");
    $(".search-stickers-btn").css("display", "block");
    $("#emoji-icons").css("display", "none");
    clearEmojisTable(); // Clear emojis when switching to stickers
  });

  // Function to clear emojis from the table
  function clearEmojisTable() {
    const emojiTableBody = document.getElementById("emojiTableBody");
    emojiTableBody.innerHTML = ""; // Clear previous emoji grid
  }

  function clearStickersTable() {
    const stickersBox = document.querySelector(".stickers-box");
    stickersBox.style.display = "none"; // Hide the stickers box
  }

  function clearStickersBox() {
    const stickersBox = document.querySelector(".stickers-box");
    stickersBox.innerHTML = ""; // Clear the contents of the stickers box
  }

  $("#emoji-sp").on("click", function () {
    $(".stickers-search").css("display", "none");
    $(".search-stickers-btn").css("display", "none");
    $("#emoji-icons").css("display", "block");
    $("#emoji-icons td").css("padding", "7px");
    $(".emoji-info").css("margin-top", "20px");
    clearStickersTable(); // Clear stickers first
    clearStickersBox(); // Clear stickers box when switching to emojis
    createEmojiGrid("smileys-and-people");
  });

  // Function to fetch stickers based on a search query
  async function fetchStickers(query) {
    const apiKey = "dc6zaTOxFJmzC";
    const apiUrl = `https://api.mojilala.com/v1/stickers/search?q=${query}&api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.data; // Return the array of stickers
    } catch (error) {
      console.error("Error fetching stickers:", error);
      return []; // Return an empty array in case of an error
    }
  }

  // Display the stickers in the stickers Box

  async function displayStickers(query) {
    const stickersTable = document.createElement("table");
    stickersTable.className = "stickers-icons";

    try {
      const stickers = await fetchStickers(query);

      let stickerIndex = 0;
      const rowsCount = 3;
      const stickersPerRow = Math.ceil(stickers.length / rowsCount);

      for (let i = 0; i < rowsCount; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < stickersPerRow; j++) {
          const cell = document.createElement("td");
          cell.className = "stickers-icons";

          if (stickerIndex < stickers.length) {
            const sticker = stickers[stickerIndex];

            const stickerImg = document.createElement("img");
            stickerImg.src = sticker.images.fixed_height.url;
            stickerImg.alt = "Sticker";
            stickerImg.width = 100;

            const stickerId = `sticker-${stickerIndex}`; // Generate unique ID for each sticker
            stickerImg.setAttribute("id", stickerId); // Set ID for the sticker image

            stickerImg.addEventListener("click", () => {
              console.log(`Clicked sticker ID: ${stickerId}`); // Log ID when clicked
            });

            cell.appendChild(stickerImg);
            row.appendChild(cell);

            stickerIndex++;
          }
        }

        stickersTable.appendChild(row);
      }

      const stickersBox = document.querySelector(".stickers-box");
      stickersBox.innerHTML = "";
      stickersBox.appendChild(stickersTable);
    } catch (error) {
      console.error("Error displaying stickers:", error);
    }
  }

  // Clear the stickers-icons table before displaying new stickers
  function clearStickersTable() {
    const stickersTable = document.getElementById("stickers-icons");
    stickersTable.innerHTML = "";
  }

  // Event listener for the sticker search button
  $("#stickerSearch").on("click", function () {
    const searchTerm = $("#sticker-search").val(); // Get the value from the search input field
    if (searchTerm) {
      clearStickersTable(); // Clear previous stickers
      displayStickers(searchTerm); // Display stickers based on the search term
    }
  });

  // Add event listeners for other categories as needed
});

// For Stickers
async function sendPngMessageToServer(userName, imageUrl) {
  try {
    const response = await fetch("https://db-vkyv.onrender.com/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userName,
        imageUrl: imageUrl,
        time: new Date().toISOString(),
      }),
    });
    // console.log("Sending PNG message to the server...");
    if (!response.ok) {
      throw new Error(`Error sending PNG message: ${response.statusText}`);
    }

    // Additional actions after successful response if needed
    // ...
  } catch (error) {
    console.error("Error sending PNG message:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Attach click event listener to the document body
  document.body.addEventListener("click", function (event) {
    // Check if the clicked element is an image inside stickers table
    // const stickersTable = document.getElementById("stickers-icons");
    const isClickedInStickers = event.target.closest(".stickers-icons");

    if (isClickedInStickers) {
      const clickedImage = event.target.closest("img");
      if (clickedImage) {
        const pngUrl = clickedImage.src;

        // Get the current time in hours and minutes
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        console.log("Clicked PNG URL:", pngUrl); // Check if URL is correctly obtained
        // Format hours and minutes to display in HH:MM format
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;

        console.log("Sending PNG message to the server..."); // Check if the request is attempted
        console.log("Current User:", myUserName);
        // Create the chat only if the clicked image is in the stickers table
        const chatsContainer = document.getElementById("chatsContainer");
        createMyChat2(chatsContainer, myUserName, formattedTime, pngUrl);
        sendPngMessageToServer(myUserName, pngUrl);
      }
    }
  });
});
