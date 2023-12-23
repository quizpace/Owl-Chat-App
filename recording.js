"use strict";
const toggleRecordingButton = document.getElementById("toggleRecording");
const audioPlayer = document.getElementById("audioPlayer");
let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let fileInfo;

// Recording Button

toggleRecordingButton.addEventListener("click", async () => {
  try {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      isRecording = true;

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        audioPlayer.src = URL.createObjectURL(audioBlob);
        uploadAudio(audioBlob);
        audioChunks = []; // Clear chunks for the next recording
      };

      mediaRecorder.start();
      // toggleRecordingButton.textContent = "🛑"; // Change button icon to stop
    } else {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        isRecording = false;
        // toggleRecordingButton.textContent = "🎙️"; // Change button icon back to record
      }
    }
  } catch (error) {
    console.error("Error toggling recording:", error);
  }
});

async function uploadAudio(audioBlob) {
  try {
    const formData = new FormData();
    const filename = generateUniqueFilename(5) + ".wav";
    formData.append("audio", audioBlob, filename);
    console.log("Uploading file:", filename);

    fileInfo = filename;
    console.log("Sending To Json:", fileInfo);

    const response = await fetch(
      "https://audio-api-5-quizpace.onrender.com/stop-recording-upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("Recording stopped and uploaded successfully!");

      // Assuming 'chatsDiv', 'userName', 'time', and 'fileInfo' are defined
      const audioFileURL = `https://audio-api-5-quizpace.onrender.com/uploads/${fileInfo}`;
      createAudioBox(chatsDiv, audioFileURL, userName, time);
      sendAudioInfoToServer(userName, fileInfo);
    } else {
      alert("Failed to upload recording!");
    }
  } catch (error) {
    console.error("Error uploading recording:", error);
  }
}

// Unique File Name For Each File

function generateUniqueFilename(length) {
  const characters = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
