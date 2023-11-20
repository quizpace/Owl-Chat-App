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
      toggleRecordingButton.textContent = "🛑"; // Change button icon to stop
    } else {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        isRecording = false;
        toggleRecordingButton.textContent = "🎙️"; // Change button icon back to record
      }
    }
  } catch (error) {
    console.error("Error toggling recording:", error);
  }
});

// Uploading The Audio File

// async function uploadAudio(audioBlob) {
//   try {
//     const formData = new FormData();
//     const filename = generateUniqueFilename(5) + ".wav";
//     formData.append("audio", audioBlob, filename);
//     console.log("Uploading file:", filename);

//     fileInfo = filename;
//     console.log("Sending To Json:", fileInfo);

//     const response = await fetch(
//       "https://audio-api-5-quizpace.onrender.com/stop-recording-upload",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     if (response.ok) {
//       alert("Recording stopped and uploaded successfully!");

//       sendAudioInfoToServer(userName, fileInfo);
//     } else {
//       alert("Failed to upload recording!");
//     }
//   } catch (error) {
//     console.error("Error uploading recording:", error);
//   }
// }

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

//-----------------
//-----------------
//-----------------
//-----------------
//-----------------

//-----------------
//-----------------
//-----------------
//-----------------
//-----------------

//-----------------
//-----------------
//-----------------
//-----------------
//-----------------

//-----------------
//-----------------
//-----------------
//-----------------

// const startRecordingButton = document.getElementById("startRecording");
// const stopRecordingButton = document.getElementById("stopRecording");
// const audioPlayer = document.getElementById("audioPlayer");
// let mediaRecorder;
// let audioChunks = [];
// let fileCounter = 15; // Starting file counter

// async function fetchLatestFileNumber() {
//   try {
//     const response = await fetch(
//       "https://audio-api-5-quizpace.onrender.com/uploads"
//     );
//     const files = await response.json();
//     const latestFile = files.reduce((max, file) => {
//       const num = parseInt(file.substring(5, file.lastIndexOf("."))); // Extract number from filename
//       return num > max ? num : max;
//     }, -Infinity);
//     return latestFile + 1; // Increment to start from the next number
//   } catch (error) {
//     console.error("Error fetching latest file number:", error);
//     return fileCounter; // Return default counter if fetch fails
//   }
// }

// async function startRecording() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(stream);

//     mediaRecorder.ondataavailable = (event) => {
//       audioChunks.push(event.data);
//     };

//     mediaRecorder.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
//       audioPlayer.src = URL.createObjectURL(audioBlob);
//     };

//     mediaRecorder.start();
//   } catch (error) {
//     console.error("Error starting recording:", error);
//   }
// }

// startRecordingButton.addEventListener("click", async () => {
//   fileCounter = await fetchLatestFileNumber();
//   await startRecording();
// });
// // Function to stop recording and upload
// stopRecordingButton.addEventListener("click", async () => {
//   try {
//     if (mediaRecorder && mediaRecorder.state === "recording") {
//       mediaRecorder.stop();
//       mediaRecorder = null; // Release MediaRecorder
//       const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

//       const filename = `audio${fileCounter}.wav`;
//       console.log("Uploading file:", filename);

//       const formData = new FormData();
//       formData.append("audio", audioBlob, filename);
//       fileCounter++;

//       const response = await fetch(
//         "https://audio-api-5-quizpace.onrender.com/stop-recording-upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         alert("Recording stopped and uploaded successfully!");
//       } else {
//         alert("Failed to upload recording!");
//       }
//     }
//     // Explicitly release the stream
//     if (mediaRecorder && mediaRecorder.stream) {
//       mediaRecorder.stream.getTracks().forEach((track) => track.stop());
//     }
//   } catch (error) {
//     console.error("Error stopping recording and uploading:", error);
//   }
// });
