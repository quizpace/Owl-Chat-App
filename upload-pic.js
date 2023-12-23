"use strict";
let sendImageUrl;
// save url by username

document.getElementById("pic-upload").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  fileInput.click(); // Trigger click on the file input

  fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      try {
        const response = await fetch(
          "https://photos-api-mzpl.onrender.com/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          alert("File uploaded successfully!");
          sendImageUrl = await response.text(); // Assuming the server returns the image URL
          console.log("Uploaded Image URL:", sendImageUrl);
          await sendImageToServer(userName, sendImageUrl);
          await createMyChatWithBlueImage(
            chatsDiv,
            userName,
            time,
            sendImageUrl
          );
          // You can store or use the sendImageUrl as needed
        } else {
          const errorMessage = await response.text();
          alert(`Failed to upload file: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("An error occurred while uploading the file.");
      }
    } else {
      alert("Please select a file to upload.");
    }
  });
});

// modal pictures

// Function to handle the opening of the modal with a given image URL
// Add a click event listener to the document
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("blue")) {
    const imageURL = event.target.dataset.imageUrl; // Get the image URL directly from the clicked .blue element

    if (imageURL) {
      openModalPic(imageURL); // Call the function to open the modal with the specific image URL
    }
  }
});

// Function to handle the opening of the modal with a given image URL
function openModalPic(imageSrc) {
  var picModal = document.getElementById("myModalPic");
  var modalImage = document.getElementById("modalImage");

  // Set the src attribute of the modal image
  modalImage.src = imageSrc;

  // Display the modal
  picModal.style.display = "block";
}

// Close the modal when clicking on the close button
var picClose = document.querySelector(".pic-close");
picClose.addEventListener("click", function () {
  var picModal = document.getElementById("myModalPic");
  picModal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", function (event) {
  var picModal = document.getElementById("myModalPic");
  if (event.target == picModal) {
    picModal.style.display = "none";
  }
});
