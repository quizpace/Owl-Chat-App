function convertURLsToLinks(text, chatType) {
  if (!text) {
    return ""; // or handle the case when text is undefined or empty
  }
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const textWithLinks = text.replace(urlRegex, (url) => {
    if (isYouTubeLink(url)) {
      return `<div class="${chatType}-chat"><div class="link-container"><a href="#" class="youtube-link" onclick="openYouTubeModal('${url}')">${url}</a><img src="/img/tv6.png" class="tvIcon" alt="tvlink" onclick="openYouTubeModal('${url}')" /></div></div>`;
    } else {
      return `<div class="${chatType}-chat"><a href="${url}" target="_blank" class="other-link">${url}</a></div>`;
    }
  });

  return textWithLinks;
}

// YOU TUBE LINKS

async function processIncomingMessage(message) {
  const chatInput = message.text; // Assuming message has a 'text' property

  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  // Check if the message contains a YouTube link
  const youtubeMatch = chatInput.match(youtubeRegex);

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Display the YouTube video in a modal or designated area
    displayYouTubeVideo(embedUrl);
  }
}

function displayYouTubeVideo(embedUrl) {
  // Assuming you have a modal element with the id "youtubeModal" in your HTML
  const modal = document.getElementById("youtubeModal");

  // Assuming you have an iframe element with the class "youtubeIframe" in your HTML
  const iframe = document.querySelector(".youtubeIframe");

  // Set the src attribute of the iframe to the YouTube embed URL
  iframe.src = embedUrl;

  // Display the modal
  modal.style.display = "block";
}

function closeYouTubeModal() {
  const modal = document.getElementById("youtubeModal");
  modal.style.display = "none";
}

function isYouTubeLink(url) {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  return youtubeRegex.test(url);
}

// Function to open YouTube modal with the video link
function openYouTubeModal(url) {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const youtubeMatch = url.match(youtubeRegex);

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    displayYouTubeVideo(embedUrl);
  }
}

// // Function to open YouTube modal with the video link
// function openYouTubeModal(url) {
//   const youtubeRegex =
//     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const youtubeMatch = url.match(youtubeRegex);

//   if (youtubeMatch) {
//     const videoId = youtubeMatch[1];
//     const embedUrl = `https://www.youtube.com/embed/${videoId}`;
//     displayYouTubeVideo(embedUrl);
//   }
// }
