// Animals (search for animal-related terms like "cat," "dog," "elephant," etc.)
// Emotions (try searching for emotions like "happy," "sad," "excited," etc.)
// Activities (search for terms related to hobbies, sports, or activities)
// Seasons (search for terms like "summer," "winter," etc.)

// $(document).ready(function () {
//   $("#sticker-sp").on("click", function () {
//     $(".stickers-search").css("display", "block");
//     $(".search-stickers-btn").css("display", "block");
//     $("#emoji-icons").css("display", "none");
//     clearEmojisTable(); // Clear emojis when switching to stickers
//   });

//   // Function to clear emojis from the table
//   function clearEmojisTable() {
//     const emojiTableBody = document.getElementById("emojiTableBody");
//     emojiTableBody.innerHTML = ""; // Clear previous emoji grid
//   }

//   $("#emoji-sp").on("click", function () {
//     $(".stickers-search").css("display", "none");
//     $(".search-stickers-btn").css("display", "none");
//     $("#emoji-icons").css("display", "block");
//     $("#emoji-icons td").css("padding", "7px");
//     $(".emoji-info").css("margin-top", "20px");
//     createEmojiGrid("smileys-and-people");
//   });

//   // Function to fetch stickers based on a search query
//   async function fetchStickers(query) {
//     const apiKey = "dc6zaTOxFJmzC";
//     const apiUrl = `https://api.mojilala.com/v1/stickers/search?q=${query}&api_key=${apiKey}`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       return data.data; // Return the array of stickers
//     } catch (error) {
//       console.error("Error fetching stickers:", error);
//       return []; // Return an empty array in case of an error
//     }
//   }

//   // Function to display stickers in the stickers-icons table
//   async function displayStickers(query) {
//     const stickersTable = document.getElementById("stickers-icons");

//     try {
//       const stickers = await fetchStickers(query);

//       let stickerIndex = 0;
//       const rowsCount = 3; // Adjust as needed
//       const colsCount = 3; // Adjust as needed

//       for (let i = 0; i < rowsCount; i++) {
//         const row = document.createElement("tr");

//         for (let j = 0; j < colsCount; j++) {
//           const cell = document.createElement("td");

//           if (stickerIndex < stickers.length) {
//             const sticker = stickers[stickerIndex];

//             const stickerImg = document.createElement("img");
//             stickerImg.src = sticker.images.fixed_height.url;
//             stickerImg.alt = "Sticker";
//             stickerImg.width = 100; // Adjust width as needed

//             cell.appendChild(stickerImg);
//             row.appendChild(cell);

//             stickerIndex++;
//           }
//         }

//         stickersTable.appendChild(row);
//       }
//     } catch (error) {
//       console.error("Error displaying stickers:", error);
//     }
//   }

//   // Clear the stickers-icons table before displaying new stickers
//   function clearStickersTable() {
//     const stickersTable = document.getElementById("stickers-icons");
//     stickersTable.innerHTML = "";
//   }

//   // Event listeners for different sticker categories
//   $("#animals-category").on("click", function () {
//     clearStickersTable();
//     displayStickers("animal");
//   });

//   $("#emotions-category").on("click", function () {
//     clearStickersTable();
//     displayStickers("emotions");
//   });

//   // Add event listeners for other categories as needed
// });

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

// ... (Previous code remains unchanged)

async function displayStickers(query) {
  const stickersTable = document.createElement("table");
  stickersTable.className = "stickers-icons";

  try {
    const stickers = await fetchStickers(query);

    let stickerIndex = 0;
    const rowsCount = 3; // Fixed number of rows
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

// ... (Rest of your code remains unchanged)


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
