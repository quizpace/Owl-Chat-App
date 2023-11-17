async function createEmojiGrid(category) {
  const emojiTable = document.getElementById("emojiTableBody");

  try {
    const response = await fetch(
      `https://emojihub.yurace.pro/api/all/category/${category}`
    );
    const emojis = await response.json();

    let emojiIndex = 0;

    // Create a 9x12 grid
    for (let i = 0; i < 9; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 12; j++) {
        const cell = document.createElement("td");

        if (emojiIndex < emojis.length) {
          const emoji = emojis[emojiIndex];

          const emojiSpan = document.createElement("span");
          const emojiUnicode = String.fromCodePoint(
            parseInt(emoji.unicode[0].slice(2), 16)
          ); // Convert Unicode to emoji
          emojiSpan.textContent = emojiUnicode;

          // Assigning ID to the emojiSpan
          emojiSpan.id = `emoji_${emojiIndex}`;

          cell.appendChild(emojiSpan);
          row.appendChild(cell);

          emojiIndex++;
        }
      }

      emojiTable.appendChild(row);
    }
  } catch (error) {
    console.error("Error fetching emojis:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  function callEmojiGrid(category) {
    createEmojiGrid(category);
  }

  const emojiTds = document.querySelectorAll(".emojis-icons td");
  emojiTds.forEach((td) => {
    td.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      if (category) {
        const emojiTableBody = document.getElementById("emojiTableBody");
        emojiTableBody.innerHTML = ""; // Clear previous emoji grid
        callEmojiGrid(category);
      } else {
        console.error("Category attribute is missing or invalid");
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Select all elements with the class 'emoji-icon'
  const emojiIcons = document.querySelectorAll('.emoji-table');

  // Attach the click event listener only to the emoji icons
  emojiIcons.forEach(icon => {
    icon.addEventListener('click', function(event) {
      const clickedEmoji = document.getElementById(event.target.id);
      if (clickedEmoji) {
        const emojiUnicode = clickedEmoji.textContent;
        const messageTextArea = document.querySelector(".msg");
        messageTextArea.value += emojiUnicode;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  createEmojiGrid("smileys-and-people");
  });


//buttons id
function logElementInfo(event) {
  console.log("Clicked Element ID:", event.target.id);
  console.log("Clicked Element Source:", event.target.src);
}

document.addEventListener("DOMContentLoaded", function () {
  // Attach the click event listener to the document body
  document.body.addEventListener("click", logElementInfo);
});


