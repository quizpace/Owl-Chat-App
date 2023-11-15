// Format time
const username = myUserName;
// Function to parse the time string based on the user
function parseMessageTime(timeString, username) {
  if (username == myUserName) {
    // Parse time for Avi using ISO 8601 format
    return new Date(timeString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  } else {
    // Parse time for other users using "HH:mm:ss:SSS" format
    const timeParts = timeString.split(":");
    const hours = timeParts[0];
    const minutes = timeParts[1];
    // const seconds = timeParts[2];
    // const milliseconds = timeParts[3];
    return `${hours}:${minutes}`;
  }
}
