// client.js
async function createEmojiGrid() {
  const emojiTable = document.getElementById("emojiTableBody");

  try {
    const response = await fetch("http://localhost:3000/emojis"); // Fetch data from your Node.js server
    const emojis = await response.json();

    for (let i = 0; i < 20; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 20; j++) {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        const emoji = emojis[randomIndex].character;

        const cell = document.createElement("td");
        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = emoji;
        cell.appendChild(emojiSpan);
        row.appendChild(cell);
      }
      emojiTable.appendChild(row);
    }
  } catch (error) {
    console.error("Error fetching emojis:", error);
  }
}

createEmojiGrid();
