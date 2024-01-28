// fullscreen hover
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".fullscreen").forEach((item) => {
    item.addEventListener("mouseover", () => {
      const textElement = item.querySelector(".fullscreen-text");
      if (textElement) {
        textElement.style.display = "block";
      }
    });
    item.addEventListener("mouseout", () => {
      const textElement = item.querySelector(".fullscreen-text");
      if (textElement) {
        textElement.style.display = "none";
      }
    });
  });
});

// day/night mode hover
document.addEventListener("DOMContentLoaded", (event) => {
  const moonImage = document.getElementById("modeToggle");
  const textToShow = document.createElement("span");
  textToShow.textContent = "Day/Night Mode"; // הוסף את הטקסט שאתה רוצה להציג
  textToShow.className = "hover-day-night"; // הוסף את הקלאס לאלמנט
  textToShow.style.display = "none"; // מסתיר את הטקסט בתחילה
  moonImage.parentNode.insertBefore(textToShow, moonImage.nextSibling); // מוסיף את הטקסט אחרי התמונה
  moonImage.addEventListener("mouseover", () => {
    textToShow.style.display = "block"; // מציג את הטקסט בעת העברת העכבר מעל
  });
  moonImage.addEventListener("mouseout", () => {
    textToShow.style.display = "none"; // מסתיר את הטקסט כאשר העכבר מתרחק
  });
});

// Bubbles display & Games: Hovers
document.addEventListener("DOMContentLoaded", (event) => {
  // Define an array of button IDs, their hover text, and a unique class for each
  const buttonsInfo = [
    {
      id: "openModalBtn",
      text: "Play Tic Tac Toe",
      class: "hover-text-XO",
    },
    {
      id: "openModalBtn2",
      text: "Play Memory Game",
      class: "hover-text-m-game",
    },
    {
      id: "hidecanvas",
      text: "Hide/Display Bubbles",
      class: "hover-text-hide-bubbles",
    },
  ];
  buttonsInfo.forEach((info) => {
    const button = document.getElementById(info.id);
    const textToShow = document.createElement("span");
    textToShow.textContent = info.text;
    textToShow.className = info.class; // Use the unique class
    textToShow.style.display = "none";
    button.parentNode.insertBefore(textToShow, button.nextSibling);
    button.addEventListener("mouseover", () => {
      textToShow.style.display = "block";
    });
    button.addEventListener("mouseout", () => {
      textToShow.style.display = "none";
    });
  });
});

// Owl logo hover
document.addEventListener("DOMContentLoaded", (event) => {
  const owlImage = document.getElementById("owl");
  const textToShow = document.createElement("span");
  textToShow.textContent =
    "Click to resize ChatBox. You can also drag the owl..."; // Replace with your desired text
  textToShow.className = "hover-text-owl"; // Unique class for styling
  textToShow.style.display = "none";
  owlImage.parentNode.insertBefore(textToShow, owlImage.nextSibling);

  owlImage.addEventListener("mouseover", () => {
    textToShow.style.display = "block";
  });
  owlImage.addEventListener("mouseout", () => {
    textToShow.style.display = "none";
  });
});

// Box Buttons Hover (chatbox - emojibox - usersbox)
document.addEventListener("DOMContentLoaded", (event) => {
  const hoverElements = [
    {
      selector: ".chat-btn img",
      text: "Chat Box",
      class: "hover-text-chat",
    },
    {
      selector: ".users-btn img",
      text: "Users List",
      class: "hover-text-users",
    },
    {
      selector: ".emoji-btn img",
      text: "Emojis & Stickers",
      class: "hover-text-emoji",
    },
  ];

  const textToShow = document.createElement("span");
  textToShow.style.display = "none";
  document.body.appendChild(textToShow);

  hoverElements.forEach((el) => {
    const imgElement = document.querySelector(el.selector);

    imgElement.addEventListener("mouseover", () => {
      textToShow.textContent = el.text;
      textToShow.className = el.class;
      textToShow.style.display = "block";
    });
    imgElement.addEventListener("mouseout", () => {
      textToShow.style.display = "none";
    });
  });
});
