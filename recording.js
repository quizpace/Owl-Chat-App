const startButton = document.getElementById("startRecording");
const stopButton = document.getElementById("stopRecording");
const audioPlayer = document.getElementById("audioPlayer");

let recorder; // To store the recorder object

startButton.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder = RecordRTC(stream, {
      type: "audio",
    });
    recorder.startRecording();
  } catch (err) {
    console.error("Error accessing microphone:", err);
  }
});

stopButton.addEventListener("click", () => {
  if (recorder) {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob();
      const audioURL = URL.createObjectURL(blob);
      audioPlayer.src = audioURL;
      // You can send the blob or audioURL to the server for storage or processing
    });
  }
});


stopButton.addEventListener('click', () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
  
        // Create FormData object to send the Blob data
        const formData = new FormData();
        formData.append('audio', blob, 'recorded_audio.wav');
  
        // Send the audio Blob to the server
        fetch('http://your-json-server-url/audios', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (response.ok) {
              console.log('Audio sent successfully!');
              // Handle success, if needed
            } else {
              throw new Error('Failed to send audio');
            }
          })
          .catch(error => {
            console.error('Error sending audio:', error);
            // Handle errors
          });
      });
    }
  });
  
