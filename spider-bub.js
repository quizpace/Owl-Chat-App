"use strict";
const exampleElement = document.querySelector(".logowl");
const spiderContainer = document.querySelector(".spider-container");
const textOverlay = document.querySelector(".text-overlay");
let timeoutIds = [];

const messages = [
  "May your day be filled with serendipitous moments!",
  "Remember to take breaks and recharge your energy.",
  "Wishing you productivity and creativity today!",
  "Find joy in the little things around you.",
  "Take a deep breath and tackle one thing at a time.",
  "Embrace challenges as opportunities to grow.",
  "Stay hydrated and keep a healthy snack nearby.",
  "Spread positivity—it's contagious!",
  "Appreciate the beauty in both success and setbacks.",
  "Practice gratitude for a happier mindset.",
  "May today unfold with delightful surprises!",
  "Stay focused, but don't forget to enjoy the journey.",
  "Find inspiration in the world around you.",
  "A smile can brighten your day and someone else's.",
  "Prioritize self-care—it's crucial for a balanced day.",
  "Seek opportunities to learn something new.",
  "Remember, progress is more important than perfection.",
  "Connect with someone and spread a little kindness.",
  "Take a moment to appreciate your achievements, big or small.",
  "A positive mindset can turn challenges into triumphs.",
  "Allow yourself to dream big and aim high.",
  "Pause, breathe, and savor the beauty of this moment.",
  "Cherish the people who bring light into your life.",
  "Let gratitude be your compass today.",
  "Dance through your challenges with resilience.",
  "Create a balance between work, play, and rest.",
  "Explore new perspectives and embrace diversity.",
  "Kindness costs nothing but can mean everything.",
  "You have the strength to overcome any hurdle.",
  "Let your enthusiasm for life shine brightly.",
];

exampleElement.addEventListener("mouseenter", function () {
  const randomIndex = Math.floor(Math.random() * messages.length);
  const randomMessage = messages[randomIndex];
  textOverlay.querySelector("p").textContent = randomMessage;

  clearTimeouts();
  spiderContainer.style.display = "block";
  setTimeout(function () {
    spiderContainer.style.opacity = "1";
    spiderContainer.style.bottom = "3%"; // Set the desired final position
  }, 100);
  timeoutIds.push(
    setTimeout(function () {
      hideSpiderContainer();
    }, 15000)
  ); // 15 seconds
});

exampleElement.addEventListener("mouseleave", function () {
  clearTimeouts();
  hideSpiderContainer();
});

function hideSpiderContainer() {
  spiderContainer.style.opacity = "0";
  spiderContainer.style.transition = "opacity 1.5s ease-in-out"; // Adding transition
  timeoutIds.push(
    setTimeout(function () {
      spiderContainer.style.bottom = "-100%"; // Push it off the screen
    }, 100)
  );
  timeoutIds.push(
    setTimeout(function () {
      spiderContainer.style.display = "none";
    }, 1600)
  ); // Adjust the timing for a smoother transition (1.6 seconds)
}

function clearTimeouts() {
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
}
