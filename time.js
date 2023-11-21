// Format time
const username = myUserName;
// Function to parse the time string based on the user
function parseMessageTime(timeString, username) {
  if (username == myUserName) {
    // Parse time for Avi using 12-hour format
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    // Parse time for other users using 12-hour format
    const time = new Date(timeString);
    const hours = (time.getHours() % 12 || 12).toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
}
