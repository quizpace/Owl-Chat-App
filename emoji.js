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
          emojiSpan.textContent = String.fromCodePoint(
            parseInt(emoji.unicode[0].slice(2), 16)
          ); // Convert Unicode to emoji
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

// Call the function to generate the table with emojis from 'smileys-and-people' category
createEmojiGrid("smileys-and-people");
// createEmojiGrid('animals-and-nature');
// createEmojiGrid('food-and-drink');
// createEmojiGrid('travel-and-places');
// createEmojiGrid('activities');
// createEmojiGrid('objects');
// createEmojiGrid('symbols');
// createEmojiGrid('flags');
